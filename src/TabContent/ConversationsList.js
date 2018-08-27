import React, { Component } from 'react';
import { MainContext } from '../main-context';
import ProfileImage from '../ProfileImage';
import { TabContext } from './tab-context';
import { MessagesContext } from '../messages-context';

export default class ConversationList extends Component {
  constructor( props ) {
    super( props )

  }

  render( ) {
    return (<div>
      <MainContext.Consumer>{( mainContext ) => {      
          if ( mainContext.connection != null && mainContext.connection.connected ) {
            mainContext.connection.addHandler( ( message ) => {          
              return true;
            }, null, 'message' );
          }
          return <TabContext.Consumer>{( context ) => {              
              if ( context.tabState.conversation ) {                
                return <MessagesContext.Consumer>{(messageContext)=>{
                  console.log("I am Getting called");
                   return<ul className="list-group list-group-flush">
                  {Object.keys( mainContext.team.contact_list ).map(( key ) => {
                    let contact = mainContext.team.contact_list[key];
                    if ( typeof contact == 'object' ) {
                      // (key!=1?
                      // contact.image="https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-al
                      // l -about-face.jpg":contact.peofile="");
                      return (
                        
                        <li key={key} className="list-group-item" onClick={( ) => {
                          this.props.selectChat( contact )
                        }}>
                          <div className="row">
                            <ProfileImage contact={contact} />
                            <div className="col-lg-10">
                              <div className="col-lg-12">
                                <strong>{contact.name}</strong>
                              </div>
                              <div className="col-lg-12">
                                {contact.email}
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    }
                  })}
                </ul>
                }}
                </MessagesContext.Consumer>
              }

            }}</TabContext.Consumer>
        }}
      </MainContext.Consumer>
      </div>
    )
  }
}
