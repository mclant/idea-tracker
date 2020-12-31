import React, {Component} from 'react';
import './dot-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class Dot extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
		}
	}

	render() {
		return (
			<div>
				<FontAwesomeIcon
					icon={faPlusCircle}
					style={{color: this.props.dotColor}}
					onClick={this.props.addDot}
					className="dot"
				/>
			</div>
		);
	}
}

export default Dot;
