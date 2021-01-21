import React, {Component} from 'react';
import './1-style.css';
import Dot from '../Dot.js';
import { isEmpty } from 'lodash';
import { faUsers, faUserCheck, faFileUpload } from '@fortawesome/free-solid-svg-icons';
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
			<div className="discover-section">
				{this.props.progressMap[DiscoverDotConstants.CHOOSE_PEOPLE_DOT_TITLE] &&
					this.props.progressMap[DiscoverDotConstants.PRIMARY_RESEARCH_DOT_TITLE] &&
					this.props.progressMap[DiscoverDotConstants.SECONDARY_RESEARCH_DOT_TITLE] &&
					(
						<div className="first-row">
							<Dot 
								dot={this.state.affinityMapDot}
								openDotInfo={() => this.openDot(DefineDotConstants.AFFINITY_MAP_EMPTY_DOT, this.state.affinityMapDot)}
								dotColor={this.props.progressMap[DefineDotConstants.AFFINITY_MAP_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
								dotIcon={faUsers}
							/>
						</div>
					)
				}{this.props.progressMap[DefineDotConstants.AFFINITY_MAP_DOT_TITLE] &&
					<div className="second-row">
						<Dot 
							dot={this.state.sayingDot}
							openDotInfo={() => this.openDot(DefineDotConstants.SAYING_EMPTY_DOT, this.state.sayingDot)}
							dotColor={this.props.progressMap[DefineDotConstants.SAYING_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faUserCheck}
						/>
						<Dot 
							dot={this.state.doingDot}
							openDotInfo={() => this.openDot(DefineDotConstants.DOING_EMPTY_DOT, this.state.doingDot)}
							dotColor={this.props.progressMap[DefineDotConstants.DOING_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faFileUpload}
						/>
						<Dot 
							dot={this.state.thinkingDot}
							openDotInfo={() => this.openDot(DefineDotConstants.THINKING_EMPTY_DOT, this.state.thinkingDot)}
							dotColor={this.props.progressMap[DefineDotConstants.THINKING_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faFileUpload}
						/>
						<Dot 
							dot={this.state.feelingDot}
							openDotInfo={() => this.openDot(DefineDotConstants.FEELING_EMPTY_DOT, this.state.feelingDot)}
							dotColor={this.props.progressMap[DefineDotConstants.FEELING_DOT_TITLE] ? this.state.darkDotColor : this.state.lightDotColor}
							dotIcon={faFileUpload}
						/>
					</div>
				}
			</div>
		);
	}
}

export default DefineSection;
