import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import invariant from 'fbjs/lib/invariant';
import { memoize } from 'lodash';

import WithTheme from './WithTheme';

export default WrappedComponent => class extends Component {
  constructor(props) {
    super(props);
    const { isVisible, onBackdropPress } = props;

    invariant(isVisible !== null &&
      isVisible !== undefined, 'isVisible is a mandatory prop for LikeModal!');
    invariant(onBackdropPress !== null &&
      onBackdropPress !== undefined, 'onBackdropPress is a mandatory prop for LikeModal!');
  }

  render() {
    const {
      isVisible,
      style,
      animationIn = 'zoomIn',
      animationOut = 'zoomOut',
      isBottomSheet = false,
      swipeDirection,
      ...rest
    } = this.props;

    return (
      <WithTheme>
        {context => (
          <Modal
            animationIn={isBottomSheet ? 'slideInUp' : animationIn}
            animationOut={isBottomSheet ? 'slideOutDown' : animationOut}
            swipeDirection={isBottomSheet ? 'down' : swipeDirection}
            isVisible={isVisible || false}
            style={isBottomSheet ? styles.bottomSheetContainer : styles.container}
            {...rest}
          >
            <WrappedComponent
              {...rest}
              style={[
                getModalStyle(context.borderRadius, context.colors.divider),
                styles.modal,
                style
              ]}
            />
          </Modal>
        )}
      </WithTheme>
    );
  }
};

const getModalStyle = memoize((borderRadius, backgroundColor) => StyleSheet.create({
  o: {
    backgroundColor,
    borderRadius
  }
}).o);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSheetContainer: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modal: {
    width: 400
  }
});
