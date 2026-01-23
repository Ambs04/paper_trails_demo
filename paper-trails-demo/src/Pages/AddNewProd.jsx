import { Link } from "react-router-dom";

export default function AddNewProd() {
  return (
    <>
      <div>
        <Link to="/products">
          <button>X</button>
        </Link>
      </div>
      <h1>add new product/service</h1>
    </>
  );
}
