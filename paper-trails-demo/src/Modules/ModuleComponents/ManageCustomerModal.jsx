import { useState } from "react";
import { baseUrl } from "../../api";

export default function ManageCustomerModal({ customer, onUpdate, onClose }) {
  const [viewOptions, setViewOptions] = useState("menu");
  const [editCustomer, setEditCustomer] = useState({ ...customer });
  const [invoiceStatus, setInvoiceStatus] = useState({ ...customer });
  const currentDate = new Date().toLocaleDateString();

  const handleChange = (e) => {
    setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value });
  };

  const handleCustomerUpdate = async () => {
    const updatedCustomerInfo = {
      ...editCustomer,
      companyName: editCustomer.companyName,
      customerId: editCustomer._id,
      companyId: localStorage.getItem("companyId"),
      email: editCustomer.email,
      cellNumber: editCustomer.cellNumber,
      address: editCustomer.address,
      paymentTerms: editCustomer.paymentTerms,
      status: editCustomer.status,
      contactPerson: editCustomer.contactPerson,
    };

    try {
      const res = await fetch(`${baseUrl}/customer/updateCustomer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomerInfo),
      });
      if (res.ok) {
        onUpdate(updatedCustomerInfo);
        alert("Customer successfully updated!");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span>
        <button onClick={onClose}>X</button>
        <h3>Manage Customer</h3>
      </span>
      {viewOptions === "menu" && (
        <div>
          <h4>What would you like to manage first?</h4>
          <div>
            <button onClick={() => setViewOptions("edit")}>
              Edit customer profile
            </button>
            <button onClick={() => setViewOptions("history")}>
              View customer invoice history
            </button>
          </div>
        </div>
      )}

      {viewOptions === "edit" && (
        <div>
          <div>
            <button onClick={() => setViewOptions("edit")}>
              Edit customer profile
            </button>
            <button onClick={() => setViewOptions("history")}>
              View customer invoice history
            </button>
          </div>
          <div>
            <p>Company Name</p>
            <input
              name="companyName"
              value={editCustomer.companyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Company Email</p>
            <input
              name="email"
              value={editCustomer.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Company Phone</p>
            <input
              name="cellNumber"
              value={editCustomer.cellNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Contact Person</p>
            <input
              name="contactPerson"
              value={editCustomer.contactPerson}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Address</p>
            <input
              name="address"
              value={editCustomer.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>PAYMENT TETMS</p>

            <select
              name="paymentTerms"
              value={editCustomer.paymentTerms}
              onChange={handleChange}
            >
              Select payment term
              <option value="30 days">30 days</option>
              <option value="14 days">14 days</option>
              <option value="7 days">7 days</option>
              <option value="cash on delivery">cash on delivery</option>
            </select>
          </div>
          <div>
            <select
              name="status"
              value={editCustomer.status}
              onChange={handleChange}
            >
              Status
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button onClick={handleCustomerUpdate}>UPDATE</button>
          <button type="button" onClick={onClose}>
            CANCEL
          </button>
        </div>
      )}
      {viewOptions === "history" && (
        <div>
          <div>
            <button onClick={() => setViewOptions("edit")}>
              Edit customer profile
            </button>
            <button onClick={() => setViewOptions("history")}>
              View customer invoice history
            </button>
          </div>
          <div>
            <p>Date: {currentDate}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div style={{ display: "flex" }}>
              <p></p>
              <p>OUTSTANDING</p>
            </div>
            <div style={{ display: "flex" }}>
              <p></p>
              <p>PAID</p>
            </div>
            <div style={{ display: "flex" }}>
              <p></p>
              <p>INVOICES</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
