import React, { Component } from 'react';
import { MainContext } from '../main-context';
import TabHeader from '../TabLayout/TabHeader';
import TabItem from '../TabLayout/TabItem';
import SideBar from '../SideBar/SideBar';
import { TabContext } from '../TabContent/tab-context';
import ContactList from '../TabContent/ContactList';
import ConversationList from '../TabContent/ConversationsList';
import MUCList from '../TabContent/MUCList';
import Constants from '../Constants';
import { MessagesContext } from '../messages-context';
import MainBody from '../MainBody/MainBody';
import { Strophe } from '../strophe';
import { MessageInputBox } from '../MainBody/MessageInputBox';
import { MainBodyHeader } from '../MainBody/MainBodyHeader';

export default class Team extends Component {
  constructor( props ) {
    super( props );
    this.selectTab = this.selectTab.bind( this );
    this.fetchMessageHistory = this.fetchMessageHistory.bind( this );
    this.addMessage = this.addMessage.bind( this );
    this.state = {
      messages_count: -1,
      selectedChat: null,
      selectedChatId: null,
      selectedChatType: null,
      selectTab: ( ) => {},
      tabState: {
        conversation: true
      }
    }

  }

  addMessage( data ) {
    this.setState(( state ) => {
      var message = {
        "body": data,
        "content_sub_type": 0,
        "content_type": 1,
        "conv_id": "04059e20ba20b6a04d268dd9ae389bf6",
        "conv_type": "chat",
        "delivery_status": 1,
        "from_id": "c475e498efb6e707e72ba5fb5e0b9212@dev.sparkchat.com",
        "msg_id": "BG5O0-68" + new Date( ).getMilliseconds( ),
        "msg_intime": 1535002441,
        "msg_meta": {},
        "msg_modification_date": 1535002441,
        "msg_type": 0,
        "thread_count": 0,
        "to_id": state.selectedChatId
      }

      let sortedMessages = state.sortedMessages;
      if ( sortedMessages[message.to_id] == null ) {
        sortedMessages[message.to_id] = {
          [ message.msg_id ]: message
        }

      } else 
        sortedMessages[message.to_id] = {
          ...sortedMessages[message.to_id],
          [ message.msg_id ]: message
        };
      
      return {
        ...state.sortedMessages[sortedMessages],
        ...state
      }
    })

  }
  fetchMessageHistory( jid ) {
    let params = {
      data: JSON.stringify({ "from-jid": jid })
    };

    let url = new URL( Constants.BASE_URL + Constants.MESSAGE_HISTORY_URL );
    let formParam = new URLSearchParams(url.search.slice( 1 ));

    for ( var k in params ) {
      formParam.set(k, params[k]);
    }

    fetch(url, {
      body: formParam,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      method: 'POST'
    }).then(( response ) => {
      response.text( ).then(( res ) => {
        this.setState(( state ) => {
          let messages = JSON.parse( res ).messages;
          let sortedMessages = {};
          messages.forEach(( message, key ) => {
            if ( message.conv_type == "chat" ) {
              if ( sortedMessages[message.from_id] == null ) {
                sortedMessages[message.from_id] = {
                  [ message.msg_id ]: message
                }

              } else 
                sortedMessages[message.from_id] = {
                  ...sortedMessages[message.from_id],
                  [ message.msg_id ]: message
                };
              
              if (message.to_id !== Strophe.getBareJidFromJid( jid )) {
                if ( sortedMessages[message.to_id] == null ) 
                  sortedMessages[message.to_id] = {
                    [ message.msg_id ]: message
                  };
                else 
                  sortedMessages[message.to_id] = {
                    ...sortedMessages[message.to_id],
                    [ message.msg_id ]: message
                  };
              }
            } else {
              // if ( sortedMessages[message.to_id] == null )   sortedMessages[message.to_id] = [message]; else
              // sortedMessages[message.from_id] = [     ...sortedMessages[message.from_id],     message   ];
            }
          });
          return {
            ...state,
            messages: messages,
            messages_count: 1,
            sortedMessages: sortedMessages
          }
        });

      });
    });
  }
  selectCurrentChat( data, type ) {
    let selectedChatId = null;
    switch ( type ) {
      case "group":
        {
          console.log( "group selected with data:", data );
          selectedChatId = data.j_id;
          break;
        }
      case "chatroom":
        {
          console.log( "chatroom selected with data:", data );
          selectedChatId = data.j_id;
          break;
        }
      default:
        {
          console.log( "user selected with data:", data );
          selectedChatId = data.user_name;
          break;
        }
    }
    this.setState(( state ) => {
      if ( state.selectedChatId !== selectedChatId ) {
        return {
          ...state,
          selectedChat: data,
          selectedChatId: selectedChatId,
          selectedChatType: type
        }
      }
      return
    });

  }
  selectTab( data, tabId ) {

    this.setState(( state ) => {
      switch ( tabId ) {
        case 'groups':
          {
            return {
              ...state,
              tabState: {
                groups: true
              }
            }
          }
        case 'contact':
          {
            console.log( "contactSelected" );
            return {
              ...state,
              tabState: {
                contact: true
              }
            }
          }
        default:
          {
            return {
              ...state,
              tabState: {
                conversation: true
              }
            }
          }
      }

    })
  }
  render( ) {
    return (
      <MainContext.Consumer>{( mainContext ) => {

          if ( mainContext.connection && this.state.messages_count == -1 && mainContext.connection.connected ) {
            this.fetchMessageHistory( mainContext.connection.jid );
          }

          return (
            <div className="row" style={{
              height: '100vh'
            }}>
              <SideBar />
              <div
                className="col-md-3"
                style={{
                background: '#FFF',
                overflow: 'auto'
              }}>
                <div className="row mx-2 ">
                  <TabHeader>
                    <TabItem
                      value="conversation"
                      text="Conversations"
                      active={this.state.tabState.conversation}
                      onClick={( data ) => {
                      this.selectTab( data, "conversation" );
                    }} />

                    <TabItem
                      value="contact"
                      text="contacts"
                      active={this.state.tabState.contact}
                      onClick={( data ) => {
                      this.selectTab( data, "contact" );
                    }} />

                    <TabItem
                      value="groups"
                      text="Groups"
                      active={this.state.tabState.groups}
                      onClick={( data ) => {
                      this.selectTab( data, "groups" );
                    }} />
                  </TabHeader>

                  <div className="card col-md-12">
                    <TabContext.Provider value={this.state}>
                      <ContactList selectChat={( data, type ) => this.selectCurrentChat( data, type )} />
                      <MessagesContext.Provider value={this.state}>
                        <ConversationList selectChat={( data, type ) => this.selectCurrentChat( data, type )} />
                      </MessagesContext.Provider>
                      <MUCList selectChat={( data, type ) => this.selectCurrentChat( data, type )} />
                    </TabContext.Provider>
                  </div>
                </div>
              </div>

              <div className="col-md-8 p-0 m-0 f-height border-left">
                <MessagesContext.Provider value={this.state}>
                  <MainBodyHeader />
                  <MainBody />
                  <MessageInputBox appendNewMessage={this.addMessage} />
                </MessagesContext.Provider>
              </div>
            </div>
          )
        }}</MainContext.Consumer>
    )
  }
}