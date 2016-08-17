import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectBoard } from './selectors';

export class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {
          this.props.board.map((field, index) =>
            <div key={index}>{index}</div>
          )
        }
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
