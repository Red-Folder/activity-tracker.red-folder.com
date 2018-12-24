import React, { Component } from 'react';
import './App.css';
import NotificationButton from './notificationButton.js';

import config from './config.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        {config.notificationsEnabled &&  <NotificationButton />}
      </div>
    );
  }
}

export default App;
