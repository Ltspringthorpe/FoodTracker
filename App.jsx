import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Calendar from './components/Calendar.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    var currentUser = "Guest";
    this.state = { currentUser: currentUser };
  };

  render() {
    if (!this.state.currentUser) {
      return <div></div>;
    };

    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Calendar/>
      </div>
    );
  }
}
