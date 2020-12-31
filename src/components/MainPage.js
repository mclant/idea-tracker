import React, {Component} from 'react';
import './MainPage.css';
import SideDrawer from './SideDrawer.js';
import DiscoverSection from './4 Sections/1-Discover';
import DefineSection from './4 Sections/2-Define';
import DevelopSection from './4 Sections/3-Develop';
import DeliverSection from './4 Sections/4-Deliver';

class MainPage extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
			drawerInfo: {},
			allDotsMap: {
				'Discover': [],
				'Define': [],
				'Develop': [],
				'Deliver': [],
			},
		}
	}

  drawerToggleClickHandler = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  changeDrawerInfo = (info) => {
	  this.setState({
		  drawerInfo: info
	  })
  }

  render() {
    let appClasses = 'App-header'
    if(this.state.drawerOpen) {
      appClasses = 'App-header side-drawer-open'
    }
    return (
      <div className="App">
        <SideDrawer
			show={this.state.drawerOpen}
			info={this.state.drawerInfo}
			drawerToggleClickHandler={this.drawerToggleClickHandler}
		/>
        <header className={appClasses}>
		  <DiscoverSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			discoverDots={this.state.allDotsMap['Discover']}
		  />
		  <DefineSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			defineDots={this.state.allDotsMap['Define']}
		  />
		  <DevelopSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			developDots={this.state.allDotsMap['Develop']}
		  />
		  <DeliverSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			deliverDots={this.state.allDotsMap['Deliver']}
		  />
        </header>
      </div>
    );
  }
}

export default MainPage;
