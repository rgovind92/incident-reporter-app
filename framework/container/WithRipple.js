import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity
} from 'react-native';

import WithTheme from './WithTheme';

const easing = Easing.out(Easing.circle);
const duration = 1500;
const useNativeDriver = true;

export default WrappedComponent => {
  class ComponentWithRipple extends Component {
    state = {
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      rippleScale: new Animated.Value(0),
      opacity: new Animated.Value(0)
    };

    render() {
      const {
          rippleSize,
          divider,
          accent,
          secondary,
          onPress,
          wrapperStyle,
          hitSlop,
          ...rest
        } = this.props,
        { translateY, translateX, rippleScale, opacity } = this.state;

      return (
        <WithTheme>
          {context => {
            const textColor = divider
              ? context.colors.dividerText
              : accent
                ? context.colors.accentText
                : secondary
                  ? context.colors.secondaryText
                  : context.colors.primaryText;
            return (
              <TouchableOpacity
                onPressIn={this._animateIn}
                onPressOut={this._animateOut}
                onPress={onPress}
                activeOpacity={1}
                style={wrapperStyle}
                hitSlop={hitSlop}
              >
                <WrappedComponent {...rest} pointerEvents='none' />
                <Animated.View
                  style={[
                    styles.ripple,
                    this.getStyle(rippleSize, textColor),
                    {
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
              </TouchableOpacity>
            );
          }}
        </WithTheme>
      );
    }

    _animateIn = e => {
      const { rippleSize } = this.props,
        { translateY, translateX, rippleScale, opacity } = this.state;

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

    _animateOut = () => {
      const { opacity, rippleScale } = this.state;

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
        })
      ]).start();
    };

    getStyle = (rippleSize, textColor) => ({
      width: rippleSize,
      height: rippleSize,
      borderRadius: rippleSize / 2,
      backgroundColor: textColor
    });
  }

  ComponentWithRipple.defaultProps = {
    rippleSize: 350
  };

  return ComponentWithRipple;
};

const styles = StyleSheet.create({
  ripple: {
    position: 'absolute'
  }
});
