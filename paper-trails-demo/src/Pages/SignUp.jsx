import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../api";

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
          <div>
            {/*close btn div*/}
            <div>
              <Link to="/">
                <button>X</button>
              </Link>
            </div>
            {/*Heading for header div*/}
            <div>
              <h1>REGISTRATION</h1>
            </div>
          </div>
          {/*main div for main section*/}
          <div>
            {/*first name div*/}
            <div>
              <p>First name*</p>
              <input type="text" required id="firstName" />
            </div>
            {/*last name div*/}
            <div>
              <p>Last name*</p>
              <input type="text" required id="lastName" />
            </div>
            {/*email div*/}
            <div>
              <p>Email address*</p>
              <input type="email" required id="emailInput" />
            </div>
            {/*contact div*/}
            <div>
              <p>Contact details*</p>
              <input type="text" required id="cellInput" />
            </div>
            {/*question div: freelance or business*/}
            <div>
              <p>Is this a freelance account or a business account?*</p>
              <br />
              <label>
                <input
                  type="radio"
                  name="account"
                  onChange={() => setIsBusiness(false)}
                />
                Freelance
              </label>
              <label>
                <input
                  type="radio"
                  onChange={() => setIsBusiness(true)}
                  name="account"
                />
                Business
              </label>
            </div>
            {/*company name: if business then required*/}
            <div>
              <p>If for a business, insert Company name</p>
              <input
                type="text"
                required={isBusiness}
                id="companyName"
                name="companyName"
              />
            </div>
            {/*password div*/}
            <div>
              <p>Password* (min 8 characters)</p>
              <input
                type="password"
                name="password"
                value={passwords.password}
                onChange={verification}
              />
            </div>
            {/*confirm password div*/}
            <div>
              <p>Confirm password*</p>
              <input
                type="password"
                required
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={verification}
              />
            </div>
            <input type="checkbox" required />
            <p>
              Accept the <a href="www.google.com">T&C's</a>
            </p>
          </div>
          {/*div for buttons: sign up and cancel*/}
          <div>
            <button type="submit">Sign Up</button>

            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
