import logo from "../../assets/logo.png";
import profileImg from "../../assets/user.png";
import { Link, useLocation } from "react-router-dom";
//import "../../Styles/header.css";
import dashImg from "../../assets/blank_image_loading.png";
import returnIcon from "../../assets/return_icon.png";

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
        id="header-container"
        style={{
          width: "100%",

          height: window.matchMedia("(min-width: 900px)").matches
            ? "60px"
            : "40px",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#465362",
          position: "fixed",
          top: "0",
          zIndex: "1000",
        }}
      >
        {profilePage ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              onClick={() => window.history.back()}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <img src={returnIcon} style={{ height: "40px", width: "40px" }} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "20px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {path.replace("/", "").toUpperCase()}
            </div>
          </div>
        ) : homePage ? (
          <>
            <div
              style={{
                display: "flex",
                height: window.matchMedia("(min-width: 900px)").matches
                  ? "60px"
                  : "70px",

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
                  marginLeft: window.matchMedia("(min-width: 900px)").matches
                    ? "60px"
                    : "80px",
                  fontWeight: "bold",
                  paddingBottom: "20px",
                  paddingTop: "20px",
                }}
              >
                PAPER TRAILS
              </p>
            </div>
          </>
        ) : (
          <div>
            <img
              src={dashImg}
              style={{
                height: "80px",
                width: "80px",
                position: "absolute",
                top: "0px",
              }}
            />

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
              justifyContent: "center",
              paddingRight: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
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
                    width: window.matchMedia("(min-width: 900px)").matches
                      ? "50px"
                      : "40px",
                    height: window.matchMedia("(min-width: 900px)").matches
                      ? "50px"
                      : "40px",
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
                width: "80px",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
                marginRight: "40px",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
