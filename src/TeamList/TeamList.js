import React, { Component } from 'react';
import { MainContext } from '../main-context';


export default class TeamList extends Component {
  constructor( props ) {
    super( props )    
  }

  render( ) { 
    return (
    <MainContext.Consumer>{( mainContext ) => {
        if(this.props.sidebar){
            return <div>
            {mainContext.teams.map(( team, key ) => {
                if(team.team_name)
                    return <div value={key} key ={key} className="team-icon"  onClick={(data)=>{mainContext.updateSelectTeam(data,key)}}>{ team.team_name.substring(0,1) }</div>
            })}
            
          </div>

        }else{        
    return  <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 content">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Your Teams</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <ul>
                  {mainContext.teams.map(( team, id ) => {
                    return <li value={id} key={id} onClick={mainContext.updateSelectTeam}>{ team.team_name }</li>
                  })}
                </ul>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      }
      }}</MainContext.Consumer>
    )
  }
}