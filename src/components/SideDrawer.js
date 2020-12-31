import React from 'react'
import './SlideDrawer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faMinus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class SlideDrawer extends React.Component {
	constructor() {
		super()
		this.state = {
			dotId: null,
			dotAttributesList: [],
			answerOpenMap: {},
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!this.state.dotId || (this.props.info.dotId !== this.state.dotId)) {
			console.log('component did update')
			let tempAnswerOpenMap = {};
			this.props.info.dotAttributes.forEach((attribute) => {
				tempAnswerOpenMap[attribute.id] = false;
			});
			
			this.setState({ dotId: this.props.info.dotId });
			this.setState({ answerOpenMap: tempAnswerOpenMap });
			this.setState({ dotAttributesList: this.props.info.dotAttributes });
		}
	}

	toggleAnswer (attribute) {
		console.log({attribute});
		let tempAnswerOpenMap = this.state.answerOpenMap;
		tempAnswerOpenMap[attribute.id] = !this.state.answerOpenMap[attribute.id];
		this.setState({ answerOpenMap: tempAnswerOpenMap });
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
							<div key={attribute.id} className="question-answer-container">
								<div className="question-container">
									{attribute.question}
									<FontAwesomeIcon
										icon={this.state.answerOpenMap[attribute.id] ? faMinus : faCaretDown}
										style={{color: "#FFD249"}}
										onClick={() => this.toggleAnswer(attribute)}
										className={this.state.answerOpenMap[attribute.id] ? 'minus-icon' : 'down-arrow-icon'}
									/>
								</div>
								<div className={this.state.answerOpenMap[attribute.id] ? 'answer-visible' : 'answer-hidden'}>
									{attribute.answer}
								</div>
							</div>
						)
					) : 'empty'}
				</div>
				<div className="footer-section">
					<FontAwesomeIcon
						icon={faArrowLeft}
						style={{color: "white"}}
						onClick={this.props.drawerToggleClickHandler}
						className="dot"
					/>
				</div>
			</div>
		)
    }
}

export default SlideDrawer;
