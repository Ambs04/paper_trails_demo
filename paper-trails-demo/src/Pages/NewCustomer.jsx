import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../api";
import { useState } from "react";

export default function NewCustomer() {
  const navigate = useNavigate();
  const [newCustomerInfo, setNewCustomerInfo] = useState({
    companyName: "",
    contactPerson: "",
    cellNumber: "",
    email: "",
    address: "",
    code: "",
    paymentTerms: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    const fetchNewCustomerInfo = {
      ...newCustomerInfo,
      linkedPaperTrailsCompanyId: localStorage.getItem("companyId"),
      dateCreated: new Date().toDateString(),
    };

    try {
      const res = await fetch(`${baseUrl}/customer/createCustomer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fetchNewCustomerInfo),
      });

      {
        /*const data = await res.json();*/
      }
      if (res.ok) {
        navigate("/customers", { state: { userCreated: true } });
      } else {
        alert("Failed to add customer");
        console.log(fetchNewCustomerInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "1 1 0%",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
        minHeight: "100vh",
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
          to="/customers"
          style={{
            textDecoration: "none",
            display: "flex",
            height: "50px",
            width: "50px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(249, 220,92)",
          }}
        >
          <button
            style={{
              height: "50px",
              width: "50px",
              color: "black",
              borderWidth: "0px",
              backgroundColor: "rgb(249, 220,92)",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </Link>
        <div
          style={{
            display: "flex",

            alignItems: "center",
            width: "100%",
            height: "50px",
            backgroundColor: "rgb(70,83,98)",
          }}
        >
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              paddingTop: "10px",
            }}
          >
            ADD NEW CUSTOMER
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            width: "85%",
            marginTop: "70px",
            marginBottom: "5px",
            fontSize: "20px",
            textAlign: "left",

            color: "black",
          }}
        >
          BASIC ACCOUNT INFORMATION
        </p>
      </div>
      {/*form section*/}
      <form
        onSubmit={handleAddCustomer}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: " column",
          marginTop: "10px",
        }}
      >
        {/*company/person name */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            COMPANY NAME / PERSON NAME:
          </p>
          <input
            name="companyName"
            value={newCustomerInfo.companyName}
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
        {/*contact name */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            CONTACT PERSON NAME:
          </p>
          <input
            name="contactPerson"
            value={newCustomerInfo.contactPerson}
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
        {/*email */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            EMAIL:
          </p>
          <input
            type="email"
            placeholder="james@email.com"
            name="email"
            value={newCustomerInfo.email}
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
        {/* phone number*/}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            PHONE:
          </p>
          <input
            name="cellNumber"
            placeholder="078 888 8888"
            value={newCustomerInfo.cellNumber}
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
        {/*address */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            ADDRESS:
          </p>
          <input
            type="text"
            name="address"
            value={newCustomerInfo.address}
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
        {/*code */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            CODE:
          </p>
          <input
            name="code"
            placeholder="12346789"
            value={newCustomerInfo.code}
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
        {/*payment terms */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
              paddingBottom: "20px",
            }}
          >
            PAYMENT TERMS
          </p>

          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {["30 days", "14 days", "7 days", "cash on delivery"].map(
              (payTerm) => (
                <div
                  key={payTerm}
                  onClick={() =>
                    handleChange({
                      target: { name: "paymentTerms", value: payTerm },
                    })
                  }
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {payTerm.toUpperCase()}
                  <div
                    style={{
                      height: "15px",
                      width: "15px",
                      borderRadius: "4px",
                      border: "2px solid rgb(70,83,98)",
                      backgroundColor:
                        newCustomerInfo.paymentTerms === payTerm
                          ? "rgb(70,83,98)"
                          : "transparent",
                      transition: "0.6s",
                    }}
                  ></div>
                </div>
              ),
            )}
          </div>
        </div>
        {/*account status */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
              paddingBottom: "20px",
            }}
          >
            ACCOUNT STATUS
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              gap: "15px",
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
                    newCustomerInfo.status === "active"
                      ? "#465362"
                      : "transparent",
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
                    newCustomerInfo.status === "inactive"
                      ? "#465362"
                      : "transparent",
                  transition: "0.6s",
                }}
              ></div>
            </div>
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
              onClick={() => navigate("/customers")}
              style={{
                height: "40px",
                width: "85%",
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
      </form>
    </div>
  );
}
