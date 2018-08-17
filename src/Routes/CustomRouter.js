import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MainContext } from '../main-context';

class CutomRouter extends React.Component {
  constructor( props ) {

    super( props );
    this.state = props.props;
  }

  componentDidMount( ) {}

  componentDidUpdate( prevProps, prevState ) {}

  render( ) {
    return (      
      <MainContext.Consumer>{( mainContext ) => {
      return <Router>
        <div>
          <Route
            exact
            path="/"
            component={( props ) => {
            if (localStorage.getItem( 'email' )) {
              // return <h1>{mainContext.user.email}</h1>
            } else {
              // return <h1 onClick={mainContext.updateName}>please login...</h1>
            }
            return<p>helloworld</p>
          }} />
          <Route
            exact
            path="/v"
            component={( ) => {
            return <Router>
              <div>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/asomwthi">About</Link>
                  </li>
                  <li>
                    <Link to="/a">Topics</Link>
                  </li>
                </ul>
                <hr />
                <Route
                  exact
                  path="/"
                  component={( props ) => {
                  return <h1 onClick={this.props.props.updateName}>this is cool 1</h1>
                }} />
                <Route
                  exact
                  path="/v"
                  component={( ) => {
                  return <h1 onClick={this.props.props.updateName}></h1>
                }} />
                <Route
                  exact
                  path="/a"
                  component={( ) => {
                  return <h1 onClick={this.props.props.updateName}>{JSON.stringify( this.props )}</h1>
                }} />
              </div>
            </Router>
          }} />
          <Route
            exact
            path="/a"
            component={( ) => {
            return <h1 onClick={this.props.props.updateName}>{JSON.stringify( this.props )}</h1>
          }} />

        </div>
      </Router>}}
      </MainContext.Consumer>
    )
  }
}

// const MyRouter = ( ) => {
//   return <MainContext.Consumer>{( mainContext ) => {
//       return <CutomRouter props={mainContext} />
//     }}</MainContext.Consumer>
// };
export default CutomRouter;