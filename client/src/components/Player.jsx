import { useState } from "react";
import { useApi } from "../utils/use_api.js";

export const Player = ({updateWallet}) => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const api = useApi();

  const handlePlayerChoice = async (choice) => {
    const result = await api.post("/play", {
      action: choice
    });

    setPlayerChoice(choice);
    setComputerChoice(result.robotChoice);
    setResult(result.result);

    if (result.result === "You win!!") {
      await updateWallet();
    }
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