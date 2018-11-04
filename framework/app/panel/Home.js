import React, { Component, PureComponent } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import WithLoadingWheel from '../../container/WithLoadingWheel';
import IButton from '../../component/IButton';
import IText from '../../component';

import { push } from '../../navigation';

const LoadingComponent = WithLoadingWheel(View);

class Home extends Component {
  static navigationOptions = () => ({
    headerTitle: () => <IText>Home</IText>
  });

  render() {    
    const { childMenuItems, isFetching, orientation } = this.props;

    return (
      <View style={styles.container}>
        <LoadingComponent
          loading={isFetching}
          style={
            orientation === 'Portrait'
              ? styles.wrapper
              : styles.wrapperLandscape
          }
        >
          <FlatList
            key={orientation}
            contentContainerStyle={styles.list}
            numColumns={orientation === 'Portrait' ? 2 : 4}
            data={Object.keys(childMenuItems).map(k => childMenuItems[k])}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => '' + index}
          />
        </LoadingComponent>
      </View>
    );
  }

  _renderItem = ({ item }) =>
    <Item item={item} onPress={push} />
}

class Item extends PureComponent {
  render() {
    const { item } = this.props;

    return (
      <IButton
        contentContainerStyle={styles.buttonContainer}
        style={styles.item}
        iconStyle={styles.iconStyle}
        icon={item.icon}
        title={item.key}
        onPress={this.onPress}
        ripple
        rippleSize={500}
        secondary
      />
    );
  }

  onPress = () => {
    this.props.onPress(this.props.item.id);
  }
}

Home.defaultProps = {
  defaultOrientation: 'Landscape'
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20
  },
  wrapper: {
    height: 540
  },
  wrapperLandscape: {
    height: 320
  },
  item: {
    width: 160,
    height: 160,
    margin: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.3
  },
  textInputLayout: {
    width: 280,
    marginTop: 32,
    marginBottom: 32
  },
  textInput: {
    fontSize: 16,
    height: 40
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  iconStyle: {
    marginBottom: 20
  }
});
