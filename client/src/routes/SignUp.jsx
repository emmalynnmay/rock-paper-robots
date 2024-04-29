import { useState } from "react";
import { useApi } from "../utils/use_api.js";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/application_slice.js";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function createUser(e) {
    e.preventDefault();
    const res = await api.post("/users", {
      email,
      password,
      firstName,
      lastName
    });
    dispatch(setAuthToken(res.token));

    if (!res) {
      alert('Your email must be unique. Try signing into an existing account.');
      return;
    }

    const wallet = await api.post("/wallets", {
      userId: res.user.id
    });
    
    const collection = await api.post("/collections", {
      userId: res.user.id
    });

    navigate("/");
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={createUser} className="login-box">
        <input
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button login" type="submit">Sign Up</button>
        <a className="swap" onClick={() => navigate("/login")}>Log in to an existing account</a>

      </form>
    </div>
  )
}