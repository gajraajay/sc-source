import React, { Component } from 'react';
import { MainContext } from '../main-context';

export default class TabHeader extends Component {
  constructor( props ) {
    super( props )
  }

  render( ) {
    return (
      <ul className="nav nav-tabs col-md-12 pb-3">
        {this.props.children}
      </ul>
    )
  }
}