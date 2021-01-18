import React, { useState } from 'react';
import { db } from '../../firebase';
import './modal-styles.css';

const SignUpModal = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [role, setRole] = useState('student');

	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
	}

	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	}

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	}

	const finishSignUp = () => {
		db.collection('users').doc().set({
			first_name: firstName,
			last_name: lastName,
			role: role,
			email: props.userEmail,
		})
		.then(function() {
			console.log('user successfully created');
			props.toggleSignUpModal({
				first_name: firstName,
				last_name: lastName,
				role: role,
			});
		})
		.catch(function(error) {
			console.error('Error creating user: ', error);
		});
	}

	return (
		props.isOpen ? (
			<div className="modal">
				<div className="modal-content">
					<p>Welcome to Connect the Dots and thanks for signing up! Please fill out this information to finish signing up.</p>
					<form className="form-style">
						<div className="form-element">
							<label htmlFor="fname">First name:</label>
							<input type="text" id="fname" name="fname" onChange={handleFirstNameChange} />
						</div>
						<div className="form-element">
							<label htmlFor="lname">Last name:</label>
							<input type="text" id="lname" name="lname" onChange={handleLastNameChange} />
						</div>
						<div className="form-element">
							<label htmlFor="role">Role:</label>
							<select id="role" name="role" onChange={handleRoleChange}>
								<option value="student">Student</option>
								<option value="professor">Professor</option>
							</select>
						</div>
					</form>
					<button
						className="submit-button"
						disabled={!firstName || !lastName || !role}
						onClick={finishSignUp}
					>Finish signing up</button>
				</div>
			</div>
		) : (
			<></>
		)
	);
}

export default SignUpModal;
