import { Link } from "react-router-dom";
import Header from "../Modules/CommonComponents/Header";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import DashFooter from "../Modules/ModuleComponents/DashFooter";

export default function Users() {
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
      <div>
        <DashFooter />
      </div>
    </>
  );
}
