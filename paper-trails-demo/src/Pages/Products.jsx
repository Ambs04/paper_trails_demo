import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";

export default function Products() {
  const [prods, setProds] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);

  const [prodInfo, setProdInfo] = useState({
    prodName: "",
    prodDesc: "",
    prodPrice: " ",
    status: "active",
  });

  useEffect(() => {
    const fetchProds = async () => {
      const savedId = localStorage.getItem("companyId");

      try {
        const res = await fetch(`${baseUrl}/productServices/getAllProducts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ companyId: savedId }),
        });
        const data = await res.json();
        if (res.ok) {
          setProds(data.products);
        }
      } catch (error) {
        alert("Failed to fetch products.", error);
      }
    };
    fetchProds();
  });

  const handleChange = (e) => {
    setProdInfo({ ...prodInfo, [e.target.name]: e.target.value });
  };

  const handleEditModalOpen = (product) => {
    setSelectedProd(product);
    setProdInfo({
      prodName: product.productOrServiceName,
      prodDesc: product.description,
      prodPrice: product.price,
      status: product.status,
    });
    setIsModalActive(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const editing = selectedProd !== null;

    const updatedInfo = {
      productOrServiceName: prodInfo.prodName,
      description: prodInfo.prodDesc,
      price: prodInfo.prodPrice,
      status: prodInfo.status,
      companyId: localStorage.getItem("companyId"),
      ...(editing && {
        productId: selectedProd.id || selectedProd._id,
        edited: true,
        edistedBy: localStorage.getItem("userId"),
      }),
    };

    const path = editing ? "updateProductService" : "createProductService";

    try {
      const res = await fetch(`${baseUrl}/productServices/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });

      if (res.ok) {
        alert(
          path === "updateProductService" ? "Product updated" : "Product Added",
        );
        setIsModalActive(false);
        setSelectedProd(null);
      }
    } catch (error) {
      alert("Update failed", error);
    }
  };

  {
    /*const handleDelete = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (confirmDeletion) {
      try {
        const res = await fetch(
          `${baseUrl}/productServices/updateProductService`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: selectedProd.id || selectedProd._id,
              companyId: localStorage.getItem("companyId"),
              status: "deleted",
            }),
          }
        );

        if (res.ok) {
          alert("Product/Service removed successfully.");
          setIsModalActive(false);
          setSelectedProd(null);
        }
      } catch (error) {
        alert("Deletion failed", error);
      }
    }
  };*/
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Searchbar />
        <div>
          <Link to="/add-product">
            <button>+</button>
          </Link>
        </div>
      </div>

      {prods.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          {prods.map((product) => (
            <div
              key={product.id || product._id}
              style={{ border: "1px solid black" }}
              onClick={() => {
                handleEditModalOpen(product);
              }}
            >
              <div>
                <h3>Product / Service</h3>
                <p>{product.productOrServiceName}</p>

                <h3>Description</h3>
                <p>{product.description}</p>

                <h3>Price: </h3>
                <p>R{product.price}</p>

                <h3>Status</h3>
                <p>{product.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalActive && (
        <div>
          <form onSubmit={handleUpdate}>
            <div>
              <button onClick={() => setIsModalActive(false)}>X</button>
            </div>
            <div>
              <h1>UPDATE PRODUCT / SERVICE</h1>
            </div>
            <div>
              <p>Service/Product Name</p>
              <input
                required
                name="prodName"
                value={prodInfo.prodName}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Description</p>
              <input
                name="prodDesc"
                value={prodInfo.prodDesc}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Price: R</p>
              <input
                required
                name="prodPrice"
                value={prodInfo.prodPrice}
                onChange={handleChange}
              />
            </div>
            <div>
              <h2>STATUS</h2>
              <select
                name="status"
                value={prodInfo.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>

                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <button type="submit">{selectedProd ? "Update" : "Save"}</button>
              {/* <button
                type="button"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </button>*/}
            </div>
          </form>
        </div>
      )}

      <div>
        <DashFooter />
      </div>
    </>
  );
}
