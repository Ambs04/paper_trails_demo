import { Link } from "react-router-dom";
import Header from "../Modules/CommonComponents/Header";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import { baseUrl } from "../api";

export default function Users() {
  fetch(`${baseUrl}/user`)
    .then((res) => res.json())
    .then((data) => console.log(data));
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Searchbar />
        <div>
          <Link to="/add-user">
            <button>+</button>
          </Link>
        </div>
      </div>
      <div></div>
      <div>
        <DashFooter />
      </div>
    </>
  );
}
