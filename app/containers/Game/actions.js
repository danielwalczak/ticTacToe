import {
  SET_MARK,
  SET_PLAYER_MARK,
  SET_WINNER,
  RESTART_GAME,
} from './constants';

export function setMark(index, value) {
  return {
    type: SET_MARK,
    index,
    value,
  };
}

export function setPlayerMark(index) {
  return {
    type: SET_PLAYER_MARK,
    index,
  };
}

export function setWinner(winner) {
  return {
    type: SET_WINNER,
    winner,
  };
}

export function restartGame() {
  return {
    type: RESTART_GAME,
  };
}
