import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet, 
  TouchableWithoutFeedback
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(this.getTop(props.snapPoints))
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { translateY } = this.state;
              
        translateY.setOffset(translateY._value);
        translateY.setValue(0);
      },

      onPanResponderMove: Animated.event([
        null, {
          dy: this.state.translateY
        }
      ]),

      onPanResponderTerminationRequest: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        const { snapPoints } = this.props;
        const { translateY } = this.state;

        translateY.flattenOffset();

        if (gestureState.dy >= 0) {
          Animated.spring(translateY, {
            toValue: this.getClosestSnapPoint(gestureState.moveY,
              snapPoints) + this.getTop(snapPoints),
            bounciness: 9
          }).start();
        }
        else if (gestureState.dy < 0) {
          Animated.spring(translateY, {
            toValue: this.getTop(snapPoints),
            bounciness: 9
          }).start();
        }
      },

      onShouldBlockNativeResponder: () => true
    });
  }

  render() {
    const { translateY } = this.state;
    const { children, snapPoints } = this.props;

    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={this.closeDrawer}>
          <Animated.View
            style={[
              styles.mask, {
                opacity: translateY.interpolate({
                  inputRange: [this.getTop(snapPoints), 0],
                  outputRange: [0, 0.5],
                  extrapolateRight: 'clamp'
                })
              }
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View style={{
          alignItems: 'center',
          left: 0,
          top: 0,
          right: 0,
          position: 'absolute',
          transform: [{
            translateY
          }]
        }} {...this._panResponder.panHandlers} >
          {children}
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </Animated.View>
      </React.Fragment>
    );
  }

  closeDrawer = () => {
    Animated.spring(this.state.translateY, {
      toValue: this.getTop(this.props.snapPoints)
    }).start();
  };

  getTop = snapPoints => 0 - snapPoints[snapPoints.length - 1]

  getClosestSnapPoint = (y, snapPoints) => {
    let result = null;
    snapPoints.sort((a, b) => a > b).some(snapPoint => {
      if (y < snapPoint) {
        result = snapPoint;
        return true;
      }
    });
    return result;
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    width,
    height,
    backgroundColor: '#000',
  },
  panelHeader: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    width: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040'
  }
});

/* RN-Interactable implementation:

import React, { Component } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

class IDrawer extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(30);
  }

  render() {
    return (
      <View style={styles.panelContainer} pointerEvents={'box-none'}>
        <Animated.View
          pointerEvents={'box-none'}
          style={[
            styles.mask, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, 500],
                outputRange: [1, 1],
                extrapolateRight: 'clamp'
              })
            }
          ]}
        />
        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: 100}, {y: 300}]}
          initialPosition={{y: 0}}
          animatedValueY={this._deltaY}
          style={{alignItems: 'center', zIndex: 1}}
          boundaries={{y: -50}}
        >
          <View style={styles.panel}>
            
          </View>
          <View style={styles.panelHeader}>
              <View style={styles.panelHandle} />
          </View>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    position: 'absolute',
    top: -2 * Screen.height,
    bottom: 0,
    left: 0,
    right: 0
  },
  mask: {
    position: 'absolute',
    top: 0,
    height: Screen.height,
    left: 0,
    right: 0
  },
  panel: {
    height: 2 * Screen.height,
    backgroundColor: '#FFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
    justifyContent: 'flex-end',
    width: '100%'
  },
  panelHeader: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    width: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040'
  }
});

export default IDrawer; */