import * as types from './types';

export const coordinateSelected = payload => ({
  type: types.COORDINATE_SELECTED,
  payload
});

export const incidentSelected = payload => ({
  type: types.INCIDENT_SELECTED,
  payload
});

export const titleAdded = payload => ({
  type: types.TITLE_ADDED,
  payload
});

export const imageAdded = payload => ({
  type: types.IMAGE_ADDED,
  payload
});

export const descriptionAdded = payload => ({
  type: types.DESCRIPTION_ADDED,
  payload
});

export const taskAdded = task => ({
  type: types.TASK_ADDED,
  payload: task
});

export const incidentCreated = payload => ({
  type: types.INCIDENT_CREATED,
  payload
})