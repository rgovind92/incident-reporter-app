import React, { Component, PureComponent } from 'react';
import { View, FlatList } from 'react-native';

import { Ripple, WithTheme } from '../../framework/container';
import { IText } from '../../framework/component';
import { push } from '../../framework/navigation';

class ListItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <WithTheme>
        {({ colors: { divider, dividerDark } }) => 
          <Ripple divider rippleSize={1000} style={{
              height: 100,
              justifyContent: 'center',
              paddingLeft: 16,
              borderBottomColor: dividerDark,
              borderBottomWidth: 2,
              backgroundColor: divider
            }} onPress={this.navigate}>
            <IText divider>{item}</IText>
          </Ripple>}
      </WithTheme>
    );
  }

  navigate = () => push(this.props.item.replace(' ', ''))
}

export default class extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Mark'
  });

  state = {
    tasks: {
      'Task 1': {
        coords: {
          
        }
      }
    }
  }

  render() {
    const items = ['Add Note', 'Upload image', 'Capture image'];

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={items}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

  _renderItem = ({ item }) =>
    <ListItem item={item} />

};