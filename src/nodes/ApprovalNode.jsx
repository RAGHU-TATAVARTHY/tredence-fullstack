import { Handle, Position } from "reactflow";

export default function ApprovalNode({ data }) {
  return (
    <div style={{ padding: 10, background: "#fff3cd", borderRadius: 6 }}>
      <strong>Approval</strong>
      <div>{data?.title || "Approval Node"}</div>
      <small>{data?.role}</small>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
