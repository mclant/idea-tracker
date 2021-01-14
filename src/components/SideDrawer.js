import React from 'react'
import './SlideDrawer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faMinus, faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
// import { db } from '../firebase';

class SlideDrawer extends React.Component {
	constructor() {
		super()
		this.state = {
			dotId: null,
			dotAttributesList: [],
			answerOpenMap: {},
			testText: 'testing',
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.show && (!this.state.dotId || (this.props.info.dotId !== this.state.dotId))) {
			console.log('component did update')
			let tempAnswerOpenMap = {};
			this.props.info.dotAttributes.forEach((attribute) => {
				tempAnswerOpenMap[attribute.answerNumber] = false;
			});
			
			this.setState({ dotId: this.props.info.dotId });
			this.setState({ answerOpenMap: tempAnswerOpenMap });
			this.setState({ dotAttributesList: this.props.info.dotAttributes });
		}
	}

	toggleAnswer (attribute) {
		console.log({attribute});
		let tempAnswerOpenMap = this.state.answerOpenMap;
		tempAnswerOpenMap[attribute.answerNumber] = !this.state.answerOpenMap[attribute.answerNumber];
		this.setState({ answerOpenMap: tempAnswerOpenMap });
	}

	inputChangeHandler = (event) => {
		this.setState({ testText: event.target.value });
	}

	renderEditModeFooter () {
		return (
			<>
				<FontAwesomeIcon
					icon={faCheck}
					style={{color: "white"}}
					onClick={this.props.drawerToggleClickHandler}
					className="dot"
				/>
				<FontAwesomeIcon
					icon={faTimes}
					style={{color: "white"}}
					onClick={this.props.drawerToggleClickHandler}
					className="dot"
				/>
			</>
		);
	}

	renderFooter () {
		return (
			<>
				<FontAwesomeIcon
					icon={faArrowLeft}
					style={{color: "white"}}
					onClick={this.props.drawerToggleClickHandler}
					className="dot"
				/>
			</>
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
					<b>{this.props.info.sectionTitle}</b>
					<b>{this.props.info.sectionSubTitle}</b>
				</div>
				<div className="body-section">
					{this.state.dotAttributesList ? (
						this.state.dotAttributesList.map((attribute) => 
							<div key={attribute.answerNumber} className="question-answer-container">
								<div className="question-container">
									{attribute.question}
									<FontAwesomeIcon
										icon={this.state.answerOpenMap[attribute.answerNumber] ? faMinus : faCaretDown}
										style={{color: "#FFD249"}}
										onClick={() => this.toggleAnswer(attribute)}
										className={this.state.answerOpenMap[attribute.answerNumber] ? 'minus-icon' : 'down-arrow-icon'}
									/>
								</div>
								<textarea
									className={this.state.answerOpenMap[attribute.answerNumber] ? 'answer-visible' : 'answer-hidden'}
									type="text"
									value={attribute.text}
									onChange={this.inputChangeHandler}
								>
								</textarea>
							</div>
						)
					) : 'empty'}
				</div>
				<div className="footer-section">
					{this.props.editMode ? 
						this.renderEditModeFooter()
						: this.renderFooter()
					}
				</div>
			</div>
		)
    }
}

export default SlideDrawer;
