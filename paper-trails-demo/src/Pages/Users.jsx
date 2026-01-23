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
          <button>+</button>
        </div>
      </div>
      <div>
        <DashFooter />
      </div>
    </>
  );
}
