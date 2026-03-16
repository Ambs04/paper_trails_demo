import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../api";
//import "../Styles/signup.css";
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
  const [acceptedTandC, setAcceptedTandC] = useState(false);

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
        localStorage.setItem("loggedInUser", JSON.stringify(data));

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
        <div
          id="content-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "flex-start",
            minHeight: "100vh",
            overflowY: "auto ",
            width: "100%",
          }}
        >
          {/*main div for header*/}
          <div
            style={{
              display: "flex",
            }}
          >
            {/*close btn div*/}
            <div
              id="close-signup"
              style={{
                width: "50px",
                minHeight: "50px",
                backgroundColor: "#f9dc5c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <div style={{ fontSize: "30px", color: "black" }}>X</div>
              </Link>
            </div>
            {/*Heading for header div*/}
            <div
              id="signup-heading"
              style={{
                width: "100%",
                backgroundColor: "#465362",
                display: "flex",

                fontWeight: "bold",
                color: "white",
              }}
            >
              <h2 style={{ paddingLeft: "20px" }}>REGISTRATION</h2>
            </div>
          </div>
          {/*main div for main section*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              overflowY: "auto",
              width: "100%",
              paddingTop: "20px",
            }}
          >
            {/*first name div*/}
            <div
              className="sign-input"
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <p>First name*</p>
              <input
                type="text"
                required
                id="firstName"
                placeholder="type here"
                style={{
                  height: "30px",
                  width: "100%",
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
            {/*last name div*/}
            <div
              className="sign-input"
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <p>Last name*</p>
              <input
                type="text"
                required
                id="lastName"
                placeholder="type here"
                style={{
                  height: "30px",
                  width: "100%",
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
            {/*email div*/}
            <div
              className="sign-input"
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <p>Email address*</p>
              <input
                type="email"
                required
                id="emailInput"
                placeholder="type here"
                style={{
                  height: "30px",
                  width: "100%",
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
            {/*contact div*/}
            <div
              className="sign-input"
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <p>Contact details*</p>
              <input
                type="tel"
                pattern="[0-9]{10}"
                required
                id="cellInput"
                title="Please enter 10-digit contact number"
                placeholder="type here"
                style={{
                  height: "30px",
                  width: "100%",
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
            {/*question div: freelance or business*/}
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",

                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <p>Is this a freelance account or a business account?*</p>
                <div
                  onClick={() => setIsBusiness(false)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "8px",
                  }}
                >
                  <p>FREELANCE</p>

                  <input
                    type="radio"
                    style={{
                      appearance: "none",
                      height: "16px",
                      width: "16px",
                      border: "2px solid rgb(70,83,98)",
                      borderRadius: "4px",
                      backgroundColor:
                        isBusiness === false ? "rgb(70,83,98)" : "transparent",
                      transition: "0.6s",
                    }}
                    name="accountType"
                    checked={isBusiness === false}
                    onChange={() => setIsBusiness(false)}
                  />
                </div>
                <div
                  onClick={() => setIsBusiness(true)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "8px",
                  }}
                >
                  <p>BUSINESS</p>

                  <input
                    type="radio"
                    style={{
                      appearance: "none",
                      height: "16px",
                      width: "16px",
                      border: "2px solid rgb(70,83,98)",
                      borderRadius: "4px",
                      backgroundColor:
                        isBusiness === true ? "rgb(70,83,98)" : "transparent",
                      transition: "0.6s",
                    }}
                    name="accountType"
                    checked={isBusiness === true}
                    onChange={() => setIsBusiness(true)}
                  />
                </div>
              </div>
            </div>
            {/*company name: if business then required*/}

            <div
              className="sign-input"
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <p>If for a business, insert Company name</p>
              <input
                type="text"
                required={isBusiness}
                id="companyName"
                name="companyName"
                placeholder="type here"
                style={{
                  height: "30px",
                  width: "100%",
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

            {/*password div*/}
            <div
              className="sign-input"
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <p>Password* (min 8 characters)</p>
              <input
                type="password"
                name="password"
                value={passwords.password}
                onChange={verification}
                placeholder="type here"
                style={{
                  height: "30px",
                  width: "100%",
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
            {/*confirm password div*/}
            <div
              className="sign-input"
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <p>Confirm password*</p>
              <input
                type="password"
                required
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={verification}
                placeholder="type here"
                style={{
                  height: "30px",
                  width: "100%",
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
            <div
              style={{
                width: "80%",
                marginTop: "30px",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  marginTop: "30px",
                  marginBottom: "20px",
                }}
              >
                Do you agree to terms and conditions provided please read the
                document before signing....
              </div>
              <div
                style={{
                  height: "40px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#efefef",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
              >
                VIEW T&C's
              </div>
            </div>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <p style={{ marginLeft: "14px", fontWeight: "bold" }}>
                Terms & conditions
              </p>
              <div
                onClick={() => setAcceptedTandC(!acceptedTandC)}
                style={{
                  width: "15px",
                  height: "15px",
                }}
              >
                <input
                  type="checkbox"
                  required
                  checked={acceptedTandC}
                  style={{
                    appearance: "none",
                    width: "16px",
                    height: " 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",

                    border: "2px solid #465362",
                    borderRadius: "4px",
                    transition: "0.6s",
                    backgroundColor: acceptedTandC ? "#465362" : "transparent",
                  }}
                />
              </div>
            </div>
          </div>
          {/*div for buttons: sign up and cancel*/}
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 auto 50px auto",
              gap: "10px",
            }}
          >
            <button
              id="signup-submit"
              type="submit"
              disabled={!formValid}
              style={{
                height: "40px",
                width: "100%",
                backgroundColor: "#465362",
                border: "none",
                color: "white",
                fontWeight: "bold",
                transition: "0.6s",
                opacity: formValid ? "1" : "0.3",
              }}
            >
              SIGN UP
            </button>

            <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
              <div
                id="cancel-signup"
                style={{
                  height: "40px",
                  width: "100%",
                  backgroundColor: "#f9dc5c",
                  border: "none",
                  color: "black",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                CANCEL
              </div>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
