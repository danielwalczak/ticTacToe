import {
  EMPTY_SYMBOL as ES,
  PLAYER_SYMBOL as PS,
  BOOT_SYMBOL as BS,
} from './constants';
const WINNING_INDEKSES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical rows
  [0, 4, 8], [2, 4, 6], // diagonal
];

/**
 * Find matching set of values in board and return list of indekses
 * e.g set [1, 1, 0]
 * @param  {array} board Game state
 * @param  {array} sets  list of values to find
 * @return {array}       Found set of indexes
 */
export function checkSets(board, sets) {
  for (const list of WINNING_INDEKSES) {
    const boardValues = [];
    for (const index of list) {
      boardValues.push(board.get(index));
    }
    for (const set of sets) {
      if (compareArrays(set, boardValues)) {
        return list;
      }
    }
  }
  return null;
}

/**
 * Find winning move for boot
 */
export function findBootMove(board) {
  let fieldToSelect;
  while (fieldToSelect === undefined) {
    const randomIndex = Math.floor(Math.random() * 10);
    if (board.get(randomIndex) === ES) fieldToSelect = randomIndex;
  }
  return fieldToSelect;
}

/**
 * Check if any player won or its a tie
 */
export function whoWon(board) {
  const bootWinningSet = [[BS, BS, BS]];
  const playerWinningSet = [[PS, PS, PS]];
  let winner = checkSets(board, bootWinningSet);

  if (winner === null) {
    winner = checkSets(board, playerWinningSet);
  }
  if (!board.has(ES) && winner === null) return 0; // its a tie
  return winner;
}

/**
 * Compare two Arrays Values
 * @param  {array} arr1
 * @param  {array} arr2
 * @return {boolean}
 */
export function compareArrays(arr1, arr2) {
  return arr1.every((value, index) => value === arr2[index]);
}
