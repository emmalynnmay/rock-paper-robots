import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const authToken = useSelector(state => state.application.authToken)
  return (
    <div>
      <nav className="my-nav"><h1>ROCK PAPER ROBOTS</h1>{

      }</nav>
      <Outlet />
    </div>
  );
}

export default App
