import expect from 'expect';
import { take, put, select, fork, cancel, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { createMockTask } from 'redux-saga/lib/utils';

import { watchSetPlayerMark, gameBg, gameLoop } from '../sagas';
import { setMark, setWinner, restartGame } from '../actions';
import { selectBoard } from '../selectors';
import { SET_MARK, SET_PLAYER_MARK, BOOT_SYMBOL, PLAYER_SYMBOL, RESTART_GAME } from '../constants';
import { findBootMove, whoWon } from '../game';

const boardMock = fromJS([1, 1, 1, 0, 0, 0, 0, 0, 0]);

describe('watchSetPlayerMark Saga', () => {
  const watcher = watchSetPlayerMark();

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
    const selectValue = watcher.next().value;
    expect(selectValue).toEqual(select(selectBoard()));
    const callValue = watcher.next(boardMock).value;
    expect(callValue).toEqual(call(findBootMove, boardMock));
    const putValue = watcher.next(index).value;
    expect(putValue).toEqual(put(setMark(index, BOOT_SYMBOL)));
  });
});

describe('gameBg Saga', () => {
  const gameBgSaga = gameBg();
  let watcher;
  const mockTask = createMockTask();

  it('should asyncronously fork watchSetPlayerMark saga', () => {
    watcher = gameBgSaga.next();
    expect(watcher.value).toEqual(fork(watchSetPlayerMark));
  });

  it('should watch for SET_MARK action', () => {
    const takeValue = gameBgSaga.next(mockTask).value;
    expect(takeValue).toEqual(take(SET_MARK));
  });

  it('should cancel forked watchSetPlayerMark saga', () => {
    const selectValue = gameBgSaga.next().value;
    expect(selectValue).toEqual(select(selectBoard()));
    const callValue = gameBgSaga.next(boardMock).value;
    expect(callValue).toEqual(call(whoWon, boardMock));
    const cancelValue = gameBgSaga.next(1).value;
    expect(cancelValue).toEqual(cancel(mockTask));
  });

  it('should dispatch setWinner action', () => {
    const putValue = gameBgSaga.next().value;
    expect(putValue).toEqual(put(setWinner(1)));
  });

  it('should return winner', () => {
    const returnValue = gameBgSaga.next().value;
    expect(returnValue).toEqual(1);
  });
});

describe('gameLoop Saga', () => {
  const gameLoopSaga = gameLoop();

  it('should watch for RESTART_GAME action', () => {
    const takeValue = gameLoopSaga.next(true).value;
    expect(takeValue).toEqual(take(RESTART_GAME));
  });

  it('should call gameBg saga', () => {
    const callValue = gameLoopSaga.next(put(RESTART_GAME)).value;
    expect(callValue).toEqual(call(gameBg));
  });
});
