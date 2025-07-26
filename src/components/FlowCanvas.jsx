// src/components/FlowCanvas.jsx

import React, { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "./nodes/TextNode";
import { v4 as uuidv4 } from "uuid";

const nodeTypes = { textNode: TextNode };

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [savedFlow, setSavedFlow] = useState(null);

  const updateNodeLabel = (id, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, label: newLabel, onChange: updateNodeLabel },
            }
          : node
      )
    );
  };

  const addTextNode = () => {
    const newNode = {
      id: uuidv4(),
      type: "textNode",
      position: {
        x: Math.random() * 600,
        y: Math.random() * 400,
      },
      data: {
        label: "Text Node",
        onChange: updateNodeLabel,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = useCallback(
    (connection) => {
      const alreadyExists = edges.find(
        (e) =>
          e.source === connection.source && e.sourceHandle === connection.sourceHandle
      );
      if (alreadyExists) {
        alert("Only one outgoing edge allowed per node.");
        return;
      }
      setEdges((eds) => addEdge(connection, eds));
    },
    [edges]
  );

  const validateFlow = () => {
    const incomingCount = {};
    nodes.forEach((node) => (incomingCount[node.id] = 0));
    edges.forEach((edge) => {
      if (incomingCount[edge.target] !== undefined) {
        incomingCount[edge.target]++;
      }
    });

    const rootNodes = Object.entries(incomingCount).filter(
      ([_, count]) => count === 0
    );

    if (rootNodes.length !== 1) {
      return "Exactly one node should have no incoming edges (the start node).";
    }

    const outgoingEdges = {};
    edges.forEach((edge) => {
      outgoingEdges[edge.source] = outgoingEdges[edge.source] || [];
      outgoingEdges[edge.source].push(edge);
    });

    const nodesWithNoOutgoing = nodes.filter(
      (node) => !outgoingEdges[node.id]
    );

    if (nodes.length > 1 && nodesWithNoOutgoing.length > 1) {
      return "Only one node is allowed to have no outgoing connections.";
    }

    return null;
  };

  const onSave = () => {
    const error = validateFlow();
    if (error) {
      alert(error);
      return;
    }
    setSavedFlow({ nodes, edges });
  };

  return (
    <ReactFlowProvider>
      <div className="relative w-full h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>

        {/* Add Text Node Button */}
        <button
          onClick={addTextNode}
          className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          Add Text Node
        </button>

        {/* Save Flow Button */}
        <button
          onClick={onSave}
          className="absolute top-4 right-4 px-4 py-2 bg-green-600 text-white rounded shadow"
        >
          Save Flow
        </button>

        {/* Saved Flow Display */}
        {savedFlow && (
          <div className="absolute bottom-4 right-4 w-96 bg-white p-4 border rounded shadow max-h-80 overflow-auto text-xs">
            <h2 className="font-semibold mb-2">Saved Flow JSON</h2>
            <pre>{JSON.stringify(savedFlow, null, 2)}</pre>
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default FlowCanvas;
