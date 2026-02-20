import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../api";
import "../Styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [loginValid, setLoginValid] = useState(false);

  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        localStorage.setItem("companyId", data.companyId);
        localStorage.setItem("companyName", data.companyName);
        localStorage.setItem(
          "userGreeting",
          `${data.firstName} ${data.lastName}`,
        );

        localStorage.setItem("loggedInUser", JSON.stringify(userLogin));

        alert("Login successful!");
        navigate("/Dashboard");
      } else {
        alert(data.message || "Incorrect credentials!");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const checkEmptyInputs = (e) => {
    const valid = e.currentTarget.checkValidity();

    setLoginValid(valid);
  };

  return (
    <>
      <form
        onSubmit={handleUserLogin}
        id="login-page"
        onInput={checkEmptyInputs}
      >
        {/*Main div for header*/}
        <div id="login-header">
          {/*div for close btn*/}

          <div
            id="close-login-btn-div"
            style={{
              display: "flex",
              backgroundColor: "#f9dc5c",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  color: "#465362",
                  backgroundColor: "#f9dc5c",
                }}
              >
                X
              </div>
            </Link>
          </div>

          {/*div for heading*/}
          <div
            id="login-heading"
            style={{
              backgroundColor: "#465362",
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                paddingLeft: "20px",
                color: "white",
              }}
            >
              LOGIN
            </h1>
          </div>
        </div>
        {/*div for main section*/}
        <div id="main-section-login">
          <p>Login with signup email and password.</p>
          {/*div for email*/}
          <div>
            <p style={{ color: "black" }}>Email</p>
            <input
              type="text"
              required
              name="email"
              onChange={(e) =>
                setUserLogin({ ...userLogin, email: e.target.value })
              }
            />
          </div>
          {/*div for password*/}
          <div>
            <p style={{ color: "black" }}>Password</p>
            <input
              type="password"
              required
              name="password"
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
            />
          </div>

          <a href="google.com" id="forgot-pass">
            Forgot password
          </a>

          {/*div for btns: login and cancel*/}
          <div id="login-btns">
            <div
              type="submit"
              id="login-btn"
              disabled={!loginValid}
              class={loginValid ? "active-btn" : "disabled-btn"}
            >
              LOGIN
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div type="button" id="cancel-login-btn">
                CANCEL
              </div>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
