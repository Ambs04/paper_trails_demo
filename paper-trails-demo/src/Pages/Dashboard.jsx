import { useEffect, useState } from "react";
import Greeting from "../Modules/CommonComponents/Greeting";
import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import LoadingPage from "./../Modules/CommonComponents/LoadingPage";
import loadingLogo from "./../assets/loading_image.png";
import { baseUrl } from "../api";

export default function Dashboard() {
  const currentPlan = localStorage.getItem("subscriptionType") || "FREE";
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  const [statsValue, setStatsValue] = useState({
    invoices: [],
    customers: [],
    products: [],
    users: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const companyId = localStorage.getItem("companyId");
        if (!companyId) {
          console.error("No companyId found in localStorage");
          return;
        }
        const [invoiceRes, customerRes, productRes, userRes] =
          await Promise.all([
            fetch(`${baseUrl}/invoice/getInvoicesPerCustomer`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ companyId }),
            }),
            fetch(`${baseUrl}/customer/getCompanyCustomers`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ companyId }),
            }),
            fetch(`${baseUrl}/productServices/getAllProducts`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ companyId }),
            }),
            fetch(`${baseUrl}/user/getComapnyAllCustomers`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ companyId }),
            }),
          ]);

        const invoices = await invoiceRes.json();
        const customers = await customerRes.json();
        const products = await productRes.json();
        const users = await userRes.json();

        setStatsValue({
          invoices: invoices.invoices || invoices.invoiceList || [],
          customers: customers.users || [],
          products: products.products || [],
          users: users.users || [],
        });
        console.log(statsValue);
      } catch (err) {
        console.log("Dash info fetch error", err);
      }
    };

    fetchDashboardData();
  }, []);

  const invoiceTotal = statsValue.invoices.length;
  const invoicePaid = statsValue.invoices.filter(
    (i) => i.status === "paid",
  ).length;
  const invoiceUnpaid = statsValue.invoices.filter(
    (i) => i.status !== "paid",
  ).length;

  const customerTotal = statsValue.customers.length;
  const customerActive = statsValue.customers.filter(
    (c) => c.status === "active",
  ).length;
  const customerInactive = statsValue.customers.filter(
    (c) => c.status !== "active",
  ).length;

  const productTotal = statsValue.products.length;
  const productActive = statsValue.products.filter(
    (p) => p.status === "active",
  ).length;
  const productInactive = statsValue.products.filter(
    (p) => p.status !== "active",
  ).length;

  const userTotal = statsValue.users.length;
  const userActive = statsValue.users.filter(
    (u) => u.accountStatus === "active",
  ).length;
  const userInactive = statsValue.users.filter(
    (u) => u.accountStatus !== "active",
  ).length;

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
          flex: "1",
          paddingBottom: "80px",
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
                  {invoiceTotal}
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
                  {invoicePaid}
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
                  {invoiceUnpaid}
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
                  {customerTotal}
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
                  {customerActive}
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
                  {customerInactive}
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
                  {productTotal}
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
                  {productActive}
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
                  {productInactive}
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
                  {userTotal}
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
                  {userActive} / {userTotal}
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
                  {userInactive}
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
