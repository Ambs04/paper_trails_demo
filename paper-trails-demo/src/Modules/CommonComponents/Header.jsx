import logo from "../../assets/logo.png";
import profileImg from "../../assets/user.png";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const currentHeading = location.pathname;

  const currentPath = location.pathname === "/" ? "/login" : "/profile";

  const profilePage = location.pathname === "/profile";

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
        {profilePage ? (
          <div>
            <button onClick={() => window.history.back()}>X</button>
          </div>
        ) : (
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
        )}
        <div>
          <h3 id="header-heading">{currentHeading.replace("/", "")}</h3>
        </div>
        {!profilePage ? (
          <div
            style={{
              display: "flex",
              width: "100px",
              height: "100px",
              alignSelf: "center",
            }}
          >
            <Link to={currentPath}>
              <button style={{ background: "white" }}>
                <img src={profileImg} style={{ width: "100%" }} />
              </button>
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: "150px",
              height: "150px",
              alignSelf: "center",
            }}
          >
            <img src={logo} style={{ width: "100%" }} />
          </div>
        )}
      </div>
    </>
  );
}
