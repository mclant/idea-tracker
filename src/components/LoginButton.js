import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return <Button onClick={() => loginWithRedirect()} variant="contained" color="primary">Log In / Sign Up</Button>;
};

export default LoginButton;