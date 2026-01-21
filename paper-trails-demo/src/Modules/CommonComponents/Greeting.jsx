export default function Greeting() {
  const userGreeting = localStorage.getItem("userGreeting");

  return (
    <>
      <h1>Welcome {userGreeting}</h1>
    </>
  );
}
