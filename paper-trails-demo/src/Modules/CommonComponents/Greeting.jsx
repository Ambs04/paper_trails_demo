export default function Greeting() {
  const userGreeting = localStorage.getItem("userGreeting").toUpperCase();

  return (
    <>
      <div
        style={{
          marginTop: "80px",
          marginBottom: "5px",
          fontSize: "14px",
          width: "90%",
          fontWeight: "normal",
        }}
      >
        Welcome
      </div>
      <div
        style={{
          marginBottom: "0px",

          fontSize: "20px",
          width: "90%",
          fontWeight: "bold",
        }}
      >
        {userGreeting}
      </div>
    </>
  );
}
