import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const currHostName = window.location.hostname;
let currRedirectUri = 'https://innovationmapper.com';

if (currHostName === "localhost" || currHostName === "127.0.0.1") {
  currRedirectUri = 'http://localhost:3000'
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-44w0vrpk.us.auth0.com"
    clientId="34eiIz6Hjw8NtvFmyBa0Rqy3CUuEUbDm"
    redirectUri={`${currRedirectUri}/dashboard`}
  >
    <React.StrictMode>
      <App currRedirectUri={currRedirectUri}/>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
