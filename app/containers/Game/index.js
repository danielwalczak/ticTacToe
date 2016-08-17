import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectBoard } from './selectors';

import styles from './styles.css';

export class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.boardContainer}>
        <div className={styles.board}>
          {
            this.props.board.map((field, index) =>
              <div className={styles.field} key={index}>
                <div className={styles.fieldRect}></div>
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
};

const mapStateToProps = createSelector(
  selectBoard(),
  (board) => ({ board })
);

export default connect(mapStateToProps)(Game);
