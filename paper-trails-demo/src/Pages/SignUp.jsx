export default function SignUp() {
  return (
    <>
      {/*main div for header*/}
      <div>
        {/*close btn div*/}
        <div>
          <button>X</button>
        </div>
        {/*Heading for header div*/}
        <div>
          <h1>REGISTRATION</h1>
        </div>
      </div>
      {/*main div for main section*/}
      <div>
        {/*first name div*/}
        <div>
          <p>First name</p>
          <input type="text" />
        </div>
        {/*last name div*/}
        <div>
          <p>Last name</p>
          <input type="text" />
        </div>
        {/*email div*/}
        <div>
          <p>Email address</p>
          <input type="text" />
        </div>
        {/*contact div*/}
        <div>
          <p>Contact details</p>
          <input type="number" />
        </div>
        {/*question div: freelance or business*/}
        <div>
          <p>Is this a freelance account or a business account?</p>
          <br />
          <input type="checkbox" />
          <p>Freelance</p>
          <input type="checkbox" />
          <p>Business</p>
        </div>
        {/*company name: if business then required*/}
        <div>
          <p>If for a business, insert Company name</p>
          <input type="text" />
        </div>
        {/*password div*/}
        <div>
          <p>Password</p>
          <input type="text" />
        </div>
        {/*confirm password div*/}
        <div>
          <p>Confirm password</p>
          <input type="text" />
        </div>
        <input type="checkbox" />
        <p>
          Accept the <a href="www.google.com">T&C's</a>
        </p>
      </div>
      {/*div for buttons: sign up and cancel*/}
      <div>
        <button>Sign Up</button>
        <button>Cancel</button>
      </div>
    </>
  );
}
