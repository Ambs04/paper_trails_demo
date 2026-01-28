import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const handleUserLogin = async (e) => {
    e.preventDefault();
    {
      /*const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (
      userLogin.email === user.email &&
      userLogin.password === user.password
    ) {
      alert("Login Successful");
      navigate("/Dashboard");
    } else {
      alert("No user date found. Please sign up and try again.");
      return;
    }*/
    }
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

  return (
    <>
      <form onSubmit={handleUserLogin}>
        {/*Main div for header*/}
        <div>
          {/*div for close btn*/}
          <div>
            <Link to="/">
              <button>X</button>
            </Link>
          </div>
          {/*div for heading*/}
          <div>
            <h1>LOGIN</h1>
          </div>
        </div>
        {/*div for main section*/}
        <div>
          <p>Login with email and password.</p>
          {/*div for email*/}
          <div>
            <p>Email</p>
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
            <p>Password</p>
            <input
              type="password"
              required
              name="password"
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
            />
          </div>
          <p>
            <a href="google.com">Forgot password</a>
          </p>
          {/*div for btns: login and cancel*/}
          <div>
            <button type="submit">LOGIN</button>
            <Link to="/">
              <button type="button">CANCEL</button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
