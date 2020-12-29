import React, {Component} from 'react';
import './MainPage.css';
import SideDrawer from './SideDrawer.js';

class MainPage extends Component {
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
    let appClasses = 'App-header'
    if(this.state.drawerOpen) {
      appClasses = 'App-header side-drawer-open'
    }
    return (
      <div className="App">
        <SideDrawer show={this.state.drawerOpen} />
        <header className={appClasses}>
          <button onClick={this.drawerToggleClickHandler}>toggle side drawer</button>
        </header>
      </div>
    );
  }
}

export default MainPage;
