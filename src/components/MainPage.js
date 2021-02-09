import React, {Component} from 'react';
import './MainPage.css';
import SideDrawer from './SideDrawer.js';
import DiscoverSection from './4 Sections/1-Discover';
import DefineSection from './4 Sections/2-Define';
import DevelopSection from './4 Sections/3-Develop';
import DeliverSection from './4 Sections/4-Deliver';
import firebase from 'firebase';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import * as PathNameConstants from '../constants/PathNameConstants';
import * as DatabaseInfoConstants from '../constants/DatabaseInfoConstants';
import update from 'react-addons-update';

import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

// import { useHistory } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

// const CheckUserAuthentication = () => {
// 	const { logout, isAuthenticated } = useAuth0();
// 	return { isAuthenticated, logout }
// }

class MainPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			drawerOpen: false,
			drawerInfo: {},
			storyId: null,
			storyTitle: '',
			editedStoryTitle: '',
			storyMap: {},
			progressMap: {},
		}
	}
	
	componentDidMount () {
		// const { userIsAuthenticated, logout } = CheckUserAuthentication();

		

		if (!this.state.storyId) {
			let tempProgressMap = {};
			let tempStoryTitle = '';
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.props.location.storyId).get().then(doc => {
				console.log({doc})
				if (doc.exists) {
					tempProgressMap = doc.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_PROGRESS_MAP];
					tempStoryTitle = doc.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_TITLE];
				} else {

				}
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
					storyTitle: tempStoryTitle,
					editedStoryTitle: tempStoryTitle,
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
					this.checkDotCompletion(dotData);
		
					// add to state for the frontend to update
					let updatedStoryMap = this.state.storyMap;
					updatedStoryMap[storySection][dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]] = {
						...dotData,
					};
					this.setState({
						storyMap: updatedStoryMap,
						drawerInfo: updatedStoryMap[storySection][dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]],
					});
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
		} else {
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).collection(DatabaseInfoConstants.DOT_COLLECTION_NAME)
				.add(dotData)
				.then(docRef => {
					currDotId = docRef.id;
					db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).collection(DatabaseInfoConstants.DOT_COLLECTION_NAME).doc(currDotId)
						.update({
							dotId: docRef.id,
						});
					
					this.checkDotCompletion(dotData);
		
					// add to state for the frontend to update
					let updatedStoryMap = this.state.storyMap;

					updatedStoryMap[storySection][dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]] = {
						...dotData,
						dotId: currDotId,
					};
					this.setState({
						storyMap: updatedStoryMap,
						drawerInfo: updatedStoryMap[storySection][dotData[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]],
					});
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
		}
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

	handleTitleChange = (e) => {
		this.setState({
			editedStoryTitle: e.target.value,
		});
	}

	saveNewTitle = () => {
		db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).update({
			[DatabaseInfoConstants.STORY_ATTRIBUTE_TITLE]: this.state.editedStoryTitle,
		});
		this.setState({
			storyTitle: this.state.editedStoryTitle,
		});
	}

	drawerToggleClickHandler = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen,
		})
	}

	changeDrawerInfo = async (info) => {
		this.saveDotInfoChanges(
			info.dotId,
			info[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION],
			{
				dotId: info.dotId,
				...info,
				[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS]: info[DatabaseInfoConstants.DOT_ATTRIBUTE_QA_PAIRS],
			},
		);
	}

  render() {
	if (!this.props.userIsAuthenticated) {
		this.props.logout({ returnTo: 'http://localhost:3000' });
	}
	
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
			<div className="title-container">
				<TextField id="standard-basic" value={this.state.editedStoryTitle} onChange={this.handleTitleChange} />
				{this.state.editedStoryTitle !== this.state.storyTitle && (
					<Button onClick={this.saveNewTitle}>Save title</Button>
				)}
				<Link to={'/' + PathNameConstants.DASHBOARD}>
					<button className="dashboard-button">go to dashboard</button>
				</Link>
			</div>
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
