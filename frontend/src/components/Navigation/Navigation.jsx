import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-bar">
      <ul>
        <li className="home-button">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="profile-button-container">
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}


export default Navigation;
