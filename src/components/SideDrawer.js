import React from 'react'
import './SlideDrawer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faMinus, faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import * as DatabaseInfoConstants from '../constants/DatabaseInfoConstants';
import update from 'react-addons-update';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class SlideDrawer extends React.Component {
	constructor() {
		super()
		this.state = {
			dotId: null,
			originalQuestionsAndAnswerList: [],
			questionAndAnswersList: [],
			answerOpenMap: {},
			hasUnsavedChanges: false,
			// isBlockedAtCheckpoint: false,
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.show &&
			(
				(this.props.info.dotId !== this.state.dotId) ||
				(!this.props.info.dotId && 
					(this.state.originalQuestionsAndAnswerList !== this.props.info.qa_pairs)
				)
			)
		) {
			let tempAnswerOpenMap = {};
			this.props.info[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS].forEach((qa_pair) => {
				tempAnswerOpenMap[qa_pair[DatabaseInfoConstants.QA_PAIRS_ID]] = false;
			});

			const propsDotId = this.props.info.dotId;
			console.log({propsDotId});
			const propsQAList = this.props.info[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS];
			// const isCheckpointBlocked = this.props.info[DatabaseInfoConstants.STORY_ATTRIBUTE_IS_BLOCKED_BY_DOT] || false;

			this.setState({
				dotId: propsDotId,
				answerOpenMap: tempAnswerOpenMap,
				questionAndAnswersList: propsQAList,
				originalQuestionsAndAnswerList: propsQAList,
				// isBlockedAtCheckpoint: isCheckpointBlocked,
			});
		}
	}

	toggleAnswer (qa_pair) {
		let tempAnswerOpenMap = this.state.answerOpenMap;
		tempAnswerOpenMap[qa_pair[DatabaseInfoConstants.QA_PAIRS_ID]] = !this.state.answerOpenMap[qa_pair[DatabaseInfoConstants.QA_PAIRS_ID]];
		this.setState({ answerOpenMap: tempAnswerOpenMap });
	}

	inputChangeHandler = (qa_id, event) => {
		// let newQAList = this.state.questionAndAnswersList;
		const objIndex = this.state.questionAndAnswersList.findIndex(qa_pair => qa_pair[DatabaseInfoConstants.QA_PAIRS_ID] === qa_id);
		// newQAList[objIndex][DatabaseInfoConstants.QA_PAIRS_ANSWER] = event.target.value;
		const newQAList = update(this.state.questionAndAnswersList, {
			[objIndex]: {[DatabaseInfoConstants.QA_PAIRS_ANSWER]: {$set: event.target.value}}
		});
		this.setState({
			questionAndAnswersList: newQAList,
			hasUnsavedChanges: true,
		});
	}

	saveChanges = () => {
		this.props.saveDotInfoChanges(
			this.state.dotId,
			this.props.info[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION],
			{
				dotId: this.state.dotId,
				...this.props.info,
				[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: this.state.questionAndAnswersList,
			},
		);
		this.setState({
			hasUnsavedChanges: false,
			originalQuestionsAndAnswerList: this.state.questionAndAnswersList,
		});
	}

	confirmCancel = () => {
		confirmAlert({
			title: 'Are you sure?',
			message: 'All changes after your last save will be lost.',
			buttons: [
			  {
				label: 'Yes, cancel',
				onClick: () => this.cancelChanges()
			  },
			  {
				label: 'Exit',
			  }
			],
			closeOnClickOutside: true,
		  });
	}

	cancelChanges = () => {
		const originalQAList = this.state.originalQuestionsAndAnswerList;
		this.setState({
			questionAndAnswersList: originalQAList,
			hasUnsavedChanges: false,
		});
	}

	renderEditModeFooter () {
		return (
			<div className="edit-footer-section">
				<FontAwesomeIcon
					icon={faCheck}
					style={{color: "white"}}
					onClick={this.saveChanges}
					className="dot"
				/>
				<FontAwesomeIcon
					icon={faTimes}
					style={{color: "white"}}
					onClick={this.confirmCancel}
					className="dot"
				/>
			</div>
		);
	}

	renderFooter () {
		return (
			<div className="footer-section">
				<FontAwesomeIcon
					icon={faArrowLeft}
					style={{color: "white"}}
					onClick={this.props.drawerToggleClickHandler}
					className="dot"
				/>
			</div>
		);
	}

   	render() {
       let drawerClasses = 'side-drawer'
       if(this.props.show) {
          drawerClasses = 'side-drawer open'
	   }

       return (
			<div className={drawerClasses}>
				<div className="title-section">
					<b>{this.props.info[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]}</b>
					<b>{this.props.info[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]}</b>
				</div>
				{/* <div className="scroll"> */}
					<div className="body-section">
						{(this.state.questionAndAnswersList && !this.props.info.isBlocked) ? (
							this.state.questionAndAnswersList.map((qa_pair) => 
								<div key={qa_pair[DatabaseInfoConstants.QA_PAIRS_ID]} className="question-answer-container">
									<div className="question-container">
										{qa_pair[DatabaseInfoConstants.QA_PAIRS_QUESTION]}
										<FontAwesomeIcon
											icon={this.state.answerOpenMap[qa_pair[DatabaseInfoConstants.QA_PAIRS_ID]] ? faMinus : faCaretDown}
											style={{color: "#FFD249"}}
											onClick={() => this.toggleAnswer(qa_pair)}
											className={this.state.answerOpenMap[qa_pair[DatabaseInfoConstants.QA_PAIRS_ID]] ? 'minus-icon' : 'down-arrow-icon'}
										/>
									</div>
									<textarea
										className={this.state.answerOpenMap[qa_pair[DatabaseInfoConstants.QA_PAIRS_ID]] ? 'answer-visible' : 'answer-hidden'}
										type="text"
										onChange={(e) => this.inputChangeHandler(qa_pair[DatabaseInfoConstants.QA_PAIRS_ID], e)}
										value={qa_pair[DatabaseInfoConstants.QA_PAIRS_ANSWER]}
									>
									</textarea>
								</div>
							)
						) : 'Your professor must approve your progress thus far to move past this checkpoint'}
					</div>
				{/* </div> */}
				{this.state.hasUnsavedChanges ? 
					this.renderEditModeFooter()
					: this.renderFooter()
				}
			</div>
		)
    }
}

export default SlideDrawer;
