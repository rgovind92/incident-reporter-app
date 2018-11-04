/* RN did not initially have a button component, hence this one. 
TODO: Investigate if memoization is really helpful here. The cached values
will be stored in memory, we would want to memoize only a limited number of parameters,
and assume that each parameter takes only one of a few values.  */
import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  Platform,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing
} from 'react-native';
import { memoize } from 'lodash';
import { moderateScale } from 'react-native-size-matters';

import Flex from './Flex';
import Icon from './Icon';
import IText from './IText';

import WithTheme from '../container/WithTheme';

//const ANIMATIONS = true;
const useNativeDriver = true;
const easing = Easing.out(Easing.circle);
const duration = 1500;

const ButtonIcon = props => (
  <Icon
    style={props.iconEnd
      ? [styles.horizontalIconStyle, props.iconStyle]
      : props.iconStyle}
    name={props.icon}
    color={props.iconColor || props.textColor}
    size={props.iconSize || 16}
  />
);

const Element = props => {
  const {
    textColor,
    icon,
    iconEnd,
    title,
    truncateText,
    textStyle,
    contentContainerStyle
  } = props;

  return (
    <Flex
      pointerEvents='none'
      style={iconEnd
        ? [styles.horizontalContentContainerStyle, contentContainerStyle]
        : [styles.contentContainerStyle, contentContainerStyle]}
    >
      {icon && !iconEnd ? <ButtonIcon {...props} /> : null}
      {title ? (
        <IText
          numberOfLines={truncateText ? 1 : null}
          style={[
            styles.textStyle,
            {
              color: textColor,
              marginLeft: icon ? 8 : 0
            },
            textStyle
          ]}
        >
          {title}
        </IText>
      ) : null}
      {icon && iconEnd ? <ButtonIcon {...props} /> : null}
    </Flex>
  );
};

/* const LikeButton = WrappedComponent => props => (
  <TouchableOpacity onPress={props.onPress} activeOpacity={1}>
    <Flex
      style={[
        styles.buttonStyle,
        {
          backgroundColor: props.accent
            ? props.context.colors.accentText
            : props.disabled
              ? props.context.colors.dividerText
              : props.secondary
                ? props.context.colors.secondaryText
                : props.context.colors.primaryText
        },
        props.style
      ]}
    >
      <WrappedComponent {...props} />
    </Flex>
  </TouchableOpacity>
); */

class IButton extends PureComponent {
  state = {
    translateY: new Animated.Value(0),
    translateX: new Animated.Value(0),
    rippleScale: new Animated.Value(0),
    opacity: new Animated.Value(0),
    scale: new Animated.Value(1)
  };

  render() {
    return (
      <WithTheme>
        {context => {
          const {
              disabled,
              isFetching,
              accent,
              secondary,
              divider,
              rippleSize,
              style,
              wrapperStyle,
              ...rest
            } = this.props,
            {
              translateY,
              translateX,
              rippleScale,
              opacity,
              scale
            } = this.state;

          let [backgroundColor, textColor] = disabled || divider
            ? [context.colors.divider, context.colors.dividerText]
            : accent
              ? [context.colors.accent, context.colors.accentText]
              : secondary
                ? [context.colors.secondary, context.colors.secondaryText]
                : [context.colors.primary, context.colors.primaryText];
          
          if (this.props.backgroundColor) {
            backgroundColor = this.props.backgroundColor;
          }
          if (this.props.textColor) {
            textColor = this.props.textColor;
          }
                    
          return (
            <TouchableOpacity
              onPressIn={this._onPressIn}
              onPressOut={this._onPressOut}
              onPress={this._onPress}
              activeOpacity={1}
              style={wrapperStyle}
            >
              <Animated.View
                style={[
                  getButtonStyle(backgroundColor, context.borderRadius, scale)
                    .button,
                  {
                    transform: [
                      {
                        scale
                      }
                    ]
                  },
                  style
                ]}
              >
                {isFetching
                  ? <ActivityIndicator
                    color={textColor}
                    size={Platform.OS === 'ios' ? 'small' : moderateScale(14)}
                  />
                  : <Element
                    {...rest}
                    pointerEvents='none'
                    context={context}
                    textColor={textColor}
                  />}
                <Animated.View
                  style={[
                    getRippleStyle(rippleSize, textColor).ripple,
                    {
                      backgroundColor: textColor,
                      opacity,
                      transform: [
                        {
                          translateX
                        },
                        {
                          translateY
                        },
                        {
                          scale: rippleScale
                        }
                      ]
                    }
                  ]}
                  pointerEvents='none'
                />
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      </WithTheme>
    );
  }

  _onPressIn = e => {
    if (!(this.props.disabled || this.props.isFetching)) {
      this.animateIn(e);
    }
  };

  _onPressOut = e => {
    if (!(this.props.disabled || this.props.isFetching)) {
      this.animateOut(e);
    }
  };

  _onPress = e => {
    if (!(this.props.disabled || this.props.isFetching)) {
      this.props.onPress && this.props.onPress(e);
    }
  };

  animateIn = e => {
    const { rippleSize } = this.props,
      { translateY, translateX, rippleScale, opacity, scale } = this.state;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: e.nativeEvent.locationY - rippleSize / 2,
          duration: 0,
          useNativeDriver
        }),
        Animated.timing(translateX, {
          toValue: e.nativeEvent.locationX - rippleSize / 2,
          duration: 0,
          useNativeDriver
        }),
        Animated.timing(rippleScale, {
          toValue: 0,
          duration: 0,
          useNativeDriver
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver
        })
      ]),
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 0.8,
          duration,
          easing,
          useNativeDriver
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration,
          easing,
          useNativeDriver
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration,
          easing,
          useNativeDriver
        })
      ]),
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 1,
          duration,
          easing,
          useNativeDriver
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          easing,
          useNativeDriver
        })
      ])
    ]).start();
  };

  animateOut = () => {
    const { opacity, rippleScale, scale } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(rippleScale, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver
      })
    ]).start();
  };
}

IButton.defaultProps = {
  rippleSize: 350
};

const getButtonStyle = memoize((backgroundColor, borderRadius) =>
  StyleSheet.create({
    button: {
      padding: 10,
      overflow: 'hidden',
      borderRadius,
      backgroundColor
    }
  }));

const getRippleStyle = memoize(rippleSize =>
  StyleSheet.create({
    ripple: {
      position: 'absolute',
      width: rippleSize,
      height: rippleSize,
      borderRadius: rippleSize / 2
    }
  }));

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center'
  },
  contentContainerStyle: {
    justifyContent: 'center'
  },
  horizontalContentContainerStyle: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  horizontalIconStyle: {
    marginLeft: 8
  }
});

export default /*(ANIMATIONS ?*/ IButton /*: LikeButton(Element))*/;
