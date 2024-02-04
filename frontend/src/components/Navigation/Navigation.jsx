import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from 'react-redux';
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const navigate = useNavigate();

  const handleResetToDefaultView = () => {
    navigate('/homepage');
  };

  return (
    <div className="nav-bar">
      <ul>
        {user ? (
          <li className="net-worth-overview-button">
            <button onClick={handleResetToDefaultView}>Back to Net Worth Overview</button>
          </li>
        ) : (
          <li className="home-button">
            <NavLink to="/">Home</NavLink>
          </li>
        )}
        <li className="profile-button-container">
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
