import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../store/application_slice.js";
import { useCounter } from "../utils/use_counter.js";
import { requireLogin } from "../utils/require_login.js";
import {Player} from "../components/Player.jsx";

export const Home = () => {
  requireLogin();
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
    <div>
      <p>RoboCash&#8482;: {balance}</p>
      <Player updateWallet={updateWallet}/>
      <button onClick={() => navigate("/collection")} className="button to-collection">Collection</button>
      <button onClick={() => navigate("/store")} className="button to-collection">Store</button>
      <div className="logout-container">
        <button onClick={logout} className="button login">Logout</button>
      </div>
    </div>
  )
}