import { requireLogin } from "../utils/require_login.js";
import {useEffect, useState} from "react";
import {useApi} from "../utils/use_api.js";
import {Product} from "../components/Product.jsx";
import coin from "../assets/coin.png";

export const TheStore = () => {
  requireLogin();
  const api = useApi();

  const [balance, setBalance] = useState('Loading...');
  const [items, setItems] = useState([]);

  useEffect(() => {
    updateWallet();
    pullProducts();
  }, []);

  async function updateWallet() {
    const wallet = await api.get("/wallets");
    setBalance(JSON.stringify(wallet.balance));
  }

  async function pullProducts() {
    const items = await api.get("/items");
    setItems(items.items);
  }

  async function purchase(item) {
    console.log(`purchasing ${item.name}`);
    alert(`${item.name} has been purchased and added to your collection!`);
  }

  return (
    <div>
      <h2>Store</h2>

      <div className="robocash-container">
        <p className="robocash">RoboCash&#8482; Balance: {balance}</p>
        <img src={coin} alt="Coins." className="coins"/>
      </div>

      {items.map((item) => {
        return (
          <Product details={item} key={item.id} purchase={purchase}/>
        )
      })}

    </div>
  )
};