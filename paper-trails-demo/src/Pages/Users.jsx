import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../Modules/CommonComponents/Header";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";
import Alert from "../Modules/CommonComponents/Alert";
import LoadingPage from "./../Modules/CommonComponents/LoadingPage";
import loadingLogo from "../assets/loading_image.png";

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
        setIsLoading(true);
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
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.44)",

            overflow: "hidden",
            display: "flex",

            justifyContent: "center",

            transition: "0.2s",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: "1 1 0%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              position: "relative",
              flexDirection: "column",
              height: "100vh",
              overflowY: "scroll",
              backgroundColor: "white",
            }}
          >
            <form
              onSubmit={handleUserUpdate}
              style={{
                width: "100%",
                paddingTop: "10px",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.314)",
                  minHeight: "50px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  position: "fixed",
                  top: "0",
                  zIndex: "10",
                }}
              >
                <button
                  onClick={() => setIsUserEditActive(false)}
                  style={{
                    height: "50px",
                    minHeight: "50px",
                    width: "50px",
                    backgroundColor: "rgb(249,220,92)",
                    borderWidth: "0px",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  X
                </button>

                <div
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(70,83,98)",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    color: "white",
                    minHeight: "50px",
                  }}
                >
                  <div style={{ marginLeft: "20px" }}>
                    MANAGE USER INFORMATION
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "85%",
                  marginTop: "60px",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                BASIC ACCOUNT INFORMATION
              </div>
              {/*first name */}
              <div
                style={{
                  width: "80%",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  FIRST NAME:
                </p>
                <input
                  name="firstName"
                  value={selectedUser.firstName}
                  onChange={handleUserChange}
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
                    fontWeight: "bold",
                  }}
                />
              </div>
              {/*last name */}
              <div
                style={{
                  width: "80%",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  LAST NAME:
                </p>
                <input
                  name="lastName"
                  value={selectedUser.lastName}
                  onChange={handleUserChange}
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
                    fontWeight: "bold",
                  }}
                />
              </div>
              {/*email */}
              <div
                style={{
                  width: "80%",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  EMAIL:
                </p>
                <input
                  name="email"
                  type="email"
                  placeholder="james@email.com"
                  value={selectedUser.email}
                  onChange={handleUserChange}
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
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div
                style={{
                  width: "80%",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  PHONE:
                </p>
                <input
                  name="cell"
                  placeholder="078 888 8888"
                  value={selectedUser.cellNumber || ""}
                  onChange={handleUserChange}
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
                    fontWeight: "bold",
                  }}
                />
              </div>
              {/* status*/}
              <div
                style={{
                  width: "80%",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                    paddingBottom: "20px",
                  }}
                >
                  STATUS:
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto 0 auto",
                    width: "80%",
                    gap: "15px",
                  }}
                >
                  <div
                    onClick={() =>
                      handleUserChange({
                        target: { name: "status", value: "active" },
                      })
                    }
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "14px",
                      border: "none",
                    }}
                  >
                    ACTIVE
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "4px",
                        border: "2px solid rgb(70,83,98)",
                        backgroundColor:
                          selectedUser.status === "active"
                            ? "#465362"
                            : "transparent",
                        transition: "0.6s",
                      }}
                    ></div>
                  </div>
                  <div
                    onClick={() =>
                      handleUserChange({
                        target: { name: "status", value: "inactive" },
                      })
                    }
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "14px",
                      border: "none",
                    }}
                  >
                    INACTIVE
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "4px",
                        border: "2px solid rgb(70,83,98)",
                        backgroundColor:
                          selectedUser.status === "inactive"
                            ? "#465362"
                            : "transparent",
                        transition: "0.6s",
                      }}
                    ></div>
                  </div>
                </div>
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
                      marginTop: "30px",
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
                    onClick={() => nav("/users")}
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

              {/*<button onClick={() => setIsUserEditActive(false)}>
                  Delete
                </button>*/}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
