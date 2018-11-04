import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';

import IButton from './IButton';
import { fontSize } from './IText';
import WithLocale from '../container/WithLocale';
import { applyFnToTextWithinToken } from '../util';

const getLocalizedString = ({ strings, currentLocale }, code) => {
    
    return strings[currentLocale][code];
  },
  getItemAtIndex = (index, array) =>
    array ? array[parseInt(index)] : '';

export default class extends Component {
  render() {
    
    const { errors, errorCleared } = this.props;

    return (
      <Modal
        animationIn='zoomIn'
        animationOut='zoomOut'
        isVisible={errors !== null}
        style={styles.center}
        onBackdropPress={errorCleared}>
        <View style={styles.modal}>
          <WithLocale>
            {locale => (
              errors
                ? 
                <Text style={styles.text}>
                  {applyFnToTextWithinToken({
                    // Only consider the first error code:
                    string: getLocalizedString(locale, errors[0].code),
                    fn: getItemAtIndex,
                    args: errors[0].data
                  })}
                </Text>
                :
                null
            )}
          </WithLocale>
          <IButton
            title='OK'
            ripple
            onPress={errorCleared}
            style={styles.button}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: 300,
    padding: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 24,
    width: 100
  },
  text: {
    fontSize
  }
});