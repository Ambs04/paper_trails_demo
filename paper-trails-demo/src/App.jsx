import { Routes, Route } from "react-dom";
import Home from "./Pages/Home";
//import SignUp from "./Pages/SignUp";
//import Login from "./Pages/Login";

function App() {
  return (
    <>
      {/**/}
      <Home />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
