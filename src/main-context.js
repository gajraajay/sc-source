import React, { Component } from 'react';

const mainState = {
  team: {
    teamDomain: 'app',
    teamId: 0,
    teamName: 'app'
  },
  teamSetting: {
    colors: {},
    pricingPlan: {},
    teamMeta: {}
  },
  user: {
    acl: {},
    email: '',
    isAdmin: -1,
    isLogin: 0,
    name: '',
    role: -1,
    status: 0,
    validated: false
  },
  users_meta: {
    canInvite: '#222222'
  }
};

export const MainContext = React.createContext( mainState );