import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { baseUrl } from "../api";

export default function AddNewProd() {
  const nav = useNavigate();

  const [prodData, setProdData] = useState({
    prodName: "",
    prodDesc: "",
    prodPrice: " ",
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
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
      >
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            width: "60px",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            borderRight: "1px solid #eee",
          }}
        >
          <button
            style={{
              border: "none",
              background: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            X
          </button>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
            backgroundColor: "#465362",
            color: "white",
            paddingLeft: "20px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1rem",
              letterSpacing: "1.5px",
              fontWeight: "500",
            }}
          >
            {" "}
            add new product/service
          </h1>
        </div>
      </div>
      <form onSubmit={handleProdSubmit}>
        <div>
          <p>Service/Product Name</p>
          <input
            name="prodName"
            value={prodData.prodName}
            placeholder="e.g clean"
            type="text"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Description</p>
          <input
            name="prodDesc"
            value={prodData.prodDesc}
            placeholder="e.g cleaning workplace"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Price: R</p>
          <input
            name="prodPrice"
            value={prodData.prodPrice}
            placeholder="150"
            type="text"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h2>STATUS</h2>
          <select name="status" value={prodData.status} onChange={handleChange}>
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>
          <div>
            <button type="submit">SUBMIT</button>
          </div>
        </div>
      </form>
    </>
  );
}
