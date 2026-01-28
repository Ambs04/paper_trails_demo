import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";

export default function Products() {
  const [prods, setProds] = useState([]);

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
  }, []);

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

      <div>
        <DashFooter />
      </div>
    </>
  );
}
