import AccountCircle from "./AccountCircle";
import mainlogo from "../Twitchy Fingers-logos_transparent.png";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={mainlogo} style={{ width: "100px" }} alt="logo" />
      </div>
      <div className="user-icon">
        {/* For user section */}
        <AccountCircle />
      </div>
    </div>
  );
}

export default Header;
