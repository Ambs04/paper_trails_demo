import logo from "../../assets/logo.png";
import profileImg from "../../assets/user.png";
import { Link, useLocation } from "react-router-dom";
import "../../Styles/header.css";
import dashImg from "../../assets/blank_image_loading.png";

export default function Header() {
  const location = useLocation();

  const currentHeading = location.pathname;

  {
    /*} const currentPath = location.pathname === "/" ? "/login" : "/profile";
  const profilePage = location.pathname === "/profile";*/
  }

  const path = location.pathname;
  const homePage = path === "/";
  const profilePage = path === "/profile";
  const iconLink = homePage ? "/login" : "/profile";

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "50px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#465362",
          position: "absolute",
          top: "0",
        }}
      >
        {profilePage ? (
          <div>
            <button onClick={() => window.history.back()}>X</button>
          </div>
        ) : homePage ? (
          <>
            <div
              style={{
                display: "flex",
                height: "80px",

                position: "absolute",
                top: "0px",
                objectFit: "contain",
                width: "80px",
              }}
            >
              <img src={logo} id="logo" style={{ opacity: "0.9" }} />
            </div>
            <div>
              <p
                style={{
                  color: "white",
                  marginLeft: "80px",
                  fontWeight: "bold",
                }}
              >
                PAPER TRAILS
              </p>
            </div>
          </>
        ) : (
          <div>
            <div style={{ height: "80px", position: "absolute", top: "0px" }}>
              <img src={dashImg} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "center",
                justifySelf: "flex-start",
              }}
            >
              <h3
                id="header-heading"
                style={{
                  marginLeft: "80px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {currentHeading.replace("/", "").toUpperCase()}
              </h3>
            </div>
          </div>
        )}

        {!profilePage ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "50px",
              height: "100px",
              alignItems: "center",
              paddingRight: "0px",
              paddingTop: "10px",
            }}
          >
            <Link to={iconLink}>
              <div
                style={{
                  background: "none",
                }}
              >
                <img
                  id="profile"
                  src={profileImg}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              alignSelf: "center",
              marginLeft: "50px",
            }}
          >
            <img
              src={dashImg}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
