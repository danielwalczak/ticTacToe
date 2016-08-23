import { fromJS } from 'immutable';
import {
  SET_MARK,
  EMPTY_SYMBOL,
  SET_WINNER,
} from './constants';

const initialState = fromJS({
  winner: null,
  board: Array(9).fill(EMPTY_SYMBOL),
});

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MARK:
      return state
        .updateIn(['board'], board =>
          board.set(action.index, action.value));
    case SET_WINNER:
      return state
        .set('winner', action.winner);
    default:
      return state;
  }
}

export default gameReducer;
