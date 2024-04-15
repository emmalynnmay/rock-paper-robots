import { Link, Outlet } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuthToken} from "./store/application_slice.js";

function App() {
  const authToken = useSelector(state => state.application.authToken);
  const dispatch = useDispatch();

  function logout() {
    dispatch(setAuthToken(null));
  }

  return (
    <div>
      <nav className="my-nav"><h1>Rock Paper Robots</h1>{
        authToken && (
          <ul>
            <li><a onClick={logout}>Logout</a></li>
            <li><Link to="/">Play</Link></li>
            <li><Link to="/collection">My Collection</Link></li>
            <li><Link to="/store">Store</Link></li>
          </ul>
        )
      }</nav>
      <Outlet />
    </div>
  );
}

export default App
