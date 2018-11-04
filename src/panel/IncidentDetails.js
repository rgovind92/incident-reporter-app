import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, FlatList } from 'react-native';
import Gallery from 'react-native-image-gallery';

import { IText, IButton, ITextInput } from '../../framework/component';
import { pop } from '../../framework/navigation';

class IncidentDetails extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Incident Details'
  });

  render() {
    const incident = this.props.incidents[this.props.selectedIncident];

    return (
      <View style={styles.container}>
        <View style={{ padding: 16, flex:1 }}>
          <ITextInput
            placeholder='Name'
            value={incident.incidentName}
          />
          <ITextInput
            placeholder='Name'
            value={incident.description}
            contentContainerStyle={{ marginTop: 16 }}
          />
          <View style={{ padding: 16, flex: 1 }}>
            <Gallery
              style={{
                width: '100%'
              }}
              images={incident.images}
            />
          </View>
        </View>
        <IButton
          title='Done'
          onPress={this.navigate}
          contentContainerStyle={{ width: '100%', height: 40 }}
        />
      </View>
    );
  }

  navigate = () => pop();
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    width: '100%'
  }
});

const mapStateToProps = state => ({
  selectedIncident: state.main.selectedIncident,
  incidents: state.main.incidents
});

export default connect(mapStateToProps)(IncidentDetails);