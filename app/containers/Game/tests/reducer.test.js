import expect from 'expect';
import { fromJS } from 'immutable';
import gameReducer from '../reducer';
import { setMark, setWinner, restartGame } from '../actions';

describe('gameReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      winner: null,
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

  it('should handle the setWinner action correctly', () => {
    const winner = 1;
    const expectedResult = state
      .set('winner', winner);

    expect(gameReducer(state, setWinner(winner))).toEqual(expectedResult);
  });

  it('should handle the restartGame action correctly', () => {
    const mockState = state
      .set('winner', 1)
      .setIn(['board'], fromJS(Array(9).fill(1)));

    expect(gameReducer(mockState, restartGame())).toEqual(state);
  });
});
