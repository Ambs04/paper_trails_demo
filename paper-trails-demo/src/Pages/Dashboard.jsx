import Greeting from "../Modules/CommonComponents/Greeting";
import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";

export default function Dashboard() {
  return (
    <>
      <div>
        <Header />
      </div>
      <h3>
        <Greeting />
      </h3>
      <h4>ACCOUNT TYPE</h4>
      <p></p>
      <div>
        <h4>INVOICES</h4>
        <div>
          <div>
            <p></p>
            <br />
            <p>INVOICES SENT</p>
          </div>
          <div>
            <p></p>
            <br />
            <p>PAID</p>
          </div>
          <div>
            <p></p>
            <br />
            <p>UNPAID</p>
          </div>
        </div>
        <h4>CUSTOMERS</h4>
        <div>
          <div>
            <p></p>
            <br />
            <p>COUNT</p>
          </div>
          <div>
            <p></p>
            <br />
            <p>ACTIVE</p>
          </div>
          <div>
            <p></p>
            <br />
            <p>INACTIVE</p>
          </div>
        </div>
        <h4>SERVICES & PRODUCTS</h4>
        <div>
          <div>
            <p></p>
            <br />
            <p>COUNT</p>
          </div>
          <div>
            <p></p>
            <br />
            <p>AVAILABLE</p>
          </div>
          <div>
            <p></p>
            <br />
            <p>UNAVAILABLE</p>
          </div>
        </div>
        <h4>USERS</h4>
        <div>
          <div>
            <p></p>
            <br />
            <p>COUNT</p>
          </div>
          <div>
            <p></p>
            <br />
            <p>ACTIVE</p>
          </div>
          <div>
            <p></p>
            <br />
            <p>INACTIVE</p>
          </div>
        </div>
      </div>
      <div>
        <DashFooter />
      </div>
    </>
  );
}
