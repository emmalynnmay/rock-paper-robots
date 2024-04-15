import { requireLogin } from "../utils/require_login.js";
import {Item} from "../components/Item.jsx";
import {useApi} from "../utils/use_api.js";
import {useEffect, useState} from "react";

export const Collection = () => {
  requireLogin();
  const api = useApi();

  const [items, setItems] = useState([]);

  useEffect(() => {
    pullItems();
  }, []);

  async function pullItems() {
    const collection = await api.get("/collections");
    setItems(collection.collection.items);
  }

  return (
    <div>
      <h2>Your Collection</h2>

      {items.map((item) => {
        return (
          <Item details={item} key={item.id}/>
        )
      })}
    </div>
  )
}