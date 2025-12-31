import React from 'react';

const Sidebar = ({ selectedNode, updateNodeData }) => {
  if (!selectedNode) {
    return (
      <div style={styles.sidebar}>
        <div style={styles.emptyState}>
          <h3 style={styles.emptyTitle}>Node Inspector</h3>
          <p style={styles.emptyText}>
            Click a node in the mindmap to view and edit its details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.badge}>Selected Node</span>
        <h2 style={styles.title}>{selectedNode.data.label}</h2>
      </div>

      {/* Title */}
      <div style={styles.card}>
        <label style={styles.label}>Title</label>
        <input
          style={styles.input}
          value={selectedNode.data.label}
          onChange={(e) =>
            updateNodeData(selectedNode.id, 'label', e.target.value)
          }
        />
      </div>

      {/* Summary */}
      <div style={styles.card}>
        <label style={styles.label}>Summary</label>
        <textarea
          style={styles.textarea}
          value={selectedNode.data.summary}
          onChange={(e) =>
            updateNodeData(selectedNode.id, 'summary', e.target.value)
          }
        />
      </div>

      {/* Details */}
      <div style={styles.card}>
        <label style={styles.label}>Details</label>
        <textarea
          style={{ ...styles.textarea, minHeight: '120px' }}
          value={selectedNode.data.details}
          onChange={(e) =>
            updateNodeData(selectedNode.id, 'details', e.target.value)
          }
        />
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '100%',
    height: '100%',
    background: '#f9fafb',
    padding: '20px',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    boxSizing: 'border-box',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  /* Empty state */
  emptyState: {
    marginTop: '80px',
    textAlign: 'center',
    color: '#666'
  },
  emptyTitle: {
    marginBottom: '8px'
  },
  emptyText: {
    fontSize: '14px'
  },

  /* Header */
  header: {
    paddingBottom: '10px',
    borderBottom: '1px solid #e5e7eb'
  },
  badge: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#4F46E5',
    textTransform: 'uppercase'
  },
  title: {
    marginTop: '6px',
    fontSize: '20px'
  },

  /* Cards */
  card: {
    background: '#ffffff',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },

  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '6px',
    color: '#374151'
  },

  input: {
    width: '100%',
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none'
  },

  textarea: {
    width: '100%',
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    resize: 'vertical',
    outline: 'none'
  }
};

export default Sidebar;
