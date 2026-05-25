import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth.api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await registerApi({ name, email, password });

      if (response.data.success) {
        navigate("/login");
      } else {
        setError("Unable to register. Please try again.");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to register. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              required
            />
          </label>
          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Registering…" : "Register"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
