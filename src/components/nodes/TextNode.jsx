// src/components/nodes/TextNode.jsx
import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

const TextNode = ({ data, id }) => {
  const [value, setValue] = useState(data.label || "");

  useEffect(() => {
    setValue(data.label); // Sync with external data updates
  }, [data.label]);

  const handleBlur = () => {
    data.onChange?.(id, value); // Notify parent to update
  };

  return (
    <div className="bg-white border rounded shadow px-4 py-2 w-full">
      <Handle type="target" position={Position.Left} />
      <input
        type="text"
        name={`textnode-${id}`} // ✅ This avoids the DevTools warning
        className="w-full outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.target.blur(); // Save on Enter
        }}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TextNode;
