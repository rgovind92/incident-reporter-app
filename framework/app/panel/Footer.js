import React from 'react';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { memoize } from 'lodash';

import ThemeContext from '../context/ThemeContext';
import Flex from '../../component/Flex';
import IText from '../../component/IText';

const getStyle = memoize(backgroundColor => StyleSheet.create({
  o: {
    height: 60,
    backgroundColor
  }
}).o);

const getTextStyle = memoize(color => StyleSheet.create({
  o: {
    color,
    fontWeight: 'bold',
    fontSize: moderateScale(14, 0.1)
  }
}).o);

export default () =>
  <ThemeContext.Consumer>
    {context => (
      <Flex
        justifyCenter
        alignCenter
        style={getStyle(context.colors.primary)}
      >
        <IText style={getTextStyle(context.colors.primaryText)}>
          Footer
        </IText>
      </Flex>
    )}
  </ThemeContext.Consumer>;  
