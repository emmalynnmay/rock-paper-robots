import { requireLogin } from "../utils/require_login.js";

export const Collection = () => {
  requireLogin();

  return (
    <div>
      <h1>Collection page</h1>
    </div>
  )
}