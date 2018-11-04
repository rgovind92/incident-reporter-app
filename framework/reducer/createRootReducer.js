import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import createNavigationReducer from './navigationReducer';
import common from './commonReducer';
import auth from './authReducer';
import { isEmpty } from '../util';

export const createRootReducer = (reducers, pluginReducers, appConfig) => {
  // TODO: WE probable don't need a formReducer here;
  // Each screen should each screen just handle it themselves.
  if (reducers) {
    if (pluginReducers && !isEmpty(pluginReducers)) {
      reducers.form = reduxFormReducer.plugin(pluginReducers);
    }
    else {
      reducers.form = reduxFormReducer;
    }
  }

  // TODO: Follow reduce naming convention when combining:
  // https://github.com/reduxjs/redux/issues/762
  const appReducer = combineReducers({
    ...reducers,
    auth,
    common,
    // React navigation discourages storing navigation state in redux:
    // https://github.com/react-navigation/react-navigation/issues/4490
    // However, 
    // 1. Header and Menu need to know at least which screen is active and
    // 2. Redux logger would need to track navigation actions just like any other action,
    // so we use this lightweight reducer that only tracks only the stack of screens
    // on a StackNavigator.
    navigation: createNavigationReducer(appConfig)
  });

  return appReducer;
};
