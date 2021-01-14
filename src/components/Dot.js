import React, {Component} from 'react';
import './dot-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUsers, faUserCheck } from '@fortawesome/free-solid-svg-icons'

class Dot extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
		}
	}

	render() {
		const iconColor = '#808080';
		return (
			<div className="outerCircle" style={{ backgroundColor: this.props.dotColor }}>
				<FontAwesomeIcon
					icon={this.props.dotIcon}
					style={{color: iconColor}}
					onClick={() => this.props.openDotInfo(this.props.dot)}
					className="dot"
				/>
			</div>
		);
	}
}

export default Dot;
