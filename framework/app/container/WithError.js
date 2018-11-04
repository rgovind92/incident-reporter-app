import React, { Component } from 'react';
import { connect } from 'react-redux';

import { errorCleared } from '../../actions';

export default Wrappee => {
  class Wrapper extends Component {
    render() {
      return <Wrappee {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    error: state.common.error,
    networkError: state.common.networkError
  });
  
  const mapDispatchToProps = dispatch => ({
    errorCleared: () => dispatch(errorCleared())
  });

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};
