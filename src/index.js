import store from '../framework/store';
import { initapp } from '../framework/app/init';

import appConfig from './config';
//import reducer from './reducer';

//import React from 'react';
//import { View } from 'react-native';

if (__DEV__) {
  // eslint-disable-next-line global-require
  require("react-native").YellowBox.ignoreWarnings([
    "Warning: Failed child context type: Invalid child context",
  ]);
}

import main from './reducer/uiReducer';

export default initapp(store({ main }, { appConfig }));