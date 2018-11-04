import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { TextInputLayout } from 'rn-textinputlayout';
import { moderateScale } from 'react-native-size-matters';

import ThemeContext from '../app/context/ThemeContext';
import IText from './IText';

const height = 40,
  fontSize = moderateScale(12, 0.1),
  styles = StyleSheet.create({
    style: {
      fontSize,
      height,
      color: '#414141',
      fontFamily: 'Kabel Regular'
    },
    errorPanel: {
      marginTop: 8,
      height: 1
    }
  });

class ITextInput extends PureComponent {
  render() {
    const {
      checkValid = () => true,
      style,
      contentContainerStyle,
      input,
      meta,
      ...rest
    } = this.props;

    return (
      <ThemeContext.Consumer>
        {context => (
          <React.Fragment>
            <TextInputLayout
              style={contentContainerStyle}
              hintColor={context.colors.primary}
              focusColor={context.colors.primary}
              errorColor={context.colors.accent}
              checkValid={checkValid}
            >
              {input
                ? <TextInput
                  {...rest}
                  onChangeText={input.onChange}
                  onBlur={input.onBlur}
                  onFocus={input.onFocus}
                  value={input.value}
                  style={[styles.style, style]}
                />
                : <TextInput
                  {...rest}
                  style={[styles.style, style]}
                />}
            </TextInputLayout>
            <View style={styles.errorPanel}>
              {meta && meta.touched && meta.error
                ? <IText accent>
                  {meta.error}
                </IText>
                : null}
            </View>            
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
    );
  }
}

ITextInput.propTypes = {
  labelStyle: PropTypes.string,
  label: PropTypes.string
};

export default ITextInput;
