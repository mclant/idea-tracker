import React, {Component} from 'react';
import './MainPage.css';
import SideDrawer from './SideDrawer.js';
import DiscoverSection from './4 Sections/1-Discover';
import DefineSection from './4 Sections/2-Define';
import DevelopSection from './4 Sections/3-Develop';
import DeliverSection from './4 Sections/4-Deliver';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

class MainPage extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
			drawerInfo: {},
			storyId: null,
			storyMap: {
				'Discover': [],
				'Define': [],
				'Develop': [],
				'Deliver': [],
			},
		}
	}

	componentDidMount () {
		if (!this.state.storyId) {
			db.collection('stories').doc('2jtuYF6zpspk8L0pg5Pf').get().then(doc => {
				console.log('doc data: ', doc.data());
			});
			db.collection('stories').doc('2jtuYF6zpspk8L0pg5Pf').collection('dots').get().then(dots => {
				let tempStoryMap = {
					'Discover': [],
					'Define': [],
					'Develop': [],
					'Deliver': [],
				};
				dots.forEach(dot => {
					const dotData = dot.data();
					tempStoryMap[dotData.section].push(dotData);
				});
				this.setState({ storyMap: tempStoryMap, storyId: 'im not null anymore' });
			});
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
			editMode={false}
		/>
        <header className={appClasses}>
			<Link to='/dashboard'>
				<button>go to dashboard</button>
			</Link>
		  <DiscoverSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			discoverDots={this.state.storyMap['Discover']}
			storyId={this.state.storyId}
		  />
		  <DefineSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			defineDots={this.state.storyMap['Define']}
		  />
		  <DevelopSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			developDots={this.state.storyMap['Develop']}
		  />
		  <DeliverSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			deliverDots={this.state.storyMap['Deliver']}
		  />
        </header>
      </div>
    );
  }
}

export default MainPage;
