import { loggedIn, loggedOut, menuFetched, oneTimesFetched } from './actions';
import makeRequest from './util/ajax';
import config from './config';
import menuSchema from './schema/menuSchema';

import { push } from './navigation';

export const login = (userCode, userPassword) => dispatch =>
  makeRequest({
    endpoint: 'baseadmin/mobilityLogin',
    body: {
      userCode,
      userPassword,
      companyCode: config.companyCode
    },
    dispatch
  }).then(response => {
    config.identityTokenValue = response.sessionId;
    dispatch(loggedIn(response));
    push(config.navigation.landingPage);
    //dispatch(push(config.navigation.landingPage));
  }).catch(() => {
    // Optional catch block; We might need to pass some config to util.ajax to prevent it from
    // handling errors, so that we can handle it here.
  });

export const logout = () => dispatch => {
  config.identityTokenValue = null;
  dispatch(loggedOut());
};

export const fetchMenu = () => dispatch => {
  if (config.menuWithPrivilege) {
    return makeRequest({
      endpoint: 'baseadmin/getUserMenu',
      body: {},
      dispatch
    }).then(handleMenuResponse.bind(null, dispatch));
  }
  else {
    handleMenuResponse(dispatch, config.sampleresponses['getUserMenu']().data.results[0]);
  }
};

const handleMenuResponse = (dispatch, response) => {
  const getMenuItem = config.menuConfig,
    normalizedResponse = menuSchema(response.menu),
    { childMenuItems, parentMenuItems } = normalizedResponse.entities;

  dispatch(menuFetched({
    // TODO: Remove this; return proper response from server
    parentMenuItems: Object.keys(parentMenuItems).reduce((o, k) => {
      const menuItem = getMenuItem(k);
      if (menuItem) {
        o[k] = getMenuItem(k);
      }
      return o;
    }, {}),
    childMenuItems: Object.keys(childMenuItems).reduce((o, k) => {
      const menuItem = getMenuItem(k);
      if (menuItem) {
        o[k] = getMenuItem(k);
      }
      return o;
    }, {})
  }));
};

export const fetchOneTimes = () => dispatch => {  
  return makeRequest({
    endpoint: 'shared/getOneTimes',
    body: {
      getOneTimes: {}
    },
    dispatch
  }).then(response => {
    dispatch(oneTimesFetched(response.oneTimes));
  });
};
