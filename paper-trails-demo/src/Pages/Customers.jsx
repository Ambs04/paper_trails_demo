import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";
import ManageCustomerModal from "../Modules/ModuleComponents/ManageCustomerModal";

export default function Customers() {
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();

  useEffect(() => {
    const fetchCustomers = async () => {
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
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerDetailsUpdate = (updatedCustomerInfo) => {
    const updatedDetails = customer.map((client) =>
      client._id === updatedCustomerInfo._id ? updatedCustomerInfo : client,
    );
    setCustomer(updatedDetails);
  };

  return (
    <>
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
        </div>

        <Link to="/add-customer" style={{ textDecoration: "none" }}>
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
        {customer?.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          customer?.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedCustomer(item)}
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
                      Company Name
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {item.companyName}
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
                      Company Email
                    </div>

                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {item.email}
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
                      Company Phone
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "5px",
                      }}
                    >
                      {item.cellNumber}
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
                      Contact Person
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                        marginBottom: "7px",
                      }}
                    >
                      {item.contactPerson}
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
                      Address
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {item.address}
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
                      Payment Terms
                    </div>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingLeft: "0px",
                      }}
                    >
                      {item.paymentTerms}
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
                      Status
                    </div>
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
      <div>
        <DashFooter />
      </div>
    </>
  );
}
