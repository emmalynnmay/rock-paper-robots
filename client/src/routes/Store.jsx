import { requireLogin } from "../utils/require_login.js";
import {useEffect, useState} from "react";
import {useApi} from "../utils/use_api.js";

export const TheStore = () => {
  requireLogin();
  const api = useApi();

  const [balance, setBalance] = useState('Loading...');

  useEffect(() => {
    updateWallet();
  }, []);

  async function updateWallet() {
    const wallet = await api.get("/wallets");
    setBalance(JSON.stringify(wallet.balance));
  }

  async function pullProducts() {
    const wallet = await api.get("/wallets");
    setBalance(JSON.stringify(wallet.balance));
  }

  return (
    <div>
      <h2>Store</h2>
      <p>RoboCash&#8482;: {balance}</p>

    </div>
  )
}