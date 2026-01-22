import { Link } from "react-router-dom";

export default function DashFooter() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex" }}>
          <Link to="/dashboard">
            <button>DASH</button>
          </Link>
        </div>
        <div style={{ display: "flex" }}>
          <Link to="/customers">
            <button>CUSTOMERS</button>
          </Link>
        </div>
        <div style={{ display: "flex" }}>
          <Link to="/products">
            <button>PRODUCTS</button>
          </Link>
        </div>
        <div style={{ display: "flex" }}>
          <Link to="/users">
            <button>USERS</button>
          </Link>
        </div>
      </div>
    </>
  );
}
