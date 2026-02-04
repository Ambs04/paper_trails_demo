import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../api";
import { useState } from "react";

export default function NewCustomer() {
  const navigate = useNavigate();
  const [newCustomerInfo, setNewCustomerInfo] = useState({
    companyName: "",
    contactPerson: "",
    cellNumber: "",
    email: "",
    address: "",
    code: "",
    paymentTerms: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    const fetchNewCustomerInfo = {
      ...newCustomerInfo,
      linkedPaperTrailsCompanyId: localStorage.getItem("companyId"),
      dateCreated: new Date().toDateString(),
    };

    try {
      const res = await fetch(`${baseUrl}/customer/createCustomer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fetchNewCustomerInfo),
      });

      {
        /*const data = await res.json();*/
      }
      if (res.ok) {
        alert("Customer successfully added!");
        navigate("/customers");
      } else {
        alert("Failed to add customer");
        console.log(fetchNewCustomerInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <form onSubmit={handleAddCustomer}>
        {/*company/person name */}
        <div>
          <p>Company Name / Person Name:</p>
          <input
            name="companyName"
            value={newCustomerInfo.companyName}
            onChange={handleChange}
          />
        </div>
        {/*contact name */}
        <div>
          <p>Contact person name:</p>
          <input
            name="contactPerson"
            value={newCustomerInfo.contactPerson}
            onChange={handleChange}
          />
        </div>
        {/*email */}
        <div>
          <p>Email:</p>
          <input
            type="email"
            placeholder="james@email.com"
            name="email"
            value={newCustomerInfo.email}
            onChange={handleChange}
          />
        </div>
        {/* phone number*/}
        <div>
          <p>Phone:</p>
          <input
            name="cellNumber"
            placeholder="078 888 8888"
            value={newCustomerInfo.cellNumber}
            onChange={handleChange}
          />
        </div>
        {/*address */}
        <div>
          <p>Address:</p>
          <input
            type="text"
            name="address"
            value={newCustomerInfo.address}
            onChange={handleChange}
          />
        </div>
        {/*code */}
        <div>
          <p>Code:</p>
          <input
            name="code"
            placeholder="12346789"
            value={newCustomerInfo.code}
            onChange={handleChange}
          />
        </div>
        {/*payment terms */}
        <div>
          <p>PAYMENT TETMS</p>
          {/* 30 days*/}
          <select
            name="paymentTerms"
            value={newCustomerInfo.paymentTerms}
            onChange={handleChange}
          >
            Select payment term
            <option value="30 days">30 days</option>
            <option value="14 days">14 days</option>
            <option value="7 days">7 days</option>
            <option value="cash on delivery">cash on delivery</option>
          </select>
        </div>
        {/*account status */}
        <div>
          <p>ACCOUNT STATUS</p>
          <select
            name="status"
            value={newCustomerInfo.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <div>
            <button type="submit">SUBMIT</button>
          </div>
        </div>
        <div>
          <button type="button">CANCEL</button>
        </div>
      </form>
    </>
  );
}
