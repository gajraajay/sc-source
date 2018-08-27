import React, { Component } from 'react';
import { MainContext } from '../main-context';
import ProfileImage from '../ProfileImage';
import { TabContext } from './tab-context';

export default class ContactList extends Component {
  constructor( props ) {
    super( props )
  }

  render( ) {
    return (
      <MainContext.Consumer>{( mainContext ) => {
          console.log( mainContext );

          return <TabContext.Consumer>{( context ) => {
              if ( context.tabState.contact ) {
                return <ul className="list-group list-group-flush">
                  {Object.keys( mainContext.team.contact_list ).map(( key ) => {
                    let contact = mainContext.team.contact_list[key];
                    if ( typeof contact == 'object' ) {
                      ( key != 1 ? contact.image = "https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-all-about-face.jpg" : contact.peofile = "" );
                      return (
                        <li
                          className="list-group-item"
                          onClick={( ) => {
                          this.props.selectChat( contact,"user" );
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
              }

            }}</TabContext.Consumer>
        }}
      </MainContext.Consumer>
    )
  }
}
