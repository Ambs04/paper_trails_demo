import { useEffect, useState } from "react";
import { baseUrl } from "../../api";
import { jsPDF } from "jspdf";

export default function ManageCustomerModal({ customer, onUpdate, onClose }) {
  const [viewOptions, setViewOptions] = useState("menu");
  const [editCustomer, setEditCustomer] = useState({ ...customer });
  const [history, setHistory] = useState(true);
  const [availableProdService, setAvailableProdService] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showSortedInvoices, setShowSortedInvoices] = useState(false);
  const [invoiceFilter, setInvoiceFilter] = useState("unpaid");
  const [editingInvoice, setEditingInvoice] = useState(false);

  const currentDate = new Date().toLocaleDateString();

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [newItem, setNewItem] = useState({
    desc: "",
    qty: "",
    price: "",
  });

  const [renderPDFTemplate, setRenderPDFTemplate] = useState(false);

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

    //localStorage.setItem("paymentTerms", updatedCustomerInfo.paymentTerms);

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

      setHistory(Array.isArray(data.invoiceList) ? data.invoiceList : []);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /*} useEffect(() => {
    fetchInvoiceHistory();
  }, [viewOptions]);
*/
  }
  useEffect(() => {
    if (viewOptions === "history") {
      fetchInvoiceHistory();
    }
  }, [viewOptions]);

  const handleInvoiceSave = async () => {
    const grandTotal = invoiceItems.reduce((t, item) => {
      return t + Number(item.price) * Number(item.qty);
    }, 0);

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
      },
      bankdetails: {
        bank: localStorage.getItem("bank"),
        accountType: localStorage.getItem("accountType"),
        accountNumber: localStorage.getItem("accountNumber"),
        accountName: localStorage.getItem("accountName"),
      },
      paymentTerms:
        localStorage.getItem("paymentTerms") || editCustomer.paymentTerms,
      status: "unpaid",

      total: grandTotal,
      vat: 0,
      discount: 0,
      payemntPlan: "full",
      paidSoFar: 0,
      paymentHistory: [],
      dateCreated: new Date().toDateString(),
      dateEdited: new Date().toDateString(),
      editedBy: localStorage.getItem("userId") || "Admin",
      invoicedItems: invoiceItems.map((item) => ({
        description: item.name,
        qty: Number(item.qty),
        price: Number(item.price),
      })),
    };

    try {
      const res = await fetch(`${baseUrl}/invoice/createInvoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }

      if (res.ok) {
        alert("Invoice created successfully");
        setInvoiceItems([]);
        await fetchInvoiceHistory();
        const savedInvoice = data.invoice || data;
        setSelectedInvoice(savedInvoice);
        setShowSortedInvoices(true);
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

  const handleInvoiceUpdate = async () => {
    const grandTotal = invoiceItems.reduce(
      (t, item) => t + Number(item.price) * Number(item.qty),
      0,
    );

    const updatedInvoiceData = {
      invoiceId: selectedInvoice._id,
      total: grandTotal,
      invoicedItems: invoiceItems.map((item) => ({
        description: item.name,
        qty: Number(item.qty),
        price: Number(item.price),
      })),
      dateEdited: new Date().toDateString(),
      status: selectedInvoice.status,
      editedBy: localStorage.getItem("userId") || "Admin",
    };

    console.log(updatedInvoiceData);

    try {
      const res = await fetch(`${baseUrl}/invoice/updateInvoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInvoiceData),
      });
      if (res.ok) {
        alert("Invoice successfully updated");
        setEditingInvoice(false);
        setInvoiceItems([]);
        fetchInvoiceHistory();
        setViewOptions("history");
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = async (invoiceId) => {
    // prescriptionPdf();

    setRenderPDFTemplate(true);

    const element = await new jsPDF("portrait", "px", "a4");
    element.html(document.getElementById("invoice")).then(() => {
      element.getFontList();

      const fileName = invoiceId.slice(-6).toUpperCase();
      element.save(`INV-${fileName}.pdf`);
    });
    // setDownloading(false);
    setRenderPDFTemplate(false);
  };

  return (
    <>
      <div>
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
              <p>PAYMENT TERMS</p>

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
              <h4>
                {invoiceFilter === "paid" ? "PAID INVOICES" : "UNPAID INVOICES"}
              </h4>

              {Array.isArray(history) &&
                history
                  .filter((invoice) => invoice.status === invoiceFilter)
                  .map((invoice) => (
                    <div
                      key={invoice._id}
                      onClick={() => {
                        const formattedInvoiceItems = invoice.invoicedItems.map(
                          (item) => ({
                            name: item.description,
                            qty: item.qty,
                            price: item.price,
                          }),
                        );
                        setInvoiceItems(formattedInvoiceItems);
                        setSelectedInvoice(invoice);
                        setEditingInvoice(true);
                        setShowSortedInvoices(true);
                      }}
                      style={{ border: "1px solid black" }}
                    >
                      <p>Date Created:</p>
                      <p>{invoice.dateCreated}</p>
                      <p>Client:</p>
                      <p>{invoice.customerInfo?.name}</p>

                      <p>Contact Person:</p>
                      <p>{customer.contactPerson}</p>

                      <p>Grand Total:</p>
                      <p>R {invoice.total}</p>

                      <p>Payment Terms:</p>
                      <p>{invoice.paymentTerms}</p>

                      <p>Status</p>
                      <p>{invoice.status}</p>
                    </div>
                  ))}

              {showSortedInvoices && selectedInvoice && (
                <div
                  onClick={() => {
                    setShowSortedInvoices(false);
                    setViewOptions("add");
                  }}
                >
                  <div>
                    <p>Date created:</p>
                    <p>{selectedInvoice.dateCreated}</p>
                  </div>
                  <div>
                    <p>Client:</p>
                    <p>{selectedInvoice.customerInfo?.name}</p>
                  </div>
                  <div>
                    <p>Contact Person:</p>
                    <p>{customer.contactPerson}</p>
                  </div>
                  <div>
                    <p>Grand Total:</p>
                    <p>R {selectedInvoice.total}</p>
                  </div>
                  <div>
                    <p>Payment Terms:</p>
                    <p>{customer.paymentTerms}</p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p>{selectedInvoice.status}</p>
                  </div>
                  <div>
                    <p>Invoice items:</p>
                    <p>
                      {invoiceItems.map((item, index) => (
                        <div key={index}>
                          <p>Items: {item.name}</p>
                          <p>Qty: {item.qty}</p>
                        </div>
                      ))}
                    </p>
                  </div>
                </div>
              )}
            </div>

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
              {history.length === 0 ? (
                <>
                  <p>No invoices for this customer found</p>
                  <button onClick={() => setViewOptions("add")}>
                    Create Invoice
                  </button>
                </>
              ) : (
                <span>
                  <button onClick={() => setInvoiceFilter("paid")}>PAID</button>
                  <button onClick={() => setInvoiceFilter("unpaid")}>
                    UNPAID
                  </button>

                  <button
                    onClick={() => {
                      setViewOptions("add");
                      setEditingInvoice(false);
                      setInvoiceItems([]);
                    }}
                  >
                    +
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {viewOptions === "add" && (
          <>
            <div>
              <button onClick={() => setViewOptions("history")}>X</button>
              <p>{editingInvoice ? "EDIT INVOICE" : "CREATE NEW INVOICE"}</p>
            </div>
            {editingInvoice && selectedInvoice && (
              <div>
                <p>
                  {" "}
                  Invoice ID: {selectedInvoice._id.slice(-6).toUpperCase()}
                </p>
              </div>
            )}

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

            {invoiceItems.map((item, index) => {
              const totalPrice = item.qty * item.price;

              return (
                <div key={index}>
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

                  <p>R {item.price}</p>
                  <p>R {totalPrice}</p>
                  <button
                    onClick={() => {
                      const filterAddedItems = invoiceItems.filter(
                        (_, i) => i !== index,
                      );
                      setInvoiceItems(filterAddedItems);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}

            {invoiceItems.length > 0 && (
              <>
                <div>
                  <p>
                    GRAND TOTAL :{" "}
                    {invoiceItems
                      .reduce((t, item) => {
                        return t + item.price * item.qty;
                      }, 0)
                      .toFixed(2)}
                  </p>
                  <div>
                    <h4>BANK DETAILS</h4>
                    <div>
                      <p>BANK:</p>
                      <p>{localStorage.getItem("bank") || "none"}</p>
                    </div>
                    <div>
                      <p>ACCOUNT TYPE:</p>
                      <p>{localStorage.getItem("accountType") || "none"}</p>
                    </div>
                    <div>
                      <p>ACCOUNT NO:</p>
                      <p>{localStorage.getItem("accountNumber") || "none"}</p>
                    </div>
                    <div>
                      <p>ACCOUNT NAME:</p>
                      <p>{localStorage.getItem("accountName") || "none"}</p>
                    </div>
                    <div>
                      <p>PAYMENT TERMS:</p>
                      <p>{customer.paymentTerms || "none"}</p>
                    </div>
                  </div>
                </div>
                {editingInvoice && (
                  <div>
                    <h4>STATUS</h4>

                    <div>
                      <label>
                        PAID
                        <input
                          type="radio"
                          name="invoiceStatus"
                          value="paid"
                          checked={
                            selectedInvoice?.status === "paid" ? true : false
                          }
                          onChange={(e) =>
                            setSelectedInvoice({
                              ...selectedInvoice,
                              status: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label>
                        UNPAID
                        <input
                          type="radio"
                          name="invoiceStatus"
                          value="unpaid"
                          checked={
                            selectedInvoice?.status === "unpaid" ? true : false
                          }
                          onChange={(e) =>
                            setSelectedInvoice({
                              ...selectedInvoice,
                              status: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label>
                        PAYMENT REQUEST
                        <input
                          type="radio"
                          name="invoiceStatus"
                          value="request"
                          checked={
                            selectedInvoice?.status === "request" ? true : false
                          }
                          onChange={(e) =>
                            setSelectedInvoice({
                              ...selectedInvoice,
                              status: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label>
                        DENIED QUOTE
                        <input
                          type="radio"
                          name="invoiceStatus"
                          value="denied"
                          checked={
                            selectedInvoice?.status === "denied" ? true : false
                          }
                          onChange={(e) =>
                            setSelectedInvoice({
                              ...selectedInvoice,
                              status: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label>
                        PENDING
                        <input
                          type="radio"
                          name="invoiceStatus"
                          value="pending"
                          checked={
                            selectedInvoice?.status === "pending" ? true : false
                          }
                          onChange={(e) =>
                            setSelectedInvoice({
                              ...selectedInvoice,
                              status: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                )}
                {editingInvoice ? (
                  <div>
                    <button onClick={handleInvoiceUpdate}>
                      UPDATE INVOICE
                    </button>
                    <button onClick={() => generatePDF(selectedInvoice._id)}>
                      DOWNLOAD PDF
                    </button>
                  </div>
                ) : (
                  <button onClick={handleInvoiceSave}>SAVE INVOICE</button>
                )}
              </>
            )}
          </>
        )}

        {viewOptions === "prodService" && (
          <div>
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
            <button onClick={addProdToInvoice}>Add to invoice</button>

            {/*{newItem.desc && <p>{newItem.desc}</p>}*/}
          </div>
        )}

        {renderPDFTemplate && selectedInvoice && (
          <div id="invoice">
            {/*HEADER*/}
            <div>
              <div>
                <p>{selectedInvoice?.billingCompanyInfo.name}</p>
                <p>
                  Invoice Ref: INV-
                  {selectedInvoice?._id.slice(-6).toUpperCase()}
                </p>
                <p>Date: {selectedInvoice?.dateCreated}</p>
              </div>
            </div>
            {/*SUB HEADER*/}
            <div>
              <div>
                <h4>BILL TO:</h4>
                <p>{selectedInvoice?.customerInfo?.companyName}</p>
                <p>{selectedInvoice?.customerInfo?.email}</p>
                <p>{selectedInvoice?.customerInfo?.cellNumber}</p>
                <p>{selectedInvoice?.customerInfo?.contactPerson}</p>
              </div>
              <div>
                <p>{selectedInvoice?.customerInfo?.address}</p>
              </div>
            </div>
            {/*MAIN CONTENT*/}
            <div>
              <table>
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>QTY</th>
                    <th>PRICE/UNIT</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice?.invoicedItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.description}</td>
                      <td>{item.qty}</td>
                      <td>R {item.price.toFixed(2)}</td>
                      <td>R {(item.qty * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h5>
                GRAND TOTAL DUE: R {Number(selectedInvoice?.total).toFixed(2)}
              </h5>
            </div>
            {/*BILLER DETAILS (BANK AND CONTACT)*/}
            <div>
              {/*BANK DETAILS*/}
              <div>
                <h4>BANK DETAILS:</h4>
                <p>BANK: {selectedInvoice?.bankdetails?.bank}</p>
                <p>ACCOUNT NAME: {selectedInvoice?.bankdetails?.accountName}</p>
                <p>
                  ACCOUNT NUMBER: {selectedInvoice?.bankdetails?.accountNumber}
                </p>
              </div>
              <div>
                <h4>CONTACT US:</h4>
                <p>EMAIL: {selectedInvoice?.customerInfo?.email}</p>
                <p>CELL: {selectedInvoice?.customerInfo?.cellNumber}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
