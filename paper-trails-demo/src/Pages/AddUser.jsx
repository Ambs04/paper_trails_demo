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
    confirmPassword: "",
    status: "active",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (userInfo.password !== userInfo.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
        navigate("/users", { state: { userCreated: true } });
      } else {
        console.log(dataErr.message);

        alert(`Failed to add user. Please try again later. ${dataErr.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "50px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <div style={{ display: "flex", width: "10%" }}>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <button
              style={{
                display: "flex",
                flexDirection: "row",
                height: "50px",
                width: "100%",
                minHeight: " 50px",
                border: "none",
                color: "black",
                fontWeight: "bold",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              X
            </button>
          </Link>
        </div>
        <div
          style={{
            display: "flex",

            alignItems: "flex-start",
            width: "90%",
            height: "50px",
            backgroundColor: "rgb(70,83,98)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <h3>ADD NEW USER</h3>
        </div>
      </div>
      <div>
        <h3>BASIC ACCOUNT INFORMATION</h3>
      </div>
      {/*form section*/}
      <form
        onSubmit={handleAddUser}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "560px",
          height: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
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

        <p>Email:</p>
        <input
          name="email"
          type="email"
          placeholder="james@email.com"
          value={userInfo.email}
          onChange={handleChange}
          required
        />

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
          <input
            type="password"
            name="confirmPassword"
            placeholder="124578"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <button type="submit">SUBMIT</button>
          </div>
          <div>
            <button onClick={() => navigate("/users")}>CANCEL</button>
          </div>
        </div>
      </form>
    </>
  );
}
