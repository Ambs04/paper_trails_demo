export default function Greeting() {
  const userGreeting = JSON.parse(localStorage.getItem("userNameSurname"));

  return (
    <>
      <h1>Welcome {userGreeting}</h1>
    </>
  );
}
