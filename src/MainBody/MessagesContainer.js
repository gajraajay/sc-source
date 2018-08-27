import React, { Component } from 'react';
import { Strophe } from '../strophe';
import { MainContext } from '../main-context';

export default class MessageContainer extends Component {
  render( ) {

    let message = this.props.message;
    let fromUser = this.props.fromUser;
    let toUser = this.props.toUser;
    console.log( fromUser, toUser );
    if (message.to_id.includes( fromUser ) && (message.from_id.includes( toUser ))) {
      return <div className="incoming_msg" key={this.props.key}>
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>{message.body}</p>
            <span className="time_date">
              {new Date( message.msg_intime * 1000 ).toString( )}</span>
          </div>
        </div>
      </div>
    } else {
      return <div className="outgoing_msg" key={this.props.key}>
        <div className="sent_msg">
          <p>{message.body}</p>
          <span className="time_date">
            {new
            Date( message.msg_intime * 1000 ).toString( )}</span>
        </div>
      </div>
    }

  }
}