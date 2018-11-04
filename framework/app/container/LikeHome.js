import React, { Component } from 'react';
import { connect } from 'react-redux';

export default Wrapee => {  
  class Wrapper extends Component {
    render() {
      return <Wrapee {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    childMenuItems: state.common.childMenuItems,
    isFetching: state.common.isFetching
  });

  const mapDispatchToProps = dispatch => ({
    dispatch
  });

  const Connected = connect(mapStateToProps, mapDispatchToProps)(Wrapper);
  Connected.navigationOptions = Wrapee.navigationOptions;

  return Connected;
};
