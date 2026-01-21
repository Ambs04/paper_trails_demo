import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/");
    if (passwords.password !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      navigate("/signup");
    } else {
      const userEmail = e.target.elements.email.value;
      const userLoginData = {
        email: userEmail,
        password: passwords.password,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(userLoginData));
      navigate("/");
      const userName = e.target.elements.userName.value;
      const userSurname = e.target.elements.userSurname.value;
      const userNameSurname = {
        name: userName,
        surname: userSurname,
      };
      localStorage.setItem("userNames", JSON.stringify(userNameSurname));
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
              <input type="text" required name="userName" />
            </div>
            {/*last name div*/}
            <div>
              <p>Last name*</p>
              <input type="text" required name="userSurname" />
            </div>
            {/*email div*/}
            <div>
              <p>Email address*</p>
              <input type="email" required name="email" />
            </div>
            {/*contact div*/}
            <div>
              <p>Contact details*</p>
              <input type="text" required />
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
              <input type="text" required={isBusiness} />
            </div>
            {/*password div*/}
            <div>
              <p>Password*</p>
              <input
                type="text"
                name="password"
                value={passwords.password}
                onChange={verification}
              />
            </div>
            {/*confirm password div*/}
            <div>
              <p>Confirm password*</p>
              <input
                type="text"
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
