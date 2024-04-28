import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../store/application_slice.js";
import { useCounter } from "../utils/use_counter.js";
import { requireLogin } from "../utils/require_login.js";
import { deleteModels } from "../utils/delete_models.js";
import {Player} from "../components/Player.jsx";
import coin from "../assets/coin.png";

export const Home = () => {
  requireLogin();
  deleteModels();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState('Loading...');
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {count, add, subtract} = useCounter();

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

  function logout() {
    dispatch(setAuthToken(null));
  }

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