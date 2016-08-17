import expect from 'expect';
import gameReducer from '../reducer';
import { fromJS } from 'immutable';

describe('gameReducer', () => {
  it('returns the initial state', () => {
    expect(gameReducer(undefined, {})).toEqual(fromJS({
      board: Array(9).fill(0),
    }));
  });
});
