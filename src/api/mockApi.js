// src/api/mockApi.js

export const getAutomations = async () => {
  return [
    { id: "send_email", label: "Send Email", params: ["to", "subject"] },
    { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
  ];
};

//  ADVANCED SIMULATION USING METADATA
export const simulateWorkflow = async ({ nodes = [], edges = [] }) => {
  const logs = [];
  const errors = [];

  const startNode = nodes.find((n) => n.type === "start");
  const endNode = nodes.find((n) => n.type === "end");

  if (!startNode) errors.push("Missing Start node");
  if (!endNode) errors.push("Missing End node");

  if (errors.length) {
    return { success: false, errors, steps: [] };
  }

  //  Extract METADATA as object
  const metadataArray = startNode.data?.metadata || [];
  const metadata = {};

  metadataArray.forEach((item) => {
    if (item.key) metadata[item.key] = item.value;
  });

  logs.push(`Start: ${startNode.data?.title || "Start"}`);
  logs.push(`Metadata Loaded → ${JSON.stringify(metadata)}`);

  for (const node of nodes) {
    switch (node.type) {
      case "task":
        logs.push(
          `Task "${node.data?.title}" assigned to ${node.data?.assignee || "unassigned"}`
        );
        break;

      case "approval": {
        const threshold = node.data?.autoApproveThreshold || 0;
        const amount = Number(metadata.amount || 0);

        if (amount <= threshold) {
          logs.push(
            `Approval "${node.data?.title}"  AUTO-APPROVED (Amount ${amount} ≤ Threshold ${threshold})`
          );
        } else {
          logs.push(
            `Approval "${node.data?.title}"  MANUAL APPROVAL REQUIRED (Amount ${amount} > Threshold ${threshold})`
          );
        }
        break;
      }

      case "auto": {
        const action = node.data?.action;

        if (action === "send_email") {
          logs.push(
            `Automated: EMAIL sent to ${node.data?.params?.to} with subject "${node.data?.params?.subject}"`
          );
        }

        if (action === "generate_doc") {
          logs.push(
            `Automated: DOCUMENT generated using template "${node.data?.params?.template}" for ${node.data?.params?.recipient}`
          );
        }

        //  Metadata printed for automation
        logs.push(`Automation used metadata → ${JSON.stringify(metadata)}`);
        break;
      }

      case "end":
        logs.push(`End: ${node.data?.message || "Completed"}`);
        break;

      default:
        break;
    }
  }

  return { success: true, errors: [], steps: logs };
};
