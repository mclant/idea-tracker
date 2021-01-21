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
import update from 'react-addons-update';

class MainPage extends Component {
	constructor() {
		super()
		this.state = {
			drawerOpen: false,
			drawerInfo: {},
			storyId: null,
			storyMap: {},
			progressMap: {},
		}
	}

	componentDidMount () {
		if (!this.state.storyId) {
			let tempProgressMap = {};
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.props.location.storyId).get().then(doc => {
				tempProgressMap = doc.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_PROGRESS_MAP];
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
				this.setState({
					storyMap: tempStoryMap,
					storyId: this.props.location.storyId,
					progressMap: tempProgressMap,
				});
			});
		}
	}

	saveDotInfoChanges = (dotId, storySection, dotData) => {
		let currDotId = dotId;
		// update database first
		if (currDotId) {
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).collection(DatabaseInfoConstants.DOT_COLLECTION_NAME).doc(currDotId)
				.update(dotData)
				.then(docRef => {
					// currDotId = currDotId || docRef.id;
					console.log('doc successful update', docRef);
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
		} else {
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).collection(DatabaseInfoConstants.DOT_COLLECTION_NAME)
				.add(dotData)
				.then(docRef => {
					// add id to the dot obj
					currDotId = docRef.id;
					db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).collection(DatabaseInfoConstants.DOT_COLLECTION_NAME).doc(currDotId)
						.update({
							dotId: docRef.id,
						});
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
		}

		//check for dot completion
		this.checkDotCompletion(dotData);
		
		// add to state for the frontend to update
		let updatedStoryMap = this.state.storyMap;
		updatedStoryMap[storySection][dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]] = {
			dotId: currDotId,
			...dotData
		};
		this.setState({ storyMap: updatedStoryMap });
	}

	checkDotCompletion = (dotData) => {
		let isComplete = true;
		dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS].forEach(qa_pair => {
			if (qa_pair[DatabaseInfoConstants.QA_PAIRS_ANSWER] === '') {
				isComplete = false;
			}
		});
		if (isComplete) {
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).update({
				[DatabaseInfoConstants.STORY_ATTRIBUTE_PROGRESS_MAP]: {
					...this.state.progressMap,
					[dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]]: true,
				}
			});
			const updatedProgressMap = update(this.state.progressMap, {
				[dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]]: {$set: true}
			});
			this.setState({
				progressMap: updatedProgressMap,
			});
		}
	}

	drawerToggleClickHandler = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen,
		})
	}

	changeDrawerInfo = (info) => {
		this.setState({
			drawerInfo: info,
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
			saveDotInfoChanges={this.saveDotInfoChanges}
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
			progressMap={this.state.progressMap}
		  />
		  <DefineSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			defineDots={this.state.storyMap[DatabaseInfoConstants.DEFINE_SECTION_TITLE]}
			storyId={this.state.storyId}
			progressMap={this.state.progressMap}
		  />
		  <DevelopSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			developDots={this.state.storyMap[DatabaseInfoConstants.DEVELOP_SECTION_TITLE]}
		  />
		  <DeliverSection
		  	drawerToggleClickHandler={this.drawerToggleClickHandler}
			drawerOpen={this.state.drawerOpen}
			changeDrawerInfo={this.changeDrawerInfo}
			deliverDots={this.state.storyMap[DatabaseInfoConstants.DELIVER_SECTION_TITLE]}
		  />
        </header>
      </div>
    );
  }
}

export default MainPage;
