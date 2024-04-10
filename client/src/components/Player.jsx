import { useState } from "react";
import { useApi } from "../utils/use_api.js";

export const Player = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = ['Rock', 'Paper', 'Scissors'];
  const api = useApi();

  const handlePlayerChoice = async (choice) => {
    const result = await api.post("/play", {
      action: choice
    });
    setPlayerChoice(choice);
    setComputerChoice(result.robotChoice);
    setResult(result.result);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="game-container">
      <div className="choices-container">
        <button className="choice-button" onClick={() => handlePlayerChoice('Rock')}>Rock</button>
        <button className="choice-button" onClick={() => handlePlayerChoice('Paper')}>Paper</button>
        <button className="choice-button" onClick={() => handlePlayerChoice('Scissors')}>Scissors</button>
      </div>
      {playerChoice && computerChoice && result && (
        <div className="result-container">
          <p>You chose: {playerChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>{result}</p>
          <button className="play-again-button" onClick={resetGame}>Play again</button>
        </div>
      )}
    </div>
  )
}