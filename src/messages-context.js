import React from 'react';

const defaultState = {
    conversations:[],
    messages:{}
};

export const MessagesContext = React.createContext( defaultState );