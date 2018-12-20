import React, { Component } from 'react';
import './App.css';
import NotificationButton from './notificationButton.js';
import AwaitingApproval from './awaitingApproval.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <AwaitingApproval />
        </div>
        <NotificationButton />
      </div>
    );
  }
}

export default App;
