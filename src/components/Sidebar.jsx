export default function Sidebar({ addNode }) {
  return (
    <div
      style={{
        width: 180,
        padding: 18,
        borderRight: "1px solid #eee",
        background: "#fafafa",
        height: "100vh",
      }}
    >
      <h3>Nodes</h3>
      <div style={{ marginTop: 14 }}>
        <button onClick={() => addNode("task")}>➕ Task</button>
      </div>
      <div style={{ marginTop: 14 }}>
        <button onClick={() => addNode("approval")}>➕ Approval</button>
      </div>
      <div style={{ marginTop: 14 }}>
        <button onClick={() => addNode("auto")}>➕ Automated</button>
      </div>
      <div style={{ marginTop: 14 }}>
        <button onClick={() => addNode("end")}>➕ End</button>
      </div>
    </div>
  );
}
