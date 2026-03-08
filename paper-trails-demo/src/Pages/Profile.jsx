import { baseUrl } from "../api";
import Greeting from "../Modules/CommonComponents/Greeting";
import Header from "../Modules/CommonComponents/Header";
import { useState } from "react";
import ".././Styles/profile.css";

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    cellNumber: localStorage.getItem("cellNumber") || "",
    email: localStorage.getItem("email") || "",
    colors1: "#D8DFE7",
    colors2: "#000000",
    companyLogoId: "",
    compamyAddress: "",
    companyContactInfo: "",
    companyEmail: "",
    companyName: localStorage.getItem("companyName") || "",
    bank: localStorage.getItem("bank") || "",
    accountNumber: localStorage.getItem("accountNumber") || "",
    accountType: localStorage.getItem("accountType") || "",
    accountName: localStorage.getItem("accountName") || "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const fetchProfileInfo = {
      ...profileInfo,
      userId: localStorage.getItem("userId"),
      companyId: localStorage.getItem("companyId"),
      subscriptionType: profileInfo.subscriptionType || "free",
      invoiceType: "standard",
    };

    const res = await fetch(`${baseUrl}/user/updateUserInformation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fetchProfileInfo),
    });

    //const data = await res.json();
    console.log(fetchProfileInfo);
    if (res.ok) {
      localStorage.setItem(
        "subscriptionType",
        fetchProfileInfo.subscriptionType,
      );
      localStorage.setItem("companyLogoId", fetchProfileInfo.companyLogoId);

      localStorage.setItem("firstName", fetchProfileInfo.firstName);
      localStorage.setItem("lastName", fetchProfileInfo.lastName);
      localStorage.setItem("companyName", fetchProfileInfo.companyName);
      localStorage.setItem("cellNumber", fetchProfileInfo.cellNumber);
      localStorage.setItem("email", fetchProfileInfo.email);
      localStorage.setItem("bank", fetchProfileInfo.bank);
      localStorage.setItem("accountNumber", fetchProfileInfo.accountNumber);
      localStorage.setItem("accountName", fetchProfileInfo.accountName);
      localStorage.setItem("accountType", fetchProfileInfo.accountType);

      alert("Profile successfully updated!");
      window.history.back();
      //  console.log(data);
      //console.log(profileInfo);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div
        style={{
          padding: "0 90px",
          maxWidth: "900px",
          margin: "0 auto 0 auto",
        }}
      >
        <div style={{ width: "200px", textAlign: "left" }}>
          <Greeting />
        </div>
        <form
          onSubmit={handleProfileUpdate}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto 0 auto",
            width: "80%",
          }}
        >
          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              width: "90%",
            }}
          >
            <p style={{ color: "black", paddingLeft: "0px" }}>
              SUBSCRIPTION PLAN
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setProfileInfo({
                  ...profileInfo,
                  subscriptionType: "free",
                });
              }}
              style={{
                height: "40px",
                width: "120px",
                backgroundColor:
                  profileInfo.subscriptionType === "free"
                    ? "rgb(249, 220, 92)"
                    : "rgba(0,0,0,0.035)",
                borderWidth: "0px",
                color: "black",
                fontWeight: "bold",
                opacity: "1",
              }}
            >
              FREE PLAN
            </button>
            <button
              type="button"
              onClick={() => {
                setProfileInfo({ ...profileInfo, subscriptionType: "small" });
              }}
              style={{
                height: "40px",
                width: "120px",
                backgroundColor:
                  profileInfo.subscriptionType === "small"
                    ? "rgb(249, 220, 92)"
                    : "rgba(0,0,0,0.035)",
                borderWidth: "0px",
                color: "black",
                fontWeight: "bold",
                opacity: "1",
              }}
            >
              SMALL PLAN
            </button>
            <button
              type="button"
              onClick={() => {
                setProfileInfo({ ...profileInfo, subscriptionType: "big" });
              }}
              style={{
                height: "40px",
                width: "120px",
                backgroundColor:
                  profileInfo.subscriptionType === "big"
                    ? "rgb(249, 220, 92)"
                    : "rgba(0,0,0,0.035)",
                borderWidth: "0px",
                color: "black",
                fontWeight: "bold",
                opacity: "1",
              }}
            >
              BIG PLAN
            </button>
          </div>

          <div style={{ width: "100%" }}>
            <p
              style={{
                fontSize: "14px",
                color: "black",
                paddingLeft: "0px",
                marginBottom: "10px",
              }}
            >
              INVOICE TEMPLATE
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                style={{
                  height: "40px",
                  width: "50%",
                  backgroundColor: "rgb(249, 220, 92)",
                  borderWidth: "0px",
                  color: "black",
                  fontWeight: "bold",
                  opacity: "1",
                }}
              >
                FREE OPTION 1
              </button>
              <button
                type="button"
                style={{
                  height: "40px",
                  width: "50%",
                  backgroundColor: "rgba(0,0,0,0.035)",
                  borderWidth: "0px",
                  color: "black",
                  fontWeight: "bold",
                  opacity: "1",
                }}
              >
                PAID VERSIONS
              </button>
            </div>
          </div>
          <div
            style={{
              width: "80%",
              fontSize: "14px",
              marginBottom: "15px",
              marginTop: "20px",
            }}
          >
            The information is used for your invoice and layout to auto fill
            your information on documents as required...
            <div
              style={{
                width: "100%",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: "80%",
                  fontSize: "14px",
                  marginBottom: "10px",
                  marginTop: "30px",
                  marginLeft: "15px",
                }}
              >
                BUSINESS PROFILE INFORMATION
              </div>
              <div
                style={{
                  width: "85%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: "15px",
                  marginLeft: "0px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    COMPANY NAME
                  </p>
                  <input
                    name="companyName"
                    type="text"
                    value={profileInfo.companyName}
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "4px",
                      padding: "8px 10px 8px 50px",
                      paddingTop: "5px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    COMPANY EMAIL
                  </p>
                  <input
                    type="email"
                    name="companyEmail"
                    value={profileInfo.companyEmail}
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      borderRadius: "4px",
                      padding: "8px 10px 8px 50px",
                      paddingTop: "5px",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    COMPANY CONTACT NUMBER
                  </p>
                  <input
                    name="companyContactInfo"
                    value={profileInfo.companyContactInfo}
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      borderRadius: "4px",
                      padding: "8px 10px 8px 50px",
                      paddingTop: "5px",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    COMPANY ADDRESS
                  </p>
                  <input
                    name="compamyAddress"
                    value={profileInfo.compamyAddress}
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      borderRadius: "4px",
                      padding: "8px 10px 70px 50px",
                      paddingTop: "5px",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  {profileInfo.companyLogoId && (
                    <div
                      style={{
                        marginBottom: "30px",
                        width: "500px",
                        height: "300px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={profileInfo.companyLogoId}
                        style={{
                          maxHeight: "250px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    COMPANY LOGO (insert url)
                  </p>
                  <input
                    placeholder="none"
                    name="companyLogoId"
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "4px",
                      padding: "8px 10px 8px 50px",
                      paddingTop: "5px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    value={profileInfo.companyLogoId}
                  />
                </div>
                <div
                  style={{
                    margin: "20px auto 20px auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      color: "black",
                      alignSelf: "flex-start",
                      paddingTop: "20px ",
                      paddingBottom: "40px",
                    }}
                  >
                    COMPANY COLORS
                  </p>
                  <div
                    style={{
                      display: "flex",

                      flexDirection: "row",
                      alignItems: "center",

                      gap: "15px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: "20px",
                        height: "50px",
                        width: "60px",
                        backgroundColor: profileInfo.colors1,
                        border: "none",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type="color"
                        name="colors1"
                        value={profileInfo.colors1}
                        onChange={handleProfileChange}
                        style={{ display: "none" }}
                      />
                    </div>
                    <label
                      style={{
                        color: "rgb(70,83,98)",
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "14px",
                        alignItems: "flex-start",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      COLOR 1
                      <input
                        type="text"
                        name="colors1"
                        value={profileInfo.colors1}
                        onChange={handleProfileChange}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginTop: "10px",
                        }}
                      />
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "15px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: "20px",
                        height: "50px",
                        width: "60px",
                        backgroundColor: profileInfo.colors2,
                        border: "none",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type="color"
                        name="colors2"
                        value={profileInfo.colors2}
                        onChange={handleProfileChange}
                        style={{
                          display: "none",
                        }}
                      />
                    </div>
                    <label
                      style={{
                        color: "rgb(70,83,98)",
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "14px",
                        alignItems: "flex-start",
                        fontWeight: "bold",
                      }}
                    >
                      COLOR 2
                      <input
                        type="text"
                        name="colors2"
                        value={profileInfo.colors2}
                        onChange={handleProfileChange}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginTop: "10px",
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ color: "black" }}>BANKING DETAILS</p>
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                  BANK
                </p>
                <input
                  name="bank"
                  value={profileInfo.bank}
                  onChange={handleProfileChange}
                  style={{
                    height: "30px",
                    borderRadius: "4px",
                    padding: "8px 10px 8px 50px",
                    paddingTop: "5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
              </div>
              <div
                style={{
                  width: "350px",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "20px",
                  margin: "0 auto 0 auto",
                }}
              >
                <p style={{ marginBottom: "10px" }}>ACCOUNT TYPE</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    width: "100%",
                    gap: "15px",
                  }}
                >
                  <div
                    onClick={() =>
                      handleProfileChange({
                        target: { name: "accountType", value: "Savings" },
                      })
                    }
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 15px",
                      border: "none",
                    }}
                  >
                    SAVINGS
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        border: "2px solid #465362",
                        backgroundColor:
                          profileInfo.accountType === "Savings"
                            ? "#465362"
                            : "transparent",
                      }}
                    ></div>
                  </div>

                  <div
                    onClick={() =>
                      handleProfileChange({
                        target: { name: "accountType", value: "Cheque" },
                      })
                    }
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 15px",
                      border: "none",
                    }}
                  >
                    CHEQUE
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        border: "2px solid #465362",
                        backgroundColor:
                          profileInfo.accountType === "Cheque"
                            ? "#465362"
                            : "transparent",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                  ACCOUNT NUMBER
                </p>
                <input
                  name="accountNumber"
                  value={profileInfo.accountNumber}
                  onChange={handleProfileChange}
                  style={{
                    height: "30px",
                    borderRadius: "4px",
                    padding: "8px 10px 8px 50px",
                    paddingTop: "5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                  ACCOUNT NAME
                </p>
                <input
                  name="accountName"
                  value={profileInfo.accountName}
                  onChange={handleProfileChange}
                  style={{
                    height: "30px",
                    borderRadius: "4px",
                    padding: "8px 10px 8px 50px",
                    paddingTop: "5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "15px",
                width: "85%",
                margin: "0px auto 0px auto",
              }}
            >
              <p style={{ color: "black" }}>COMPANY OWNER PROFILE</p>

              <div
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    FIRST NAME
                  </p>
                  <input
                    name="firstName"
                    value={profileInfo.firstName}
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      borderRadius: "4px",
                      padding: "8px 10px 5px 50px",

                      display: "flex",
                      flexDirection: "column",
                    }}
                  />
                </div>
                <div>
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    LAST NAME
                  </p>
                  <input
                    name="lastName"
                    value={profileInfo.lastName}
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      borderRadius: "4px",
                      padding: "8px 10px 5px 50px",

                      display: "flex",
                      flexDirection: "column",
                    }}
                  />
                </div>
                <div>
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    EMAIL
                  </p>
                  <input
                    name="email"
                    value={profileInfo.email}
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      borderRadius: "4px",
                      padding: "8px 10px 5px 50px",

                      display: "flex",
                      flexDirection: "column",
                    }}
                  />
                </div>
                <div>
                  <p style={{ color: "rgb(70,83,98)", fontWeight: "bold" }}>
                    CONTACT NUMBER
                  </p>
                  <input
                    name="cellNumber"
                    value={profileInfo.cellNumber}
                    onChange={handleProfileChange}
                    style={{
                      height: "30px",
                      borderRadius: "4px",
                      padding: "8px 10px 5px 50px",

                      display: "flex",
                      flexDirection: "column",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <button
                type="submit"
                style={{
                  height: "40px",
                  width: "100%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(249,220,92)",
                  borderWidth: "0",
                  color: "black",
                  transition: "0.6s",
                  opacity: "1",
                }}
              >
                UPDATE
              </button>
              <button
                type="button"
                style={{
                  height: "40px",
                  width: "100%",
                  fontWeight: "bold",

                  backgroundColor: "rgb()",
                  borderWidth: "0",
                  color: "black",
                  transition: "0.6s",
                  opacity: "1",
                }}
              >
                REQUEST SUPPORT
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
