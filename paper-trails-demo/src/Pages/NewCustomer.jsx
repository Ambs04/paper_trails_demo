import { Link } from "react-router-dom";

export default function NewCustomer() {
  return (
    <>
      <div>
        <Link to="/customers">
          <button>X</button>
        </Link>
      </div>
      <h1>add new customer</h1>
    </>
  );
}
