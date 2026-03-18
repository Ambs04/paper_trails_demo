export default function LoadingPage({ logo }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999",
        animation: "fade 0.5s ease-in forwards",
      }}
    >
      <img
        src={logo}
        style={{
          width: "120px",
          height: "120px",
          animation: "spin 2s linear infinite reverse",
        }}
      />
    </div>
  );
}
