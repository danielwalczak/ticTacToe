import { take, put, select, fork, cancel, call } from 'redux-saga/effects';
import { setMark, setWinner } from './actions';
import { selectBoard } from './selectors';
import { SET_MARK, SET_PLAYER_MARK, BOOT_SYMBOL, PLAYER_SYMBOL } from './constants';
import { findBootMove, whoWon } from './game';

/**
 * Watch for player move and after do bot move
 */
export function* watchSetPlayerMark() {
  while (true) {
    const { index } = yield take(SET_PLAYER_MARK);
    yield put(setMark(index, PLAYER_SYMBOL));

    const board = yield select(selectBoard());
    const bootMove = yield call(findBootMove, board);
    yield put(setMark(bootMove, BOOT_SYMBOL));
  }
}

/**
 * Watch for Any setMark action and check if someone won game
 * Finish game if there is a winner
 */
export function* gameBg() {
  let winner = null;
  const watcher = yield fork(watchSetPlayerMark);
  while (winner === null) {
    yield take(SET_MARK);
    const board = yield select(selectBoard());
    winner = yield call(whoWon, board);
  }
  yield cancel(watcher);
  yield put(setWinner(winner));
  return winner;
}
