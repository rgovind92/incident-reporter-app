import React, { Component, PureComponent } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { memoize } from 'lodash';
import { IText } from '../../component';
import { WithRipple, WithTheme } from '../../container';
import { push } from '../../navigation';

const DividerText = props => <IText divider {...props} />;
const Ripple = WithRipple(View);

export default class extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Settings'
  });

  items = ['Switch Locale', 'Switch Theme'];

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.items}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => '' + index}
      />
    );
  }

  _renderItem = ({ item }) => <SettingsItem item={item} onSelect={this.onSelect} />;

  onSelect = screen => push(screen.replace(' ', ''));
}

class SettingsItem extends PureComponent {
  render() {
    const { item } = this.props;

    return (
      <WithTheme>
        {({ colors: { dividerDark } }) => (
          <Ripple
            rippleSize={1000}
            divider
            style={getItemStyle(dividerDark)}
            onPress={this.onSelect}
          >
            <DividerText>{item}</DividerText>
          </Ripple>
        )}
      </WithTheme>
    );
  }

  onSelect = () => this.props.onSelect(this.props.item);
}

const getItemStyle = memoize(borderBottomColor => StyleSheet.create({
  o: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor
  }
}).o);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 16
  }
});