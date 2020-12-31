import React, {Component} from 'react';
import './1-style.css';
import Dot from '../Dot.js';

class DiscoverSection extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
			discoverDots: [],
		}
	}

	addDot = () => {
		this.props.changeDrawerInfo({
			dotId: 'Discover',
			sectionTitle: 'Discover: Research',
			sectionSubTitle: 'Identify People',
			dotAttributes: [
				{
					id: 1,
					question: 'Who are the people you will focus on?',
					answer: 'testing',
				},
				{
					id: 2,
					question: 'Why are you focusing on these people?',
					answer: 'answer num 2',
				},
				{
					id: 3,
					question: 'Tasks',
					answer: '',
				},
			]
		})
		if (!this.props.drawerOpen) {
			this.props.drawerToggleClickHandler();
		}
	}

	render() {
		return (
			<div className="discover-section">
				<Dot addDot={this.addDot} dotColor="#FFD249" />
			</div>
		);
	}
}

export default DiscoverSection;
