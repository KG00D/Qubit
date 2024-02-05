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

  if (sessionUser) return <Navigate to="/homepage" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );
    console.log("api response ", serverResponse);

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      console.log("Before navigating");
      navigate("/");
      closeModal();
      console.log("After navigating");
    }
    // } catch (error) {
    //   console.log("err", error);
    //   setErrors(["something went wrong"]);
    // }
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
        {errors.password && <p>{errors.password}</p>}
        {
          errors && (
            // errors.map((error) => (
            <p className="login-error-message" key={errors}>
              {errors.message}
            </p>
          )
          // ))
        }
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
