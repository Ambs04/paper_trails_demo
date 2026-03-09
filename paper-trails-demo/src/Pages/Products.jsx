import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";
import Alert from "../Modules/CommonComponents/Alert";

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

  const location = useLocation();
  const [showAlert, setShowAlert] = useState(
    location.state?.userCreated || false,
  );
  const nav = useNavigate();

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

  useEffect(() => {
    if (location.state?.userCreated) {
      nav(location.pathname, { replace: true });
    }
  }, [location, nav]);

  {
    /*const handleDelete = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (confirmDeletion) {
      try {
        const res = await fetch(
          `${baseUrl}/productServices/ `,
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
      {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} />}
      <div>
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: "40px",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Searchbar />
          <div>
            <Link to="/add-product">
              <button
                type="button"
                style={{
                  marginTop: "35px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  minHeight: "40px",
                  height: "40px",
                  width: "40px",
                  borderRadius: "8px",
                  backgroundColor: "rgb(249, 220, 92)",
                  borderWidth: "0px",
                  color: "rgb(0,0,0)",
                  fontWeight: "bold",
                  fontSize: "30px",
                  textAlign: "center",
                  opacity: "1",
                }}
              >
                +
              </button>
            </Link>
          </div>
        </div>
      </div>

      {prods.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "780px",
            overflow: "hidden scroll",
            gap: "10px",
          }}
        >
          {prods.map((product) => (
            <div
              key={product.id || product._id}
              onClick={() => {
                handleEditModalOpen(product);
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr",

                width: "90%",
                boxShadow: "rgba(0,0,0,0.125) 0px 0px 7px 2px",
                height: "215px",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  gridColumn: "1 / 2",
                  marginLeft: "20px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      opacity: "0.7",
                      color: "black",
                    }}
                  >
                    Product / Service
                  </h3>
                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      paddingTop: "2px",
                      paddingLeft: "0px",
                    }}
                  >
                    {product.productOrServiceName}
                  </p>
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      opacity: "0.7",
                      color: "black",
                    }}
                  >
                    Description
                  </h3>
                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      paddingTop: "5px",
                      paddingLeft: "0px",
                    }}
                  >
                    {product.description}
                  </p>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      opacity: "0.7",
                      color: "black",
                    }}
                  >
                    Price:
                  </h3>
                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      paddingTop: "2px",
                      paddingLeft: "2px",
                    }}
                  >
                    R{product.price}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridColumn: "2 / 3",
                  textAlign: "right",
                  marginRight: "20px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <h3
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      opacity: "0.7",
                      color: "black",
                    }}
                  >
                    Status
                  </h3>
                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      paddingTop: "5px",
                      paddingLeft: "0px",
                    }}
                  >
                    {product.status}
                  </p>
                </div>
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
              <h3>UPDATE PRODUCT / SERVICE</h3>
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
