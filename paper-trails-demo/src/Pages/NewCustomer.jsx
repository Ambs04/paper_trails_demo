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
          <p>Company Name / Person Name:</p>
          <input name="customerName" />
        </div>
        {/*contact name */}
        <div>
          <p>Contact person name:</p>
          <input name="managerName" />
        </div>
        {/*email */}
        <div>
          <p>Email:</p>
          <input
            name="customerEmail"
            type="email"
            placeholder="james@email.com"
          />
        </div>
        {/* phone number*/}
        <div>
          <p>Phone:</p>
          <input name="customerPhone" placeholder="078 888 8888" />
        </div>
        {/*address */}
        <div>
          <p>Address:</p>
          <input type="text" />
        </div>
        {/*code */}
        <div>
          <p>Code:</p>
          <input name="customerCode" placeholder="12346789" />
        </div>
        {/*payment terms */}
        <div>
          <p>PAYMENT TETMS</p>
          {/* 30 days*/}
          <div>
            <label>
              30 days
              <input type="radio" />
            </label>
          </div>
          {/*14 days */}

          <div>
            <label>
              14 days
              <input type="radio" />
            </label>
          </div>
          {/* 7 days*/}

          <div>
            <label>
              7 days
              <input type="radio" />
            </label>
          </div>
          {/* Cash on delivery*/}

          <div>
            <label>
              cash on delivery
              <input type="radio" />
            </label>
          </div>
        </div>
        {/*account status */}
        <div>
          <p>ACCOUNT STATUS</p>
          {/*active */}
          <div>
            <label>
              active
              <input type="radio" />
            </label>
          </div>
          {/*inactive */}
          <div>
            <label>
              inactive
              <input type="radio" />
            </label>
          </div>
        </div>
        <div>
          <div>
            <button>SUBMIT</button>
          </div>
        </div>
        <div>
          <button>CANCEL</button>
        </div>
      </div>
    </>
  );
}
