import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Customers from "./Pages/Customers";
import Products from "./Pages/Products";
import Users from "./Pages/Users";
import NewCustomer from "./Pages/NewCustomer";
import AddNewProd from "./Pages/AddNewProd";
import AddUser from "./Pages/AddUser";

function App() {
  return (
    <>
      {/**/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-customer" element={<NewCustomer />} />
        <Route path="/add-product" element={<AddNewProd />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </>
  );
}

export default App;
