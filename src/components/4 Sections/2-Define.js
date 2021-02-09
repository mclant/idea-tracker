import React, {Component} from 'react';
import './2-style.css';
import Dot from '../Dot.js';
import { isEmpty } from 'lodash';
import { 
	faHiking,
	faHandHoldingHeart,
	faMapMarkedAlt,
	faComments,
	faBrain,
	faUserInjured,
	faUserEdit,
	faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import * as DefineDotConstants from '../../constants/DefineDotConstants' ;
import * as DiscoverDotConstants from '../../constants/DiscoverDotConstants';
import * as DatabaseInfoConstants from '../../constants/DatabaseInfoConstants';

class DefineSection extends Component {
	constructor() {
		super()
		this.state = {
			darkDotColor: {
				background: DatabaseInfoConstants.DEFINE_SECTION_DARK_BACKGROUND_COLOR,
				icon: DatabaseInfoConstants.ALL_SECTIONS_DARK_ICON_COLOR,
			},
			lightDotColor: {
				background: DatabaseInfoConstants.DEFINE_SECTION_LIGHT_BACKGROUND_COLOR,
				icon: DatabaseInfoConstants.ALL_SECTIONS_LIGHT_ICON_COLOR,
			},
			storyId: null,
			affinityMapDot: {},
			sayingDot: {},
			doingDot: {},
			thinkingDot: {},
			feelingDot: {},
			personaDot: {},
			experienceMapDot: {},
			painDot: {},
		}
	}

	componentWillReceiveProps () {
		const defineDots = this.props.defineDots;
		if (!isEmpty(defineDots)) {
			this.setState({
				storyId: this.props.storyId,
				affinityMapDot: defineDots[DefineDotConstants.AFFINITY_MAP_DOT_TITLE] || {},
				sayingDot: defineDots[DefineDotConstants.SAYING_DOT_TITLE] || {},
				doingDot: defineDots[DefineDotConstants.DOING_DOT_TITLE] || {},
				thinkingDot: defineDots[DefineDotConstants.THINKING_DOT_TITLE] || {},
				feelingDot: defineDots[DefineDotConstants.FEELING_DOT_TITLE] || {},
				personaDot: defineDots[DefineDotConstants.PERSONA_DOT_TITLE] || {},
				experienceMapDot: defineDots[DefineDotConstants.EXPERIENCE_MAP_DOT_TITLE] || {},
				painDot: defineDots[DefineDotConstants.PAIN_DOT_TITLE] || {},
			});
		}
	}

	componentDidUpdate () {
		if ((!this.state.storyId && !!this.props.storyId) || (this.state.storyId !== this.props.storyId)) {
			const defineDots = this.props.defineDots;
			this.setState({
				storyId: this.props.storyId,
				affinityMapDot: defineDots[DefineDotConstants.AFFINITY_MAP_DOT_TITLE] || {},
				sayingDot: defineDots[DefineDotConstants.SAYING_DOT_TITLE] || {},
				doingDot: defineDots[DefineDotConstants.DOING_DOT_TITLE] || {},
				thinkingDot: defineDots[DefineDotConstants.THINKING_DOT_TITLE] || {},
				feelingDot: defineDots[DefineDotConstants.FEELING_DOT_TITLE] || {},
				personaDot: defineDots[DefineDotConstants.PERSONA_DOT_TITLE] || {},
				experienceMapDot: defineDots[DefineDotConstants.EXPERIENCE_MAP_DOT_TITLE] || {},
				painDot: defineDots[DefineDotConstants.PAIN_DOT_TITLE] || {},
			});
		}
	}

	openDot = (emptyDot, dotInState) => {
		if (isEmpty(dotInState)) {
			this.props.changeDrawerInfo(emptyDot);
		} else {
			this.props.changeDrawerInfo(dotInState);
		}

		if (!this.props.drawerOpen) {
			this.props.drawerToggleClickHandler();
		}
	}

	render() {
		return (
			<div className="define-section">
				{this.props.progressMap[DiscoverDotConstants.CHOOSE_PEOPLE_DOT_TITLE] &&
					this.props.progressMap[DiscoverDotConstants.PRIMARY_RESEARCH_DOT_TITLE] &&
					this.props.progressMap[DiscoverDotConstants.SECONDARY_RESEARCH_DOT_TITLE] &&
					(
						<div className="first-row">
							<Dot 
								dot={this.state.affinityMapDot}
								openDotInfo={() => this.openDot(DefineDotConstants.AFFINITY_MAP_EMPTY_DOT, this.state.affinityMapDot)}
								dotColor={this.props.progressMap[DefineDotConstants.AFFINITY_MAP_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
								dotIcon={faMapMarkedAlt}
							/>
						</div>
					)
				}{this.props.progressMap[DefineDotConstants.AFFINITY_MAP_DOT_TITLE] &&
					<div className="second-row">
						<Dot 
							dot={this.state.sayingDot}
							openDotInfo={() => this.openDot(DefineDotConstants.SAYING_EMPTY_DOT, this.state.sayingDot)}
							dotColor={this.props.progressMap[DefineDotConstants.SAYING_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faComments}
						/>
						<Dot 
							dot={this.state.doingDot}
							openDotInfo={() => this.openDot(DefineDotConstants.DOING_EMPTY_DOT, this.state.doingDot)}
							dotColor={this.props.progressMap[DefineDotConstants.DOING_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faHiking}
						/>
						<Dot 
							dot={this.state.thinkingDot}
							openDotInfo={() => this.openDot(DefineDotConstants.THINKING_EMPTY_DOT, this.state.thinkingDot)}
							dotColor={this.props.progressMap[DefineDotConstants.THINKING_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faBrain}
						/>
						<Dot 
							dot={this.state.feelingDot}
							openDotInfo={() => this.openDot(DefineDotConstants.FEELING_EMPTY_DOT, this.state.feelingDot)}
							dotColor={this.props.progressMap[DefineDotConstants.FEELING_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faHandHoldingHeart}
						/>
					</div>
				}{this.props.progressMap[DefineDotConstants.SAYING_DOT_TITLE] &&
					this.props.progressMap[DefineDotConstants.DOING_DOT_TITLE] &&
					this.props.progressMap[DefineDotConstants.THINKING_DOT_TITLE] &&
					this.props.progressMap[DefineDotConstants.FEELING_DOT_TITLE] &&
					(
						<div className="third-row">
							<Dot 
								dot={this.state.personaDot}
								openDotInfo={() => this.openDot(DefineDotConstants.PERSONA_EMPTY_DOT, this.state.personaDot)}
								dotColor={this.props.progressMap[DefineDotConstants.PERSONA_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
								dotIcon={faUserEdit}
							/>
							<Dot 
								dot={this.state.experienceMapDot}
								openDotInfo={() => this.openDot(DefineDotConstants.EXPERIENCE_MAP_EMPTY_DOT, this.state.experienceMapDot)}
								dotColor={this.props.progressMap[DefineDotConstants.EXPERIENCE_MAP_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
								dotIcon={faSitemap}
							/>
						</div>
					)
				}{this.props.progressMap[DefineDotConstants.PERSONA_DOT_TITLE] &&
					this.props.progressMap[DefineDotConstants.EXPERIENCE_MAP_DOT_TITLE] &&
					(
						<div className="fourth-row">
							<Dot 
								dot={this.state.painDot}
								openDotInfo={() => this.openDot(DefineDotConstants.PAIN_EMPTY_DOT, this.state.painDot, true)}
								dotColor={this.props.progressMap[DefineDotConstants.PAIN_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
								dotIcon={faUserInjured}
							/>
						</div>
					)
				}
			</div>
		);
	}
}

export default DefineSection;
