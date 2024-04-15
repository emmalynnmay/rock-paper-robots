import { requireLogin } from "../utils/require_login.js";
import {useEffect, useState} from "react";
import {useApi} from "../utils/use_api.js";
import {Product} from "../components/Product.jsx";

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
      <p>RoboCash&#8482;: {balance}</p>

      {items.map((item) => {
        return (
          <Product details={item} key={item.id} purchase={purchase}/>
        )
      })}

    </div>
  )
};