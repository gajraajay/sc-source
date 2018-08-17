import React, { Component } from '../../../.cache/typescript/2.9/node_modules/@types/react';
import {ThemeContext} from './main-context';

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button
          {...props}
          style={{backgroundColor: theme.background}}
        />

      )}
    </ThemeContext.Consumer>
  );
}

export default ThemedButton;