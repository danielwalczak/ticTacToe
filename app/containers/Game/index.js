import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectBoard } from './selectors';
import { setMark } from './actions';

import styles from './styles.css';

export class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className={styles.boardContainer}>
        <div className={styles.board}>
          {
            this.props.board.map((field, index) =>
              <div className={styles.field} key={index}>
                <div onClick={() => this.props.onFieldClick(index)} className={styles.fieldRect}></div>
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
    onFieldClick: (index) => dispatch(setMark(index, 1)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
