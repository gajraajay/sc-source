import React, { Component } from 'react';
import { MainContext } from './main-context';
import CutomRouter from './Routes/CustomRouter';
// import ThemedButton from './themed-button';
import Cookies from 'universal-cookie';
import CookieController from './utils';

const cookie = CookieController.sharedInstance;
var deafaultState = {

  team: {
    domain: 'app',
    id: 0,
    name: 'app',
    pass: ''
  },
  teams: [],
  teamSetting: {
    colors: {},
    pricingPlan: {},
    teamMeta: {}
  },
  updateName: ( ) => {},
  user: {
    acl: {},
    email: '',
    isAdmin: -1,
    isLogin: 0,
    name: 'Someone',
    role: -1,
    status: 0,
    validated: false
  },
  users_meta: {
    canInvite: false
  }
}

class App extends Component {
  constructor( props ) {

    super( props );

    /**
     * Functions for main class.
     */
    this.changeName = this.changeName.bind( this );
    this.checkUserStatus = this.checkUserStatus.bind( this );
    // this.state = deafaultState;

    if (cookie.getCookie( "isLoggeIn" ) && cookie.getCookie( "userInfo" )) {
      if ( cookie.getCookie( "userInfo" )[ 0 ]) {

        let user = cookie.getCookie( "userInfo" )[ 0 ];
        let currentTeam = cookie.getCookie( "currentTeam" );

        for ( var i = 0; i < user.userInfo.length; i++ ) {

          if ( user.userInfo[i].domain == currentTeam ) {
            currentTeam = i;
            break;
          }
        }

        deafaultState = {
          ...deafaultState,
          team: {
            ...deafaultState.team,
            ...user.userInfo[currentTeam]
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
      updateName: this.changeName
    }

  }

  componentWillMount( ) {
    console.log( this.state );
  }

  checkUserStatus( ) {
    this.setState(state => {
      let user = state.user;
      user.name = 'this is new name';
      return {
        ...state,
        user: user
      }
    });
  }

  changeName( ) {
    this.setState(state => {
      let user = state.user;
      user.name = 'something' + user.name;
      return {
        ...state,
        user: user
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
                return <h1>Please Login first...</h1>
              }

            }}
          </MainContext.Consumer>
        </MainContext.Provider>
      </div>
    )
  }
}

const UserProfile = ( props ) => {
  return <MainContext.Consumer>{( val ) => {
      return (
        <div>
          <h5>{props.children}</h5>
          <h5>{JSON.stringify( val )}</h5>
        </div>
      )
    }}</MainContext.Consumer>

}

const User = ( props ) => {
  return <div>
    <UserProfile>
      {props.children}
    </UserProfile>
  </div>
}

export default App;
