import React, { useState, useRef } from 'react';
import MindmapCanvas from './components/MindmapCanvas';
import Sidebar from './components/Sidebar';
import Tooltip from './components/Tooltip';
import data from './data/mindmap.json';
import { parseMindmap } from './utils/parseMindmap';

function App() {
  const { nodes, edges } = parseMindmap(data);

  const [selectedNode, setSelectedNode] = useState(null);
  const [collapsedNodes, setCollapsedNodes] = useState({});

  // 🔹 TOOLTIP STATE (STABLE VERSION)
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const hideTimeout = useRef(null);

  // 🔹 EDITABLE NODE STATE
  const [nodeData, setNodeData] = useState(nodes);

  // CLICK HANDLER
  const handleNodeClick = (event, node) => {
    setSelectedNode(node);

    // Prevent collapsing root
    if (node.parentNode === null) return;

    setCollapsedNodes(prev => ({
      ...prev,
      [node.id]: !prev[node.id]
    }));
  };

  // 🔹 HOVER HANDLERS (NO FLICKER)
  const handleNodeHover = (event, node) => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }

    setHoveredNode(node);
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleNodeMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleNodeLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setHoveredNode(null);
    }, 120);
  };

  // 🔹 UPDATE NODE DATA FROM SIDEBAR
  const updateNodeData = (id, field, value) => {
    setNodeData(prev =>
      prev.map(node =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                [field]: value
              }
            }
          : node
      )
    );
  };

  // 🔹 HIGHLIGHT SELECTED NODE & EDGES
  const styledNodes = nodeData.map(node => ({
    ...node,
    style: {
      ...node.style,
      border:
        selectedNode?.id === node.id
          ? '2px solid #4F46E5'
          : '1px solid #e0e0e0'
    }
  }));

  const styledEdges = edges.map(edge => ({
    ...edge,
    style: {
      stroke:
        selectedNode &&
        (edge.source === selectedNode.id ||
          edge.target === selectedNode.id)
          ? '#4F46E5'
          : '#ccc',
      strokeWidth:
        selectedNode &&
        (edge.source === selectedNode.id ||
          edge.target === selectedNode.id)
          ? 2
          : 1
    }
  }));

  // 🔹 COLLAPSE LOGIC
  const visibleNodes = styledNodes.filter(
    node => !collapsedNodes[node.parentNode]
  );

  const visibleEdges = styledEdges.filter(
    edge =>
      !collapsedNodes[edge.source] &&
      !collapsedNodes[edge.target]
  );

  return (
  <div
    style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      background: '#f4f6f8',
      padding: '12px',
      boxSizing: 'border-box'
    }}
  >
    {/* CANVAS COLUMN */}
    <div
      style={{
        flex: 1,
        minWidth: 0,              // 🔑 prevents overflow
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden'        // 🔑 CLIPS NODES HERE
      }}
    >
      <MindmapCanvas
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onNodeMove={handleNodeMove}
        onNodeLeave={handleNodeLeave}
      />

      <Tooltip
        text={hoveredNode?.data?.summary}
        position={mousePos}
      />
    </div>

    {/* SIDEBAR COLUMN */}
    <div
      style={{
        width: '480px',
        marginLeft: '16px',
        height: '100%',
        flexShrink: 0,
        position: 'relative',
        zIndex: 2
      }}
    >
      <Sidebar
        selectedNode={selectedNode}
        updateNodeData={updateNodeData}
      />
    </div>
  </div>
);
return (
  <div
    style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      background: '#f4f6f8',
      padding: '12px',
      boxSizing: 'border-box'
    }}
  >
    {/* CANVAS COLUMN */}
    <div
      style={{
        flex: 1,
        minWidth: 0,              // 🔑 prevents overflow
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden'        // 🔑 CLIPS NODES HERE
      }}
    >
      <MindmapCanvas
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onNodeMove={handleNodeMove}
        onNodeLeave={handleNodeLeave}
      />

      <Tooltip
        text={hoveredNode?.data?.summary}
        position={mousePos}
      />
    </div>

    {/* SIDEBAR COLUMN */}
    <div
      style={{
        width: '480px',
        marginLeft: '16px',
        height: '100%',
        flexShrink: 0,
        position: 'relative',
        zIndex: 2
      }}
    >
      <Sidebar
        selectedNode={selectedNode}
        updateNodeData={updateNodeData}
      />
    </div>
  </div>
);


}

export default App;
