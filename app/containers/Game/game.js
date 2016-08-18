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
const BOT_TO_WIN_SETS = [[2, 2, 0], [2, 0, 2], [0, 2, 2]];
const PLAYER_TO_WIN_SETS = [[1, 1, 0], [1, 0, 1], [0, 1, 1]];

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
 * @param  {array} board Game state
 */
export function findBootMove(board) {
  let fieldToSelect = null;
  // try to win
  let set = checkSets(board, BOT_TO_WIN_SETS);
  if (set) return findEmptyFieldFromSet(board, set);
  // block player
  set = checkSets(board, PLAYER_TO_WIN_SETS);
  if (set) return findEmptyFieldFromSet(board, set);

  while (fieldToSelect === null) {
    const randomIndex = Math.floor(Math.random() * 10);
    if (board.get(randomIndex) === ES) fieldToSelect = randomIndex;
  }
  return fieldToSelect;
}

/**
 * Find empty field from set
 */
export function findEmptyFieldFromSet(board, set) {
  for (const index of set) {
    if (board.get(index) === ES) return index;
  }
  return null;
}

/**
 * Check if any player won or its a tie
 * @param  {array} board Game state
 */
export function whoWon(board) {
  const bootWinningSet = [[BS, BS, BS]];
  const playerWinningSet = [[PS, PS, PS]];
  let winner = checkSets(board, bootWinningSet);

  if (winner === null) {
    winner = checkSets(board, playerWinningSet);
  }
  if (!board.includes(ES) && winner === null) return []; // its a tie
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
