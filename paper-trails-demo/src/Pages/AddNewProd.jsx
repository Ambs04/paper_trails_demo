import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { baseUrl } from "../api";

export default function AddNewProd() {
  const nav = useNavigate();

  const [prodData, setProdData] = useState({
    prodName: "",
    prodDesc: "",
    prodPrice: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProdSubmit = async (e) => {
    e.preventDefault();

    const fetchInfo = {
      productOrServiceName: prodData.prodName,
      description: prodData.prodDesc,
      price: prodData.prodPrice,
      status: prodData.status,
      companyName: localStorage.getItem("companyName"),
      companyId: localStorage.getItem("companyId"),
      dateCreated: new Date().toDateString(),
    };

    try {
      const res = await fetch(
        `${baseUrl}/productServices/createProductService`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchInfo),
        },
      );

      if (res.ok) {
        alert("Successfully added product!");
        nav("/products", { state: { userCreated: true } });
      } else {
        const err = await res.json();

        alert(`Failed to add product, error: ${err.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server is offline.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "1 1 0%",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "flex-start",
        position: "relative",
        overflowY: "hidden scroll",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",

            alignItems: "center",

            backgroundColor: "rgb(249, 220, 92)",
          }}
        >
          <button
            style={{
              height: "50px",
              width: "50px",
              backgroundColor: "rgb(249, 220,92)",
              borderWidth: "0px",
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </Link>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "50px",
            backgroundColor: "rgb(70,83,98)",
          }}
        >
          <p
            style={{
              paddingTop: "0px",
              paddingLeft: "5px",
              fontSize: "18px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            ADD NEW PRODUCT / SERVICE
          </p>
        </div>
      </div>
      <form
        onSubmit={handleProdSubmit}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: " column",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "500",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            SERVICE / PRODUCT NAME
          </p>
          <input
            name="prodName"
            value={prodData.prodName}
            placeholder="BASIC CLEANING"
            type="text"
            onChange={handleChange}
            required
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "500",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            DESCRIPTION
          </p>
          <input
            name="prodDesc"
            value={prodData.prodDesc}
            placeholder="BASIC CLEANING"
            type="text"
            onChange={handleChange}
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "500",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            PRICE: R
          </p>
          <input
            name="prodPrice"
            value={prodData.prodPrice}
            placeholder="150.00"
            type="text"
            onChange={handleChange}
            required
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              width: "80%",
              fontSize: "16px",
              fontWeight: "bold",
              color: "rgb(70,83,98)",
              marginBottom: "15px",
              textAlign: "left",
            }}
          >
            STATUS
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "80%",
              gap: "10px",
            }}
          >
            <div
              onClick={() =>
                handleChange({ target: { name: "status", value: "active" } })
              }
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 15px",
                border: "none",
              }}
            >
              ACTIVE
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "4px",
                  border: "2px solid #465362",
                  backgroundColor:
                    prodData.status === "active" ? "#465362" : "transparent",
                  transition: "0.6s",
                }}
              ></div>
            </div>
            <div
              onClick={() =>
                handleChange({ target: { name: "status", value: "inactive" } })
              }
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 15px",
                border: "none",
              }}
            >
              INACTIVE
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "4px",
                  border: "2px solid #465362",
                  backgroundColor:
                    prodData.status === "inactive" ? "#465362" : "transparent",
                  transition: "0.6s",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <button
            type="submit"
            style={{
              height: "40px",
              width: "85%",
              marginTop: "20px",
              backgroundColor: "rgb(249,220,92)",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
