import { createSelector } from 'reselect';

const selectGame = () => state => state.get('game');

const selectBoard = () => createSelector(
  selectGame(),
  (gameState) => gameState.get('board')
);

const selectWinner = () => createSelector(
  selectGame(),
  (gameState) => gameState.get('winner')
);

export {
  selectGame,
  selectBoard,
  selectWinner,
};
