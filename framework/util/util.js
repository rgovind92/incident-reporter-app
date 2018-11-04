import moment from 'moment';
import { Animated, Easing, I18nManager } from 'react-native';

export const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  prop.hasOwnProperty('length') && prop.length === 0 ||
  prop.constructor === Object && Object.keys(prop).length === 0;

export const isClassComponent = Component =>
  Component &&
  Component.prototype &&
  typeof Component.prototype.isReactComponent === 'object';

export const getCurrentDate = dateFormat => 
  moment(new Date()).format(dateFormat ? dateFormat : 'DD-MMM-YYYY');

export const getCurrentRoute = state => {
  const findCurrentRoute = navState => {
    if (navState.index !== undefined) {
      return findCurrentRoute(navState.routes[navState.index]);
    }
    return navState.routeName;
  };
  return findCurrentRoute(state);
};

const forInitial = props => {
  const { navigation, scene } = props,
    focused = navigation.state.index === scene.index,
    opacity = focused ? 1 : 0,
    // If not focused, move the scene far away.
    translate = focused ? 0 : 1000000;

  return {
    opacity,
    transform: [{ translateX: translate }, { translateY: translate }]
  };
};

const forHorizontal = props => {
  if (!props.layout.isMeasured) {
    return forInitial(props);
  }

  const { layout, position, scene } = props,
    { index } = scene,
    inputRange = [index - 1, index, index + 1],
    width = layout.initWidth,
    outputRange = I18nManager.isRTL
      ? [-width, 0, width * 0.3]
      : [width, 0, width * -0.8],
    translateY = 0,
    translateX = position.interpolate({
      inputRange,
      outputRange
    });

  return {
    transform: [{ translateX }, { translateY }]
  };
};

export const slideFromRightTransition = () => ({
  transitionSpec: {
    duration: 200,
    easing: Easing.inOut(Easing.circle),
    //easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: forHorizontal
});

export const cssBridge = (f, tpl) =>
  new Function('f', 'return f`' + tpl + '`;').call(null, f);

export const arrayToObject = (array, key) =>
  array.reduce((o, item) => {
    o[item[key]] = item;
    return o;
  }, {});

/*
* 
* Tokenizer that applies a function fn, and arguments args to the text within '${}'.
* For eg. 'Box number ${0} is in Truck number ${1}'
* would become:
* 'Box number 1234 is in Truck number 5678', assuming that
* fn is: (index, array) => array[parseInt(index)]
* and args is: ['1234', '5678']
*
*/
export const applyFnToTextWithinToken = ({
  string = '',
  limiter = '${',
  delimiter = '}',
  fn = _ => _,
  args
} = { string: '' }) => {
  let i = 0,
    out = '',
    target = null;
  const compareTokens = (x, y, index) =>
    x.slice(index, index + y.length) === y;

  while (i < string.length) {
    if (compareTokens(string, limiter, i)) {
      target = '';
      for (let _ = 0; _ < limiter.length - 1; _++) {
        i++;
      }
    }
    else if (target != null) {
      if (compareTokens(string, delimiter, i)) {
        out += fn(target, args);
        target = null;
        for (let _ = 0; _ < delimiter.length - 1; _++) {
          i++;
        }
      }
      else {
        target += string[i];
      }
    }
    else {
      out += string[i];
    }

    i++;
  }

  return out;
};

export const noop = () => {};