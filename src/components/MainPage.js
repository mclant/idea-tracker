import React, {Component} from 'react';
import './MainPage.css';
import SideDrawer from './SideDrawer.js';
import DiscoverSection from './4 Sections/1-Discover';
import DefineSection from './4 Sections/2-Define';
import DevelopSection from './4 Sections/3-Develop';
import DeliverSection from './4 Sections/4-Deliver';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import * as PathNameConstants from '../constants/PathNameConstants';
import * as DatabaseInfoConstants from '../constants/DatabaseInfoConstants';

class MainPage extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
			drawerInfo: {},
			storyId: null,
			storyMap: {},
		}
	}

	componentDidMount () {
		if (!this.state.storyId) {
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.props.location.storyId).get().then(doc => {
				console.log('doc data: ', doc.data());
			});
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.props.location.storyId).collection(DatabaseInfoConstants.DOT_COLLECTION_NAME).get().then(dots => {
				let tempStoryMap = {
					[DatabaseInfoConstants.DISCOVER_SECTION_TITLE]: {},
					[DatabaseInfoConstants.DEFINE_SECTION_TITLE]: {},
					[DatabaseInfoConstants.DEVELOP_SECTION_TITLE]: {},
					[DatabaseInfoConstants.DELIVER_SECTION_TITLE]: {},
				};
				dots.forEach(dot => {
					const dotData = {
						dotId: dot.id,
						...dot.data(),
					}
					tempStoryMap[dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]][dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]] = dotData;
				});
				this.setState({ storyMap: tempStoryMap, storyId: this.props.location.storyId });
			});
		}
	}

	updateDotInfo = (dotId, storySection, dotData) => {
		console.log({dotData});
		let currDotId = dotId;
		// update database first
		db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).collection(DatabaseInfoConstants.DOT_COLLECTION_NAME).doc(currDotId || '')
			.set(dotData)
			.then(docRef => {
				currDotId = currDotId || docRef.id;
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		
		// add to state for the frontend to update
		let updatedStoryMap = this.state.storyMap;
		updatedStoryMap[storySection][dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]] = {
			dotId: currDotId,
			...dotData
		};
		this.setState({ storyMap: updatedStoryMap });
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
			updateDotInfo={this.updateDotInfo}
		/>
        <header className={appClasses}>
			<Link to={'/' + PathNameConstants.DASHBOARD}>
				<button>go to dashboard</button>
			</Link>
		  <DiscoverSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			discoverDots={this.state.storyMap[DatabaseInfoConstants.DISCOVER_SECTION_TITLE]}
			storyId={this.state.storyId}
		  />
		  <DefineSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			defineDots={this.state.storyMap[DatabaseInfoConstants.DEFINE_SECTION_TITLE]}
			updateDotInfo={this.updateDotInfo}
		  />
		  <DevelopSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			developDots={this.state.storyMap[DatabaseInfoConstants.DEVELOP_SECTION_TITLE]}
			updateDotInfo={this.updateDotInfo}
		  />
		  <DeliverSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			deliverDots={this.state.storyMap[DatabaseInfoConstants.DELIVER_SECTION_TITLE]}
			updateDotInfo={this.updateDotInfo}
		  />
        </header>
      </div>
    );
  }
}

export default MainPage;
