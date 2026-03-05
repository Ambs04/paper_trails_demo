import Greeting from "../Modules/CommonComponents/Greeting";
import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";

export default function Dashboard() {
  const currentPlan = localStorage.getItem("subscriptionType") || "FREE";
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "100px",
        justifySelf: "flex-start",
        overflow: "hidden scroll",
      }}
    >
      <div>
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: "30px",
        }}
      >
        <div>
          <Greeting />
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "normal",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          This Dashboard will be here to give you a quick overview of what's
          happening on your system.
        </div>
        <div style={{ width: "90%" }}>
          <h4 style={{ marginTop: "10px", marginBottom: "0px" }}>
            ACCOUNT TYPE
          </h4>
          <p
            style={{ marginTop: "10px", padding: "0px", marginBottom: "10px" }}
          >
            {currentPlan} plan
          </p>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <h4>INVOICES</h4>
          <div
            style={{
              borderRadius: "8px",
              width: "90%",
              minHeight: "130px",

              marginBottom: "20px",
              overflow: "hidden",
              boxShadow: "rgba(0,0,0,0.125) 0px 0px 7px 2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                110
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                INVOICES SENT
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                85
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                PAID
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                25
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                UNPAID
              </div>
            </div>
          </div>
          <h4>CUSTOMERS</h4>
          <div
            style={{
              borderRadius: "8px",
              width: "90%",
              minHeight: "130px",

              marginBottom: "20px",
              overflow: "hidden",
              boxShadow: "rgba(0,0,0,0.125) 0px 0px 7px 2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                12
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                COUNT
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                8
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                ACTIVE
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                4
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                INACTIVE
              </div>
            </div>
          </div>
          <h4>SERVICES & PRODUCTS</h4>
          <div
            style={{
              borderRadius: "8px",
              width: "90%",
              minHeight: "130px",

              marginBottom: "20px",
              overflow: "hidden",
              boxShadow: "rgba(0,0,0,0.125) 0px 0px 7px 2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                12
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                COUNT
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                8
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                AVAILABLE
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                4
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                UNAVAILABLE
              </div>
            </div>
          </div>
          <h4>USERS</h4>
          <div
            style={{
              borderRadius: "8px",
              width: "90%",
              minHeight: "130px",

              marginBottom: "20px",
              overflow: "hidden",
              boxShadow: "rgba(0,0,0,0.125) 0px 0px 7px 2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                6
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                COUNT
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                4/5
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                ACTIVE
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
              >
                2
              </div>

              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  opacity: "0.6",
                  color: "black",
                }}
              >
                INACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DashFooter />
      </div>
    </div>
  );
}
