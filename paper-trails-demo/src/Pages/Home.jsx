import Header from "../Modules/CommonComponents/Header";
import Hero from "../Modules/ModuleComponents/Hero";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <p>
        A simpler way to handle all your admin. Send invoices, track payments
        and manage clients. All this in the palm of your hand.
      </p>
      <div>
        <Link to="/signup">
          <button>Sign Up now!</button>
        </Link>
      </div>
    </>
  );
}
