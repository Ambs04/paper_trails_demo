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
    bank: "",
    accountNumber: "",
    accountType: "",
    accountName: "",
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
      subscriptionType: "free",
      invoiceType: "standard",
    };

    const res = await fetch(`${baseUrl}/user/updateUserInformation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fetchProfileInfo),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("subscriptionType", profileInfo.subscriptionType);
      alert("Profile successfully updated!");
      console.log(data);
      console.log(profileInfo);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <h1>
          <Greeting />
        </h1>
      </div>
      <form onSubmit={handleProfileUpdate}>
        <div>
          <p>Subscription plan</p>
          <div>
            <button
              type="button"
              onClick={() =>
                setProfileInfo({ ...profileInfo, subscriptionType: "free" })
              }
            >
              FREE PLAN
            </button>
            <button
              type="button"
              onClick={() =>
                setProfileInfo({ ...profileInfo, subscriptionType: "small" })
              }
            >
              SMALL PLAN
            </button>
            <button
              type="button"
              onClick={() =>
                setProfileInfo({ ...profileInfo, subscriptionType: "big" })
              }
            >
              BIG PLAN
            </button>
          </div>
        </div>
        <div>
          <p>INVOICE TEMPLATE</p>
          <div>
            <button>FREE OPTION 1</button>
            <button>PAID VERSIONS</button>
          </div>
        </div>
        <div>
          <p>
            The information below should be updated at all times as they will be
            used to generate invoices.
          </p>
          <div>
            <p>BUSINESS PROFILE INFORMATION</p>
          </div>
          <div>
            <div>
              <p>Company name:</p>
              <input
                name="companyName"
                type="text"
                value={profileInfo.companyName}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <p>company email:</p>
              <input
                type="email"
                name="companyEmail"
                value={profileInfo.companyEmail}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <p>company contact number:</p>
              <input
                name="companyContactInfo"
                value={profileInfo.companyContactInfo}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <p>company address:</p>
              <input
                name="compamyAddress"
                value={profileInfo.compamyAddress}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <p>company logo:</p>
              <input />
            </div>
            <div>
              <p>company colors</p>

              <input
                type="color"
                name="colors1"
                value={profileInfo.colors1}
                onChange={handleProfileChange}
              />
              <input
                type="text"
                name="colors1"
                value={profileInfo.colors1}
                onChange={handleProfileChange}
              />
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
          <div>
            <p>BANKING DETAILS</p>
          </div>
          <div>
            <p>bank</p>
            <input
              name="bank"
              value={profileInfo.bank}
              onChange={handleProfileChange}
            />
          </div>
          <div>
            <p>Account type:</p>
            <label>
              Savings{" "}
              <input
                type="radio"
                name="accountType"
                value="Savings"
                checked={profileInfo.accountType === "Savings"}
                onChange={handleProfileChange}
              />
            </label>
            <label>
              Cheque{" "}
              <input
                type="radio"
                name="accountType"
                value="Cheque"
                checked={profileInfo.accountType === "Cheque"}
                onChange={handleProfileChange}
              />
            </label>
          </div>
          <div>
            <p>account no:</p>
            <input
              name="accountNumber"
              value={profileInfo.accountNumber}
              onChange={handleProfileChange}
            />
          </div>
          <div>
            <p>account name</p>
            <input
              name="accountName"
              value={profileInfo.accountName}
              onChange={handleProfileChange}
            />
          </div>
        </div>
        <div>
          <p>COMPANY OWNER PROFILE</p>
        </div>
        <div>
          <div>
            <p>First name</p>
            <input
              name="firstName"
              value={profileInfo.firstName}
              onChange={handleProfileChange}
            />
          </div>
          <div>
            <p>last name</p>
            <input
              name="lastName"
              value={profileInfo.lastName}
              onChange={handleProfileChange}
            />
          </div>
          <div>
            <p>email</p>
            <input
              name="email"
              value={profileInfo.email}
              onChange={handleProfileChange}
            />
          </div>
          <div>
            <p>contact number</p>
            <input
              name="cellNumber"
              value={profileInfo.cellNumber}
              onChange={handleProfileChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">UPDATE</button>
          <button type="button">REQUEST SUPPORT</button>
        </div>
      </form>
    </>
  );
}
