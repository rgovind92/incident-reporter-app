import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import WithRipple from '../container/WithRipple';
import WithTheme from '../container/WithTheme';
import Flex from './Flex';

const Ripple = WithRipple(View);

export default props => {
  const inputRange = props.navigationState.routes.map((x, i) => i);
  
  return (
    <WithTheme>
      {({
        colors: {
          primary, primaryText, secondary, secondaryText,
          accent, accentText, divider, dividerText
        }
      }) => {
        const [colorTheme, textColorTheme] = props.accent
          ? [accent, accentText]
          : props.secondary
            ? [secondary, secondaryText]
            : [primary, primaryText];

        return (
          <Flex
            row={!props.vertical}
            style={styles.tabBar}
          >
            {props.navigationState.routes.map((route, i) => {
              const isSelected = props.navigationState.index === i,
                color = props.position.interpolate({
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i
                      ? textColorTheme
                      : dividerText)
                }),
                backgroundColor = props.position.interpolate({
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i ? colorTheme : divider)
                });

              return (
                <Ripple
                  onPress={props.onTabItemPressed.bind(null, i)}
                  key={'' + i}
                  divider={!isSelected}
                  wrapperStyle={props.buttonWrapperStyle}
                >
                  <Animated.View
                    style={[
                      styles.touchable,
                      props.style,
                      {
                        backgroundColor                       
                      }
                    ]}
                  >
                    <Animated.Text
                      style={[
                        styles.text,
                        {
                          color
                        }
                      ]}
                    >
                      {route.title}
                    </Animated.Text>
                  </Animated.View>
                </Ripple>
              );
            })}
          </Flex>
        );
      }}
    </WithTheme>
  );
};

const styles = StyleSheet.create({
  tabBar: {},
  touchable: {
    height: 50,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: moderateScale(16, 0.1)
  }
});
