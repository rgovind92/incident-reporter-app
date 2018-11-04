/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { AnimatedRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { push } from '../../framework/navigation';
import { IText } from '../../framework/component';

import { incidentSelected } from '../actions';

const customMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];

class IncidentMap extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Incidents'
  });

  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    };
  }

  componentDidMount() {
    const selectedIncident = this.props.selectedIncident;
    debugger;

    navigator.geolocation.getCurrentPosition(_ => {
      this.setState({
        latitude: _.coords.latitude,
        longitude: _.coords.longitude
      });
    });

    /*this.watch = navigator.geolocation.watchPosition(_ => {
      this.setState({
        latitude: _.coords.latitude,
        longitude: _.coords.longitude
      });
    });*/
  }

  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watch);
  }

  render() {
    debugger;
    const { selectedIncident, incidents } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: selectedIncident
              ? incidents[selectedIncident].coordinate.latitude
              : this.state.latitude,
            longitude: selectedIncident
              ? incidents[selectedIncident].coordinate.longitude
              : this.state.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.0030,
          }}
          customMapStyle={customMapStyle}
        >{Object.values(this.props.incidents).map(incident => 
            <MapView.Marker
              coordinate={incident.coordinate}
              key={incident.incidentName}>
              <MapView.Callout style={{
                  width: 150,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => this.navigateToDetailsScreen(incident.incidentName)}>
                <IText divider>View details</IText>
              </MapView.Callout>
            </MapView.Marker>
          )}
        </MapView>
      </View>
    );
  }

  navigateToDetailsScreen = incidentName => {
    this.props.incidentSelected(incidentName);
    push('IncidentDetails');
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  incidents: state.main.incidents,
  selectedIncident: state.main.selectedIncident
});

const mapDispatchToProps = dispatch => ({
  incidentSelected: incidentName => dispatch(incidentSelected(incidentName))
});

export default connect(mapStateToProps, mapDispatchToProps)(IncidentMap);
