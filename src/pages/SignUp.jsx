import { useState } from "react";
import { signupUser } from "../config/auth";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

export default function SignUp() {
  const [signupInfo, setSignupInfo] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSignUpClick = async () => {
    try {
      if (!isSigningUp) {
        setIsSigningUp(true);
        await signupUser(
          signupInfo.fullname,
          signupInfo.email,
          signupInfo.password
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSignupInfo({ fullname: "", email: "", password: "" });
      setIsSigningUp(false);
    }
  };
  return (
    <div className="auth-page">
      <div className="form-side">
        <div className="auth-form">
          <label htmlFor="fullname">FULL NAME</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={signupInfo.fullname}
            onChange={handleChange}
          />
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            name="email"
            id="email"
            value={signupInfo.email}
            onChange={handleChange}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            name="password"
            id="password"
            value={signupInfo.password}
            onChange={handleChange}
          />
          <button onClick={handleSignUpClick} disabled={isSigningUp}>
            {isSigningUp ? "SIGNING UP" : "SIGN UP"}
          </button>
          <Link to="/login">Already have an account? Log In</Link>
          <div className="error">{error && <p>Sign Up Error</p>}</div>
        </div>
      </div>
      <img src="../images/notebooks.jpg" alt="Sign Up" />
    </div>
  );
}
