import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import ThemeContext from '../app/context/ThemeContext';

export default class extends PureComponent {
  render() {
    const { divider, accent, secondary } = this.props;

    return (
      <ThemeContext.Consumer>
        {context => (
          <Icon
            color={
              divider
                ? context.colors.divider
                : accent
                  ? context.colors.accent
                  : secondary
                    ? context.colors.secondary
                    : context.colors.primary
            }
            {...this.props}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}
