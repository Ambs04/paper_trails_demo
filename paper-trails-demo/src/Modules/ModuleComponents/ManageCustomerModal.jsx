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
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.44)",
          top: "0",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "0.2s",
          zIndex: "1000",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: "1 1 0%",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
            minHeight: "1714px",
            height: "1714px",
            overflowY: "hidden scroll",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.314)",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              position: "fixed",
              top: "0",
              zIndex: "10",
            }}
          >
            <button
              onClick={onClose}
              style={{
                height: "50px",
                minHeight: "50px",
                width: "50px",
                backgroundColor: "rgb(249,220,92)",
                border: "0",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              X
            </button>
            <div
              style={{
                width: "100%",
                backgroundColor: "rgb(70,83,98)",
                height: "100%",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
                minHeight: "50px",
              }}
            >
              <div style={{ marginLeft: "20px" }}> MANAGE CUSTOMER</div>
            </div>
          </div>
          {viewOptions === "menu" && (
            <div
              style={{
                width: "100%",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                position: "fixed",
                top: "52px",
                zIndex: "9",
                transition: "0.6s",
              }}
            >
              <button
                onClick={() => setViewOptions("edit")}
                style={{
                  height: "40px",
                  width: "50%",
                  backgroundColor:
                    viewOptions === "edit" ? "rgb(249,220,92)" : "white",
                  border: "0",
                  fontWeight: "bold",
                  transition: "0.6s",
                }}
              >
                PROFILE
              </button>
              <button
                onClick={() => setViewOptions("history")}
                style={{
                  height: "40px",
                  width: "50%",
                  backgroundColor:
                    viewOptions === "history" ? "rgb(249,220,92)" : "white",
                  border: "0",
                  fontWeight: "bold",
                  transition: "0.6s",
                }}
              >
                HISTORY
              </button>
            </div>
          )}

          {viewOptions === "edit" && (
            <div style={{ width: "100%" }}>
              <div>
                <button
                  onClick={() => setViewOptions("edit")}
                  style={{
                    height: "40px",
                    width: "50%",
                    backgroundColor:
                      viewOptions === "edit" ? "rgb(249,220,92)" : "white",
                    border: "0",
                    fontWeight: "bold",
                    transition: "0.6s",
                  }}
                >
                  PROFILE
                </button>
                <button
                  onClick={() => setViewOptions("history")}
                  style={{
                    height: "40px",
                    width: "50%",
                    backgroundColor:
                      viewOptions === "history" ? "rgb(249,220,92)" : "white",
                    border: "0",
                    fontWeight: "bold",
                    transition: "0.6s",
                  }}
                >
                  HISTORY
                </button>
              </div>
              <div
                style={{
                  width: "85%",
                  marginTop: "100px",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                BASIC ACCOUNT INFORMATION
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    width: "80%",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  COMPANY NAME:
                </p>
                <input
                  name="companyName"
                  value={editCustomer.companyName}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "80%",
                    marginTop: "5px",
                    borderRadius: "4px",
                    padding: "8px 10px 8px 20px",
                    fontSize: "14px",
                    border: "none",
                    backgroundColor: "rgba(0,0,0,0.035)",
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    width: "80%",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  COMPANY EMAIL:
                </p>
                <input
                  name="email"
                  value={editCustomer.email}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "80%",
                    marginTop: "5px",
                    borderRadius: "4px",
                    padding: "8px 10px 8px 20px",
                    fontSize: "14px",
                    border: "none",
                    backgroundColor: "rgba(0,0,0,0.035)",
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    width: "80%",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  COMPANY PHONE:
                </p>
                <input
                  name="cellNumber"
                  value={editCustomer.cellNumber}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "80%",
                    marginTop: "5px",
                    borderRadius: "4px",
                    padding: "8px 10px 8px 20px",
                    fontSize: "14px",
                    border: "none",
                    backgroundColor: "rgba(0,0,0,0.035)",
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    width: "80%",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  CONTACT PERSON:
                </p>
                <input
                  name="contactPerson"
                  value={editCustomer.contactPerson}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "80%",
                    marginTop: "5px",
                    borderRadius: "4px",
                    padding: "8px 10px 8px 20px",
                    fontSize: "14px",
                    border: "none",
                    backgroundColor: "rgba(0,0,0,0.035)",
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    width: "80%",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  ADDRESS
                </p>
                <textarea
                  name="address"
                  value={editCustomer.address}
                  onChange={handleChange}
                  style={{
                    height: "35px",
                    width: "80%",
                    marginTop: "5px",
                    borderRadius: "4px",
                    padding: "8px 10px 8px 20px",
                    fontSize: "14px",
                    border: "none",
                    backgroundColor: "rgba(0,0,0,0.035)",
                    fontWeight: "bold",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                <p
                  style={{
                    width: "80%",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                  }}
                >
                  PAYMENT TERMS:
                </p>

                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",

                    gap: "15px",
                  }}
                >
                  {["30 days", "14 days", "7 days", "cash on delivery"].map(
                    (payTerm) => (
                      <div
                        key={payTerm}
                        onClick={() =>
                          handleChange({
                            target: { name: "paymentTerms", value: payTerm },
                          })
                        }
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {payTerm.toUpperCase()}
                        <div
                          style={{
                            height: "15px",
                            width: "15px",
                            borderRadius: "4px",
                            border: "2px solid rgb(70,83,98)",
                            backgroundColor:
                              editCustomer.paymentTerms === payTerm
                                ? "rgb(70,83,98)"
                                : "transparent",
                            transition: "0.6s",
                          }}
                        ></div>
                      </div>
                    ),
                  )}
                </div>
              </div>
              {/*account status */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    width: "80%",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(70,83,98)",
                    textAlign: "left",
                    paddingLeft: "0px",
                    paddingBottom: "20px",
                  }}
                >
                  ACCOUNT STATUS
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                    gap: "15px",
                  }}
                >
                  <div
                    onClick={() =>
                      handleChange({
                        target: { name: "status", value: "active" },
                      })
                    }
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      border: "none",
                    }}
                  >
                    ACTIVE
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "4px",
                        border: "2px solid rgb(70,83,98)",
                        backgroundColor:
                          editCustomer.status === "active"
                            ? "#465362"
                            : "transparent",
                        transition: "0.6s",
                      }}
                    ></div>
                  </div>
                  <div
                    onClick={() =>
                      handleChange({
                        target: { name: "status", value: "inactive" },
                      })
                    }
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      border: "none",
                    }}
                  >
                    INACTIVE
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "4px",
                        border: "2px solid rgb(70,83,98)",
                        backgroundColor:
                          editCustomer.status === "inactive"
                            ? "#465362"
                            : "transparent",
                        transition: "0.6s",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginBottom: "50px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={handleCustomerUpdate}
                    style={{
                      height: "40px",
                      width: "85%",
                      marginTop: "20px",
                      backgroundColor: "rgb(249,220,92)",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                  >
                    UPDATE
                  </button>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      height: "40px",
                      width: "85%",
                      marginTop: "20px",

                      border: "none",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          )}
          {viewOptions === "history" && (
            <div style={{ width: "100%", padding: "15px" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "100px",
                }}
              >
                <h4
                  style={{
                    width: "85%",
                    marginBottom: "15px",
                    fontSize: "16px",
                  }}
                >
                  {invoiceFilter === "paid"
                    ? "PAID INVOICES"
                    : "UNPAID INVOICES"}
                </h4>

                {Array.isArray(history) &&
                  history
                    .filter((invoice) => invoice.status === invoiceFilter)
                    .map((invoice) => (
                      <div
                        key={invoice._id}
                        onClick={() => {
                          const formattedInvoiceItems =
                            invoice.invoicedItems.map((item) => ({
                              name: item.description,
                              qty: item.qty,
                              price: item.price,
                            }));
                          setInvoiceItems(formattedInvoiceItems);
                          setSelectedInvoice(invoice);
                          setEditingInvoice(true);
                          setShowSortedInvoices(true);
                        }}
                        style={{
                          backgroundColor: "rgba(0,0,0,0.03)",
                          borderRadius: "6px",
                          padding: "12px",
                          marginBottom: "10px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
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
                <button
                  onClick={() => setViewOptions("edit")}
                  style={{
                    height: "40px",
                    width: "50%",
                    backgroundColor:
                      viewOptions === "edit" ? "rgb(249,220,92)" : "white",
                    border: "0",
                    fontWeight: "bold",
                    transition: "0.6s",
                  }}
                >
                  PROFILE
                </button>
                <button
                  onClick={() => setViewOptions("history")}
                  style={{
                    height: "40px",
                    width: "50%",
                    backgroundColor:
                      viewOptions === "history" ? "rgb(249,220,92)" : "white",
                    border: "0",
                    fontWeight: "bold",
                    transition: "0.6s",
                  }}
                >
                  HISTORY
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
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontWeight: "bold", color: "black" }}>
                    R 1200.05
                  </p>
                  <p style={{ fontWeight: "bold" }}>OUTSTANDING</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontWeight: "bold", color: "black" }}>
                    R 2200.05
                  </p>
                  <p style={{ fontWeight: "bold" }}>PAID</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ fontWeight: "bold", color: "black" }}>11</p>
                  <p style={{ fontWeight: "bold" }}>INVOICES</p>
                </div>
              </div>
              <div>
                {history.length === 0 ? (
                  <>
                    <p>No invoices for this customer found</p>
                    <button
                      onClick={() => setViewOptions("add")}
                      style={{
                        height: "35px",
                        width: "40px",
                        border: "none",
                        backgroundColor: "rgb(249,220,92)",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Create Invoice
                    </button>
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      onClick={() => setInvoiceFilter("paid")}
                      style={{
                        height: "35px",
                        width: "90px",
                        border: "none",
                        backgroundColor:
                          invoiceFilter === "paid"
                            ? "rgb(249,220,92)"
                            : "rgba(0,0,0,0.05)",
                        fontWeight: "bold",
                      }}
                    >
                      PAID
                    </button>
                    <button
                      onClick={() => setInvoiceFilter("unpaid")}
                      style={{
                        height: "35px",
                        width: "90px",
                        border: "none",
                        backgroundColor:
                          invoiceFilter === "unpaid"
                            ? "rgb(249,220,92)"
                            : "rgba(0,0,0,0.05)",
                        fontWeight: "bold",
                      }}
                    >
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
                  </div>
                )}
              </div>
            </div>
          )}

          {viewOptions === "add" && (
            <>
              <div
                style={{
                  width: "100%",

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "100px",
                }}
              >
                <button
                  onClick={() => setViewOptions("history")}
                  style={{ height: "" }}
                >
                  X
                </button>
                <p style={{ fontWeight: "bold" }}>
                  {editingInvoice ? "EDIT INVOICE" : "CREATE NEW INVOICE"}
                </p>
              </div>
              {editingInvoice && selectedInvoice && (
                <p style={{ paddingLeft: "10px" }}>
                  Invoice ID: {selectedInvoice._id.slice(-6).toUpperCase()}
                </p>
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
                <div
                  style={{
                    width: "85%",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                    fontWeight: "bold",
                    fontSize: "13px",
                    marginBottom: "10px",
                  }}
                >
                  <p>PRODUCT/SERVICE</p>
                  <p>QTY</p>
                  <p>PRICE / UNIT</p>
                  <p>TOTAL PRICE</p>
                  <button
                    onClick={() => setViewOptions("prodService")}
                    style={{
                      border: "none",
                      backgroundColor: "rgb(249,220,92)",
                      fontWeight: "bold",
                      width: "25px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {invoiceItems.map((item, index) => {
                const totalPrice = item.qty * item.price;

                return (
                  <div
                    key={index}
                    style={{
                      width: "85%",
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                      alignItems: "center",
                      marginBottom: "8px",
                      fontSize: "13px",
                    }}
                  >
                    <p>{item.name}</p>
                    {/*<p>{item.qty}</p>*/}
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "22px",
                          height: "22px",
                          border: "none",
                          backgroundColor: "rgb(249,220,92)",
                        }}
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
                        style={{
                          width: "22px",
                          height: "22px",
                          border: "none",
                          backgroundColor: "rgb(249,220,92)",
                        }}
                        onClick={() => {
                          const increment = [...invoiceItems];
                          increment[index].qty++;
                          setInvoiceItems(increment);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <p>R {item.price}</p>
                    <p>R {totalPrice}</p>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "rgb(70,83,98)",
                        color: "white",
                        width: "22px",
                      }}
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
                  <p style={{ marginTop: "15px" }}>
                    GRAND TOTAL :
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
                              selectedInvoice?.status === "unpaid"
                                ? true
                                : false
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
                              selectedInvoice?.status === "request"
                                ? true
                                : false
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
                              selectedInvoice?.status === "denied"
                                ? true
                                : false
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
                              selectedInvoice?.status === "pending"
                                ? true
                                : false
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

          {/*{renderPDFTemplate && selectedInvoice && (*/}
          <div
            id="invoice"
            style={{
              display: "none",
              flexDirection: "column",
              width: 450,
              position: "absolute",
              minHeight: 625,

              background: "white",

              top: 0,
            }}
          >
            {/*HEADER*/}
            <div
              style={{
                minHeight: 40,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    height: 100,
                    width: 100,
                    marginRight: 20,
                    marginBottom: 5,
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  right: 25,
                  textAlign: "right",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>{selectedInvoice?.billingCompanyInfo.companyName}</p>
                <p>
                  Invoice Ref: INV-
                  {selectedInvoice?._id.slice(-6).toUpperCase()}
                </p>
                <p>Date: {selectedInvoice?.dateCreated}</p>
              </div>
            </div>
            {/*SUB HEADER*/}
            <div
              style={{
                fontSize: 14,
                width: "100%",
                color: "#777",
                marginTop: 20,
                marginLeft: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h4>BILL TO:</h4>
              <p>{selectedInvoice?.customerInfo?.companyName}</p>
              <p>{selectedInvoice?.customerInfo?.email}</p>
              <p>{selectedInvoice?.customerInfo?.cellNumber}</p>
              <p>{selectedInvoice?.customerInfo?.contactPerson}</p>

              <div>
                <p>{selectedInvoice?.customerInfo?.address}</p>
              </div>
            </div>
          </div>
          {/*MAIN CONTENT*/}
          <div>
            <table
              style={{
                fontSize: 10,
                fontWeight: "bold",
                opacity: 0.5,
                color: "#777",
              }}
            >
              <thead
                style={{
                  borderBottom: "1px solid #777",
                }}
              >
                <tr
                  style={{
                    fontSize: 8,
                    paddingBottom: 5,
                    fontWeight: "bold",
                    opacity: 0.5,
                    color: "#777",
                    textAlign: "left",
                  }}
                >
                  <td
                    style={{
                      fontSize: 8,
                      opacity: 0.7,
                      paddingTop: 6,
                      paddingBottom: 6,
                      borderBottom: "0.5px solid #00000030",
                    }}
                  >
                    ITEM
                  </td>
                  <td
                    style={{
                      fontSize: 8,
                      opacity: 0.7,
                      paddingTop: 6,
                      paddingBottom: 6,
                      borderBottom: "0.5px solid #00000030",
                    }}
                  >
                    QTY
                  </td>
                  <td
                    style={{
                      fontSize: 8,
                      opacity: 0.7,
                      paddingTop: 6,
                      paddingBottom: 6,
                      borderBottom: "0.5px solid #00000030",
                    }}
                  >
                    PRICE/UNIT
                  </td>
                  <td
                    style={{
                      fontSize: 8,
                      opacity: 0.7,
                      paddingTop: 6,
                      paddingBottom: 6,
                      borderBottom: "0.5px solid #00000030",
                    }}
                  >
                    TOTAL
                  </td>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              fontSize: 24,
            }}
          >
            <h5
              style={{
                color: "#777",
                fontSize: 14,
              }}
            >
              GRAND TOTAL DUE: R {Number(selectedInvoice?.total).toFixed(2)}
            </h5>
          </div>
          {/*BILLER DETAILS (BANK AND CONTACT)*/}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginLeft: 20,
              marginRight: 25,
              marginTop: 30,
            }}
          >
            {/*BANK DETAILS*/}
            <div>
              <h4
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#777",
                }}
              >
                BANK DETAILS:
              </h4>
              <p>BANK: {selectedInvoice?.bankdetails?.bank}</p>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#777",
                }}
              >
                ACCOUNT NAME: {selectedInvoice?.bankdetails?.accountName}
              </p>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#777",
                }}
              >
                ACCOUNT NUMBER: {selectedInvoice?.bankdetails?.accountNumber}
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#777",
                }}
              >
                CONTACT US:
              </h4>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#777",
                }}
              >
                EMAIL: {selectedInvoice?.customerInfo?.email}
              </p>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#777",
                }}
              >
                CELL: {selectedInvoice?.customerInfo?.cellNumber}
              </p>
            </div>
          </div>
          <div
            style={{
              width: "100%",

              minHeight: 20,
              marginTop: "auto",
            }}
          />
        </div>

        {/*}  )}*/}
      </div>
    </>
  );
}
