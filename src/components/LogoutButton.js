import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';

const LogoutButton = (props) => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ returnTo: props.currRedirectUri })} variant="contained" color="secondary" >
      Log Out
    </Button>
  );
};

export default LogoutButton;