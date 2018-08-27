import React, { Component } from 'react';
import { MainContext } from '../main-context';

export default class TabItem extends Component {
  constructor( props ) {
    super( props )
  }

  render( ) {
    return (
      <li className="nav-item col-md-4" onClick={this.props.onClick}>
        <p className={"nav-link " + (this.props.active ? 'active' : '')}>{this.props.text}</p>
      </li>
    )
  }
}