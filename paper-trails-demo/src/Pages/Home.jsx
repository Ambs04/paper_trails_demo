import Header from "../Modules/CommonComponents/Header";
import Hero from "../Modules/ModuleComponents/Hero";
import { Link } from "react-router-dom";
import "../Styles/home.css";

export default function Home() {
  return (
    <>
      <div
        id="home-container"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Header />
        {/*yellow edges*/}
        <div
          style={{
            backgroundColor: "#f9dc5c",
            display: "flex",
            flex: "1",
            justifyContent: "center",
            height: "100vh",

            margin: "0",
          }}
        >
          {/*main content with white bg*/}
          <main
            id="white-content"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 0 20px rgba(0,0,0,0.05)",
              width: "100%",
              maxWidth: "768px",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "25px",
                padding: "20px 0px",
                display: "flex",
                alignSelf: "center",
              }}
            >
              SIGN UP TODAY
            </div>
            <div style={{ display: "flex" }}>
              <Hero />
            </div>
            <div id="home-text">
              <p style={{ color: "black" }}>Smart Invoicing Made Simple</p>
              <p style={{ color: "black" }}>
                Manage clients, track payments, and send invoices in seconds.
                Empower your business with a fast, intuitive tool built for
                small business owners on the move.
              </p>
            </div>
            <Link to="/signUp" style={{ textDecoration: "none" }}>
              <div
                id="sign-up"
                style={{
                  minWidth: "200px",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  position: "fixed",
                  bottom: "0px",
                  width: "100vw",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
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
