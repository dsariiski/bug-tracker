import React from 'react';
import './App.css';

import Router from "./components/router/Router"

import ReactNotification from "react-notifications-component"
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <React.Fragment>
      <ReactNotification />
      <Router />
    </React.Fragment>
  );
}

export default App;
