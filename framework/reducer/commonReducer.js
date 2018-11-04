import * as types from '../types';

const initialState = {
  isFetching: false,
  parentMenuItems: {},
  childMenuItems: {},
  isMenuOpen: false,
  isKeyboardVisible: false,
  localized: {
    decimalSeperator: '.',
    thousandSeperator: ',',
    decimalKeyCode: '.'.charCodeAt(),
    thousandKeyCode: ','.charCodeAt(),
    locale: 'en'
  },
  error: null,
  networkError: null,
  orientation: 'Portrait',
  pushNotificationGroup: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.__REQUEST_START:
      return {
        ...state,
        isFetching: true
      };
    case types.__REQUEST_END:
      return { ...state, isFetching: false };
    case types.__REQUEST_ERROR:      
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case types.__REQUEST_NETWORK_ERROR:      
      return {
        ...state,
        isFetching: false,
        networkError: action.payload
      };
    case types.__ERROR_CLEARED:
      return { ...state, error: null, networkError: null };
    case types.__LOGGED_OUT:
      return {
        ...state,
        parentMenuItems: {},
        childMenuItems: {}
      };
    case types.__MENU_FETCHED:
      
      return {
        ...state,
        parentMenuItems: action.payload.parentMenuItems,
        childMenuItems: action.payload.childMenuItems
      };
    case types.__KEYBOARD_VISIBILITY_CHANGED:
      return { ...state, isKeyboardVisible: action.payload };
    case types.__LOCALE_UPDATED:
      return {
        ...state,
        localized: { ...state.localized, locale: action.payload }
      };
    case types.__ORIENTATION_CHANGED:
      return { ...state, orientation: action.payload };
    case types.__MENU_TOGGLED:
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case types.__PUSH_NOTIFICATION_GROUP_CHANGED:
      return { ...state, pushNotificationGroup: action.payload };
    default:
      return state;
  }
};
