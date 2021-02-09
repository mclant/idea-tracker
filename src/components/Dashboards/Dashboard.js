import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { db } from '../../firebase';
import firebase from 'firebase';
import SignUpModal from './SignUpModal';
import JoinStoryModal from './JoinStoryModal';
import { isEmpty } from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import * as DatabaseInfoConstants from '../../constants/DatabaseInfoConstants';
import * as PathNameConstants from '../../constants/PathNameConstants';
import { uniqBy } from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './dashboard-styles.css';

const Dashboard = () => {
	const { user, isLoading, isAuthenticated, logout } = useAuth0();
	const history = useHistory();

	const [profile, setProfile] = useState({});
	const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
	const [joinStoryModalIsOpen, setJoinStoryModalIsOpen] = useState(false);
	const [stories, setStories] = useState([]);
	const [isLoadingStories, setIsLoadingStories] = useState(false);
	const [isLoadingStudentStories, setIsLoadingStudentStories] = useState(false);
	const [studentStories, setStudentStories] = useState([]);

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

						// get the users personal stories
						if (!!currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES] && !!currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES].length) {
							setIsLoadingStories(true);
							userStories = await getUserStories(currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES]);
							setIsLoadingStories(false);
						}

						// get the student's stories if the current user is a professor
						if (!!currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STUDENTS_LIST] && !!currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STUDENTS_LIST].length) {
							setIsLoadingStudentStories(true);


							let allStudentStories = [];
							await Promise.all(currentUser[DatabaseInfoConstants.USER_ATTRIBUTE_STUDENTS_LIST].map(async student => {
								const currStudent = await student.get();
								if (currStudent.exists) {
									let currStudentStories = await getUserStories(currStudent.data()[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES]);
									allStudentStories.push(...currStudentStories);
								}
							}));

							let allUniqueStudentStories = []
							if (!!allStudentStories.length) {
								allUniqueStudentStories = uniqBy(allStudentStories, story => {
									return story.storyId;
								});
							}

							setStudentStories(allUniqueStudentStories);
							setIsLoadingStudentStories(false);
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
		let storiesArray = await Promise.all(currUserStories.map(async story => {
			const currStory = await story.get();
			if (currStory.exists) {
				let storyUsers = await Promise.all(currStory.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_USERS].map(async user => {
					let currUser = await user.get();
					return currUser.data();
				}));

				let blockedDot = await db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(currStory.id).collection(DatabaseInfoConstants.DOT_COLLECTION_NAME).get().then(dots => {
					let isBlockedDot = null;
					dots.forEach(dot => {
						if (dot.data()[DatabaseInfoConstants.DOT_ATTRIBUTE_IS_CHECKPOINT]) {
							isBlockedDot = {...dot.data()};
						}
					});
					return isBlockedDot;
				});

				return ({
					storyId: currStory.id,
					storyTitle: currStory.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_TITLE] || DatabaseInfoConstants.STORY_NEW_PROJECT_DEFAULT_TITLE,
					storyUsers: storyUsers,
					blockedDot: blockedDot,
				});
			}
		}));
		return storiesArray || null;
	}

	const forceEmailVerification = () => {
		confirmAlert({
			title: 'Please confirm your email',
			message: 'Verify your email (check your email inbox), logout and then log back in to get started.',
			buttons: [
			  {
				label: 'Logout',
				onClick: () => logout(),
			  },
			],
			closeOnClickOutside: false,
		  });
	}

	const toggleSignUpModal = (userInfo) => {
		setProfile(userInfo);
		setSignUpModalIsOpen(!signUpModalIsOpen);
	}

	const toggleJoinStoryModal = () => {
		setJoinStoryModalIsOpen(!joinStoryModalIsOpen);
	}

	const setNewStories = async (newStories) => {
		let userStories = await getUserStories(newStories);
		setStories(userStories);
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

	if (!user.email_verified) {
		forceEmailVerification();
	}

	return (
		isAuthenticated ? (
				<div>
					<SignUpModal 
						isOpen={signUpModalIsOpen}
						userEmail={user.email}
						toggleSignUpModal={toggleSignUpModal}
						user_id={profile.user_id}
					/>
					<JoinStoryModal
						isOpen={joinStoryModalIsOpen}
						userId={profile.user_id}
						toggleJoinStoryModal={toggleJoinStoryModal}
						setNewStories={setNewStories}
					/>
					<div>
						<div className="left-nav-menu">
							Dashboard
						</div>
						<div className="dashboard">
							<div className="profile-header-container">
								{!isEmpty(profile) && (
									<Paper elevation={2} style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
										<div>Name: <b>{profile[DatabaseInfoConstants.USER_ATTRIBUTE_FIRST_NAME] + ' ' + profile[DatabaseInfoConstants.USER_ATTRIBUTE_LAST_NAME]}</b></div>
										<div>Email: <b>{user.email}</b></div>
									</Paper>
								)}
								<LogoutButton />
							</div>
							<div>
								{isLoadingStories && (
									<div>Loading</div>
								)}
								{!!stories.length ? (
									<Paper elevation={2} className="stories-container">
										{stories.map(story => {
											if (!!story) {
												return (
													<div key={story.storyId}>
														<Link to={{pathname: '/' + PathNameConstants.CONNECT_THE_DOTS, storyId: story.storyId}}>
															<Button>
																<Card className="story-card">
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
									</Paper>
								) : (
									<div>you have no stories</div>
								)}
								<div className="button-container">
									<Button onClick={createNewStory} variant="contained" color="primary">
										Create a project
									</Button>
									<Button onClick={toggleJoinStoryModal} variant="contained" color="primary">
										Join a project
									</Button>
								</div>
							</div>
							{!!profile.role && (profile.role === DatabaseInfoConstants.ROLE_PROFESSOR) && (
								<div>
									{isLoadingStudentStories && (
										<div>Loading student stories...</div>
									)}
									{!!studentStories.length ? (
										<Paper elevation={2} className="student-stories-container">
											<div><b>Student Stories:</b></div>
											{studentStories.map(story => {
												if (!!story) {
													return (
														<div key={story.storyId} className="card-container">
															<Link to={{pathname: '/' + PathNameConstants.CONNECT_THE_DOTS, storyId: story.storyId}}>
																<Button>
																	<Card className={classes.root}>
																		<CardContent>
																			{story.storyTitle}
																		</CardContent>
																	</Card>
																</Button>
															</Link>
															<div style={{paddingLeft: '15px'}}>
																{story.storyUsers.map(student => {
																	return (
																		<div key={student.id}>
																			{
																				student[DatabaseInfoConstants.USER_ATTRIBUTE_FIRST_NAME] + ' ' +
																				student[DatabaseInfoConstants.USER_ATTRIBUTE_LAST_NAME] + ' ' +
																				student[DatabaseInfoConstants.USER_ATTRIBUTE_EMAIL]
																			}
																		</div>
																	)
																})}
															</div>
															<div style={{paddingLeft: '20px'}}>
																{!isEmpty(story.blockedDot) && (
																	<Button
																		variant="outlined"
																		color="primary"
																		onClick={() => {}}
																	>
																		Pass Checkpoint at {story.blockedDot[DatabaseInfoConstants.DOT_ATTRIBUTE_TITLE]}
																	</Button>
																)}
															</div>
														</div>
													)
												} else {
													return (<div key={story.storyId}></div>);
												}
											}
											)}
										</Paper>
									) : (
										<div>This is where your students' stories will be shown</div>
									)}
								</div>
							)}
						</div>
					</div>
			</div>
		) : (
			<div>You must logout and sign back in to continue
				<LogoutButton />
			</div>
		)
	)
}

export default Dashboard;
