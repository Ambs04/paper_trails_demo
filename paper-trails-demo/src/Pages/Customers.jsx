import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";
import ManageCustomerModal from "../Modules/ModuleComponents/ManageCustomerModal";
import Alert from "../Modules/CommonComponents/Alert";
import LoadingPage from "./../Modules/CommonComponents/LoadingPage";
import loadingLogo from "../assets/loading_image.png";

export default function Customers() {
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(
    location.state?.userCreated || false,
  );
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [searchCustomer, setSearchCustomer] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/customer/getCompanyCustomers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: localStorage.getItem("companyId"),
          }),
        });
        const data = await res.json();

        if (res.ok) {
          const dataArray = data.users || [];
          setCustomer(dataArray);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customer.filter((c) =>
    [c.companyName, c.email].some((field) =>
      field?.toLowerCase().includes(searchCustomer.toLowerCase()),
    ),
  );

  const handleCustomerDetailsUpdate = (updatedCustomerInfo) => {
    const updatedDetails = customer.map((client) =>
      client._id === updatedCustomerInfo._id ? updatedCustomerInfo : client,
    );
    setCustomer(updatedDetails);
  };

  useEffect(() => {
    if (location.state?.userCreated) {
      nav(location.pathname, { replace: true });
    }
  }, [location, nav]);

  return (
    <div style={{ height: "60vh" }}>
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
          gap: "0px",
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
            paddingRight: "20px",
          }}
        >
          <Searchbar value={searchCustomer} onChange={setSearchCustomer} />
        </div>

        <Link
          to="/add-customer"
          style={{ textDecoration: "none", marginLeft: "0", paddingLeft: "0" }}
        >
          <button
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
      <div
        style={{
          width: "100%",
          height: "930px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden scroll",
          gap: "20px",
        }}
      >
        {!isLoading && filteredCustomers?.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          filteredCustomers?.map((c) => (
            <div
              key={c._id}
              onClick={() => setSelectedCustomer(c)}
              style={{
                width: "100%",

                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  boxShadow: "rgba(0,0,0,0.125) 0px 0px 7px 2px",
                  width: "90%",
                  height: "90%",
                  borderRadius: "12px",
                  padding: "5px",
                }}
              >
                <div style={{ marginTop: "10px" }}>
                  <div style={{ marginLeft: "10px", width: "150px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        opacity: "0.7",
                        marginBottom: "3px",
                        color: "black",
                      }}
                    >
                      COMPANY NAME:
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {c.companyName}
                    </p>
                  </div>
                  <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        opacity: "0.7",
                        marginBottom: "0px",
                        color: "black",
                      }}
                    >
                      COMPANY EMAIL:
                    </div>

                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {c.email}
                    </p>
                  </div>
                  <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        opacity: "0.7",
                        paddingBottom: "2px",
                        color: "black",
                        paddingLeft: "5px",
                      }}
                    >
                      COMPNAY PHONE:
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "5px",
                      }}
                    >
                      {c.cellNumber}
                    </p>
                  </div>
                  <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        opacity: "0.7",
                        marginBottom: "3px",
                        color: "black",
                      }}
                    >
                      CONTACT PERSON:
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                        paddingBottom: "15px",
                        marginBottom: "7px",
                      }}
                    >
                      {c.contactPerson}
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ marginLeft: "10px", width: "200px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        opacity: "0.7",
                        marginBottom: "3px",
                        color: "black",
                      }}
                    >
                      ADDRESS:
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {c.address}
                    </p>
                  </div>
                  <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        opacity: "0.7",
                        marginBottom: "3px",
                        color: "black",
                      }}
                    >
                      PAYMENT TERMS:
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {c.paymentTerms}
                    </p>
                  </div>
                  <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        opacity: "0.7",
                        marginBottom: "3px",
                        color: "black",
                      }}
                    >
                      STATUS:
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {c.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {selectedCustomer && (
          <ManageCustomerModal
            onUpdate={handleCustomerDetailsUpdate}
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>

      <DashFooter />
    </div>
  );
}
