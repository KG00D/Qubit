import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkAuthenticate } from "../../redux/session";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) {
    return null;
  }

  const isLoggedIn = !!user;

  const linkDestination = isLoggedIn ? "/homepage" : "/";

  return (
    <div className="nav-bar">
      <Link to={linkDestination} className="brand-link">
        <div className="brand">Qubit</div>
      </Link>
      <ul>
        {isLoggedIn && (
          <li className="profile-button-container">
            <ProfileButton />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
