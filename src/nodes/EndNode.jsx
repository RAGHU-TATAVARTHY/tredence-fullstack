import { Handle, Position } from "reactflow";

export default function EndNode({ data }) {
  return (
    <div style={{ padding: 10, background: "#ffd6d6", borderRadius: 6 }}>
      <strong>End</strong>
      <div>{data?.message || "End Node"}</div>

      {/*  Input handle */}
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
