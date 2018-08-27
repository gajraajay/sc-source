import React, { Component } from 'react';
import { MainContext } from '../main-context';
import { MessagesContext } from '../messages-context';
import { Strophe } from '../strophe';
import ProfileImage from '../ProfileImage';
import MessageContainer from './MessagesContainer';
export default class MainBody extends Component {
  constructor( props ) {
    super( props )
  }
componentDidUpdate(arg1,arg2){  
  document.getElementsByClassName("messages-container")[0].scrollTop=document.getElementsByClassName("messages-container")[0].scrollHeight;
}

  render( ) {
    return (
      <MainContext.Consumer>{( mainContext ) => {
          if ( mainContext.connection != null && mainContext.connection.connected ) {

            mainContext.connection.addHandler( ( message ) => {
              console.log( "MainBody==>", message );
              return true;
            }, null, 'message' );

          }
          return <div  className="messages-container" >          
           <MessagesContext.Consumer value={this.state}>{( messagesContext ) => {                            
              var i = 1;
              return ( ( messagesContext.messages && messagesContext.sortedMessages[messagesContext.selectedChatId] != undefined ) ? Object.keys(messagesContext.sortedMessages[messagesContext.selectedChatId]).map(( key ) => {                
                let message = messagesContext.sortedMessages[messagesContext.selectedChatId][key ];                
                if ( (message.from_id.includes( messagesContext.selectedChatId ) || message.to_id.includes( messagesContext.selectedChatId )) && message.conv_type == 'chat' ) {
                  
                  return <MessageContainer message={message} key={key} fromUser={Strophe.getBareJidFromJid( mainContext.connection.jid)} toUser={messagesContext.selectedChatId}/>
                }
              }) : "NO Messages found" )
            }}

          </MessagesContext.Consumer>
          </div>
        }}</MainContext.Consumer>
    )
  }
}
