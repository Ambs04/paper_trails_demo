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
      }}
    >
      <img
        src={logo}
        style={{ width: "120px", animation: "spin 1.2s linear infinite" }}
      />
    </div>
  );
}
