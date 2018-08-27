import React, { Component } from 'react';

export default class ProfileImage extends Component {
  constructor( props ) {
    super( props )
  }
  

  render( ) {
    if(this.props.contact){
    if ( this.props.contact.image ) 
      return (
        <div className="col-lg-2">
          <p style={{'backgroundImage':'url("'+this.props.contact.image+'")','backgroundSize':'cover'}} className="list-profile-image-rep" ></p>
        </div>
      )
    else 
      return <div className="col-lg-2">
        <p className="list-profile-image-rep">{this.props.contact.email.substring(0,1)}</p>
      </div>
      }else{
        return <div className="col-lg-2">
        <p className="list-profile-image-rep">G</p>
      </div>
      }

  }
}