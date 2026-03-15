import heroImg from "../../assets/hero_image.jpg";
//import "../../Styles/hero.css";

export default function Hero() {
  return (
    <div
      id="hero-container"
      style={{
        overflow: "hidden",
        display: "flex",
        height: window.matchMedia("(min-width: 900px)") ? "100px" : "300px",
        flex: "0.1",

        width: "100%",

        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <img
        src={heroImg}
        style={{
          width: "100%",
          height: window.matchMedia("(min-width: 900px)") ? "300px" : "270px",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
