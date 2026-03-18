import { useEffect, useState } from "react";
import Greeting from "../Modules/CommonComponents/Greeting";
import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import LoadingPage from "./../Modules/CommonComponents/LoadingPage";
import loadingLogo from "./../assets/loading_image.png";

export default function Dashboard() {
  const currentPlan = localStorage.getItem("subscriptionType") || "FREE";
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  return (
    <>
      {isLoading && <LoadingPage logo={loadingLogo} />}
      <div
        style={{
          maxWidth: "100vw",
          margin: "0 auto",
          minHeight: "100vh",
          background: "#f5f6fa",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Header />

        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Greeting />

          <div
            style={{
              fontSize: "14px",

              paddingTop: "10px",
              marginBottom: "10px",
            }}
          >
            This Dashboard will be here to give you a quick overview of what's
            happening on your system.
          </div>
          <div style={{ width: "100%" }}>
            <h4 style={{ marginTop: "10px", marginBottom: "0px" }}>
              ACCOUNT TYPE
            </h4>
            <p
              style={{
                marginTop: "10px",
                padding: "0px",
                marginBottom: "10px",
              }}
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
                borderRadius: "10px",
                width: "95%",
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                  INVOICES
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                width: "95%",
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                width: "95%",
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                width: "95%",
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "black",
                  }}
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
    </>
  );
}
