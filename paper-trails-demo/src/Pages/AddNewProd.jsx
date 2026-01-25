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

  const handleAddProd = (e) => {
    const { name, value } = e.target;
    setProdData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProdSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/productServices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prodData),
      });
      if (res.ok) {
        alert("Successfully added product!");
        nav("/products");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server is offline.");
    }
  };

  return (
    <>
      <div>
        <div>
          <Link to="/products">
            <button>X</button>
          </Link>
        </div>
        <h1>add new product/service</h1>
      </div>
      <form onSubmit={handleProdSubmit}>
        <div>
          <p>Service/Product Name</p>
          <input
            name="prodName"
            placeholder="e.g clean"
            type="text"
            onChange={handleAddProd}
            required
          />
        </div>
        <div>
          <p>Description</p>
          <input
            name="prodDesc"
            placeholder="e.g cleaning workplace"
            type="text"
            onChange={handleAddProd}
          />
        </div>
        <div>
          <p>Price: R</p>
          <input
            name="prodPrice"
            placeholder="150"
            type="text"
            onChange={handleAddProd}
            required
          />
        </div>
        <div>
          <h2>STATUS</h2>
          <select
            name="status"
            value={prodData.status}
            onChange={handleAddProd}
          >
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
