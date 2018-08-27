import React, { Component } from 'react';
import { MainContext } from './main-context';
import CutomRouter from './Routes/CustomRouter';
import CookieController from './utils';
import { Strophe } from './strophe';
import { $pres as pres, $iq } from './strophe';
import Constants from './Constants';
import { deafaultState as initialState } from './defaultstate'

const cookie = CookieController.sharedInstance; //init coockies class with singleton object.
let deafaultState = initialState //init application withe default state.
let connection = null; //deaclare xmpp connection object for further use

class App extends Component {
  constructor( props ) {
    super( props );

    /**
     * function binding to App class
     */

    this.updateSelectTeam = this.updateSelectTeam.bind( this );
    this.setConnection = this.setConnection.bind( this );
    this.disConnectConnection = this.disConnectConnection.bind( this );
    this.initApplication = this.initApplication.bind( this );
    this.initApplication( );
  }  
  componentDidMount( ) {
    this.setConnection( this.state.team );
  }

  /**
 * Init Application with data if no data exist ? load default state.
 */
  initApplication( ) {
    if (cookie.getCookie( "isLoggeIn" ) && cookie.getCookie( "userInfo" )) {
      if ( cookie.getCookie( "userInfo" )[ 0 ]) {
        let user = cookie.getCookie( "userInfo" )[ 0 ];
        let params = {
          contact: user.contact,
          jid: user.contact,
          team_id: 0
        };

        let url = new URL(Constants.BASE_URL + Constants.TEAM_LIST_URL + cookie.getCookie( "jSession" ));
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
            this.setState(state => {
              let teams = state.teams;
              teams = JSON.parse( res ).teams;
              return {
                ...state,
                teams: teams
              }
            });
          });
        });

        if (localStorage.getItem( 'selected_team' )) {
          deafaultState = {
            ...deafaultState,
            team: JSON.parse(localStorage.getItem( 'selected_team' ))
          }
        }

        let currentTeam = -1;
        for ( var i = 0; i < user.userInfo.length; i++ ) {
          if ( user.userInfo[i].domain == currentTeam ) {
            currentTeam = i;
            break;
          }
        }

        deafaultState = {
          ...deafaultState,
          team: {
            ...user.userInfo[currentTeam],
            ...deafaultState.team
          },
          teams: user.userInfo,
          user: {
            ...deafaultState.user,
            email: user.contact,
            isLogin: true
          }
        }

      }
    }
    this.state = {
      ...deafaultState,
      updateName: this.changeName,
      updateSelectTeam: this.updateSelectTeam
    }
  }
  /**
 * Create and connect XMPP connection to  server and login to current team
 * @param {JSONObject} team  current selected team.
 */
  setConnection( team ) {
    if ( team.user ) {

      connection = new Strophe.Connection(Constants.BOSH_URL, { 'keepalive': true });
      connection.connect( team.user.j_id + "/reactapp", team.user.password, ( status ) => {
        if ( status == Strophe.Status.CONNECTING ) {
          console.log( 'Strophe is connecting.' );
        } else if ( status == Strophe.Status.CONNFAIL ) {
          console.log( 'Strophe failed to connect.' );

        } else if ( status == Strophe.Status.DISCONNECTING ) {
          console.log( 'Strophe is disconnecting.' );
        } else if ( status == Strophe.Status.DISCONNECTED ) {
          console.log( 'Strophe is disconnected.' );
        } else if ( status == Strophe.Status.CONNECTED ) {
          console.log( 'Strophe is connected.' + connection.jid );

          if ( connection.connected ) {

            connection.send(pres( ).c( "priority" ).t( "1" ));
            var carbon = $iq({ from: connection.jid, id: 'carbon1', type: 'set' }).c('enable', { xmlns: 'urn:xmpp:carbons:2' });
            connection.send( carbon );

            connection.addHandler( ( message ) => {              
              return true;
            }, null, 'message' );
            connection.addHandler( ( package1 ) => {
              return true;              
            }, null, 'message', 'chat', null, null );
            connection.addHandler( ( package1 ) => {              
              return true;
            }, null, 'message', 'groupchat', null, null );
            connection.addHandler( ( package1 ) => {              
              return true;
            }, null, 'iq', null, null, null );

            let currentContactList = {};
            Object.keys( team.contact_list ).map(( key ) => {
              if ( key != "is_user" ) {
                currentContactList[team.contact_list[key].user_name] = team.contact_list[key];
              }
            });

            this.setState(state => {
              return {
                ...state,
                connection: connection,
                currentContactList: currentContactList,
                team: team
              }
            });
          }

        }
      }, 60, 5 );
    }
  }
  /**
 *
 * @param {XMPP Object} connection
 * @returns promise
 */
  disConnectConnection( connection ) {
    return new Promise(( resovle, reject ) => {
      connection.disconnect( );
      connection = null;
      resovle( 'disconnected' );
    })
  }
  /**
 *
 * @param {DOM Object} data
 * @param {Integer} id
 * @returns
 */
  updateSelectTeam( data, id ) {

    let selectTedTeam;

    if ( data.target ) {
      selectTedTeam = data.target.value;
    }

    if ( selectTedTeam == undefined ) {
      selectTedTeam = id;
    }
    if ( connection != null && connection.connected ) {
      var tes = ( async function disconn( params ) {
        let res = await disConnectConnection( connection );
      })( );
    }

    this.setState(state => {
      if (localStorage.getItem( 'selected_team' )) {
        if ( JSON.parse(localStorage.getItem( 'selected_team' )).team_id == state.teams[selectTedTeam].team_id ) {
          //Checking current team is same as selected tab if yes return nithing
          return
        }
      }

      localStorage.setItem('selected_team', JSON.stringify(state.teams[selectTedTeam])); //Setting up the current team to localstorage to use on reaload.
      connection = null; // Setting connection null to reuse/ reinitialize.
      this.setConnection(state.teams[selectTedTeam])
      return {
        ...state,
        connection: connection,
        team: state.teams[selectTedTeam]
      }

    });
  }
  render( ) {
    return (
      <div>
        <MainContext.Provider value={this.state}>
          <MainContext.Consumer>
            {( mainContext ) => {
              if ( mainContext.user.isLogin ) {
                return <CutomRouter />
              } else {
                /**TODO redirect user to website login page*/
                return <h1>Please Login first...</h1>
              }
            }}
          </MainContext.Consumer>
        </MainContext.Provider>
      </div>
    )
  }
}

export default App;

/**
 *
 * @param {XMPP Object} connection
 * @returns promise
 */
export function disConnectConnection( connection ) {
  return new Promise(( resovle, reject ) => {
    connection.disconnect( );
    connection = null;
    resovle( 'disconnected' );
  })
}