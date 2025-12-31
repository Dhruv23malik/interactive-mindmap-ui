import React from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const MindmapCanvas = ({
  nodes,
  edges,
  onNodeClick,
  onNodeHover,
  onNodeLeave
}) => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
  nodes={nodes}
  edges={edges}
  onNodeMouseEnter={onNodeHover}
  onNodeMouseLeave={onNodeLeave}
  onNodeClick={onNodeClick}
  fitView
>


        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default MindmapCanvas;
