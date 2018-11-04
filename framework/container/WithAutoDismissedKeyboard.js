import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const press = () => {
  Keyboard.dismiss();
};

export default WrappedComponent => props =>
  <TouchableWithoutFeedback onPress={press}>
    <WrappedComponent {...props} />
  </TouchableWithoutFeedback>;
