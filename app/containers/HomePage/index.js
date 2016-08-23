import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectWinner } from '../Game/selectors';

import Game from '../Game';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  displayWinner() {
    switch (this.props.winner) {
      case 0:
        return 'remis';
      case 1:
        return 'player wins';
      case 2:
        return 'computer wins';
      default:
        return '';
    }
  }

  render() {
    return (
      <div>
        <Game />
        <div style={{ textAlign: 'center' }}>
          <h2>{this.displayWinner()}</h2>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  winner: React.PropTypes.number,
};

const mapStateToProps = createSelector(
  selectWinner(),
  (winner) => ({ winner })
);

export default connect(mapStateToProps)(HomePage);
