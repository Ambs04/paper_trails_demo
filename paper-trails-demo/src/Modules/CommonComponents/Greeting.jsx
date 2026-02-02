export default function Greeting() {
  const userGreeting = localStorage.getItem("userGreeting").toUpperCase();

  return (
    <>
      <p>
        Welcome <br />
        {userGreeting}
      </p>
    </>
  );
}
