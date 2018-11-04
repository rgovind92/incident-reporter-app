import React, { Component } from 'react';
import { View } from 'react-native';
import { IDialog } from '../../component';
import { IModal, WithLocale } from '../../container';
import { applyFnToTextWithinToken } from '../../util';

const getLocalizedString = ({ strings, currentLocale }, code) => 
    strings[currentLocale][code],
  getItemAtIndex = (index, array) =>
    array ? array[parseInt(index)] : '';

export default class extends Component {
  render() {
    const { error, networkError, errorCleared } = this.props;
    return (
      <WithLocale>
        {locale => (
          <IModal
            isVisible={(error || networkError) ? true : false}
            onBackdropPress={errorCleared}>
            {networkError
              ?
              <IDialog
                text={'There seems to be some issue with either your connectivity or ' +
                'one of our servers. ' +
                'Please try again in a while.'}
                onYes={errorCleared} />
              :
              error
                ?
                <IDialog
                  text={applyFnToTextWithinToken({
                    string: getLocalizedString(locale, error ? error.code : ''),
                    fn: getItemAtIndex,
                    args: error ? error.data : ''
                  })}
                  onYes={errorCleared} />
                :
                <View />}
          </IModal>
        )}
      </WithLocale>
    );
  }
}