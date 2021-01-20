import React, {Component} from 'react';
import './1-style.css';
import Dot from '../Dot.js';
import { isEmpty } from 'lodash';
import { faUsers, faUserCheck, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import * as DotConstants from '../../constants/DotConstants' ;

class DiscoverSection extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
			darkDotColor: {
				background: '#ffd249',
				icon: 'rgba(53, 52, 52, 1)',
			},
			lightDotColor: {
				background: '#ffe596',
				icon: 'rgb(128, 128, 128)',
			},
			storyId: null,
			identifyPeopleDot: {},
			choosePeopleDot: {},
			primaryResearchDot: {},
			secondaryResearchDot: {},
		}
	}

	componentWillReceiveProps () {
		const discoverDots = this.props.discoverDots;
		if (!isEmpty(discoverDots)) {
			this.setState({
				storyId: this.props.storyId,
				identifyPeopleDot: discoverDots[DotConstants.IDENTIFY_PEOPLE_DOT_TITLE] || {},
				choosePeopleDot: discoverDots[DotConstants.CHOOSE_PEOPLE_DOT_TITLE] || {},
				primaryResearchDot: discoverDots[DotConstants.PRIMARY_RESEARCH_DOT_TITLE] || {},
				secondaryResearchDot: discoverDots[DotConstants.SECONDARY_RESEARCH_DOT_TITLE] || {},
			});
		}
	}

	componentDidUpdate () {
		if ((!this.state.storyId && !!this.props.storyId) || (this.state.storyId !== this.props.storyId)) {
			const discoverDots = this.props.discoverDots;
			this.setState({
				storyId: this.props.storyId,
				identifyPeopleDot: discoverDots[DotConstants.IDENTIFY_PEOPLE_DOT_TITLE] || {},
				choosePeopleDot: discoverDots[DotConstants.CHOOSE_PEOPLE_DOT_TITLE] || {},
				primaryResearchDot: discoverDots[DotConstants.PRIMARY_RESEARCH_DOT_TITLE] || {},
				secondaryResearchDot: discoverDots[DotConstants.SECONDARY_RESEARCH_DOT_TITLE] || {},
			});
		}
	}

	openIdentifyPeopleDot = () => {
		if (isEmpty(this.state.identifyPeopleDot)) {
			this.props.changeDrawerInfo(DotConstants.IDENTIFY_PEOPLE_EMPTY_DOT);
		} else {
			this.props.changeDrawerInfo(this.state.identifyPeopleDot);
		}

		if (!this.props.drawerOpen) {
			this.props.drawerToggleClickHandler();
		}
	}

	openChoosePeopleDot = () => {
		if (isEmpty(this.state.choosePeopleDot)) {
			this.props.changeDrawerInfo(DotConstants.CHOOSE_PEOPLE_EMPTY_DOT);
		} else {
			this.props.changeDrawerInfo(this.state.choosePeopleDot);
		}

		if (!this.props.drawerOpen) {
			this.props.drawerToggleClickHandler();
		}
	}

	openPrimaryResearchDot = () => {
		if (isEmpty(this.state.primaryResearchDot)) {
			this.props.changeDrawerInfo(DotConstants.PRIMARY_RESEARCH_EMPTY_DOT);
		} else {
			this.props.changeDrawerInfo(this.state.primaryResearchDot);
		}

		if (!this.props.drawerOpen) {
			this.props.drawerToggleClickHandler();
		}
	}

	openSecondaryResearchDot = () => {
		if (isEmpty(this.state.secondaryResearchDot)) {
			this.props.changeDrawerInfo(DotConstants.SECONDARY_RESEARCH_EMPTY_DOT);
		} else {
			this.props.changeDrawerInfo(this.state.secondaryResearchDot);
		}

		if (!this.props.drawerOpen) {
			this.props.drawerToggleClickHandler();
		}
	}

	render() {
		return (
			<div className="discover-section">
				<div className="first-row">
					<Dot 
						dot={this.state.identifyPeopleDot}
						openDotInfo={this.openIdentifyPeopleDot}
						dotColor={isEmpty(this.state.identifyPeopleDot) ? this.state.lightDotColor : this.state.darkDotColor}
						dotIcon={faUsers}
					/>
				</div>
				{!isEmpty(this.state.identifyPeopleDot) &&
					<div className="second-row">
						<Dot 
							dot={this.state.choosePeopleDot}
							openDotInfo={this.openChoosePeopleDot}
							dotColor={isEmpty(this.state.choosePeopleDot) ? this.state.lightDotColor : this.state.darkDotColor}
							dotIcon={faUserCheck}
						/>
						<Dot 
							dot={this.state.primaryResearchDot}
							openDotInfo={this.openPrimaryResearchDot}
							dotColor={isEmpty(this.state.primaryResearchDot) ? this.state.lightDotColor : this.state.darkDotColor}
							dotIcon={faFileUpload}
						/>
						<Dot 
							dot={this.state.secondaryResearchDot}
							openDotInfo={this.openSecondaryResearchDot}
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
