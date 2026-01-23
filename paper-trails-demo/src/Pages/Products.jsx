import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Searchbar />
        <div>
          <Link to="/add-product">
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
