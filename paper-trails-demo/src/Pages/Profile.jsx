import Greeting from "../Modules/CommonComponents/Greeting";
import Header from "../Modules/CommonComponents/Header";

export default function Profile() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <h3>
          <Greeting />
        </h3>
      </div>
      <div>
        <p>Subscription plan</p>
        <div>
          <button>FREE PLAN</button>
          <button>SMALL PLAN</button>
          <button>BIG PLAN</button>
        </div>
      </div>
      <div>
        <p>INVOICE TEMPLATE</p>
        <div>
          <button>FREE OPTION 1</button>
          <button>PAID VERSIONS</button>
        </div>
      </div>
      <div>
        <p>
          The information below should be updated at all times as they will be
          used to generate invoices.
        </p>
        <div>
          <p>BUSINESS PROFILE INFORMATION</p>
        </div>
        <div>
          <div>
            <p>Company name:</p>
            <input />
          </div>
          <div>
            <p>company email:</p>
            <input type="email" />
          </div>
          <div>
            <p>company contact number:</p>
            <input />
          </div>
          <div>
            <p>company address:</p>
            <input />
          </div>
          <div>
            <p>company logo:</p>
            <input />
          </div>
          <div>
            <p>company colors</p>
            <input type="color" />
            <input type="color" />
          </div>
        </div>
        <div>
          <p>BANKING DETAILS</p>
        </div>
        <div>
          <p>bank</p>
          <input />
        </div>
        <div>
          <p>Account type:</p>
          <label>
            Savings <input type="radio" />
          </label>
          <label>
            Cheque <input type="radio" />
          </label>
        </div>
        <div>
          <p>account no:</p>
          <input />
        </div>
        <div>
          <p>account name</p>
          <input />
        </div>
      </div>
      <div>
        <p>COMPANY OWNER PROFILE</p>
      </div>
      <div>
        <div>
          <p>First name</p>
          <input />
        </div>
        <div>
          <p>last name</p>
          <input />
        </div>
        <div>
          <p>email</p>
          <input />
        </div>
        <div>
          <p>contact number</p>
          <input />
        </div>
      </div>
      <div>
        <button>UPDATE</button>
        <button>REQUEST SUPPORT</button>
      </div>
    </>
  );
}
