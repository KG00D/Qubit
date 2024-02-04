import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkAuthenticate } from "../../redux/session";
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

  return (
    <div className="nav-bar">
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
