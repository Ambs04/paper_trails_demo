export default function DashFooter() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex" }}>
          <button>DASH</button>
        </div>
        <div style={{ display: "flex" }}>
          <button>CUSTOMERS</button>
        </div>
        <div style={{ display: "flex" }}>
          <button>SERVICES</button>
        </div>
        <div style={{ display: "flex" }}>
          <button>USERS</button>
        </div>
      </div>
    </>
  );
}
