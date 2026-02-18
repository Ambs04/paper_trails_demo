import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../api";
import "../Styles/signup.css";

export default function SignUp() {
  const [isBusiness, setIsBusiness] = useState(true);
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const verification = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    {
      /* navigate("/");*/
    }
    if (passwords.password !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      navigate("/signup");
    }
    {
      /*else {
      const nameInput = document.getElementById("firstName").value;
      const surnameInput = document.getElementById("lastName").value;
      const nameSurname = `${nameInput} ${surnameInput}`;

      const userEmail = e.target.elements.email.value;
      const userLoginData = {
        email: userEmail,
        password: passwords.password,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(userLoginData));
      localStorage.setItem("userGreeting", nameSurname);
    }*/
    }

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
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <div>
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
            <div class="sign-input">
              <p>First name*</p>
              <input
                type="text"
                required
                id="firstName"
                placeholder="type here"
              />
            </div>
            {/*last name div*/}
            <div class="sign-input">
              <p>Last name*</p>
              <input
                type="text"
                required
                id="lastName"
                placeholder="type here"
              />
            </div>
            {/*email div*/}
            <div class="sign-input">
              <p>Email address*</p>
              <input
                type="email"
                required
                id="emailInput"
                placeholder="type here"
              />
            </div>
            {/*contact div*/}
            <div class="sign-input">
              <p>Contact details*</p>
              <input
                type="text"
                required
                id="cellInput"
                placeholder="type here"
              />
            </div>
            {/*question div: freelance or business*/}
            <div class="radio-select-signup">
              <div id="verification-question">
                <p>Is this a freelance account or a business account?*</p>
              </div>
              <div id="question-options">
                <label>
                  Freelance
                  <input
                    type="radio"
                    name="account"
                    onChange={() => setIsBusiness(false)}
                  />
                </label>
                <label>
                  Business
                  <input
                    type="radio"
                    onChange={() => setIsBusiness(true)}
                    name="account"
                  />
                </label>
              </div>
            </div>
            {/*company name: if business then required*/}
            <div class="sign-input">
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
            <div class="sign-input">
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
            <div class="sign-input">
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
            <input type="checkbox" required />
            <p>
              Accept the <a href="www.google.com">T&C's</a>
            </p>
          </div>
          {/*div for buttons: sign up and cancel*/}
          <div>
            <div type="submit" id="signup-submit">
              Sign Up
            </div>

            <Link to="/" style={{ textDecoration: "none" }}>
              <div id="cancel-signup">Cancel</div>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
