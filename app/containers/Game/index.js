import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectBoard } from './selectors';
import { setMark } from './actions';
import {
  EMPTY_SYMBOL,
  PLAYER_SYMBOL,
} from './constants';

import styles from './styles.css';

export class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function

  createField(value, index) {
    if (value === EMPTY_SYMBOL) {
      return (
        <div onClick={() => this.props.onFieldClick(index)} className={styles.fieldRect}></div>
      );
    }
    const markClass = value === PLAYER_SYMBOL ? 'playerMark' : 'bootMark';
    return (
      <div className={`${styles.fieldRect} ${styles[markClass]}`}></div>
    );
  }

  render() {
    return (
      <div className={styles.boardContainer}>
        <div className={styles.board}>
          {
            this.props.board.map((field, index) =>
              <div className={styles.field} key={index}>
                {this.createField(field, index)}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  board: React.PropTypes.array,
  onFieldClick: React.PropTypes.func,
};

const mapStateToProps = createSelector(
  selectBoard(),
  (board) => ({ board })
);

function mapDispatchToProps(dispatch) {
  return {
    onFieldClick: (index) => dispatch(setMark(index, PLAYER_SYMBOL)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
