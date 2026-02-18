import heroImg from "../../assets/hero_image.jpg";
import "../../Styles/hero.css";

export default function Hero() {
  return (
    <>
      <div
        id="hero-container"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "300px",
        }}
      >
        <img src={heroImg} style={{ opacity: "0.85" }} />
        <h1
          style={{
            textAlign: "center",

            width: "100%",
            zIndex: "2",
            color: "#7e0f0f",
            textShadow: "5px -2px 10px rgba(181, 158, 158, 0.79) ",
          }}
        >
          SMART INVOICING MADE SIMPLE
        </h1>
      </div>
    </>
  );
}
