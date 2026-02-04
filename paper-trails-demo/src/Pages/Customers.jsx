import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";
import { useState, useEffect } from "react";

export default function Customers() {
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`${baseUrl}/customer/getCompanyCustomers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: localStorage.getItem("companyId"),
          }),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          const dataArray = data.users || [];
          setCustomer(dataArray);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Searchbar />
        <div>
          <Link to="/add-customer">
            <button>+</button>
          </Link>
        </div>
      </div>
      <div>
        {customer?.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          customer?.map((item) => (
            <div key={item._id} style={{ border: "1px solid black" }}>
              <div>
                <p>Company Name</p>
                <p>{item.companyName}</p>
              </div>
              <div>
                <p>Company Email</p>
                <p>{item.email}</p>
              </div>
              <div>
                <p>Company Phone</p>
                <p>{item.cellNumber}</p>
              </div>
              <div>
                <p>Contact Person</p>
                <p>{item.contactPerson}</p>
              </div>
              <div>
                <p>Address</p>
                <p>{item.address}</p>
              </div>
              <div>
                <p>Payment Terms</p>
                <p>{item.paymentTerms}</p>
              </div>
              <div>
                <p>Status</p>
                <p>{item.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <DashFooter />
      </div>
    </>
  );
}
