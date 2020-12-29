import React from 'react';
import './App.css';
import MainPage from './components/MainPage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App () {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/connect-the-dots" exact component={MainPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// how to add button to link to a new page

// import { Link } from 'react-router-dom';

// <Link to="/new-page" />
