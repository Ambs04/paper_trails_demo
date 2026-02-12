import { useEffect, useState } from "react";
import { baseUrl } from "../../api";

export default function ManageCustomerModal({ customer, onUpdate, onClose }) {
  const [viewOptions, setViewOptions] = useState("menu");
  const [editCustomer, setEditCustomer] = useState({ ...customer });
  const [history, setHistory] = useState([]);
  //const [invoiceStatus, setInvoiceStatus] = useState("unpaid");
  const [availableProdService, setAvailableProdService] = useState([]);

  const currentDate = new Date().toLocaleDateString();

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [newItem, setNewItem] = useState({
    desc: "",
    qty: "",
    price: "",
  });

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

  useEffect(() => {
    const fetchInvoiceHistory = async () => {
      try {
        const res = await fetch(`${baseUrl}/invoice/getInvoicesPerCustomer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: localStorage.getItem("companyId"),
            customerId: customer._id,
          }),
        });
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (viewOptions === "history") {
      fetchInvoiceHistory();
    }
  }, [viewOptions, customer._id]);

  const handleInvoiceSave = async () => {
    const invoiceData = {
      companyId: localStorage.getItem("companyId"),
      customerId: customer._id,
      customerInfo: {
        name: customer.companyName,
        email: customer.email,
        cellNumber: customer.cellNumber,
      },
      billingCompanyInfo: {
        name: localStorage.getItem("companyName"),
        bankdetails: {
          bank: localStorage.getItem("bank"),
          accountType: localStorage.getItem("accountType"),
          accountNumber: localStorage.getItem("accountNumber"),
          accountName: localStorage.getItem("accountName"),
          paymentTerms: localStorage.getItem("paymentTerms"),
        },
      },
      status: "",
      dateCreated: new Date().toDateString(),
      invoicedItems: invoiceItems.map((item) => ({
        description: item.name,
        qty: item.quantity,
        price: item.price,
      })),
    };
    try {
      const res = await fetch(`${baseUrl}/invoice/createInvoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });
      if (res.ok) {
        alert("Invoice created successfully");
        setInvoiceItems([]);
        //fetchInvoiceHistory()
        setViewOptions("history");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProductServices = async () => {
      try {
        const res = await fetch(`${baseUrl}/productServices/getAllProducts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: localStorage.getItem("companyId"),
          }),
        });
        const data = await res.json();
        console.log(data);

        if (res.ok && Array.isArray(data.products)) {
          setAvailableProdService(data.products);
        } else {
          setAvailableProdService([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (viewOptions === "prodService") {
      fetchProductServices();
    }
  }, [viewOptions]);

  const handleProdSelection = (productId) => {
    const selected = (availableProdService || []).find(
      (p) => p._id === productId,
    );
    if (selected) {
      setNewItem({
        desc: selected.productOrServiceName,
        price: selected.price,
        qty: 1,
      });
    }
  };

  const addProdToInvoice = () => {
    const formatItem = {
      name: newItem.desc,
      qty: Number(newItem.qty),
      price: Number(newItem.price),
    };
    setInvoiceItems([...invoiceItems, formatItem]);
    setNewItem({ desc: "", qty: "", price: "" });
    setViewOptions("add");
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
          <div>
            {invoiceItems.length === 0 ? (
              <>
                <p>No invoices for this customer found</p>
                <button onClick={() => setViewOptions("add")}>
                  Create Invoice
                </button>
              </>
            ) : (
              <>
                <span>
                  <button>PAID</button>
                  <button>UNPAID</button>
                  <button onClick={() => setViewOptions("add")}>+</button>
                </span>
              </>
            )}
          </div>
        </div>
      )}
      <div>
        {viewOptions === "add" && (
          <>
            <div>
              <button>X</button>
              <p>CREATE NEW INVOICE</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ display: "block" }}>
                  <span>
                    <p>Client: </p>
                    <p>{customer.companyName}</p>
                  </span>
                  <span>
                    <p>Client email:</p>
                    <p>{customer.email}</p>
                  </span>
                  <span>
                    <p>Client number:</p>
                    <p>{customer.cellNumber}</p>
                  </span>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <span>
                  <p>Date:</p>
                  <p>{currentDate}</p>
                </span>
              </div>
              <div>
                <p>PRODUCT/SERVICE</p>
                <p>QTY</p>
                <p>PRICE / UNIT</p>
                <p>TOTAL PRICE</p>
                <button onClick={() => setViewOptions("prodService")}>+</button>
              </div>
            </div>

            {invoiceItems.map((item, index) => (
              // const totalPrice = {item.qty} * {item.price};
              //return (
              <>
                <div div key={index}>
                  <p>{item.name}</p>
                  {/*<p>{item.qty}</p>*/}
                  <span>
                    <button
                      onClick={() => {
                        const decrement = [...invoiceItems];
                        decrement[index].qty = Math.max(
                          1,
                          decrement[index].qty - 1,
                        );
                        setInvoiceItems(decrement);
                      }}
                    >
                      -
                    </button>
                    <p>{item.qty}</p>
                    <button
                      onClick={() => {
                        const increment = [...invoiceItems];
                        increment[index].qty++;
                        setInvoiceItems(increment);
                      }}
                    >
                      +
                    </button>
                  </span>

                  <p>{item.price}</p>
                </div>
              </>
            ))}
          </>
        )}
      </div>
      <div>
        {invoiceItems.length > 0 && (
          <button onClick={handleInvoiceSave}>SAVE INVOICE</button>
        )}
      </div>
      {viewOptions === "prodService" && (
        <>
          <div>
            <button onClick={() => setViewOptions("add")}>X</button>
            <h4>Add Product / Service</h4>
          </div>
          <select
            onChange={(e) => {
              handleProdSelection(e.target.value);
            }}
          >
            <option value="">-Select product / service-</option>
            {Array.isArray(availableProdService) &&
              availableProdService.map((prod) => (
                <option key={prod._id} value={prod._id}>
                  {prod.productOrServiceName}
                </option>
              ))}
          </select>
          <div>
            <button onClick={addProdToInvoice}>Add</button>
          </div>
          {newItem.desc && (
            <div>
              <p>{newItem.desc}</p>
              {/* <input
                value={newItem.qty}
                onChange={(e) =>
                  setNewItem({ ...newItem, qty: e.target.value })
                }
              />
              <div>
                <button onClick={addProdToInvoice}>Add</button>
              </div>*/}
            </div>
          )}
        </>
      )}
    </>
  );
}
