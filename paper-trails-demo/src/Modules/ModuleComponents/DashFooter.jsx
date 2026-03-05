import { Link } from "react-router-dom";
import dashIcon from "../../assets/dash_icon.png";
import customersIcon from "../../assets/customers_icon.png";
import productsIcon from "../../assets/products_icon.png";
import usersIcon from "../../assets/users_icon.png";
import { useLocation } from "react-router-dom";

export default function DashFooter() {
  const location = useLocation();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          position: "fixed",
          bottom: "0px",
          backgroundColor: "rgb(249, 220, 92)",
          overflow: "hidden",
          marginTop: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            minHeight: "70px",
            backgroundColor: "rgb(249, 220, 92)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1",
              backgroundColor:
                location.pathname === "/dashboard"
                  ? "rgb(70, 83, 98)"
                  : " rgb(249,220,92)",
            }}
          >
            <Link to="/dashboard">
              <button
                type="button"
                style={{
                  height: "100%",
                  background: "none",
                  opacity: "1",
                  borderWidth: "0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    location.pathname === "/dashboard"
                      ? "rgb(70, 83, 98)"
                      : " rgb(249,220,92)",
                }}
              >
                <img src={dashIcon} style={{ height: "40px", width: "40px" }} />
              </button>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1",
              backgroundColor:
                location.pathname === "/customers"
                  ? "rgb(70, 83, 98)"
                  : " rgb(249,220,92)",
            }}
          >
            <Link to="/customers">
              <button
                type="button"
                style={{
                  height: "100%",
                  background: "none",
                  opacity: "1",
                  borderWidth: "0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor:
                    location.pathname === "/customers"
                      ? "rgb(70, 83, 98)"
                      : " rgb(249,220,92)",
                }}
              >
                <img
                  src={customersIcon}
                  style={{ height: "40px", width: "40px" }}
                />
              </button>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1",
              backgroundColor:
                location.pathname === "/products"
                  ? "rgb(70, 83, 98)"
                  : " rgb(249,220,92)",
            }}
          >
            <Link to="/products">
              <button
                type="button"
                style={{
                  height: "100%",
                  background: "none",
                  opacity: "1",
                  borderWidth: "0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    location.pathname === "/products"
                      ? "rgb(70, 83, 98)"
                      : " rgb(249,220,92)",
                }}
              >
                <img
                  src={productsIcon}
                  style={{ height: "40px", width: "40px" }}
                />
              </button>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1",
              backgroundColor:
                location.pathname === "/users"
                  ? "rgb(70, 83, 98)"
                  : " rgb(249,220,92)",
            }}
          >
            <Link to="/users">
              <button
                type="button"
                style={{
                  height: "100%",
                  background: "none",
                  opacity: "1",
                  borderWidth: "0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    location.pathname === "/users"
                      ? "rgb(70, 83, 98)"
                      : " rgb(249,220,92)",
                }}
              >
                <img
                  src={usersIcon}
                  style={{ height: "40px", width: "40px" }}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
