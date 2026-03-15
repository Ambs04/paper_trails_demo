import Header from "../Modules/CommonComponents/Header";
import Hero from "../Modules/ModuleComponents/Hero";
import { Link } from "react-router-dom";
//import "../Styles/home.css";

export default function Home() {
  return (
    <>
      <div
        id="home-container"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
        }}
      >
        <Header />
        {/*yellow edges*/}
        <div
          style={{
            backgroundColor: "#f9dc5c",
            display: "flex",

            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          {/*main content with white bg*/}
          <main
            id="white-content"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 0 7px 2px rgba(0,0,0,0.25)",

              width: window.matchMedia("(min-width: 900px)").matches
                ? "80%"
                : "100%",

              maxWidth: "100vw",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: window.matchMedia("(min-width: 900px)").matches
                ? "100vh"
                : "100vh",
            }}
          >
            <div
              style={{
                width: "100%",
                minHeight: "30px",
                height: "60px",
                fontWeight: "bold",
                fontSize: "24px",
                flex: " 0.2",
                marginTop: window.matchMedia("(min-width: 900px)").matches
                  ? "90px"
                  : "40px",
                paddingBottom: "50px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              SIGN UP TODAY
            </div>

            <Hero />

            <div
              id="home-text"
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                margin: "0",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <div
                style={{
                  width: "90%",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "40px",
                  marginTop: "40px",
                  marginBottom: "20px",
                  display: "flex",
                }}
              >
                Smart Invoicing Made Simple
              </div>
              <div
                style={{
                  width: "90%",
                  color: "black",
                  fontSize: "16px",
                  lineHeight: "1.2",
                  paddingTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                Manage clients, track payments, and send invoices in seconds.
                Empower your business with a fast, intuitive tool built for
                small business owners on the move.
              </div>
            </div>
            <Link
              to="/signUp"
              style={{
                textDecoration: "none",
                width: "100%",
                marginTop: "auto",
              }}
            >
              <div
                id="sign-up"
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: window.matchMedia("(min-width: 900px)")
                    .matches
                    ? "#465362"
                    : "rgb(249,220,92)",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    color: window.matchMedia("(min-width: 900px)").matches
                      ? "white"
                      : "black",
                    fontWeight: "bold",
                  }}
                >
                  SIGN UP NOW!
                </p>
              </div>
            </Link>
          </main>
        </div>
      </div>
    </>
  );
}
