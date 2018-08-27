import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MainContext } from '../main-context';
import TeamList from '../TeamList/TeamList';
import Team from '../Team/Team';
import CookieController from '../utils';

const cookie = CookieController.sharedInstance;

class CutomRouter extends React.Component {
  constructor( props ) {
    super( props );
    this.state = props.props;
  }

  render( ) {
    return (
      <MainContext.Consumer>{( mainContext ) => {
          if ( mainContext == null ) {
            //TODO Redirect Login Page website            
            return <TeamList />
          } else 
            return <Router>
              <div>
                <Route
                  exact
                  path="/"
                  component={( props ) => {
                  if ( cookie.getCookie( "userInfo" )[ 0 ].contact) {
                    return (
                      <div
                        className="container-fluid"
                        style={{
                        overflow: 'hidden'
                      }}>
                        {(( ) => {
                          if ( mainContext.team.team_id == 0 ) {
                            return <TeamList />
                          } else {
                            return <Team mainContext={mainContext} />
                          }
                        })( )}</div>
                    )
                  } else {
                    return <h1 onClick={mainContext.updateName( )}>please login...</h1>
                  }
                }} />
              </div>
            </Router>
        }}
      </MainContext.Consumer>
    )
  }
}
export default CutomRouter;