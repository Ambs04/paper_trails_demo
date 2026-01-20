import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
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
          <input type="text" />
        </div>
        {/*div for password*/}
        <div>
          <p>Password</p>
          <input type="text" />
        </div>
        <p>
          <a href="google.com">Forgot password</a>
        </p>
        {/*div for btns: login and cancel*/}
        <div>
          <button>LOGIN</button>
          <button>CANCEL</button>
        </div>
      </div>
    </>
  );
}
