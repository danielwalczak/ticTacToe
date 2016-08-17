import { fromJS } from 'immutable';

const initialState = fromJS({
  board: Array(9).fill(0),
});

function gameReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default gameReducer;
