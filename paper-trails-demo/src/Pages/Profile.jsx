import Greeting from "../Modules/CommonComponents/Greeting";
import Header from "../Modules/CommonComponents/Header";

export default function Profile() {
  return (
    <>
      <div>
        <Header />
      </div>
      <h3>
        <Greeting />
      </h3>
    </>
  );
}
