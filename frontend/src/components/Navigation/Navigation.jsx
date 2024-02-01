import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from 'react-redux';
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);

  return (
    <div className="nav-bar">
      <ul>
        {user && (
          <li className="home-button">
            <NavLink to="/">Home</NavLink>
          </li>
        )}
        {(
          <li className="profile-button-container">
            <ProfileButton />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
