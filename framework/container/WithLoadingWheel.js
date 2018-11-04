import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';

export default WrappedComponent => ({ loading, ...props }) =>
  loading ? (
    <ActivityIndicator
      animating={true}
      color='#414141'
      size={Platform.OS === 'ios' ? 'large' : 50}
    />
  ) : (
    <WrappedComponent {...props} />
  );
