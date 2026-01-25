import { Link } from "react-router-dom";

export default function AddUser() {
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
      <div>
        {/*first name */}
        <div>
          <p>First Name:</p>
          <input name="userFirstName" />
        </div>
        {/*last name */}
        <div>
          <p>Last Name:</p>
          <input name="userLastName" />
        </div>
        {/*email */}
        <div>
          <p>Email:</p>
          <input name="userEmail" type="email" placeholder="james@email.com" />
        </div>
        {/* phone number*/}
        <div>
          <p>Phone:</p>
          <input name="userPhone" placeholder="078 888 8888" />
        </div>
        <div>
          <p>Password:</p>
          <input type="text" placeholder="124578" />
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
      </div>
    </>
  );
}
