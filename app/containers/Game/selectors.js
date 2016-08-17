import { createSelector } from 'reselect';

const selectGame = () => state => state.get('game');

const selectBoard = () => createSelector(
  selectGame(),
  (gameState) => gameState.get('board')
);

export {
  selectGame,
  selectBoard,
};
