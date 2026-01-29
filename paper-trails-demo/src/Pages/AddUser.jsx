import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../api";

export default function AddUser() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    cell: "",
    email: "",
    password: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const userFetchInfo = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      cellNumber: userInfo.cell,
      email: userInfo.email,
      password: userInfo.password,
      companyId: localStorage.getItem("companyId"),
      createdDate: new Date().toDateString(),
    };
    try {
      const res = await fetch(`${baseUrl}/user/uploadUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userFetchInfo),
      });

      console.log(res);
      if (res.ok) {
        alert("User successfully added!");
        navigate("/add-user");
      } else {
        alert("Failed to add user. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <div>
          <Link to="/users">
            <button>X</button>
          </Link>
        </div>
        <h1>add new user</h1>
      </div>
      <div>
        <h3>BASIC ACCOUNT INFORMATION</h3>
      </div>
      {/*form section*/}
      <form
        onSubmit={() => {
          handleAddUser;
        }}
      >
        {/*first name */}
        <div>
          <p>First Name:</p>
          <input
            name="firstName"
            value={userInfo.firstName}
            onChange={() => {
              handleChange;
            }}
          />
        </div>
        {/*last name */}
        <div>
          <p>Last Name:</p>
          <input
            name="lastName"
            value={userInfo.lastName}
            onChange={() => {
              handleChange;
            }}
          />
        </div>
        {/*email */}
        <div>
          <p>Email:</p>
          <input
            name="email"
            type="email"
            placeholder="james@email.com"
            value={userInfo.email}
            onChange={() => {
              handleChange;
            }}
          />
        </div>
        {/* phone number*/}
        <div>
          <p>Phone:</p>
          <input
            name="cell"
            placeholder="078 888 8888"
            value={userInfo.cell}
            onChange={() => {
              handleChange;
            }}
          />
        </div>
        <div>
          <p>Password: (min 8 characters)</p>
          <input
            type="text"
            name="password"
            placeholder="124578"
            value={userInfo.password}
            onChange={() => {
              handleChange;
            }}
          />
        </div>
        <div>
          <p>Confirm Password:</p>
          <input type="text" placeholder="124578" />
        </div>
        <div>
          <div>
            <button>SUBMIT</button>
          </div>
          <div>
            <button>CANCEL</button>
          </div>
        </div>
      </form>
    </>
  );
}
