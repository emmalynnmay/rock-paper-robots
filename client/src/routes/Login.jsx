import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../utils/use_api.js";
import { deleteModels } from "../utils/delete_models.js";
import { setAuthToken } from "../store/application_slice.js";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const api = useApi();
  const dispatch = useDispatch();

  deleteModels();

  async function login(e) {
    e.preventDefault();
    const {token} = await api.post("/sessions", {
      email,
      password,
    });

    if (!token) {
      alert('Email or password incorrect. Please try again.');
      return;
    }

    dispatch(setAuthToken(token));
    navigate("/");
  }

  return (
    <>

      <h2>Login</h2>

      <form onSubmit={login} className="login-box">
        <input
          placeholder="Email"
          type="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button className="button login" type="submit">Login</button>
        <a className="swap" onClick={() => navigate("/signup")}>Create a new account</a>

      </form>


    </>
  )
}