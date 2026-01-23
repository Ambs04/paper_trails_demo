import { Link } from "react-router-dom";

export default function AddUser() {
  return (
    <>
      <div>
        <Link to="/users">
          <button>X</button>
        </Link>
      </div>
      <h1>add new user</h1>
    </>
  );
}
