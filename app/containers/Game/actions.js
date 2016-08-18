import {
  SET_MARK,
  SET_PLAYER_MARK,
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
