import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import MessagesUI from './components/MessagesUI';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:""
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(user){
    this.setState({user});
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={()=> <RegisterForm onChange={this.handleChange}/>} />
          <Route exact path="/chat" render={()=> <MessagesUI user={this.state.user}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
