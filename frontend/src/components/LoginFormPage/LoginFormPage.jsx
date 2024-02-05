import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const demoUser = async () => {
    const demoUser = {
      email: "demo@user.io",
      password: "password",
    };
    const serverResponse = await dispatch(thunkLogin(demoUser)).then(
      closeModal
    );
  };

  if (sessionUser) return <Navigate to="/homepage" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(thunkLogin({ email, password }))
      .then(closeModal)
      .catch(async (res) => {
        const serverResponse = await res.json();
        if (serverResponse && serverResponse.errors) {
          setErrors(serverResponse.errors);
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
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className="login-error-message">{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
        <p className="demoUser" onClick={demoUser}>
          Demo Login
        </p>
      </form>
    </>
  );
}

export default LoginFormPage;
