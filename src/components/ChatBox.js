import React from 'react'
import firebase from '../firebase.js'
import './css/ChatBox.css'

let counter = 0;

class ChatBox extends React.Component {

  state = {
    message: '',
    chatlog: [],
    firstMessage: true,
  }

  componentDidMount(){
    this.firebaseMessageListen();
  }

  handleKeyDown = (e) => {
    if ( e.key === 'Enter' ) {
      console.log('enter pressed');
      firebase.database().ref('/messages/').set({
        update: Math.random(), //firebase.database.ServerValue.TIMESTAMP,
        message: this.state.message
      })
      // this.setState({ message: ''})
      this.refs.messageBox.value='';
    }
  }

  firebaseMessageListen = () => {
    console.log('%cLISTENER SET UP', 'font-size: 16pt');
    let listen = firebase.database().ref('/messages');
    listen.on('value', (snapshot) => {
      let data = snapshot.val();
      if (this.state.firstMessage === false) {
        console.log(data);
        let chatBoxArray = [...this.state.chatlog]
        chatBoxArray.unshift(data.message)
        this.setState({ chatlog: chatBoxArray})
      }
      this.setState({firstMessage: false})
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render(){
    return(
      <div className='chatBox'>
        <div className="chatMessages">
        {
          this.state.chatlog.length > 0 ?
          this.state.chatlog.map( message =>
            <p>{message}</p>
          )
          :
          <p>chat to fellow artists</p>
        }
        </div>
      <input
        id="chatInput"
        ref="messageBox"
        type="text"
        name="message"
        placeholder='type here'
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        />
      </div>
    )
  }

} // Class

export default ChatBox
