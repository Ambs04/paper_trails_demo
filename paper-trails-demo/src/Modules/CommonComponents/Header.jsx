import logo from "../../assets/logo.png";
import profileImg from "../../assets/user.png";
import { Link, useLocation } from "react-router-dom";
import "../../Styles/header.css";

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
          width: "100vw",
          height: "100px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#465362",
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
              height: "60px",
              marginLeft: "0px",
              marginBottom: "0px",
              marginTop: "0px,",
              justifyContent: "space-between",
              objectFit: "contain",
              width: "auto",
            }}
          >
            <img src={logo} id="logo" />
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            justifySelf: "flex-start",
          }}
        >
          <h3 id="header-heading">
            {currentHeading.replace("/", "").toUpperCase()}
          </h3>
        </div>
        {!profilePage ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "50px",
              height: "100px",
              alignItems: "center",

              padding: "30px",
            }}
          >
            <Link to={currentPath}>
              <div style={{ background: "none" }}>
                <img
                  id="profile"
                  src={profileImg}
                  style={{
                    width: "100%",
                    marginTop: "0px",
                  }}
                />
              </div>
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: "150px",
              height: "150px",
              alignSelf: "center",
              marginLeft: "50px",
            }}
          >
            <img src={logo} style={{ width: "100%" }} />
          </div>
        )}
      </div>
    </>
  );
}
