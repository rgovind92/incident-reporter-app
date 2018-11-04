import { NavigationActions, StackActions } from 'react-navigation';
import * as types from '../types';
import config from '../config';

let _navigator;
let _dispatch;

export const setTopLevelNavigator = (navigatorRef, dispatch) => {
  _navigator = navigatorRef;
  _dispatch = dispatch;
};

export const push = (routeName, params) => {
  if (config.navigation.routes[routeName]) {
    _navigator.dispatch(NavigationActions.navigate({
      routeName,
      params,
    }));
    _dispatch({
      type: types.__PUSH,
      payload: routeName
    });
  }
};

export const pop = () => {
  _navigator.dispatch(NavigationActions.back());
  _dispatch({
    type: types.__POP
  });
};

export const popTo = routeName => {
  if (config.navigation.routes[routeName]) {
    _navigator.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName
        })
      ]
    }));
    _dispatch({
      type: types.__POP_TO,
      payload: routeName
    });
  }
};

// doesn't work
export const reset = () => {
  /*_navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    })
  );*/
  popTo(config.navigation.landingPage || 'Home');
  pop();
  /*_dispatch({
    type: types.__RESET,
    payload: initialRoute
  });*/
};