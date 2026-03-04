import { baseUrl } from "../api";
import Greeting from "../Modules/CommonComponents/Greeting";
import Header from "../Modules/CommonComponents/Header";
import { useState } from "react";

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
                <p>COMPANY NAME</p>
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
                <p>COMPANY EMAIL</p>
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
                <p>COMPANY CONTACT NUMBER</p>
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
                <p>COMPANY ADDRESS</p>
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
                <p>COMPANY LOGO</p>
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
                  margin: "20px 0 20px 0",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>COMPANY COLORS</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <input
                    type="color"
                    name="colors1"
                    value={profileInfo.colors1}
                    onChange={handleProfileChange}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      borderRadius: "8px",
                      background: "none",
                      border: "none",
                    }}
                  />
                  <input
                    type="text"
                    name="colors1"
                    value={profileInfo.colors1}
                    onChange={handleProfileChange}
                  />
                </div>
                <div>
                  <input
                    type="color"
                    name="colors2"
                    value={profileInfo.colors2}
                    onChange={handleProfileChange}
                  />
                  <input
                    type="text"
                    name="colors2"
                    value={profileInfo.colors2}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <p style={{ color: "black", fontWeight: "bold" }}>
                BANKING DETAILS
              </p>
            </div>
            <div style={{ width: "100%" }}>
              <p>BANK</p>
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
              }}
            >
              <p style={{ marginBottom: "10px" }}>ACCOUNT TYPE</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",

                  gap: "15px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  SAVINGS
                  <input
                    type="radio"
                    name="accountType"
                    value="Savings"
                    checked={profileInfo.accountType === "Savings"}
                    onChange={handleProfileChange}
                  />
                </label>

                <label
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  CHEQUE
                  <input
                    type="radio"
                    name="accountType"
                    value="Cheque"
                    checked={profileInfo.accountType === "Cheque"}
                    onChange={handleProfileChange}
                  />
                </label>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <p>ACCOUNT NUMBER</p>
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
              <p>ACCOUNT NAME</p>
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
            <p>COMPANY OWNER PROFILE</p>

            <div
              style={{
                width: "100%",
              }}
            >
              <div>
                <p>FIRST NAME</p>
                <input
                  name="firstName"
                  value={profileInfo.firstName}
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
              <div>
                <p>LAST NAME</p>
                <input
                  name="lastName"
                  value={profileInfo.lastName}
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
              <div>
                <p>EMAIL</p>
                <input
                  name="email"
                  value={profileInfo.email}
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
              <div>
                <p>CONTACT NUMBER</p>
                <input
                  name="cellNumber"
                  value={profileInfo.cellNumber}
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
          </div>

          <div>
            <button type="submit">UPDATE</button>
            <button type="button">REQUEST SUPPORT</button>
          </div>
        </form>
      </div>
    </>
  );
}
