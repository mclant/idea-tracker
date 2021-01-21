import React, {Component} from 'react';
import './1-style.css';
import Dot from '../Dot.js';
import { isEmpty } from 'lodash';
import { faUsers, faUserCheck, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import * as DotConstants from '../../constants/DiscoverDotConstants' ;
import * as DatabaseInfoConstants from '../../constants/DatabaseInfoConstants';

class DiscoverSection extends Component {
	constructor() {
		super()
		this.state = {
			darkDotColor: {
				background: DatabaseInfoConstants.DISCOVER_SECTION_DARK_BACKGROUND_COLOR,
				icon: DatabaseInfoConstants.ALL_SECTIONS_DARK_ICON_COLOR,
			},
			lightDotColor: {
				background: DatabaseInfoConstants.DISCOVER_SECTION_LIGHT_BACKGROUND_COLOR,
				icon: DatabaseInfoConstants.ALL_SECTIONS_LIGHT_ICON_COLOR,
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
						dotColor={this.props.progressMap[DotConstants.IDENTIFY_PEOPLE_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
						dotIcon={faUsers}
					/>
				</div>
				{this.props.progressMap[DotConstants.IDENTIFY_PEOPLE_DOT_TITLE] &&
					<div className="second-row">
						<Dot 
							dot={this.state.primaryResearchDot}
							openDotInfo={this.openPrimaryResearchDot}
							dotColor={this.props.progressMap[DotConstants.PRIMARY_RESEARCH_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faMicroscope}
						/>
						<Dot 
							dot={this.state.choosePeopleDot}
							openDotInfo={this.openChoosePeopleDot}
							dotColor={this.props.progressMap[DotConstants.CHOOSE_PEOPLE_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faUserCheck}
						/>
						<Dot 
							dot={this.state.secondaryResearchDot}
							openDotInfo={this.openSecondaryResearchDot}
							dotColor={this.props.progressMap[DotConstants.SECONDARY_RESEARCH_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faMicroscope}
						/>
					</div>
				}
			</div>
		);
	}
}

export default DiscoverSection;
