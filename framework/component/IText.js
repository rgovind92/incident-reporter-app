import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { memoize } from 'lodash';

import WithLocale from '../container/WithLocale';
import WithTheme from '../container/WithTheme';

const fontSize = moderateScale(12, 0.1);

// TODO: Fin out if we really need to memoize this. Or will RN do that for us?
const getStyle = memoize(color => StyleSheet.create({
  text: {
    color,
    fontSize,
    fontFamily: 'Kabel Regular'
  }
}).text);

export default class extends PureComponent {
  render() {
    const { children, style, divider, accent, secondary, ...rest } = this.props;
    return (
      <WithLocale>
        {locale => (
          <WithTheme>
            {({ colors }) => (
              <Text
                style={[
                  getStyle(divider
                    ? colors.dividerText
                    : accent
                      ? colors.accentText
                      : secondary
                        ? colors.secondaryText
                        : colors.primaryText),
                  style]}
                {...rest}
              >
                {locale.currentLocale === 'en-US'
                  ? children
                  : locale.strings[locale.currentLocale][children]}
              </Text>
            )}
          </WithTheme>
        )}
      </WithLocale>
    );
  }
}

export { fontSize };
