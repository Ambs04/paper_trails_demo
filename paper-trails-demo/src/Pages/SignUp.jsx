import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../api";
import "../Styles/signup.css";
import "./../Modules/CommonComponents/LoadingPage";
import LoadingPage from "./../Modules/CommonComponents/LoadingPage";
import loadingLogo from "./../assets/loading_image.png";

export default function SignUp() {
  const [isBusiness, setIsBusiness] = useState(true);
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formValid, setFormValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const verification = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (passwords.password !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      navigate("/signup");
    }

    setIsLoading(true);

    const nameInput = document.getElementById("firstName").value;
    const surnameInput = document.getElementById("lastName").value;

    const userEmail = document.getElementById("emailInput").value;
    const cellNum = document.getElementById("cellInput").value;
    const companyName =
      document.getElementById("companyName").value || "Freelance";

    const signInInfo = {
      firstName: nameInput,
      lastName: surnameInput,
      cellNumber: cellNum,
      email: userEmail,
      password: passwords.password,
      companyName: companyName,
      businessType: isBusiness ? "business" : "retail",
      acceptedTandC: true,
      dateCreated: new Date().toDateString(),
    };

    console.log(signInInfo);

    try {
      const res = await fetch(`${baseUrl}/user/reg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInInfo),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("firstName", signInInfo.firstName);
        localStorage.setItem("lastName", signInInfo.lastName);
        localStorage.setItem("cellNumber", signInInfo.cellNumber);
        localStorage.setItem("email", signInInfo.email);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("companyId", data.companyId);

        alert(`Sign Up successful! You can now login.`);

        navigate("/login");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      (console.error("Error:", error),
        alert("Server is currently unavailable."));
    } finally {
      setIsLoading(false);
    }
  };

  const checkEmptyFields = (e) => {
    const valid = e.currentTarget.checkValidity();

    setFormValid(valid);
  };

  return (
    <>
      {isLoading && <LoadingPage logo={loadingLogo} />}
      <form onSubmit={handleSignUp} onInput={checkEmptyFields}>
        <div id="content-wrapper">
          {/*main div for header*/}
          <div
            style={{
              height: "70px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/*close btn div*/}
            <div
              id="close-signup"
              style={{
                display: "flex",
                backgroundColor: "#f9dc5c",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <div style={{ fontSize: "30px", color: "#465362" }}>X</div>
              </Link>
            </div>
            {/*Heading for header div*/}
            <div
              id="signup-heading"
              style={{
                display: "flex",
                backgroundColor: "#465362",
                color: "white",

                alignItems: "center",
              }}
            >
              <h2 style={{ paddingLeft: "20px" }}>REGISTRATION</h2>
            </div>
          </div>
          {/*main div for main section*/}
          <div
            style={{
              padding: "40px",
            }}
          >
            {/*first name div*/}
            <div className="sign-input">
              <p>First name*</p>
              <input
                type="text"
                required
                id="firstName"
                placeholder="type here"
              />
            </div>
            {/*last name div*/}
            <div className="sign-input">
              <p>Last name*</p>
              <input
                type="text"
                required
                id="lastName"
                placeholder="type here"
              />
            </div>
            {/*email div*/}
            <div className="sign-input">
              <p>Email address*</p>
              <input
                type="email"
                required
                id="emailInput"
                placeholder="type here"
              />
            </div>
            {/*contact div*/}
            <div className="sign-input">
              <p>Contact details*</p>
              <input
                type="tel"
                pattern="[0-9]{10}"
                required
                id="cellInput"
                title="Please enter 10-digit contact number"
                placeholder="type here"
              />
            </div>
            {/*question div: freelance or business*/}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                width: "80%",
              }}
            >
              <div>
                <p>Is this a freelance account or a business account?*</p>
                <div
                  name="account"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "8px",

                    borderRadius: "6px",

                    transition: "0.2s",
                  }}
                >
                  <p>FREELANCE</p>
                  <div
                    onClick={() => setIsBusiness(false)}
                    style={{
                      height: "16px",
                      width: "16px",
                      border: "2px solid rgb(70,83,98)",
                      borderRadius: "4px",
                      backgroundColor:
                        isBusiness === false ? "rgb(70,83,98)" : "transparent",
                      transition: "0.2s",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "8px",

                    borderRadius: "6px",

                    transition: "0.6s",
                  }}
                >
                  <p>BUSINESS</p>

                  <div
                    onClick={() => setIsBusiness(true)}
                    style={{
                      height: "16px",
                      width: "16px",
                      border: "2px solid rgb(70,83,98)",
                      borderRadius: "4px",
                      backgroundColor:
                        isBusiness === true ? "rgb(70,83,98)" : "transparent",
                      transition: "0.6s",
                    }}
                  />
                </div>
              </div>
            </div>
            {/*company name: if business then required*/}
            <div className="sign-input">
              <p>If for a business, insert Company name</p>
              <input
                type="text"
                required={isBusiness}
                id="companyName"
                name="companyName"
                placeholder="type here"
              />
            </div>
            {/*password div*/}
            <div className="sign-input">
              <p>Password* (min 8 characters)</p>
              <input
                type="password"
                name="password"
                value={passwords.password}
                onChange={verification}
                placeholder="type here"
              />
            </div>
            {/*confirm password div*/}
            <div className="sign-input">
              <p>Confirm password*</p>
              <input
                type="password"
                required
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={verification}
                placeholder="type here"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                marginTop: "10px",
                width: "50%",
                margin: "0 auto 0 auto",
              }}
            >
              <label
                style={{
                  display: "flex",

                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  required
                  style={{
                    width: "25px",
                    height: " 25px",
                  }}
                />
                <p style={{ display: "flex" }}>
                  Accept the{" "}
                  <a
                    href="www.google.com"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    T&C's
                  </a>
                </p>
              </label>
            </div>
          </div>
          {/*div for buttons: sign up and cancel*/}
          <div>
            <div id="signup-submit-container">
              <button
                id="signup-submit"
                type="submit"
                disabled={!formValid}
                class={formValid ? "active-btn" : "disabled-btn"}
              >
                SIGN UP
              </button>
            </div>

            <Link to="/" style={{ textDecoration: "none" }}>
              <div id="cancel-signup">CANCEL</div>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
