import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const handleUserLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (
      userLogin.email === user.email &&
      userLogin.password === user.password
    ) {
      alert("Login Successful");
      navigate("/");
    } else {
      alert("No user date found. Please sign up and try again.");
      return;
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
              type="text"
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
            <button>LOGIN</button>
            <Link to="/">
              <button type="submit">CANCEL</button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
