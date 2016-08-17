import expect from 'expect';
import { fromJS } from 'immutable';
import gameReducer from '../reducer';
import { setMark } from '../actions';

describe('gameReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      board: Array(9).fill(0),
    });
  });

  it('returns the initial state', () => {
    expect(gameReducer(undefined, {})).toEqual(fromJS(state));
  });

  it('should handle the setMark action correctly', () => {
    const index = 0;
    const value = 1;
    const expectedResult = state
      .updateIn(['board'], board => board.set(index, value));

    expect(gameReducer(state, setMark(index, value))).toEqual(expectedResult);
  });
});
