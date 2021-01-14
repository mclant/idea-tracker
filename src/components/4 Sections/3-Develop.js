import React, {Component} from 'react';
import './3-style.css';
import Dot from '../Dot.js';

class DevelopSection extends Component {
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
      <div className="develop-section">
        {/* <Dot dotColor="#49FFD2" /> */}
      </div>
    );
  }
}

export default DevelopSection;
