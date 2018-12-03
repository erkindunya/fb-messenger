import React, { Component } from 'react'
import messages from '../../mocks/messages'
import users from '../../mocks/users'

const filterMessageByUsername = ({ username } = {}) => message =>
  message.from === username || message.to === username

export default class Conversation extends Component {
  constructor(props) {
    super(props)
    const selectedUser = users[0]
    this.state = {
      selectedUser: selectedUser,
      conversation: messages.filter(filterMessageByUsername(selectedUser))
    }
  }

  selectUser = (user = {}) => {
    this.setState({
      selectedUser: user,
      conversation: messages.filter(filterMessageByUsername(user))
    })
  }

  render() {
    const selectedUser = this.state.selectedUser
    const styledConversation = this.state.conversation.map((message, i) => (
      <div
        key={i}
        className={`message-wrapper ${
          message.from === 'you' ? 'sent' : 'received'
        }`}
      >
        {message.to === 'you' && (
          <img
            src={`images/${selectedUser.username}_lg.jpg`}
            alt={`${selectedUser.username}`}
            className="avatar medium"
          />
        )}
        <div className="message">{message.message}</div>
        {message.from === 'you' && (
          <div className="message-read">
            <i className="icon fa fa-check-circle" />
          </div>
        )}
      </div>
    ))

    return (
      <div className="conversation">
        <div className="conversation-bar">
          <h2>
            {selectedUser.name &&
              `${selectedUser.name.first} ${selectedUser.name.last}`}
          </h2>
          <div className="conversation-menu">
            <i className="icon fas fa-phone" />
            <i className="icon fas fa-video" />
            <i className="icon fas fa-info-circle" />
          </div>
        </div>
        <div className="conversation-content">
          <div className="messages">
            <div className="list">
              {styledConversation || <p>You have no messages</p>}
            </div>
            <div className="new-message">
              <input
                type="text"
                placeholder="Type your message..."
                className="message-box"
              />
              <button>Send</button>
            </div>
          </div>
          <div className="user-detail">
            <div className="user">
              <div>
                <img
                  className="avatar large"
                  src={`images/${selectedUser.username}_lg.jpg`}
                  alt={`${selectedUser.username}`}
                />
                <div className="user-title">
                  <div className="user-name">
                    {selectedUser.name &&
                      `${selectedUser.name.first} ${selectedUser.name.last}`}
                  </div>
                  <div className="last-active">
                    Active {Math.floor(Math.random() * 3) + 1}m ago
                  </div>
                </div>
              </div>
              <i className="icon fas fa-cog" />
            </div>
            <div>Options</div>
            <div>Facebook Profile</div>
          </div>
        </div>
      </div>
    )
  }
}
