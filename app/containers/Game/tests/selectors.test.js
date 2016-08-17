import {
  selectBoard,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';


describe('selectBoard', () => {
  const boardSelector = selectBoard();
  it('should select the board state', () => {
    const gameState = fromJS({
      board: [],
    });
    const mockedState = fromJS({
      game: gameState,
    });
    expect(boardSelector(mockedState)).toEqual(fromJS([]));
  });
});
