// src/components/NodeFormPanel.jsx
import React, { useEffect, useState } from "react";

function KeyValueList({ items = [], onChange }) {
  const [pairs, setPairs] = useState(items);

  useEffect(() => setPairs(items), [items]);

  const updatePair = (idx, key, val) => {
    const next = pairs.map((p, i) => (i === idx ? { ...p, [key]: val } : p));
    setPairs(next);
    onChange(next);
  };

  const addPair = () => {
    const next = [...pairs, { key: "", value: "" }];
    setPairs(next);
    onChange(next);
  };

  const removePair = (idx) => {
    const next = pairs.filter((_, i) => i !== idx);
    setPairs(next);
    onChange(next);
  };

  return (
    <div>
      {pairs.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            placeholder="key"
            value={p.key}
            onChange={(e) => updatePair(i, "key", e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            placeholder="value"
            value={p.value}
            onChange={(e) => updatePair(i, "value", e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={() => removePair(i)}>✕</button>
        </div>
      ))}
      <button onClick={addPair} style={{ marginTop: 8 }}>
        + Add field
      </button>
    </div>
  );
}

export default function NodeFormPanel({ selectedNode, updateNode }) {
  if (!selectedNode) {
    return (
      <div style={{ padding: 20 }}>
        <h3>No node selected</h3>
        <p>Click a node to edit it</p>
      </div>
    );
  }

  const node = selectedNode;
  const type = node.type;

  // helpers to update node data
  const setData = (patch) => {
    updateNode({ ...node, data: { ...(node.data || {}), ...patch } });
  };

  // --- RENDER PER-TYPE FORMS ---
  return (
    <div style={{ padding: 20 }}>
      <h3>Edit {type.toUpperCase()} Node</h3>

      {/* Common: Title */}
      <div style={{ marginTop: 8 }}>
        <label style={{ fontWeight: 600 }}>Title</label>
        <input
          value={node.data?.title || ""}
          onChange={(e) => setData({ title: e.target.value })}
          style={{ width: "100%", padding: 8, marginTop: 6 }}
        />
      </div>

      {type === "start" && (
        <>
          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>Metadata (key/value)</label>
            <KeyValueList
              items={node.data?.metadata || []}
              onChange={(next) => setData({ metadata: next })}
            />
          </div>
        </>
      )}

      {type === "task" && (
        <>
          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>Description</label>
            <textarea
              value={node.data?.description || ""}
              onChange={(e) => setData({ description: e.target.value })}
              rows={3}
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>Assignee</label>
            <input
              value={node.data?.assignee || ""}
              onChange={(e) => setData({ assignee: e.target.value })}
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>Due date</label>
            <input
              type="date"
              value={node.data?.dueDate || ""}
              onChange={(e) => setData({ dueDate: e.target.value })}
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>Custom fields</label>
            <KeyValueList
              items={node.data?.customFields || []}
              onChange={(next) => setData({ customFields: next })}
            />
          </div>
        </>
      )}

      {type === "approval" && (
        <>
          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>Approver role</label>
            <input
              value={node.data?.approverRole || ""}
              onChange={(e) => setData({ approverRole: e.target.value })}
              placeholder="Manager, HRBP, Director..."
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>Auto-approve threshold</label>
            <input
              type="number"
              value={node.data?.autoApproveThreshold ?? ""}
              onChange={(e) =>
                setData({ autoApproveThreshold: Number(e.target.value) })
              }
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </div>
        </>
      )}

      {type === "auto" && (
        <>
          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>Action</label>
            <select
              value={node.data?.action || ""}
              onChange={(e) => setData({ action: e.target.value, params: {} })}
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            >
              <option value="">-- Select action --</option>
              <option value="send_email">Send Email</option>
              <option value="generate_doc">Generate Document</option>
            </select>
          </div>

          {/* dynamic params area */}
          {node.data?.action === "send_email" && (
            <div style={{ marginTop: 12 }}>
              <label style={{ fontWeight: 600 }}>To</label>
              <input
                value={node.data?.params?.to || ""}
                onChange={(e) =>
                  setData({ params: { ...(node.data?.params || {}), to: e.target.value } })
                }
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
              <label style={{ fontWeight: 600, marginTop: 8 }}>Subject</label>
              <input
                value={node.data?.params?.subject || ""}
                onChange={(e) =>
                  setData({ params: { ...(node.data?.params || {}), subject: e.target.value } })
                }
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </div>
          )}

          {node.data?.action === "generate_doc" && (
            <div style={{ marginTop: 12 }}>
              <label style={{ fontWeight: 600 }}>Template</label>
              <input
                value={node.data?.params?.template || ""}
                onChange={(e) =>
                  setData({ params: { ...(node.data?.params || {}), template: e.target.value } })
                }
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
              <label style={{ fontWeight: 600, marginTop: 8 }}>Recipient</label>
              <input
                value={node.data?.params?.recipient || ""}
                onChange={(e) =>
                  setData({ params: { ...(node.data?.params || {}), recipient: e.target.value } })
                }
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              />
            </div>
          )}
        </>
      )}

      {type === "end" && (
        <>
          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>End message</label>
            <input
              value={node.data?.message || ""}
              onChange={(e) => setData({ message: e.target.value })}
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={!!node.data?.summary}
                onChange={(e) => setData({ summary: e.target.checked })}
                style={{ marginRight: 8 }}
              />
              Show summary flag
            </label>
          </div>
        </>
      )}
    </div>
  );
}
