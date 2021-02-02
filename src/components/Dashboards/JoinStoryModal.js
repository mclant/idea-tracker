import React, { useState } from 'react';
import { db } from '../../firebase';
import * as DatabaseInfoConstants from '../../constants/DatabaseInfoConstants';
import firebase from 'firebase';

// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './modal-styles.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SignUpModal = (props) => {
	const classes = useStyles();
	const [creatorEmail, setCreatorEmail] = useState('');
	const [storyTitle, setStoryTitle] = useState('');
	const [loadingFinishJoin, setLoadingFinishJoin] = useState(false);

	const handleEmailChange = (event) => {
		setCreatorEmail(event.target.value);
	}

	const handleTitleChange = (event) => {
		setStoryTitle(event.target.value);
	}

	const joinStory = () => {
		setLoadingFinishJoin(true);
		db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).where(DatabaseInfoConstants.STORY_ATTRIBUTE_TITLE, '==', storyTitle).get()
		.then(querySnapshot => {
			if (!querySnapshot.empty) {
				querySnapshot.forEach(async doc => {
					let storyContainsEmail = false;
					let storyUsers = doc.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_USERS];
					await Promise.all(storyUsers.map(async user => {
						let currUser = await user.get();
						if (currUser.exists) {
							if (currUser.data()[DatabaseInfoConstants.USER_ATTRIBUTE_EMAIL] === creatorEmail) {
								storyContainsEmail = true;
							}
						}
					}));
					if (storyContainsEmail) {
						// add user to the story's list of users
						let currentStudentList = doc.data()[DatabaseInfoConstants.STORY_ATTRIBUTE_USERS] || [];
						currentStudentList.push(db.doc(DatabaseInfoConstants.USER_COLLECTION_NAME + '/' + props.userId));
						db.collection(DatabaseInfoConstants.STORY_COLLECTION_NAME).doc(doc.id).update({
							[DatabaseInfoConstants.STORY_ATTRIBUTE_USERS]: currentStudentList,
						});

						// add story to users list of stories
						db.collection(DatabaseInfoConstants.USER_COLLECTION_NAME).doc(props.userId).update({
							[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES]: firebase.firestore.FieldValue.arrayUnion(db.doc(DatabaseInfoConstants.STORY_COLLECTION_NAME + '/' + doc.id))
						}).then(async function() {
							let currUser = await db.collection(DatabaseInfoConstants.USER_COLLECTION_NAME).doc(props.userId).get();
							let updatedUserStories = currUser.data()[DatabaseInfoConstants.USER_ATTRIBUTE_STORY_REFERENCES];

							await props.setNewStories(updatedUserStories);
							setLoadingFinishJoin(false);
							props.toggleJoinStoryModal(false);
						});
					} else {
						alert('The story with this title and email was not found');
						setLoadingFinishJoin(false);
					}
				});
			} else {
				alert('The story with this title and email was not found');
				setLoadingFinishJoin(false);
			}
		})
		.catch(err => {
			console.error({err});
			alert('The story with this title and email was not found');
			setLoadingFinishJoin(false);
		});
	}

	return (
		<Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Join a teammate's story</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Enter the title of the story and the email address of your teammate who created it.
				</DialogContentText>
				<form className="form-style">
					<div className="form-element">
						<FormControl fullWidth className={classes.formControl}>
							<TextField id="standard-basic" label="Story title" onChange={handleTitleChange} />
						</FormControl>
					</div>
					<div className="form-element">
						<FormControl fullWidth className={classes.formControl}>
							<TextField id="standard-basic" label="Teammate's email" onChange={handleEmailChange} />
						</FormControl>
					</div>
				</form>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					disabled={
						!creatorEmail ||
						!storyTitle
					}
					onClick={joinStory}
				>{loadingFinishJoin ? 'Loading...' : 'Join story'}</Button>
				<Button
					variant="contained"
					onClick={() => props.toggleJoinStoryModal(false)}
				>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}

export default SignUpModal;
