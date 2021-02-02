import React from 'react';
import LoginButton from './LoginButton';
// import { useAuth0 } from '@auth0/auth0-react';

const LandingPage = () => {
	// const { user, isAuthenticated, isLoading } = useAuth0();

	// if (isLoading) {
	// 	return <div>Loading ...</div>;
	// }

	// console.log({ user, isAuthenticated, isLoading });

	return (
		// isAuthenticated ? (
			<div>
				welcome to the landing page
				<LoginButton />
			</div>
		// ) : (
		// 	<div>
		// 		you are now logged in congrats
		// 		<b>{user.name}</b>
		// 	</div>
		// )
	)
}

export default LandingPage;