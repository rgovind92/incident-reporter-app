import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { moderateScale } from 'react-native-size-matters';

import WithTheme from '../../container/WithTheme';
import Flex from '../../component/Flex';
import IText from '../../component/IText';
import Icon from '../../component/Icon';
import config from '../../config';

import { pop } from '../../navigation';

import { memoize } from 'lodash';

class Header extends Component {
  render() {
    const { currentRoute } = this.props;
    
    return (
      <WithTheme>
        {context => (
          <Flex
            row
            alignCenter
            style={getHeaderStyle(context.colors.primary).header}
          >
            <TouchableOpacity
              onPress={
                currentRoute === config.navigation.landingPage
                  ? this.toggleDrawer
                  : pop
              }
            >
              <Flex justifyCenter style={styles.iconContainer}>
                <Icon
                  name={
                    currentRoute === config.navigation.landingPage
                      ? 'bars'
                      : 'chevron-left'
                  }
                  size={20}
                  divider
                  style={styles.icon}
                  color={context.colors.primaryText}
                />
              </Flex>
            </TouchableOpacity>
            <Flex full justifyCenter alignCenter>
              <IText style={getTextStyle(context.colors.primaryText).text}>
                {this.props.scene.descriptor.options.headerTitle}
              </IText>
            </Flex>
            <Flex style={styles.spacing} />
          </Flex>
        )}
      </WithTheme>
    );
  }

  toggleDrawer = () => this.props.navigation.dispatch(DrawerActions.toggleDrawer());
}

const mapStateToProps = state => ({
  currentRoute: state.navigation.stack[state.navigation.stack.length - 1]
});

const mapDispatchToProps = dispatch => ({
  pop: () => dispatch(pop())
});

export default connect(mapStateToProps,
  mapDispatchToProps)(Header);

const fontSize = moderateScale(14, 0.1);

const getHeaderStyle = memoize(backgroundColor =>
  StyleSheet.create({
    header: {
      height: 60,
      backgroundColor
    }
  }));

const getTextStyle = memoize(color =>
  StyleSheet.create({
    text: {
      color,
      fontWeight: 'bold',
      fontSize
    }
  }));

const styles = StyleSheet.create({
  icon: {
    marginLeft: 16
  },
  iconContainer: {
    width: 80,
    height: 50
  },
  spacing: {
    width: 80
  }
});
