import { Link } from "react-router-dom";
import Header from "../Modules/CommonComponents/Header";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";

export default function Users() {
  const [newUser, setNewUser] = useState([]);
  const [isuserEditActive, setIsUserEditActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
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

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Searchbar />
        <div>
          <Link to="/add-user">
            <button>+</button>
          </Link>
        </div>
      </div>
      {newUser.length === 0 ? (
        <p>No users found yet</p>
      ) : (
        <div>
          {newUser.map((user) => (
            <div
              key={user.id || user._id}
              style={{ border: "1px solid black" }}
              onClick={() => handleUserEdit(user)}
            >
              {/*first name */}
              <div>
                <p>Name:</p>
                <br />
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </div>

              {/*email */}
              <div>
                <p>Email:</p>
                <br />
                <p>{user.email}</p>
              </div>
              {/* phone number*/}
              <div>
                <p>Phone:</p>
                <br />
                <p>{user.cellNumber}</p>
              </div>
              {/*status*/}
              <div>
                <p>Status</p>
                <br />
                <p>{user.accountStatus || "active"}</p>
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
