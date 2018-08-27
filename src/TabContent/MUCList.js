
import React, { Component } from 'react';
import { MainContext } from '../main-context';
import ProfileImage from '../ProfileImage';
import { TabContext } from './tab-context';


export default class MUCList extends Component {
  constructor( props ) {
    super( props )    
  }

  render( ) {
    return (
<MainContext.Consumer>{(mainContext)=>{
    console.log(mainContext);
    
    return <TabContext.Consumer>{( context ) => {       
        console.log(context);

        if(context.tabState.groups){
            return <ul className="list-group list-group-flush">
            {Object.keys( mainContext.team.muc.groups ).map(( key ) => {
              let muc = mainContext.team.muc.groups[key];
              if ( typeof muc == 'object' ) {
                muc.email = muc.natural_name;
                //   muc.subject = ((new Date(( muc.creation )).toString( )));
                return (
                  <li className="list-group-item"  onClick={( ) => {
                    this.props.selectChat( muc,"group" )
                  }}>
                    <div className="row">
                      <ProfileImage />
                      <div className="col-lg-10">
                        <div className="col-lg-12">
                          <strong>{muc.natural_name}</strong>
                        </div>
                        <div className="col-lg-12">
                          {muc.subject}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }
            })}
            <div>Public Groups</div>
            {Object.keys( mainContext.team.muc.chatrooms ).map(( key ) => {
              let muc = mainContext.team.muc.chatrooms[key];
              if ( typeof muc == 'object' ) {
                muc.email = muc.natural_name;
                //   muc.subject = ((new Date(( muc.creation )).toString( )));
                return (
                  <li className="list-group-item"  onClick={( ) => {
                    this.props.selectChat( muc,"chatroom" )
                  }}>
                    <div className="row">
                      <ProfileImage />
                      <div className="col-lg-10">
                        <div className="col-lg-12">
                          <strong>{muc.natural_name}</strong>
                        </div>
                        <div className="col-lg-12">
                          {muc.subject}
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

