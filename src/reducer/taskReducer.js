import * as types from './types';

const initialState = {
  tasks: {}
};

export default (state = initialState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case types.ADD_TASK:
      const newTask = action.payload;
      return { ...state, newTask };
  }

  return nextState;
}