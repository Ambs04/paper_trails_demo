import { useLocation } from "react-router-dom";

export default function Searchbar() {
  const locate = useLocation();

  const location = locate.pathname;

  return (
    <>
      <label style={{ fontWeight: "700" }}></label>
      <input
        type="text"
        placeholder={`Search ${location.replace("/", "")}`.toUpperCase()}
        style={{
          height: "25px",
          width: "100%",
          marginTop: "60px",
          borderRadius: "4px",
          padding: "8px 10px 8px 20px",
          borderStyle: "none",
          backgroundColor: "rgba(0,0,0,0.035)",
          color: "rgb(0,0,0)",
          fontWeight: "bold",
          borderWidth: "0px",
          marginBottom: "20px",
        }}
      />
    </>
  );
}
