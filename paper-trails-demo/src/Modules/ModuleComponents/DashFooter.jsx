import { Link } from "react-router-dom";

export default function DashFooter() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",

          position: "static",
          bottom: "0px",
          height: "10%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "1fr",
            gridColumnGap: "40px",
            gridRowGap: "0px",
            width: "100%",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          <div style={{ width: "40px" }}>
            <Link to="/dashboard">
              <div>DASH</div>
            </Link>
          </div>
          <div style={{ width: "30%", textAlign: "center" }}>
            <Link to="/customers">
              <div>CUSTOMERS</div>
            </Link>
          </div>
          <div style={{ width: "100%" }}>
            <Link to="/products">
              <div>PRODUCTS</div>
            </Link>
          </div>
          <div style={{ width: "100%" }}>
            <Link to="/users">
              <div>USERS</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
