import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Alert({ showAlert, setShowAlert }) {
  const location = useLocation();
  const locatePath = location.pathname.replace("/", "").slice(0, -1);

  useEffect(() => {
    if (showAlert) {
      const time = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(time);
    }
  }, [showAlert, setShowAlert]);

  return (
    <div
      style={{
        height: showAlert ? "150px" : "0px",
        width: "100%",
        backgroundColor: "rgb(0,0,0,0.8)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "absolute",
        top: "0px",
        zIndex: "2000",
        transition: "height 0.8s",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {locatePath.toUpperCase()} SUCCESSFULLY ADDED!
    </div>
  );
}
