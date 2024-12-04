import { useState } from "react";
import { logoutUser } from "../config/auth";
import { useAuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { currentUser } = useAuthContext();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const handleLogoutClick = async () => {
    try {
      if (!isSigningOut) {
        setIsSigningOut(true);
        await logoutUser();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <nav className="navbar">
      <h1>Notebook</h1>
      <div className="user-info">
        <h4>
          Hello,{" "}
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </h4>
        <button disabled={isSigningOut} onClick={handleLogoutClick}>
          <i className="material-icons">logout</i>
          <h3>{isSigningOut ? "SIGNING OUT" : "SIGN OUT"}</h3>
        </button>
      </div>
    </nav>
  );
}
