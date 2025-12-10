import { Handle, Position } from "reactflow";

export default function StartNode({ data }) {
  return (
    <div style={{ padding: 10, background: "#c8facc", borderRadius: 6 }}>
      <strong>Start</strong>
      <div>{data?.title || "Start Node"}</div>

      {/*  Output handle */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
