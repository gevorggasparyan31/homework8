import React, { useState } from 'react';
import { SquareProps, BoardProps, GameState } from './interfaces';

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    let nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  let winner = calculateWinner(squares);
  let status = winner ? `Winner: ${winner}` : `Player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares: Array<string | null>): string | null {
  const lines: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as string;
    }
  }

  return null;
}

export default function Game() {
  let [state, setState] = useState<GameState>({
    history: [Array(9).fill(null)],
    currentMove: 0,
  });

  let { history, currentMove } = state;
  let xIsNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<string | null>) {
    let nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setState({
      history: nextHistory,
      currentMove: nextHistory.length - 1,
    });
  }

  function resetGame() {
    setState({
      history: [Array(9).fill(null)],
      currentMove: 0,
    });
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={resetGame}>Restart Game</button>
      </div>
    </div>
  );
}
