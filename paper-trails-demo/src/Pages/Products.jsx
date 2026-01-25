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
      try {
        const res = await fetch(`${baseUrl}/productServices`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setProds(data);
        }
      } catch {
        alert("Failed to fetch products.");
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
      <div>
        {prods.length === 0 ? (
          <p>No products found.</p>
        ) : (
          prods.map((product) => (
            <div key={product._id}>
              <div>
                <h3>Product / Service</h3>
                <p>{product.prodName}</p>

                <h3>Description</h3>
                <p>{product.prodDesc}</p>

                <h3>Price: </h3>
                <p>R{product.prodPrice}</p>
              </div>
              <div>
                <h3>Status</h3>
                <p>{product.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <DashFooter />
      </div>
    </>
  );
}
