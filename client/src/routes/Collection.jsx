import { requireLogin } from "../utils/require_login.js";

export const Collection = () => {
  requireLogin();

  return (
    <div>
      <h2>Your Collection</h2>
    </div>
  )
}