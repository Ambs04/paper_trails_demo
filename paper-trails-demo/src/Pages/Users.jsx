import { Link } from "react-router-dom";
import Header from "../Modules/CommonComponents/Header";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";

export default function Users() {
  const [newUser, setNewUser] = useState([]);
  {
    /*const [isModalActive, setIsModalActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);*/
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = fetch(`${baseUrl}/users/getAllUsers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setNewUser(data.newUser);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUsers();
  });

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
            <div key={user.id || user._id}>
              {/*first name */}
              <div>
                <p>Name:</p>
                <br />
                <p>
                  {newUser.firstName} {newUser.lastName}
                </p>
              </div>

              {/*email */}
              <div>
                <p>Email:</p>
                <br />
                <p>{newUser.email}</p>
              </div>
              {/* phone number*/}
              <div>
                <p>Phone:</p>
                <br />
                <p>{newUser.cellNumber}</p>
              </div>
              {/*status*/}
              <div>
                <p>Status</p>
                <br />
                <p>{newUser.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <DashFooter />
      </div>
    </>
  );
}
