import React, { Component } from 'react';
import { TouchableOpacity,View, StyleSheet } from 'react-native';

import Flex from '../../component/Flex';
import ITextInput from '../../component/ITextInput';
import IButton from '../../component/IButton';
import WithAutoDismissedKeyboard from '../../container/WithAutoDismissedKeyboard'; //eslint-disable-line
import IText from '../../component/IText';

const DismissKeyboardView = WithAutoDismissedKeyboard(Flex);

export default class extends Component {
  render() {
    const { isFetching, userCode, userPassword } = this.props;
    
    return (
      <DismissKeyboardView full style={styles.main}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ITextInput
            value={userCode}
            onChange={this.updateUsername}
            style={styles.textInput}
            contentContainerStyle={styles.inputLayout}
            placeholder={'Username'}
            autoCapitalize='characters'
          />
          <ITextInput
            value={userPassword}
            onChange={this.updatePassword}
            style={styles.textInput}
            contentContainerStyle={styles.inputLayout}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          <IButton
            isFetching={isFetching}
            title='Login'
            style={styles.loginButton}
            ripple
            onPress={this.login}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginBottom: 16, marginTop: 16 }} hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}>
            <IText divider>
             Register
            </IText>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginBottom: 16, marginTop: 16 }} hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}>
            <IText divider>
              Forgot your password?
            </IText>
          </TouchableOpacity>
        </View>
      </DismissKeyboardView>
    );
  }

  login = () => {
    const { login, userCode, userPassword } = this.props;
    login(userCode, userPassword);
  }

  updateUsername = e => {
    this.props.update('userCode', e.nativeEvent.text);
  };

  updatePassword = e => {
    this.props.update('userPassword', e.nativeEvent.text);
  };
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
