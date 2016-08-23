import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectWinner } from '../Game/selectors';
import { restartGame } from '../Game/actions';

import Game from '../Game';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.dispatch(restartGame());
  }

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
    const restart = this.props.winner
      !== null ? <button onClick={this.props.onButtonClick}>restart</button> : '';
    return (
      <div>
        <Game />
        <div style={{ textAlign: 'center' }}>
          <h2>{this.displayWinner()}</h2>
          {restart}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  winner: React.PropTypes.number,
  onButtonClick: React.PropTypes.func,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = createSelector(
  selectWinner(),
  (winner) => ({ winner })
);

function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: () => dispatch(restartGame()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
