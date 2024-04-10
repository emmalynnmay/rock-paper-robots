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
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {count, add, subtract} = useCounter();

  async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, [])

  function logout() {
    dispatch(setAuthToken(null));
  }

  return (
    <div>
      <Player/>
      <div className="logout-container">
        <button onClick={logout} className="button login">Logout</button>
      </div>
    </div>
  )
}