import React, {Component} from 'react';
import './4-style.css';
// import Dot from '../Dot.js';

class DeliverSection extends Component {
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
      <div className="deliver-section">
        {/* <Dot dotColor="#FF4976" /> */}
      </div>
    );
  }
}

export default DeliverSection;
