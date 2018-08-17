import React, { Component } from 'react';

import {Consumer,Provider} from './App';
function Demo() {
  
  
    return (
      
        <div>
            
           <Consumer>{
            valu=>{
              return (<h1>{valu.name}</h1>)
            }
          }</Consumer>
        
      </div>
          
    );
  }


export default Demo;
