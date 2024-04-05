import { requireLogin } from "../utils/require_login.js";

export const TheStore = () => {
  requireLogin();

  return (
    <div>
      <h1>Store page</h1>
    </div>
  )
}