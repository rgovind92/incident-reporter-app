import * as types from '../types';

const initialState = {
  selectedCoordinate: {},
  taskTitle: '',
  taskDescription: '',
  image: null,

  selectedIncident: 'In1',

  incidents: {
    /*In1: {
      incidentName: 'In1',
      description: 'Desc',
      images: [{
        source: {
          uri: 'content://com.google.android.apps.photos.contentprovider/-1/1/content%3A%2F%2Fmedia%2Fexternal%2Fimages%2Fmedia%2F13297/ORIGINAL/NONE/10703303'
        },
        data:''
      }],
      coordinate: {
        latitude: 0,
        longitude: 0
      }
    }*/
  }
};

export default (state = initialState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case types.COORDINATE_SELECTED:
      return { ...state, selectedCoordinate: action.payload };
    case types.TITLE_ADDED:
      return { ...state, selectedCoordinate: action.payload };
    case types.IMAGE_ADDED:
      return { ...state, selectedCoordinate: action.payload };
    case types.DESCRIPTION_SELECTED:
      return { ...state, selectedCoordinate: action.payload };
    case types.INCIDENT_CREATED:
      debugger;
      const nextIncidents = { ...state.incidents };
      nextIncidents[action.payload.incidentName] = action.payload;
      return { ...state, incidents: nextIncidents };
    case types.INCIDENT_SELECTED:
      return { ...state, selectedIncident: action.payload };
  }

  return nextState;
}