import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentUser: props.currentUser };
  };

  componentWillReceiveProps(newProps) {
    this.setState({ currentUser: newProps.currentUser })
  };

  render() {
    if (!this.state.currentUser) {
      return <div></div>;
    };

    return (
      <div className="header">Welcome, {this.state.currentUser}!</div>
    )
  };

}
