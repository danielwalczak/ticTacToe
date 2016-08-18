import { take, put, select } from 'redux-saga/effects';
import { setMark } from './actions';
import { selectBoard } from './selectors';
import { SET_MARK, BOOT_SYMBOL } from './constants';
import { findBootMove } from './game';

export function* gameBg() {
  while (yield take(SET_MARK)) {
    const board = yield select(selectBoard());
    const bootMove = findBootMove(board);
    yield put(setMark(bootMove, BOOT_SYMBOL));
  }
}
