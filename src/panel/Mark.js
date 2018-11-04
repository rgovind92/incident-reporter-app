import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Gallery from 'react-native-image-gallery';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import { IButton, Flex, IText, ITextInput, IDialog } from '../../framework/component';
import { IModal } from '../../framework/container';

import { WithTheme } from '../../framework/container';

import { incidentCreated } from '../actions';
import { pop } from '../../framework/navigation';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Mark extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Report an incident'
  });

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
            },
            data: response.data
          }),
        });
      }
    });
  }

  state = {
    incidentName: '',
    images: [],
    isErrorVisible: false,
    isModalVisible: false,
    isNoteModalVisible: false
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
          <Flex full>
            <ITextInput
              placeholder='Name'
              value={this.state.incidentName}
              onChangeText={incidentName => this.setState({ incidentName })}
              contentContainerStyle={{ marginLeft: 16, marginRight: 16, marginTop: 16, marginBottom: 16 }}
            />
            {this.state.images.length === 0 
              ?
              <Flex full justifyCenter alignCenter>
                <IText divider style={{ fontSize: 20, margin: 32 }}>Upload an image by pressing the + button</IText>
              </Flex>
              :
              <View style={{ flex: 1, padding: 16 }}>
                <Gallery
                  style={{
                    width: '100%'
                  }}
                  images={this.state.images}
                />
              </View>
            }
            <IModal
              isVisible={this.state.isErrorVisible}
              onBackdropPress={this.hideErrorModal}
            >
              <IDialog
                text='Please name this incident, so that you can look it up later'
                onYes={this.hideErrorModal}
              />
            </IModal>
            <IModal
              isVisible={this.state.isNoteModalVisible}
              onBackdropPress={this.hideNoteModal}
              style={{ padding: 48, justifyContent: 'center', alignItems: 'center' }}
            >
              <ITextInput
                placeholder='Description'
                style={{ width: 200 }}
              />
            </IModal>
            <ActionButton
              buttonColor={accent}
              nativeFeedbackRippleColor={divider}
              style={{ marginBottom: 50 }}
            >
              <ActionButton.Item
                buttonColor={primary}
                title="Take photo"
                onPress={this.launchCamera}
                nativeFeedbackRippleColor={divider}>
                <Icon name="camera" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={secondary}
                title="Upload file"
                onPress={this.launchImagePicker}
                nativeFeedbackRippleColor={divider}>
                <Icon name="upload" style={[
                  styles.actionButtonIcon,
                  {
                    color: secondaryText
                  }]
                } />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={divider}
                title="Add a note"
                onPress={this.showNoteModal}
                nativeFeedbackRippleColor={divider}>
                <Icon name="pencil" style={[
                  styles.actionButtonIcon,
                  {
                    color: dividerText
                  }]
                } />
              </ActionButton.Item>
            </ActionButton>
            <IButton
              title='Confirm'
              onPress={this.confirm}
              contentContainerStyle={{ height: 40, justifyContent: 'center', alignItems: 'center' }}
            />
          </Flex>}
      </WithTheme>
    );
  }

  confirm = () => {
    debugger;
    if (this.state.incidentName) {
      this.props.incidentCreated({
        incidentName: this.state.incidentName,
        images: this.state.images,
        coordinate: this.props.selectedCoordinate
      });
      pop();
    }
    else {
      this.setState({
        isErrorVisible: true
      });
    }
  }

  hideErrorModal = () => {
    this.setState({
      isErrorVisible: false
    });
  };

  showNoteModal = () => {
    this.setState({
      isNoteModalVisible: true
    });
  };

  hideNoteModal = () => {
    this.setState({
      isNoteModalVisible: false
    });
  };
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

const mapStateToProps = state => ({
  selectedCoordinate: state.main.selectedCoordinate
});

const mapDispatchToProps = dispatch => ({
  incidentCreated: incident => dispatch(incidentCreated(incident))
});

export default connect(mapStateToProps, mapDispatchToProps)(Mark);

