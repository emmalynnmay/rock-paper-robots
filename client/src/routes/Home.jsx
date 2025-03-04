import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import { requireLogin } from "../utils/require_login.js";
import {Player} from "../components/Player.jsx";
import coin from "../assets/coin.png";

export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState('Loading...');
  const api = useApi();

  async function pullDataForPage() {
    const {user} = await api.get("/users/me");
    setUser(user);
    await updateWallet();
  }

  async function updateWallet() {
    const wallet = await api.get("/wallets");
    setBalance(JSON.stringify(wallet.balance));
  }

  useEffect(() => {
    pullDataForPage();
  }, []);

  return (
    <>
      <div className="robocash-container">
        <p className="robocash">RoboCash&#8482; Balance: {balance}</p>
        <img src={coin} alt="Coins." className="coins"/>
      </div>

      <Player updateWallet={updateWallet}/>
    </>
  )
}