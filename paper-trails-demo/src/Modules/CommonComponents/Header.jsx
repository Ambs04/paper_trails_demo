import logo from "../../assets/logo.png";
import profile from "../..assets/profile.jpg";

export default function Header() {
  return (
    <>
      <div>
        <div>
          <img src={logo} />
        </div>
        <div>
          <img src={profile} />
        </div>
      </div>
    </>
  );
}
