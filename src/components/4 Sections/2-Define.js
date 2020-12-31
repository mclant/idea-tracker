import React, {Component} from 'react';
import './2-style.css';
import Dot from '../Dot.js';

class DefineSection extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
		}
	}

	drawerToggleClickHandler = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		})
	}

	render() {
		return (
			<div className="define-section">
				<Dot dotColor="#4976FF" />
			</div>
		);
	}
}

export default DefineSection;
