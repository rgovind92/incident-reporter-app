import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (WrappedComponent, { screenLoadActions }) => {
  class Wrapper extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      (screenLoadActions || []).map(action => {
        if (typeof action === 'function') {
          this.props.dispatch(action(this.props.logonAttributes));
        }
      });
    }
  }

  const mapStateToProps = state => ({
    logonAttributes: state.auth.logonAttributes
  });

  const mapDispatchToProps = dispatch => ({
    dispatch
  });

  const Connected = connect(mapStateToProps, mapDispatchToProps)(Wrapper);
  Connected.navigationOptions = WrappedComponent.navigationOptions;

  return Connected;
};
