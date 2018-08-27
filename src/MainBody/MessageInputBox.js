import React, { Component } from 'react';

export class MessageInputBox extends Component {

  constructor( props ) {
    super( props );
    this.onSubmit = this.onSubmit.bind( this );
    this.handleKeyDown = this.handleKeyDown.bind( this );
    this.sendMessage = this.sendMessage.bind( this );
  }
  onSubmit( event ) {
    event.preventDefault( );
    this.refs.msg_text.value;
    if ( !this.refs.msg_text.value.trim( ) == "" ) {
      this.sendMessage( this.refs.msg_text.value );
    }
    this.refs.msg_text.value = "";
    return false;
  }
  sendMessage( message ) {
    this.props.appendNewMessage(message);
  }
  handleKeyDown( event ) {
    if ( event.nativeEvent.shiftKey && event.key == 'Enter' ) {
      this.refs.msg_text.value = this.refs.msg_text.value + '\n';
      console.log( this.refs.msg_text.scrollTop = this.refs.msg_text.scrollHeight );
      event.preventDefault( );
      return false;
    } else if ( event.key == 'Enter' ) {
      console.log( this.refs.msg_text.value );
      event.preventDefault( );
      this.sendMessage( this.refs.msg_text.value );
      this.refs.msg_text.value = "";
      return false;
    }

  }

  render( ) {
    return <form id="form_id" form="form_id" class="border-top px-5" onSubmit={this.onSubmit}>
      <div className="input-group mb-3 message-input">
        <textarea
          style={{
          overflow: "hidden",
          resize: "none"
        }}
          ref="msg_text"
          form="form_id"
          name='msg_text'
          tabIndex="0"
          onKeyDown={( event ) => {
          this.handleKeyDown( event )
        }}
          type="text-area"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2" />
        <div className="input-group-append pt-2">
          <button
            form="form_id"
            className="pt-2"
            style={{
            borderRadius: '50%',
            height: '48px',
            width: '48px'
          }}
            type=""className="p-0 m-0 btn btn-primary" >
            <i class="align-middle material-icons md-18">
              send
            </i>

          </button>
        </div>

      </div>
    </form>
  }
}