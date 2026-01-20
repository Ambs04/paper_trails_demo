import logo from "../../assets/logo.png";
import profileImg from "../../assets/user.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div
        style={{
          borderBottom: "2px solid black",
          width: "100%",
          height: "30%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "250px",
            marginLeft: "0px",
            marginBottom: "0px",
            marginTop: "0px,",
          }}
        >
          <img src={logo} style={{ width: "100%" }} />
        </div>
        <div
          style={{
            display: "flex",
            width: "100px",
            height: "100px",
            alignSelf: "center",
          }}
        >
          <Link to="/login">
            <button style={{ background: "white" }}>
              <img src={profileImg} style={{ width: "100%" }} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
