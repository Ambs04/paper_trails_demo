import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../api";
//import "../Styles/login.css";
import LoadingPage from "./../Modules/CommonComponents/LoadingPage";
import loadingLogo from "./../assets/loading_image.png";

export default function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [loginValid, setLoginValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

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

        navigate("/Dashboard");
      } else {
        alert(data.message || "Incorrect credentials!");
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkEmptyInputs = (e) => {
    const valid = e.currentTarget.checkValidity();

    setLoginValid(valid);
  };

  return (
    <>
      {isLoading && <LoadingPage logo={loadingLogo} />}
      <form
        onSubmit={handleUserLogin}
        id="login-page"
        onInput={checkEmptyInputs}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#ffffff",
          position: "relative",
          overflowY: "auto",
        }}
      >
        {/*Main div for header*/}
        <div
          id="login-header"
          style={{
            width: "100%",
            minHeight: "50px",
            display: "flex",
          }}
        >
          {/*div for close btn*/}

          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                color: "black",
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50px",
                width: "50px",
                backgroundColor: "#f9dc5c",
                border: "none",
              }}
            >
              X
            </div>
          </Link>

          {/*div for heading*/}
          <div
            id="login-heading"
            style={{
              width: "100%",
              backgroundColor: "#465362",
              height: "50px",
              display: "flex",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              paddingLeft: "10px",
            }}
          >
            LOGIN
          </div>
        </div>

        {/*div for main section*/}
        <div
          id="main-section-login"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              textAlign: "left",
              fontSize: "14px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "row",
              }}
            >
              Use your email to login and don't forget your password.... if you
              have forgotten your password, please contact support and they will
              be able to help you reset it.
            </p>
          </div>
          {/*div for email*/}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              paddingLeft: "150px",
            }}
          >
            <p style={{ color: "black" }}>Email</p>
            <input
              type="text"
              required
              placeholder="type here"
              name="email"
              onChange={(e) =>
                setUserLogin({ ...userLogin, email: e.target.value })
              }
              style={{
                height: "30px",
                width: "80%",
                marginTop: "5px",
                borderRadius: "4px",
                padding: "8px 10px 8px 20px",
                fontSize: "14px",
                border: "none",
                backgroundColor: "rgba(0,0,0,0.035)",
                fontWeight: "bold",
              }}
            />
          </div>
          {/*div for password*/}
          <div
            style={{
              width: "100%",
              fontSize: "14px",
              color: "#465362",

              paddingLeft: "150px",
            }}
          >
            <p style={{ color: "black" }}>Password</p>
            <input
              type="password"
              required
              placeholder="type here"
              name="password"
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
              style={{
                height: "30px",
                width: "80%",
                marginTop: "5px",
                borderRadius: "4px",
                padding: "8px 10px 8px 20px",
                fontSize: "14px",
                border: "none",
                backgroundColor: "rgba(0,0,0,0.035)",
                fontWeight: "bold",
              }}
            />
          </div>

          {/*div for btns: login and cancel*/}
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "180px",
            }}
          >
            <button
              type="submit"
              id="login-btn"
              disabled={!loginValid}
              style={{
                height: "40px",
                width: "100%",
                backgroundColor: "#465362",
                border: "none",
                color: "white",
                fontWeight: "bold",
                opacity: loginValid ? 1 : 0.4,
              }}
            >
              LOGIN
            </button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                type="button"
                id="cancel-login-btn"
                style={{
                  height: "40px",
                  width: "100%",
                  backgroundColor: "#f9dc5c",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                CANCEL
              </button>
            </Link>
          </div>
        </div>

        <img
          src={loadingLogo}
          style={{
            height: "570px",
            transition: " 0.8s",
            opacity: "0.2",
            position: "absolute",
            top: "50px",
            zIndex: "0",
            right: "0px",
          }}
        />
      </form>
    </>
  );
}
