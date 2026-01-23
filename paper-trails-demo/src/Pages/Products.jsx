import Header from "../Modules/CommonComponents/Header";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import Searchbar from "../Modules/CommonComponents/Searchbar";

export default function Products() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Searchbar />
        <div>
          <button>+</button>
        </div>
      </div>
      <div>
        <DashFooter />
      </div>
    </>
  );
}
