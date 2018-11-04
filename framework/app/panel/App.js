import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import ISnackBar from '../../component/ISnackBar';
import Flex from '../../component/Flex';
import Dialog from '../panel/Error';
import WithError from '../container/WithError';
import { setTopLevelNavigator } from '../../navigation';

const ErrorDialog = WithError(Dialog);

export default class extends Component {
  render() {
    const {
      routes: App,
      dispatch,
      snackbarVisible,
      onLayout
    } = this.props;

    return (
      <Flex full onLayout={onLayout}>
        <App
          ref={ref => setTopLevelNavigator(ref, dispatch)}
        />
        <ISnackBar
          contentContainerStyle={styles.snackbarContainer}
          style={styles.snackbar}
          active={snackbarVisible}
          onDismiss={this.hideSnackbar}
          text='Press back once more to Log out / Exit'
        />
        <ErrorDialog />
      </Flex>
    );
  }

  hideSnackbar = () => {
    this.props.updateSnackbarVisibility(false);
  }
}

const styles = StyleSheet.create({
  snackbarContainer: {
    backgroundColor: '#090909',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  snackbar: {
    flex: 1
  },
  snackbarText: {
    color: '#FFF',
    marginLeft: 16
  }
});
