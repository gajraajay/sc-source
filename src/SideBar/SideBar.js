import React, { Component } from 'react';
import TeamList from '../TeamList/TeamList';

export default class SideBar extends Component {
  constructor( props ) {
    super( props )
  }

  render( ) {
    return (
      <div className="col-md-1 pl-0 team-list-container-outer">
        <div className="f-height team-list-container">
          <TeamList sidebar="true" />
        </div>
      </div>
    )
  }
}