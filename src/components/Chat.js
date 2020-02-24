import React from 'react'
import firebase from '../firebase.js'

class Chat extends React.Component {

  state = {
    username : null,
    message: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  onClick = (e) => {
    firebase.database().ref('/username').push({
      username: this.state.username,
      message: this.state.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  }

  onSubmit = (e) => {
    e.preventDefault()
  }

  testMessagesGet = () => {
    firebase.database().ref('/username').once('value')
    // .then( data => console.log( 'username', data.val().forEach() ) );
      .then(function(snapshot) {
        snapshot.forEach( snap => {
          console.log(snap.val());
        } )
      })
  }

  render(){
    return(
      <div className='App'>
        <h2>Chat</h2>
        {
          this.state.username ?
          <p>{this.state.username}</p>
          :
          <div>
            <form onSubmit={this.onSubmit} action="">
              <input type="text" onChange={this.handleChange} name="username"/>
              <button name="username" onClick={this.onClick}>enter username</button>
            </form>
          </div>
        }
        <input type="text" onChange={this.handleChange} name="username"/>
        <button name="username" onClick={this.onClick}>enter username</button>
        {this.state.username} <br/>
        <input type="text" onChange={this.handleChange} name="message"/>
        <button onClick={this.onClick}> message </button> <br/>
        <button onClick={this.testMessagesGet}>get messager/username</button>
      </div>
    )
  }

} // Class

export default Chat
