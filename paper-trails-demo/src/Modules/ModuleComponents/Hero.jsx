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
        <img src={heroImg} />
      </div>
    </>
  );
}
