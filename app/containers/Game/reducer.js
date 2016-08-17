import { fromJS } from 'immutable';
import {
  SET_MARK,
} from './constants';

const initialState = fromJS({
  board: Array(9).fill(0),
});

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MARK:
      return state
        .updateIn(['board'], board =>
          board.set(action.index, action.value));
    default:
      return state;
  }
}

export default gameReducer;
