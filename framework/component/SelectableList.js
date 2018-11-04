import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';

import WithRipple from '../container/WithRipple';
const RippleView = WithRipple(View);

class ListItem extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item[this.props.primaryKey]);
  };

  render() {
    return (
      <View style={this.props.itemContainerStyle}>
        <RippleView rippleSize={500} 
          onPress={this._onPress}>
          {this.props.render(this.props.item, this.props.selected)}
        </RippleView>
      </View>
    );
  }
}

export default class extends PureComponent {
  state = {
    selected: new Map()
  };

  _keyExtractor = (item, index) => '' + index;

  _onPressItem = id => {
    this.setState(state => {
      let selected;

      if (this.props.multi) {
        selected = new Map(state.selected);
      }
      else {
        selected = new Map();
      }

      if (state.selected.get(id)) {
        this.props.itemDeselected && this.props.itemDeselected(id);
      }
      else {
        this.props.itemSelected && this.props.itemSelected(id);
      }
      selected.set(id, !state.selected.get(id));

      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <ListItem
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item[this.props.primaryKey || 'id'])}
      item={item}
      render={this.props.render}
      primaryKey={this.props.primaryKey || 'id'}
      itemContainerStyle={this.props.itemContainerStyle}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}