import {
  selectBoard,
  selectWinner,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('selectBoard', () => {
  const mockedState = fromJS({
    game: {
      winner: null,
      board: [],
    },
  });

  it('should select the board state', () => {
    const boardSelector = selectBoard();
    expect(boardSelector(mockedState)).toEqual(fromJS([]));
  });

  it('should select the winner state', () => {
    const winnerSelector = selectWinner();
    expect(winnerSelector(mockedState)).toEqual(null);
  });
});
