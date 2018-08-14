import React, { Component } from 'react';
import './App.css';
import EmployeesPanel from './Components/Management';

class App extends Component {
  state = {
  }
  render() {
    return (
      <div className="App">
        <EmployeesPanel get = 'http://employeesintern.azurewebsites.net/api/employees' />
      </div>
    );
  }
}
// <div className="animated-bar">Employee Management API</div>
export default App;