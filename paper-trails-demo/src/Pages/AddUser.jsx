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
    address: "",
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
      address: userInfo.address || "N/A",
      password: userInfo.password,
      accountStatus: userInfo.status,
      companyId: localStorage.getItem("companyId"),
      dateCreated: new Date().toDateString(),
      companyName: localStorage.getItem("companyName") || "Default",
    };
    try {
      const res = await fetch(`${baseUrl}/user/uploadUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userFetchInfo),
      });

      const dataErr = await res.json();

      console.log(userFetchInfo);
      if (res.ok) {
        alert("User successfully added!");
        navigate("/users");
      } else {
        console.log(dataErr.message);

        alert(`Failed to add user. Please try again later. ${dataErr}`);
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
      <form onSubmit={handleAddUser}>
        {/*first name */}
        <div>
          <p>First Name:</p>
          <input
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            required
          />
        </div>
        {/*last name */}
        <div>
          <p>Last Name:</p>
          <input
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            required
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
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Physical Address</p>
          <input
            name="address"
            value={userInfo.address}
            onChange={handleChange}
          />
        </div>
        {/* phone number*/}
        <div>
          <p>Phone:</p>
          <input
            name="cell"
            placeholder="078 888 8888"
            value={userInfo.cell}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Password: (min 8 characters)</p>
          <input
            type="password"
            name="password"
            placeholder="124578"
            value={userInfo.password}
            onChange={handleChange}
            minLength="8"
            required
          />
        </div>
        <div>
          <p>Confirm Password:</p>
          <input type="password" placeholder="124578" required />
        </div>
        <div>
          <div>
            <button>SUBMIT</button>
          </div>
          <div>
            <button onClick={() => navigate("/users")}>CANCEL</button>
          </div>
        </div>
      </form>
    </>
  );
}
