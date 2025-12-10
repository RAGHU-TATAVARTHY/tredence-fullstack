import { Handle, Position } from "reactflow";

export default function AutomatedNode({ data }) {
  return (
    <div style={{ padding: 10, background: "#f2e6ff", borderRadius: 6 }}>
      <strong>Automated</strong>
      <div>{data?.title || "Automated Step"}</div>
      <small>{data?.action}</small>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
