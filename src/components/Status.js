import React, { useState, useEffect } from 'react';
import { Constants, Position, Player_Name } from '../constants/Constants';
import PropTypes from 'prop-types';

function Status({ currentPlayer, board, onGameEnd }) {
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    updateStatus();
  });

  const updateStatus = () => {
    if (isTopRowPlayedBySamePlayer()) {
      setStatusMessage(Player_Name[getPlayerSymbol(board)] + Constants.WON);
      onGameEnd(true);
      return;
    }
    setStatusMessage(currentPlayer.NAME + Constants.TURN);
  };

  const getPlayerSymbol = (board) => {
    return board[Position.TOP_ROW_SQUARES[Position.FIRST_SQUARE]];
  }

  const isTopRowPlayedBySamePlayer = () => {
    return Position.TOP_ROW_SQUARES.map((position) => board[position])
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
