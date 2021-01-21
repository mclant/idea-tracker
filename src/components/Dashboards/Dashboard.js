import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { db } from '../../firebase';
import firebase from 'firebase';
import SignUpModal from './SignUpModal';
import { isEmpty } from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import * as DatabaseInfoConstants from '../../constants/DatabaseInfoConstants';
import * as PathNameConstants from '../../constants/PathNameConstants';

const Dashboard = () => {
	const { user, isLoading, isAuthenticated } = useAuth0();
	const history = useHistory();

	const [profile, setProfile] = useState({});
	const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
	const [stories, setStories] = useState([]);
	const [isLoadingStories, setIsLoadingStories] = useState(false);

	const useStyles = makeStyles({
		root: {
			width: 275,
		},
		bullet: {
			display: 'inline-block',
			margin: '0 2px',
			transform: 'scale(0.8)',
		},
		title: {
			fontSize: 14,
		},
		pos: {
			marginBottom: 12,
		},
	});
	
	const classes = useStyles();

	useEffect(() => {
		if (user && isEmpty(profile)) {
			db.collection(DatabaseInfoConstants.USER_COLLECTION_NAME).where(DatabaseInfoConstants.USER_ATTRIBUTE_EMAIL, '==', user.email)
				.get()
				.then(async querySnapshot => {
					if (!!querySnapshot.docs.length) {
						const currentUser = querySnapshot.docs[0].data();
						let userStories = [];

						if (!!currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES] && !!currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES].length) {
							setIsLoadingStories(true);
							userStories = await getUserStories(currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES]);
							setIsLoadingStories(false);
						}
						setStories(userStories);
						setProfile({
							user_id: querySnapshot.docs[0].id,
							[DatabaseInfoConstants.USER_ATTRIBUTE_FIRST_NAME]: currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_FIRST_NAME],
							[DatabaseInfoConstants.USER_ATTRIBUTE_LAST_NAME]: currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_LAST_NAME],
							[DatabaseInfoConstants.USER_ATTRIBUTE_ROLE]: currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_ROLE],
						});
					} else {
						setSignUpModalIsOpen(true);
					}
				});
		}
	});

	const getUserStories = async (currUserStories) => {
		console.log({currUserStories});
		let storiesArray = await Promise.all(currUserStories.map(async story => {
			const currStory = await story.get();
			if (currStory.exists) {
				return ({
					storyId: currStory.id,
					storyTitle: currStory.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_TITLE] || DatabaseInfoConstants.STORY_NEW_PROJECT_DEFAULT_TITLE,
				});
			}
		}));
		return storiesArray || null;
	}

	const toggleSignUpModal = (userInfo) => {
		setProfile(userInfo);
		setSignUpModalIsOpen(!signUpModalIsOpen);
	}

	const createNewStory = () => {
		// create story and add user to the story's list of 'userIds'
		db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).add({
			[DatabaseInfoConstants.STORY_ATTRIBUTE_TITLE]: DatabaseInfoConstants.STORY_NEW_PROJECT_DEFAULT_TITLE,
			[DatabaseInfoConstants.STORY_ATTRIBUTE_PROGRESS_MAP]: DatabaseInfoConstants.STORY_PROGRESS_MAP,
			[DatabaseInfoConstants.STORY_ATTRIBUTE_USERS]: [
				db.doc(DatabaseInfoConstants.USER_COLLECTION_NAME + '/' + profile.user_id),
			],
		}).then(docRef => {
			history.push({
				pathname: '/' + PathNameConstants.CONNECT_THE_DOTS,
				storyId: docRef.id,
			});

			// also add the story to the users list of 'stories'
			db.collection(DatabaseInfoConstants.USER_COLLECTION_NAME).doc(profile.user_id).update({
				[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES]: firebase.firestore.FieldValue.arrayUnion(db.doc(DatabaseInfoConstants.STORY_COLLECTION_NAME + '/' + docRef.id))
			})
		}).catch(error => {
			console.error('Error creating new story: ', error);
		})
	}

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated ? (
			<div>
				<SignUpModal isOpen={signUpModalIsOpen} userEmail={user.email} toggleSignUpModal={toggleSignUpModal} />
				<div>
					this is the user profile page
					{!isEmpty(profile) && (
						<div>
							welcome <b>{profile[DatabaseInfoConstants.USER_ATTRIBUTE_FIRST_NAME] + ' ' + profile[DatabaseInfoConstants.USER_ATTRIBUTE_LAST_NAME]}</b> 
							and hello with your email: <b>{user.email}</b>
						</div>
					)}
					<LogoutButton />
					<div>
						{isLoadingStories && (
							<div>Loading</div>
						)}
						{!!stories.length ? (
							<div className="stories-container">
								{stories.map(story => {
									if (!!story) {
										return (
											<div key={story.storyId}>
												<Link to={{pathname: '/' + PathNameConstants.CONNECT_THE_DOTS, storyId: story.storyId}}>
													<Button>
														<Card className={classes.root}>
															<CardContent>
																{story.storyTitle}
															</CardContent>
														</Card>
													</Button>
												</Link>
											</div>
										)
									} else {
										return (<></>);
									}
								}
								)}
							</div>
						) : (
							<div>you have no stories</div>
						)}
						<Button onClick={createNewStory}>
							<Card className={classes.root}>
								<CardContent>
									Add a project
								</CardContent>
							</Card>
						</Button>
					</div>
				</div>
			</div>
		) : (
			<div>youre not authenticated
				<LogoutButton />
			</div>
		)
	)
}

export default Dashboard;
