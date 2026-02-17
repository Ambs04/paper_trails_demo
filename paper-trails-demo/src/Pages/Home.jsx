import Header from "../Modules/CommonComponents/Header";
import Hero from "../Modules/ModuleComponents/Hero";
import { Link } from "react-router-dom";
import "../Styles/home.css";

export default function Home() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "repeat(4, 1fr)",
          maxHeight: "950px",
        }}
      >
        <div>
          <Header style={{ display: "grid", gridArea: "1/1/2/2" }} />
        </div>
        <div style={{ display: "grid", gridArea: "2/1/3/2" }}>
          <Hero />
        </div>
        <div id="home-text" style={{ display: "grid", gridArea: "3/1/4/2" }}>
          <p>
            A simpler way to handle all your admin. Send invoices, track
            payments and manage clients. All this in the palm of your hand.
          </p>
        </div>
        <div style={{ display: "grid", gridArea: "4/1/5/2" }}>
          <Link to="/signup">
            <button id="sign-up-btn">Sign Up now!</button>
          </Link>
        </div>
      </div>
    </>
  );
}
