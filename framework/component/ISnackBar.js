import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet
} from 'react-native';

import IText from './IText';

const defaultHeight = 60;
const width = Dimensions.get('window').width;
const useNativeDriver = true;

export default class ISnackBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(props.active 
        ? 0
        : props.height || defaultHeight)
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.translateX
        }
      ], useNativeDriver),

      onPanResponderTerminationRequest: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        const width = Dimensions.get('window').width;

        Animated.sequence([
          Animated.timing(this.state.translateX, {
            toValue:
              gestureState.dx < 0
                ? 10
                : gestureState.dx < 50
                  ? -10
                  : width,
            duration: 200,
            useNativeDriver
          }),
          Animated.timing(this.state.translateX, {
            toValue: gestureState.dx < 50 ? 0 : width,
            duration: 100,
            useNativeDriver
          })
        ]).start();

        if (gestureState.dx >= 50) {
          this.props.onDismiss && this.props.onDismiss();
        }
      },

      onShouldBlockNativeResponder: () => true
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.active) {
      Animated.parallel([
        Animated.timing(this.state.translateX, {
          toValue: 0,
          duration: 0,
          useNativeDriver
        }),
        Animated.timing(this.state.translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver
        })
      ]).start();

      if (this.props.infinite !== true) {
        clearInterval(this.timeout);

        this.timeout = setTimeout(() => {
          Animated.timing(this.state.translateY, {
            toValue: this.props.height || defaultHeight,
            useNativeDriver
          }).start();

          this.props.onDismiss && this.props.onDismiss();
        }, this.props.duration || 2000);
      }
    }
    else {
      Animated.timing(this.state.translateY, {
        toValue: this.props.height || defaultHeight,
        duration: 200,
        useNativeDriver
      }).start();
    }
  }

  render() {
    const opacity = this.state.translateX.interpolate({
      inputRange: [-1000, 0, 1000],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp'
    });
    return (
      <Animated.View
        style={[styles.snackbar,
          {
            opacity,
            transform: [
              {
                translateX: this.state.translateX
              },
              {
                translateY: this.state.translateY
              }
            ]
          },
          this.props.contentContainerStyle
        ]}
      >
        <View
          style={this.props.style}
          {...this._panResponder.panHandlers}
        >
          <IText style={styles.snackbarText}>
            {this.props.text}
          </IText>
        </View>
        {this.props.touchables && this.props.touchables()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    bottom: 0,
    width
  },
  snackbarText: {
    color: '#FFF',
    marginLeft: 16
  }
});
