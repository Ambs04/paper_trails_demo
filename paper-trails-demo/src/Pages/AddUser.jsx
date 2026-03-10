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
    <div
      style={{
        display: "flex",
        flex: "1 1 0%",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
        minHeight: "100vh",
        overflowY: "hidden scroll",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/users"
          style={{
            textDecoration: "none",
            display: "flex",
            height: "50px",
            width: "50px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(249, 220,92)",
          }}
        >
          <button
            style={{
              height: "50px",
              width: "50px",
              color: "black",
              borderWidth: "0px",
              backgroundColor: "rgb(249, 220,92)",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </Link>

        <div
          style={{
            display: "flex",

            alignItems: "center",
            width: "100%",
            height: "50px",
            backgroundColor: "rgb(70,83,98)",
          }}
        >
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              paddingTop: "10px",
            }}
          >
            ADD NEW USER
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            width: "85%",
            marginTop: "70px",
            marginBottom: "5px",
            fontSize: "20px",
            textAlign: "left",

            color: "black",
          }}
        >
          BASIC ACCOUNT INFORMATION
        </p>
      </div>
      {/*form section*/}
      <form
        onSubmit={handleAddUser}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: " column",
          marginTop: "10px",
        }}
      >
        {/*first name */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            FIRST NAME:
          </p>
          <input
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            required
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>
        {/*last name */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            LAST NAME:
          </p>
          <input
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            required
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>
        {/*email */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            EMAIL:
          </p>
          <input
            name="email"
            type="email"
            placeholder="james@email.com"
            value={userInfo.email}
            onChange={handleChange}
            required
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>

        {/* phone number*/}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            PHONE:
          </p>
          <input
            name="cell"
            placeholder="078 888 8888"
            value={userInfo.cell}
            onChange={handleChange}
            required
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            PASSWORD: (min 8 characters)
          </p>
          <input
            type="password"
            name="password"
            placeholder="12457892"
            value={userInfo.password}
            onChange={handleChange}
            minLength="8"
            required
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <p
            style={{
              width: "80%",
              fontWeight: "600",
              fontSize: "14px",
              color: "rgb(70,83,98)",
              textAlign: "left",
              paddingLeft: "0px",
            }}
          >
            CONFIRM PASSWORD:
          </p>
          <input
            type="password"
            name="confirmPassword"
            placeholder="12457892"
            required
            onChange={handleChange}
            style={{
              height: "35px",
              width: "80%",
              marginTop: "5px",
              borderRadius: "4px",
              padding: "8px 10px 8px 20px",
              fontSize: "14px",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.035)",
              color: "black",
              fontWeight: "bold",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              style={{
                height: "40px",
                width: "85%",
                marginTop: "20px",
                backgroundColor: "rgb(249,220,92)",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              SUBMIT
            </button>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => navigate("/users")}
              style={{
                height: "40px",
                width: "85%",
                marginTop: "20px",

                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
