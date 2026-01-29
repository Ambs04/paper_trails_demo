import { Link } from "react-router-dom";
import Header from "../Modules/CommonComponents/Header";
import Searchbar from "../Modules/CommonComponents/Searchbar";
import DashFooter from "../Modules/ModuleComponents/DashFooter";
import { baseUrl } from "../api";

export default function Users() {
  useEffect(()=> {
    const fetchUsers = async () => {
      try{
        const res = fetch(`${baseUrl}/users/getAllUsers`, {
          method: 'POST',
          headers:{
            'Con'
          }
        })
      }
}})
   
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
        {/*first name */}
        <div>
          <p>Name:</p>
          <input name="userName" />
        </div>

        {/*email */}
        <div>
          <p>Email:</p>
          <input name="userEmail" type="email" placeholder="james@email.com" />
        </div>
        {/* phone number*/}
        <div>
          <p>Phone:</p>
          <input name="userPhone" placeholder="078 888 8888" />
        </div>
        {/*status*/}
        <div>
          <p>Status</p>
          <input name="status" />
        </div>
      </div>
      <div>
        <DashFooter />
      </div>
    </>
  );
}
