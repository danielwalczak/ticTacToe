import expect from 'expect';
import { fromJS } from 'immutable';
import { checkSets, compareArrays } from '../game';

describe('gameFunctions', () => {
  it('should find set of values in board', () => {
    const board = fromJS([1, 0, 1, 0, 0, 0, 0, 0, 0]);
    const sets = [[1, 0, 1]];
    expect(checkSets(board, sets)).toEqual([0, 1, 2]);
  });

  it('should not find set of values in board', () => {
    const board = fromJS([1, 0, 1, 0, 0, 0, 0, 0, 0]);
    const sets = [[1, 1, 1]];
    expect(checkSets(board, sets)).toEqual(null);
  });

  it('Values in two arrays should match', () => {
    expect(compareArrays([1], [1])).toEqual(true);
  });

  it('Values in two arrays shouldn\'t match', () => {
    expect(compareArrays([1], [0])).toEqual(false);
  });
});
