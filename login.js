import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // To show loading state
  const navigate = useNavigate();  // useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !password) {
      toast.error("Please enter both email and password", {
        position: "bottom-center",
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      navigate("/profile");  // Use navigate for redirection
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/register">Register Here</a>
      </p>
    </form>
  );
}

export default Login;
