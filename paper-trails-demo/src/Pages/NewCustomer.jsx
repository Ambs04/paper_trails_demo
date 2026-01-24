import { Link } from "react-router-dom";

export default function NewCustomer() {
  return (
    <>
      <div>
        <div>
          <Link to="/customers">
            <button>X</button>
          </Link>
        </div>
        <h1>add new customer</h1>
      </div>
      <div>
        <h3>BASIC ACCOUNT INFORMATION</h3>
      </div>
      {/*form section*/}
      <div>
        {/*company/person name */}
        <div>
          <p></p>
          <input />
        </div>
        {/*contact name */}
        <div>
          <p></p>
          <input />
        </div>
        {/*email */}
        <div>
          <p></p>
          <input />
        </div>
        {/* phone number*/}
        <div>
          <p></p>
          <input />
        </div>
        {/*address */}
        <div>
          <p></p>
          <input />
        </div>
        {/*code */}
        <div>
          <p></p>
          <input />
        </div>
        {/*payment terms */}
        <div>
          {/* 30 days*/}
          <div>
            <p></p>
            <input />
          </div>
          {/*14 days */}

          <div>
            <p></p>
            <input />
          </div>
          {/* 7 days*/}

          <div>
            <p></p>
            <input />
          </div>
          {/* Cash on delivery*/}

          <div>
            <p></p>
            <input />
          </div>
        </div>
        {/*account status */}
        <div>
          {/*active */}
          <div>
            <p></p>
            <input />
          </div>
          {/*inactive */}
          <div>
            <p></p>
            <input />
          </div>
        </div>
      </div>
    </>
  );
}
