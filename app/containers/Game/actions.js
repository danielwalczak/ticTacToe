import {
  SET_MARK,
} from './constants';

export function setMark(index, value) {
  return {
    type: SET_MARK,
    index,
    value,
  };
}
