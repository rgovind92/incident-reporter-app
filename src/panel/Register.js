import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import ITextInput from '../../framework/component/ITextInput';
import IButton from '../../framework/component/IButton';


export default class extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ITextInput
          placeholder={'Name'}
        />
        <ITextInput
          placeholder={'Phone number'}
          secureTextEntry={true}
        />
        <IButton
          isFetching={isFetching}
          title='Register'
          style={styles.loginButton}
          ripple
          onPress={this.login}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    //backgroundColor: '#FFF'
  },
  loginButton: {
    marginTop: 50,
    width: 200
  },
  textInput: {
    width: 200
  },
  inputLayout: {
    marginTop: 16,
    marginHorizontal: 36
  }
});
