import React, {Component} from 'react';
import './1-style.css';
import Dot from '../Dot.js';
import { isEmpty } from 'lodash';
import { faUsers, faUserCheck, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import * as DotConstants from '../../constants/DotInfoConstants' ;

class DiscoverSection extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
			darkDotColor: '#ffd249',
			lightDotColor: '#ffe596',
			storyId: null,
			identifyPeopleDot: {},
			choosePeopleDot: {},
			primaryResearchDot: {},
			secondaryResearchDot: {},
		}
	}

	componentDidUpdate () {
		if ((!this.state.storyId && !!this.props.storyId) || (this.state.storyId !== this.props.storyId)) {
			console.log('props: ', this.props.discoverDots);
			const discoverDots = this.props.discoverDots;
			this.setState({
				storyId: this.props.storyId,
				identifyPeopleDot: discoverDots.find(dot => dot.title === 'Identify People') || {},
				choosePeopleDot: discoverDots.find(dot => dot.title === 'Choose People') || {},
				primaryResearchDot: discoverDots.find(dot => dot.title === 'Primary Research') || {},
				secondaryResearchDot: discoverDots.find(dot => dot.title === 'Secondary Research') || {},
			});
		}
	}

	openDotInfo = (currDot) => {
		console.log({currDot})
		if (isEmpty(currDot)) {
			console.log('dot is empty')
		} else {
			this.props.changeDrawerInfo({
				dotId: DotConstants.DISCOVER_DOT_ID,
				sectionTitle: DotConstants.DISCOVER_DOT_TITLE,
				sectionSubTitle: currDot.title ? currDot.title : 'empty',
				dotAttributes: [
					{
						answerNumber: 1,
						question: DotConstants.DISCOVER_DOT_QUESTION_1,
						text: currDot.answers.find(answer => answer.answerNumber === 1) || '',
					},
					{
						answerNumber: 2,
						question: DotConstants.DISCOVER_DOT_QUESTION_2,
						text: currDot.answers.find(answer => answer.answerNumber === 2) || '',
					},
					{
						answerNumber: 3,
						question: DotConstants.DISCOVER_DOT_QUESTION_3,
						text: currDot.answers.find(answer => answer.answerNumber === 3) || '',
					},
				]
			})
			if (!this.props.drawerOpen) {
				this.props.drawerToggleClickHandler();
			}
		}
	}

	render() {
		return (
			<div className="discover-section">
				<div className="first-row">
					<Dot 
						dot={this.state.identifyPeopleDot}
						openDotInfo={this.openDotInfo}
						dotColor={isEmpty(this.state.identifyPeopleDot) ? this.state.lightDotColor : this.state.darkDotColor}
						dotIcon={faUsers}
					/>
				</div>
				{!isEmpty(this.state.identifyPeopleDot) &&
					<div className="second-row">
						<Dot 
							dot={this.state.choosePeopleDot}
							openDotInfo={this.openDotInfo}
							dotColor={isEmpty(this.state.choosePeopleDot) ? this.state.lightDotColor : this.state.darkDotColor}
							dotIcon={faUserCheck}
						/>
						<Dot 
							dot={this.state.primaryResearchDot}
							openDotInfo={this.openDotInfo}
							dotColor={isEmpty(this.state.primaryResearchDot) ? this.state.lightDotColor : this.state.darkDotColor}
							dotIcon={faFileUpload}
						/>
						<Dot 
							dot={this.state.secondaryResearchDot}
							openDotInfo={this.openDotInfo}
							dotColor={isEmpty(this.state.secondaryResearchDot) ? this.state.lightDotColor : this.state.darkDotColor}
							dotIcon={faFileUpload}
						/>
					</div>
				}
			</div>
		);
	}
}

export default DiscoverSection;
