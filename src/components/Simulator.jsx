// src/components/Simulator.jsx
import React, { useState } from "react";
import { simulateWorkflow } from "../api/mockApi";

export default function Simulator({ nodes, edges }) {
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState([]);
  const [errors, setErrors] = useState([]);

  const run = async () => {
    setRunning(true);
    setLog([]);
    setErrors([]);
    const res = await simulateWorkflow({ nodes, edges });
    if (!res.success) {
      setErrors(res.errors || ["Unknown error"]);
    } else {
      setLog(res.steps || []);
    }
    setRunning(false);
  };

  return (
    <div style={{ padding: 12, borderTop: "1px solid #eee" }}>
      <button onClick={run} disabled={running} style={{ padding: "8px 12px" }}>
        {running ? "Running…" : "Run Simulation"}
      </button>

      {errors.length > 0 && (
        <div style={{ marginTop: 12, color: "crimson" }}>
          <b>Validation errors:</b>
          <ul>
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {log.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <b>Execution log</b>
          <ol>
            {log.map((l, i) => <li key={i}>{l}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}
