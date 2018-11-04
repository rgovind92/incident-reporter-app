import React from 'react';
import { View } from 'react-native';

import { WithScreenLoadActions } from '../../framework/container';
import SwitchTheme from '../../framework/app/panel/SwitchTheme';

import Map from '../panel/Map';
import Mark from '../panel/Mark';
import AddNote from '../panel/AddNote';
import IncidentDetails from '../panel/IncidentDetails';
import IncidentMap from '../panel/IncidentMap';
import IncidentList from '../panel/IncidentList';
import { fetchMenu } from '../../framework/commands';

export default {
  login: true,
  menu: true,
  footer: false,
  landingPage: 'Map',
  routes: {
    Map: {
      screen: WithScreenLoadActions(Map, {
        screenLoadActions: [ fetchMenu ]
      }),
    },
    AddNote: {
      screen: AddNote
    },
    Mark: {
      screen: Mark
    },
    IncidentDetails: {
      screen: IncidentDetails
    },
    IncidentMap: {
      screen: IncidentMap
    },
    Incidents: {
      screen: IncidentList
    },
    SwitchTheme: {
      screen: SwitchTheme
    }
  }
};
