import { useState } from "react";
import { useApi } from "../utils/use_api.js";
import rock from "../assets/stone.png";
import paper from "../assets/paper.png";
import scissors from "../assets/scissor.png";

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

        <div className="choice-box" onClick={() => handlePlayerChoice('Rock')}>
          <label className="choice-label">Rock</label>
          <img src={rock} alt="Rock." className="choice-icon"/>
        </div>

        <div className="choice-box" onClick={() => handlePlayerChoice('Paper')}>
          <label className="choice-label">Paper</label>
          <img src={paper} alt="Paper." className="choice-icon"/>
        </div>

        <div className="choice-box" onClick={() => handlePlayerChoice('Scissors')}>
          <label className="choice-label">Scissors</label>
          <img src={scissors} alt="Scissors." className="choice-icon"/>
        </div>

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