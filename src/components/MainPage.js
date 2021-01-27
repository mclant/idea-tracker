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
	constructor() {
		super()
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

		// if (!userIsAuthenticated) {
		// 	logout({ returnTo: 'http://localhost:3000' });
		// }

		console.log('component did mount');
		if (!this.state.storyId) {
			console.log('in here')
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
		console.log({currDotId});
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
					console.log('add dot')
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

	changeDrawerInfo = async (info, hasCheckpoint = false) => {
		// check to see if it has a checkpoint
		if (hasCheckpoint) {
			console.log('has checkpoint here');
			let blockedDotIds = [];
			db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).get()
				.then(docRef => {
					let blockedDots = docRef.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_BLOCKED_DOTS];
					if (!!blockedDots && !!blockedDots.length) {
						blockedDotIds = blockedDots.filter(dot => dot.dotId === info.dotId);
					}
					console.log('info dot id: ', info.dotId);
					console.log({blockedDotIds});
					console.log({blockedDots});

					if (!blockedDots || !blockedDots.length || !blockedDotIds.length) {
						// create the blocked dot
						db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(this.state.storyId).update({
							[DatabaseInfoConstants.STORY_ATTRIBUTE_BLOCKED_DOTS]: firebase.firestore.FieldValue.arrayUnion({
								dotId: info.dotId,
								isBlocked: true,
								[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION]: info[DatabaseInfoConstants.DOT_ATTRIBUTE_SECTION],
							}),
						})
						.then(() => {
							console.log('success');
						})
						console.log('setting state as blocked');
						this.setState({
							drawerInfo: {
								...info,
								isBlocked: true,
							}
						});
					} else {
						this.setState({
							drawerInfo: {
								...info,
								isBlocked: blockedDotIds[0].isBlocked,
							}
						});
					}
				})

			// if (!info.dotId) {
			// 	// create blocked dot on the story
				
			// } else {
			// 	this.setState({
			// 		drawerInfo: info,
			// 	});
			// }
		} else {
			this.setState({
				drawerInfo: {
					...info,
					isBlocked: false,
				}
			});
		}
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
