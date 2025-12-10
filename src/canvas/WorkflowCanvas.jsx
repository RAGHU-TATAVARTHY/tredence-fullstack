import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

import StartNode from "../nodes/StartNode";
import TaskNode from "../nodes/TaskNode";
import ApprovalNode from "../nodes/ApprovalNode";
import AutomatedNode from "../nodes/AutomatedNode";
import EndNode from "../nodes/EndNode";

import Sidebar from "../components/Sidebar";
import NodeFormPanel from "../components/NodeFormPanel";
import Simulator from "../components/Simulator";

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  auto: AutomatedNode,
  end: EndNode,
};

export default function WorkflowCanvas() {
  const initialNodes = [
    {
      id: "start-1",
      type: "start",
      position: { x: 300, y: 200 },
      data: { title: "Workflow Start" },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  //  Connect edges
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  //  Add node
  const addNode = (type) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: {
        x: Math.random() * 600 + 150,
        y: Math.random() * 400 + 120,
      },
      data: { title: `${type.toUpperCase()} Node` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  //  Update node from form
  const updateNode = (updatedNode) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    );
    setSelectedNode(updatedNode);
  };

  //  Node click
  const handleNodeClick = useCallback(
    (event, node) => {
      const latest = nodes.find((n) => n.id === node.id) || node;
      setSelectedNode(latest);
      setSelectedEdge(null);
    },
    [nodes]
  );

  //  Edge click
  const handleEdgeClick = (event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  //  DELETE KEY SUPPORT
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        // Delete selected node
        if (selectedNode) {
          setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
          setEdges((eds) =>
            eds.filter(
              (e) =>
                e.source !== selectedNode.id &&
                e.target !== selectedNode.id
            )
          );
          setSelectedNode(null);
        }

        // Delete selected edge
        if (selectedEdge) {
          setEdges((eds) =>
            eds.filter((e) => e.id !== selectedEdge.id)
          );
          setSelectedEdge(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode, selectedEdge, setNodes, setEdges]);

  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        
        {/*  Sidebar */}
        <Sidebar addNode={addNode} />

        {/*  Canvas */}
        <div style={{ flex: 1, height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            style={{ width: "100%", height: "100%" }}
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {/*  Right Panel */}
        <div
          style={{
            width: 320,
            borderLeft: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <NodeFormPanel
              selectedNode={selectedNode}
              updateNode={updateNode}
            />
          </div>

          <div style={{ flex: 1, overflow: "auto" }}>
            <Simulator nodes={nodes} edges={edges} />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
