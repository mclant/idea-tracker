import React from 'react';
import './App.css';
import MainPage from './components/MainPage.js';
import LandingPage from './components/LandingPage.js';
import Dashboard from './components/Dashboards/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

function App () {
  // const { isLoading, error } = useAuth0();

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (error) {
  //   return <div>oops.. {error.message}</div>
  // }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/connect-the-dots" exact component={MainPage} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// how to add button to link to a new page

// import { Link } from 'react-router-dom';

// <Link to="/new-page" />
