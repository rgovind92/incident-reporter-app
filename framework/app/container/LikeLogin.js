import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../../commands';

export default Wrapee => {  
  class Wrapper extends Component {
    state = {
      userCode: 'User',
      userPassword: 'password'
    };

    render() {
      return (
        <Wrapee
          {...this.props}
          {...this.state}
          update={this.update}
        />
      );
    }

    update = (key, value) => {
      this.setState({
        [key]: value
      });
    };
  }

  const mapStateToProps = state => ({
    isFetching: state.common.isFetching
  });
  
  const mapDispatchToProps = dispatch => ({
    login: (userCode, userPassword) => dispatch(login(userCode, userPassword))
  });

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};
