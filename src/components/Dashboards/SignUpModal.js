import React, { useState } from 'react';
import { db } from '../../firebase';
import * as DatabaseInfoConstants from '../../constants/DatabaseInfoConstants';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './modal-styles.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
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
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [role, setRole] = useState('');
	const [professorEmail, setProfessorEmail] = useState('');
	const [isLoadingEmailSearch, setIsLoadingEmailSearch] = useState(false);
	const [isConnectedToProfessor, setIsConnectedToProfessor] = useState(false);
	const [professor, setProfessor] = useState({});
	const [loadingFinishSignup, setLoadingFinishSignup] = useState(false);

	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
	}

	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	}

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	}

	const handleProfessorEmailChange = (event) => {
		setProfessorEmail(event.target.value);
	}

	const searchForProfessorEmail = () => {
		setIsLoadingEmailSearch(true);

		db.collection(DatabaseInfoConstants.USER_COLLECTION_NAME)
			.where(DatabaseInfoConstants.USER_ATTRIBUTE_EMAIL, '==', professorEmail)
			.get()
			.then(docRef => {
				if (!!docRef.docs[0]) {
					if (docRef.docs[0].data()[DatabaseInfoConstants.USER_ATTRIBUTE_ROLE] === DatabaseInfoConstants.ROLE_PROFESSOR) {
						setProfessor({
							name: docRef.docs[0].data()[DatabaseInfoConstants.USER_ATTRIBUTE_LAST_NAME],
							id: docRef.docs[0].id,
						});
						setIsConnectedToProfessor(true);
					} else {
						alert('oops! A professor with this email does not exist.');
					}
				} else {
					alert('oops! A professor with this email does not exist.');
				}
				setIsLoadingEmailSearch(false);
			})
			.catch(err => {
				console.error({err});
				setIsLoadingEmailSearch(false);
			})

	}

	const finishSignUp = () => {
		setLoadingFinishSignup(true);
		db.collection(DatabaseInfoConstants.USER_COLLECTION_NAME).add({
			[DatabaseInfoConstants.USER_ATTRIBUTE_FIRST_NAME]: firstName,
			[DatabaseInfoConstants.USER_ATTRIBUTE_LAST_NAME]: lastName,
			[DatabaseInfoConstants.USER_ATTRIBUTE_ROLE]: role,
			[DatabaseInfoConstants.USER_ATTRIBUTE_EMAIL]: props.userEmail,
		})
		.then(docRef => {
			if (role === DatabaseInfoConstants.ROLE_STUDENT) {
				db.collection(DatabaseInfoConstants.USER_COLLECTION_NAME).doc(professor.id)
					.get()
					.then(doc => {
						let currentStudentList = doc.data()[DatabaseInfoConstants.USER_ATTRIBUTE_STUDENTS_LIST] || [];
						currentStudentList.push(db.doc(DatabaseInfoConstants.USER_COLLECTION_NAME + '/' + docRef.id));

						db.collection(DatabaseInfoConstants.USER_COLLECTION_NAME).doc(professor.id)
						.update({
							[DatabaseInfoConstants.USER_ATTRIBUTE_STUDENTS_LIST]: currentStudentList,
						})
						.catch(err => {
							console.error({err});
						});
					})
					.catch(err => {
						console.error({err});
					});
			}
			props.toggleSignUpModal({
				[DatabaseInfoConstants.USER_ATTRIBUTE_FIRST_NAME]: firstName,
				[DatabaseInfoConstants.USER_ATTRIBUTE_LAST_NAME]: lastName,
				[DatabaseInfoConstants.USER_ATTRIBUTE_ROLE]: role,
			});

			setLoadingFinishSignup(false);
		})
		.catch(function(error) {
			console.error('Error creating user: ', error);
		});
	}

	return (
		<Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Finish signing up</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Thank you for joining us! Please fill out this information to finish signing up.
				</DialogContentText>
				<form className="form-style">
					<div className="form-element">
						<FormControl fullWidth className={classes.formControl}>
							<TextField id="standard-basic" label="First Name" onChange={handleFirstNameChange} />
						</FormControl>
					</div>
					<div className="form-element">
						<FormControl fullWidth className={classes.formControl}>
							<TextField id="standard-basic" label="Last Name" onChange={handleLastNameChange} />
						</FormControl>
					</div>
					<div className="form-element">
						<FormControl fullWidth className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Role</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={role}
								onChange={handleRoleChange}
							>
								<MenuItem value={DatabaseInfoConstants.ROLE_STUDENT}>Student</MenuItem>
								<MenuItem value={DatabaseInfoConstants.ROLE_PROFESSOR}>Professor</MenuItem>
							</Select>
						</FormControl>
					</div>
					{role === DatabaseInfoConstants.ROLE_STUDENT && (
						<div className="form-element">
							<FormControl fullWidth className={classes.formControl}>
								{isConnectedToProfessor ? (
									<div className="professor-name-container">
										<div>Professor {professor.name}</div>
										<FontAwesomeIcon
											icon={faCheckCircle}
											style={{color: 'green', paddingLeft: '10px' }}
										/>
									</div>
								) : (
									isLoadingEmailSearch ? (
										<CircularProgress />
									) : (
										<div className="professor-search-container">
											<FormControl fullWidth className={classes.formControl}>
												<TextField id="standard-basic" label="Enter your Professor's email" onChange={handleProfessorEmailChange} />
											</FormControl>
											<Button
												onClick={searchForProfessorEmail}
											>Find professor</Button>
										</div>
									)
								)}
							</FormControl>
						</div>
					)}
				</form>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					disabled={
						!firstName ||
						!lastName ||
						!role ||
						(!isConnectedToProfessor && (role === DatabaseInfoConstants.ROLE_STUDENT)) ||
						loadingFinishSignup
					}
					onClick={finishSignUp}
				>{loadingFinishSignup ? 'Loading...' : 'Finish signing up'}</Button>
			</DialogActions>
		</Dialog>
	);
}

export default SignUpModal;
