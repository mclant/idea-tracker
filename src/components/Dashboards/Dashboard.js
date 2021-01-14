import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
	const { user, isLoading, isAuthenticated } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated ? (
			<div>
				this is the user profile page 
				welcome <b>{user.name}</b> 
				and hello with your email: <b>{user.email}</b>
				<Link to='/connect-the-dots'>
					<button>go to your story</button>
				</Link>
				<LogoutButton />
			</div>
		) : (
			<div>youre not authenticated
				<LogoutButton />
			</div>
		)
	)
}

export default Dashboard;
