import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ITextInput } from '../../framework/component';
import { Flex } from '../../framework/component';

export default class extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Add Note'
  });

  render() {
    return (
      <Flex full pad>
        <ITextInput
          placeholder='Title'
          numberOfLines={1} 
          style={styles.title}
          contentContainerStyle={styles.title} />
        <ITextInput
          placeholder='Description'
          numberOfLines={10}  />
      </Flex>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    width: 100
  },
  description: {
    width: '90%'
  }
});