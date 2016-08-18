import expect from 'expect';
import { take, put, select, fork, cancel, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { watchSetPlayerMark, gameBg } from '../sagas';
import { setMark } from '../actions';
import { selectBoard } from '../selectors';
import { SET_MARK, SET_PLAYER_MARK, BOOT_SYMBOL, PLAYER_SYMBOL } from '../constants';
import { findBootMove, whoWon } from '../game';


describe('watchSetPlayerMark Saga', () => {
  const watcher = watchSetPlayerMark();
  const boardMock = fromJS([1, 0, 1, 0, 0, 0, 0, 0, 0]);

  it('should watch for SET_PLAYER_MARK action', () => {
    const takeValue = watcher.next().value;
    expect(takeValue).toEqual(take(SET_PLAYER_MARK));
  });

  it('should dispatch setMark action for player', () => {
    const index = 0;
    const putValue = watcher.next({ index }).value;
    expect(putValue).toEqual(put(setMark(index, PLAYER_SYMBOL)));
  });

  it('should dispatch setMark action for bot', () => {
    const index = 0;
    const selectValue = watcher.next(boardMock).value;
    expect(selectValue).toEqual(select(selectBoard()));
    const callValue = watcher.next(boardMock).value;
    expect(callValue).toEqual(call(findBootMove, boardMock));
    const putValue = watcher.next(index).value;
    expect(putValue).toEqual(put(setMark(index, PLAYER_SYMBOL)));
  });
});
