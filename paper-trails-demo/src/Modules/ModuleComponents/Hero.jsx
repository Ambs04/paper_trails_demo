import heroImg from "../../assets/hero_image.jpg";
import "../../Styles/hero.css";

export default function Hero() {
  return (
    <>
      <div
        id="hero-container"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <img src={heroImg} style={{ opacity: "0.4" }} />
        <h1
          style={{
            position: "absolute",
            top: "35%",
            bottom: "50%",
            textAlign: "center",

            width: "100%",
            zIndex: "2",
            color: "#652912",
            textShadow: "5px -5px 8px rgba(175, 61, 29, 0.45) ",
          }}
        >
          INVOICING MADE SIMPLE
        </h1>
      </div>
    </>
  );
}
