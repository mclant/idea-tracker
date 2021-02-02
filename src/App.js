import React from 'react';
import './App.css';
import MainPage from './components/MainPage.js';
import LandingPage from './components/LandingPage.js';
import Dashboard from './components/Dashboards/Dashboard';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import * as PathNameConstants from './constants/PathNameConstants';
import { useAuth0 } from '@auth0/auth0-react';

function App () {
  const { isAuthenticated, logout } = useAuth0();

  // console.log({useAuth0Obj});

  // const idTokenClaims = useAuth0Obj.getIdTokenClaims();
  // console.log({idTokenClaims});
  // const accessTokenSilently = useAuth0Obj.getAccessTokenSilently();
  // console.log({accessTokenSilently});
  // const accessTokenWithPopup = useAuth0Obj.getAccessTokenWithPopup();
  // console.log({accessTokenWithPopup});

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (!isAuthenticated) {
  //   logout({ returnTo: 'http://localhost:3000' });
  // }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path={"/" + PathNameConstants.CONNECT_THE_DOTS} exact component={(routeProps) => (<MainPage userIsAuthenticated={isAuthenticated} logout={logout} {...routeProps} />)} />
          <Route path={"/" + PathNameConstants.DASHBOARD} exact component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// how to add button to link to a new page

// import { Link } from 'react-router-dom';

// <Link to="/new-page" />
