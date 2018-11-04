import React, { Component } from 'react';
import { connect } from 'react-redux';

export default WrappedComponent => {
  class LikeScreen extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
    shouldComponentUpdate(nextProps) {
      return nextProps.navigationReducer
        ? nextProps.navigationReducer.currentRoute
          === WrappedComponent.displayName
        : true;
    }
  }

  const mapStateToProps = state => ({
    childMenuItems: state.common.childMenuItems,
    localized: state.common.localized,
    isFetching: state.common.isFetching,
    orientation: state.common.orientation,
    logonAttributes: state.auth.logonAttributes
  });

  const mapDispatchToProps = dispatch => ({
    //navigate: screen => dispatch(push(screen)),
    dispatch
  });

  const Connected = connect(mapStateToProps, mapDispatchToProps)(LikeScreen);
  Connected.navigationOptions = WrappedComponent.navigationOptions;

  return Connected;
};
