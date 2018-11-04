import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { merge, mergeWith, isArray } from 'lodash';

import middlewares from './middleware';
import { createRootReducer } from './reducer/createRootReducer';
import config from './config';
import { createRoutes } from './util';
import setupErrorHandlers from './app/error';

//import React from 'react';
//import whyDidYouUpdate from 'why-did-you-update';

/* React Navigation seems to have a lot of unnecessary renders according to WhyDidYouUpdate.
I suspect that some of these renders have leaked into some framework components (except Flex.js,
which leaks from styled-components), rendering WDYU useless for profiling. */
if (config.env === 'development') {
  //require('why-did-you-update')(React);
}

//whyDidYouUpdate(React);


export default (reducers, { appConfig, persistanceConfig }) => {
  merge(config, appConfig);

  const __persistanceConfig = mergeWith({
      key: 'root',
      storage,
      whitelist: ['authReducer']
    },
    persistanceConfig,
    (left, right) => {
      if (isArray(left)) {
        return left.concat(right);
      }
    }),
    routes = createRoutes(config.navigation),
    rootReducer = createRootReducer(reducers, null, config),
    persistedReducer = persistReducer(__persistanceConfig, rootReducer),
    store = createStore(persistedReducer, 
      applyMiddleware.apply(null, Object.entries(middlewares)
        // exclude the middlewares defined in config.exclude
        .filter(([name, _]) => !config.exclude || config.exclude.indexOf(name) === -1) //eslint-disable-line
        .map(([_, middleware]) => middleware))), //eslint-disable-line
    persistor = persistStore(store);
  
  setupErrorHandlers();

  return {
    store,
    persistor,
    routes,
    config
  };
};
