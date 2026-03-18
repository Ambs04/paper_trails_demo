import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";
import Alert from "../Modules/CommonComponents/Alert";
import LoadingPage from "./../Modules/CommonComponents/LoadingPage";
import loadingLogo from "../assets/loading_image.png";

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
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const [showAlert, setShowAlert] = useState(
    location.state?.userCreated || false,
  );
  const nav = useNavigate();

  const [searchProd, setSearchProd] = useState("");

  useEffect(() => {
    const fetchProds = async () => {
      const savedId = localStorage.getItem("companyId");
      setIsLoading(true);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchProds();
  }, []);

  const filteredProducts = prods.filter((item) =>
    item.productOrServiceName.toLowerCase().includes(searchProd.toLowerCase()),
  );

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
    setIsLoading(true);
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
        const updatedProduct = await res.json();

        setProds((prev) =>
          prev.map((p) =>
            (p.id || p._id) === (selectedProd.id || selectedProd._id)
              ? { ...p, ...updatedProduct.product }
              : p,
          ),
        );
        setIsModalActive(false);
        setSelectedProd(null);
      }
    } catch (error) {
      alert("Update failed", error);
    } finally {
      setIsLoading(false);
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
      {isLoading && <LoadingPage logo={loadingLogo} />}
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
            paddingLeft: "15px",
            paddingRight: "10px",
          }}
        >
          <Searchbar value={searchProd} onChange={setSearchProd} />
        </div>

        <Link to="/add-product">
          <button
            type="button"
            style={{
              marginTop: "45px",
              marginRight: "10px",

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

      {!isLoading && filteredProducts.length === 0 ? (
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
          {filteredProducts.map((item) => (
            <div
              key={item.id || item._id}
              onClick={() => {
                handleEditModalOpen(item);
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
                    {item.productOrServiceName}
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
                    {item.description}
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
                    R{item.price}
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
                    {item.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalActive && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.44)",
            top: "0",
            left: "0",
            overflow: "hidden",
            display: "flex",

            justifyContent: "center",

            transition: "0.2s",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: "1 1 0%",
              justifyContent: "flex-start",
              alignItems: "center",
              position: "relative",
              flexDirection: "column",
              height: "100vh",
              overflowY: "scroll",
              backgroundColor: "white",
            }}
          >
            <form
              onSubmit={handleUpdate}
              style={{
                width: "100%",
                paddingTop: "5px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.314)",
                  minHeight: "50px",
                  display: "flex",
                  alignItems: "center",
                  position: "fixed",
                  top: "0",
                  zIndex: "10",
                }}
              >
                <button
                  onClick={() => setIsModalActive(false)}
                  style={{
                    height: "50px",
                    minHeight: "50px",
                    width: "50px",
                    backgroundColor: "rgb(249,220,92)",
                    borderWidth: "0px",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  X
                </button>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(70,83,98)",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    color: "white",
                    minHeight: "50px",
                  }}
                >
                  <div style={{ marginLeft: "20px" }}>
                    UPDATE PRODUCT / SERVICE
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "80%",
                  maxWidth: "700px",
                  marginTop: "70px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "rgb(70,83,98)",
                      textAlign: "left",
                    }}
                  >
                    SERVICE / PRODUCT NAME
                  </p>
                  <input
                    required
                    name="prodName"
                    value={prodInfo.prodName}
                    onChange={handleChange}
                    style={{
                      height: "35px",
                      width: "100%",
                      marginTop: "5px",
                      borderRadius: "4px",
                      padding: "8px 10px 8px 10px",
                      fontSize: "14px",
                      border: "none",
                      backgroundColor: "rgba(0,0,0,0.035)",
                      fontWeight: "bold",
                      display: "flex",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    marginTop: "50px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "rgb(70,83,98)",
                      textAlign: "left",
                    }}
                  >
                    DESCRIPTION
                  </p>
                  <input
                    name="prodDesc"
                    value={prodInfo.prodDesc}
                    onChange={handleChange}
                    style={{
                      marginRight: "auto",
                      marginLeft: "auto",
                      height: "35px",
                      width: "100%",
                      marginTop: "5px",
                      borderRadius: "4px",
                      padding: "8px 10px 8px 10px",
                      fontSize: "14px",
                      border: "none",
                      backgroundColor: "rgba(0,0,0,0.035)",
                      fontWeight: "bold",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    marginTop: "50px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "rgb(70,83,98)",
                      textAlign: "left",
                    }}
                  >
                    PRICE: R
                  </p>
                  <input
                    required
                    name="prodPrice"
                    value={prodInfo.prodPrice}
                    onChange={handleChange}
                    style={{
                      height: "35px",
                      width: "100%",
                      marginTop: "5px",
                      borderRadius: "4px",
                      padding: "8px 10px 8px 10px",
                      fontSize: "14px",
                      border: "none",
                      backgroundColor: "rgba(0,0,0,0.035)",
                      fontWeight: "bold",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "50px",
                    width: "90%",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "rgb(70,83,98)",
                      textAlign: "left",
                    }}
                  >
                    STATUS
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      margin: "0 auto 0 auto",

                      gap: "15px",
                    }}
                  >
                    <div
                      onClick={() =>
                        setProdInfo((prev) => ({
                          ...prev,
                          status: "active",
                        }))
                      }
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                        border: "none",
                      }}
                    >
                      ACTIVE
                      <div
                        style={{
                          height: "15px",
                          width: "15px",
                          borderRadius: "4px",
                          border: "2px solid rgb(70,83,98)",
                          backgroundColor:
                            prodInfo.status === "active"
                              ? "#465362"
                              : "transparent",
                          transition: "0.6s",
                        }}
                      ></div>
                    </div>
                    <div
                      onClick={() =>
                        setProdInfo((prev) => ({
                          ...prev,
                          status: "inactive",
                        }))
                      }
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                        border: "none",
                      }}
                    >
                      INACTIVE
                      <div
                        style={{
                          height: "15px",
                          width: "15px",
                          borderRadius: "4px",
                          border: "2px solid rgb(70,83,98)",
                          backgroundColor:
                            prodInfo.status === "inactive"
                              ? "#465362"
                              : "transparent",
                          transition: "0.6s",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginBottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        type="submit"
                        style={{
                          height: "40px",
                          width: "100%",
                          marginTop: "30px",
                          backgroundColor: "rgb(249,220,92)",
                          border: "none",
                          borderRadius: "4px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                      >
                        UPDATE
                      </button>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={() => nav("/products")}
                        style={{
                          height: "40px",
                          width: "100%",
                          marginTop: "20px",

                          border: "none",
                          borderRadius: "4px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </div>
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
        </div>
      )}

      <div>
        <DashFooter />
      </div>
    </>
  );
}
