import { Handle, Position } from "reactflow";

export default function TaskNode({ data }) {
  return (
    <div style={{ padding: 10, background: "#e0f0ff", borderRadius: 6 }}>
      <strong>Task</strong>
      <div>{data?.title || "Task Node"}</div>
      <small>{data?.assignee}</small>

      {/*  Input handle */}
      <Handle type="target" position={Position.Left} />

      {/*  Output handle */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
