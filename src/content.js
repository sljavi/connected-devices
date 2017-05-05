import $ from 'jquery';
import Main from './components/main.js';
import React from 'react';
import ReactDOM from 'react-dom';

function initApp() {
  const control = location.hostname.includes('control.');
  ReactDOM.render(<Main control={control}/>, $('#app-container')[0]);
}

window.onload = initApp;
