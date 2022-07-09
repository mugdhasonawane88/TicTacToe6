import React, { useState, useEffect } from 'react';
import { Constants, Position, Player_Name } from '../constants/Constants';
import PropTypes from 'prop-types';

function Status({ currentPlayer, board, onGameEnd }) {
  const [statusMessage, setStatusMessage] = useState('');
  const [winner, setWinner] = useState('');

  useEffect(() => {
    updateStatus();
  });

  const updateStatus = () => {

    if (hasWinner()) {
      setStatusMessage(winner + Constants.WON);
      onGameEnd(true);
      return;
    }
    setStatusMessage(currentPlayer.NAME + Constants.TURN);
  };

  const getPlayerSymbol = (board, winningSquares) => {
    return board[winningSquares[Position.FIRST_SQUARE]];
  }

  const hasWinner = () => {
    return isTopRowPlayedBySamePlayer() ||
      isMiddleRowPlayedBySamePlayer();
  }

  const isTopRowPlayedBySamePlayer = () => {
    if (isSquaresPlayedBySamePlayer(Position.TOP_ROW_SQUARES)) {
      setWinner(Player_Name[getPlayerSymbol(board, Position.TOP_ROW_SQUARES)]);
      return true;
    };
    return false;
  };

  const isMiddleRowPlayedBySamePlayer = () => {
    if (isSquaresPlayedBySamePlayer(Position.MIDDLE_ROW_SQUARES)) {
      setWinner(Player_Name[getPlayerSymbol(board, Position.MIDDLE_ROW_SQUARES)]);
      return true;
    };
    return false;
  };

  const isSquaresPlayedBySamePlayer = (positions) => {
    return positions.map((position) => board[position])
      .every((value, index, squares) => value && value === squares[Position.FIRST_SQUARE]);
  };

  return (
    <label data-testid="status">{statusMessage}</label>
  );
}

Status.propTypes = {
  currentPlayer: PropTypes.object.isRequired,
  board: PropTypes.array.isRequired,
  onGameEnd: PropTypes.func.isRequired
};

export default Status;
