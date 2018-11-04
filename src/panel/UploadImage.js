import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Gallery from 'react-native-image-gallery';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import { IButton, Flex, IText } from '../../framework/component';
import { WithTheme } from '../../framework/container';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class extends Component {
  launchCamera = () => {
    ImagePicker.launchCamera(options, (response) => {
      debugger;
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          images: this.state.images.concat({
            source: {
              uri: response.uri
            }
          }),
        });
      }
    });
  };

  launchImagePicker = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      debugger;
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          images: this.state.images.concat({
            source: {
              uri: response.uri
            }
          }),
        });
      }
    });
  }

  state = {
    images: []
  }

  /* images={this.state.sources.map(uri => ({
            source: {
              uri
            }
          })) */

  render() {
    return (
      <WithTheme>
        {({ colors: { accent, primary, secondary, secondaryText, divider, dividerText }}) =>
          <Flex full alignCenter>
            <IText divider style={{ padding: 16 }}>Title</IText>
            {this.state.images.length === 0 
              ?
              <Flex full justifyCenter alignCenter>
                <IText divider style={{ fontSize: 20, margin: 32 }}>No image selected! Please upload an image.</IText>
              </Flex>
              :
              <Gallery
                style={{
                  height: 400,
                  width: '100%',
                  backgroundColor: divider
                }}
                images={this.state.images}
              />
            }
            <ActionButton
              buttonColor={accent}
              nativeFeedbackRippleColor={
                this.state.images.length === 0
                ? divider
                : 'black'
              }>
              <ActionButton.Item
                buttonColor={primary}
                title="Take photo"
                onPress={this.launchCamera}
                nativeFeedbackRippleColor={
                  this.state.images.length === 0
                  ? divider
                  : 'black'
                }>
                <Icon name="glass" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={secondary}
                title="Upload file"
                onPress={this.launchImagePicker}
                nativeFeedbackRippleColor={
                  this.state.images.length === 0
                  ? divider
                  : 'black'
                }>
                <Icon name="music" style={[
                  styles.actionButtonIcon,
                  {
                    color: secondaryText
                  }]
                } />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={divider}
                title="Add a note"
                onPress={() => {}}
                nativeFeedbackRippleColor={
                  this.state.images.length === 0
                  ? divider
                  : 'black'
                }>
                <Icon name="glass" style={[
                  styles.actionButtonIcon,
                  {
                    color: dividerText
                  }]
                } />
              </ActionButton.Item>
            </ActionButton>
          </Flex>}
      </WithTheme>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});