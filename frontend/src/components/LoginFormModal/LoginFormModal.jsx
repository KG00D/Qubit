import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogin } from "../../redux/session"; // Adjust the import according to your actual file structure
import { useNavigate, Navigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  // function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/accounts" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(thunkLogin({ email, password }))
      .then(() => navigate("/homepage"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <p className="login-error-message">{errors.email}</p>
          )}
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <p className="login-error-message">{errors.password}</p>
          )}
        </label>
        {errors.credential && (
          <p className="login-error-message">{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
