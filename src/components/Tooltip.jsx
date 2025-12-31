import React from 'react';

const Tooltip = ({ text, position }) => {
  if (!text) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y + 10,
        left: position.x + 10,
        background: '#333',
        color: '#fff',
        padding: '6px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {text}
    </div>
  );
};

export default Tooltip;
