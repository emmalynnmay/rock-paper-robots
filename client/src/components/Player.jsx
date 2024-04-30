import {useEffect, useState} from "react";
import { useApi } from "../utils/use_api.js";
import rock from "../assets/stone.png";
import paper from "../assets/paper.png";
import scissors from "../assets/scissor.png";

const MESSAGES = ['Game on!', 'Silly humans can never beat me!', 'Prepare for your defeat, mortal', 'Initiating Rock-Paper-Scissors protocol...'];

export const Player = ({updateWallet}) => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState('Loading...');

  const api = useApi();

  useEffect(() => {
    setImageUrl(`https://robohash.org/${Date.now()}`);
    setMessage(pickRobotMessage());
  }, []);

  function pickRobotMessage() {
    return MESSAGES[Math.floor(Math.random()*MESSAGES.length)];
  }

  function getImage(choice) {
    if (choice === "Rock") {
      return <img src={rock} alt="Rock." className="choice-icon"/>;
    } else if (choice === "Paper") {
      return <img src={paper} alt="Paper." className="choice-icon"/>;
    } else if (choice === "Scissors") {
      return <img src={scissors} alt="Scissors." className="choice-icon"/>;
    }
  }

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
    setMessage(pickRobotMessage());
    setImageUrl(`https://robohash.org/${Date.now()}`);
  };

  return (
    <div className="game-container">

      <img
        src={imageUrl}
        alt="Robot."
        className="robot"
      />
      <p className="robot-message">{message}</p>

      <div className="choices-container">

        <div className="choice-box" onClick={() => handlePlayerChoice('Rock')}>
          <label className="choice-label">Rock</label>
        </div>

        <div className="choice-box" onClick={() => handlePlayerChoice('Paper')}>
          <label className="choice-label">Paper</label>
        </div>

        <div className="choice-box" onClick={() => handlePlayerChoice('Scissors')}>
          <label className="choice-label">Scissors</label>
        </div>

      </div>
      {playerChoice && computerChoice && result && (
        <div className="result-container">

          <div className="both-choices-container">
            <div className="both-choices">
              <p><strong>You chose:</strong> {playerChoice}</p>
              {getImage(playerChoice)}
            </div>

            <div className="both-choices">
              <p><strong>Robot chose:</strong> {computerChoice}</p>
              {getImage(computerChoice)}
            </div>
          </div>

          <p><strong>{result}</strong></p>
          <button className="play-again-button" onClick={resetGame}>Reset</button>
        </div>
      )}
    </div>
  )
}