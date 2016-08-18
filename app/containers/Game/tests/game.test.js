import expect from 'expect';
import { fromJS } from 'immutable';
import { checkSets, whoWon, findBootMove, compareArrays } from '../game';

describe('checkSets game', () => {
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

describe('findBootMove', () => {
  it('should find winning field', () => {
    const board = fromJS([2, 0, 2, 0, 1, 1, 1, 0, 0]);
    expect(findBootMove(board)).toEqual(1);
  });

  it('should find blocking field', () => {
    const board = fromJS([1, 0, 1, 0, 2, 0, 0, 0, 0]);
    expect(findBootMove(board)).toEqual(1);
  });

  it('should find random empty field', () => {
    const board = fromJS([1, 0, 0, 0, 1, 1, 1, 0, 0]);
    expect(findBootMove(board)).toBeA('number');
  });
});

describe('whoWon game', () => {
  it('should return bot winning set', () => {
    const board = fromJS([2, 2, 2, 0, 0, 0, 0, 0, 0]);
    expect(whoWon(board)).toEqual([0, 1, 2]);
  });

  it('should return player winning set', () => {
    const board = fromJS([1, 1, 1, 0, 0, 0, 0, 0, 0]);
    expect(whoWon(board)).toEqual([0, 1, 2]);
  });

  it('should return tie', () => {
    const board = fromJS([1, 2, 2, 2, 1, 1, 1, 2, 2]);
    expect(whoWon(board)).toEqual([]);
  });
});
