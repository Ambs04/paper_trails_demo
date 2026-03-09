import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../Modules/CommonComponents/Header";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";
import Alert from "../Modules/CommonComponents/Alert";
import LoadingPage from "./../Modules/CommonComponents/LoadingPage";
import loadingLogo from "./../assets/loading_image.png";

export default function Users() {
  const [newUser, setNewUser] = useState([]);
  const [isuserEditActive, setIsUserEditActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(
    location.state?.userCreated || false,
  );
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/user/getComapnyAllCustomers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyId: localStorage.getItem("companyId"),
          }),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setNewUser(data.users || data.customers || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserEdit = (newUser) => {
    setSelectedUser(newUser);
    setIsUserEditActive(true);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    {
      /*} const updateUserInfo = {
      userId: selectedUser._id || selectedUser.id,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      email: selectedUser.email,
      cellNumber: selectedUser.cellNumber,
      accountStatus: selectedUser.accountStatus,
      companyId: localStorage.getItem("companyId"),
    };*/
    }

    try {
      const res = await fetch(`${baseUrl}/user/updateUserInformation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selectedUser,
          userId: selectedUser._id || selectedUser.id,
          companyId: localStorage.getItem("companyId"),
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("User updated successfully");
        setIsUserEditActive(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  useEffect(() => {
    if (location.state?.userCreated) {
      nav(location.pathname, { replace: true });
    }
  }, [location, nav]);

  return (
    <>
      {isLoading && <LoadingPage logo={loadingLogo} />}
      {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} />}

      <div>
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          minHeight: "40px",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flex: "1",
            alignItems: "center",
            marginTop: "10px",
            paddingLeft: "30px",
          }}
        >
          <Searchbar />
          <div style={{ display: "flex", flex: "1" }}>
            <Link to="/add-user">
              <button
                type="button"
                style={{
                  marginTop: "35px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  minHeight: "40px",
                  height: "40px",
                  width: "40px",
                  borderRadius: "8px",
                  backgroundColor: "rgb(249, 220, 92)",
                  borderWidth: "0px",
                  color: "rgb(0,0,0)",
                  fontWeight: "bold",
                  fontSize: "30px",
                  textAlign: "center",
                  opacity: "1",
                }}
              >
                +
              </button>
            </Link>
          </div>
        </div>
      </div>
      {!isLoading && newUser.length === 0 ? (
        <p>No users found yet</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "780px",
            overflow: "hidden scroll",
            gap: "10px",
          }}
        >
          {newUser.map((user) => (
            <div
              key={user.id || user._id}
              onClick={() => handleUserEdit(user)}
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr",
                padding: " 10px",
                width: "90%",
                boxShadow: "rgba(0,0,0,0.125) 0px 0px 7px 2px",
                borderRadius: "12px",
              }}
            >
              <div style={{ display: "grid", marginLeft: "20px" }}>
                {/*first name */}
                <div>
                  <h3
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      opacity: "0.7",
                      color: "black",
                    }}
                  >
                    Name:
                  </h3>

                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      paddingTop: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                {/*email */}
                <div>
                  <h3
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      opacity: "0.7",
                      color: "black",
                    }}
                  >
                    Email:
                  </h3>

                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      paddingTop: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
                {/* phone number*/}
                <div>
                  <h3
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      opacity: "0.7",
                      color: "black",
                    }}
                  >
                    Phone:
                  </h3>

                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      paddingTop: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    {user.cellNumber}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  textAlign: "right",
                  marginRight: "20px",
                }}
              >
                {/*status*/}
                <div>
                  <h3
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      opacity: "0.7",
                      color: "black",
                    }}
                  >
                    Status
                  </h3>

                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      paddingTop: "0px",
                    }}
                  >
                    {user.accountStatus || "active"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <DashFooter />
      </div>
      {isuserEditActive && selectedUser && (
        <div>
          <form onSubmit={handleUserUpdate}>
            <div>
              <button onClick={() => setIsUserEditActive(false)}>X</button>
            </div>
            <div>
              <h3>MANAGE USER INFORMATION</h3>
            </div>
            {/*first name */}
            <div>
              <p>First Name:</p>
              <input
                name="firstName"
                value={selectedUser.firstName}
                onChange={handleUserChange}
                required
              />
            </div>
            {/*last name */}
            <div>
              <p>Last Name:</p>
              <input
                name="lastName"
                value={selectedUser.lastName}
                onChange={handleUserChange}
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
                value={selectedUser.email}
                onChange={handleUserChange}
                required
              />
            </div>
            <div>
              <p>Phone:</p>
              <input
                name="cell"
                placeholder="078 888 8888"
                value={selectedUser.cellNumber || ""}
                onChange={handleUserChange}
                required
              />
            </div>
            {/* status*/}
            <div>
              <p>Status:</p>
              <select
                name="accountStatus"
                value={selectedUser.accountStatus || "active"}
                onChange={handleUserChange}
                required
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
            <div>
              <div>
                <button type="submit">UPDATE</button>
              </div>

              {/*<button onClick={() => setIsUserEditActive(false)}>
                  Delete
                </button>*/}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
