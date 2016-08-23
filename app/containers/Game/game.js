import {
  EMPTY_SYMBOL as ES,
  PLAYER_SYMBOL as PS,
  BOOT_SYMBOL as BS,
} from './constants';

/**
 * List of arrays with indexes which represents rows to cross
 * @type {Array}
 */
const WINNING_INDEKSES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical rows
  [0, 4, 8], [2, 4, 6], // diagonal
];
/**
 * Posible marks variations that can win game
 * @type {Array}
 */
const BOT_TO_WIN_SETS = [[BS, BS, 0], [BS, 0, BS], [0, BS, BS]];
const PLAYER_TO_WIN_SETS = [[PS, PS, 0], [PS, 0, PS], [0, PS, PS]];
/**
 * Winning marks variation
 * @type {Array}
 */
const bootWinningSet = [[BS, BS, BS]];
const playerWinningSet = [[PS, PS, PS]];

/**
 * Find matching set of values in board and return list of indexes
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
 * Find next bot move
 * @param  {array} board Game state
 * @return {number} index
 */
export function findBootMove(board) {
  let indexToSelect = null;
  // try to win
  let set = checkSets(board, BOT_TO_WIN_SETS);
  if (set) return findEmptyFieldFromSet(board, set);
  // block player
  set = checkSets(board, PLAYER_TO_WIN_SETS);
  if (set) return findEmptyFieldFromSet(board, set);

  while (indexToSelect === null) {
    const randomIndex = Math.floor(Math.random() * 10);
    if (board.get(randomIndex) === ES) indexToSelect = randomIndex;
  }
  return indexToSelect;
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
 * @return {number} winner 0 - remis | BS | PS
 */
export function whoWon(board) {
  let winner = checkSets(board, bootWinningSet) ? BS : null;
  if (winner === null) winner = checkSets(board, playerWinningSet) ? PS : null;
  if (!board.includes(ES) && winner === null) return 0;
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
