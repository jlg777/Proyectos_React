import React, { useState } from "react";
import "../App.css";
import Square from "./Square";
import { WINNER_COMBOS } from "../constatnts";
import confetti from "canvas-confetti";

const TURN = { X: "❌", O: "⭕" };

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardtoCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardtoCheck[a] &&
        boardtoCheck[a] === boardtoCheck[b] &&
        boardtoCheck[a] === boardtoCheck[c]
      ) {
        return boardtoCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return; //Verifica si hay un ganador o si ya jugaron en esa celda

    const newBoard = [...board]; //Actualiza la jugada
    newBoard[index] = turn; //Actualiza el turno
    setBoard(newBoard); //Actualiza el tablero

    const newTurn = turn === TURN.X ? TURN.O : TURN.X; //Verifica el turno actual y lo cambia
    setTurn(newTurn); //Actualiza el nuevo turno
    const newWinner = checkWinner(newBoard); //Verifica el ganador
    setWinner(newWinner); //Actualiza el ganador
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (CheckEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
  };

  const CheckEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };

  return (
    <>
      <section className="game">
        {board.map((value, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <aside className="turn">
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </aside>

      {winner != null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Gano"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </>
  );
};

export default Board;
