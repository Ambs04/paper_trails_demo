export default function Greeting() {
  const userGreeting = localStorage.getItem("userGreeting").toUpperCase();

  return (
    <>
      <div
        style={{
          marginTop: "70px",
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
          marginBottom: "5px",
          fontSize: "20px",
          width: "90%",
          fontWeight: "bold",
        }}
      >
        {userGreeting}
      </div>

      <div style={{ width: "90%", fontSize: "14px", fontWeight: "normal" }}>
        This Dashboard will be here to give you a quick overview of what's
        happening on your system.
      </div>
    </>
  );
}
