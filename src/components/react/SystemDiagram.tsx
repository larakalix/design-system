import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemNodeData {
  label: string;
  description?: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'queue' | 'external' | 'default';
  status?: 'active' | 'inactive' | 'warning';
}

const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  client: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  gateway: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  service: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
  database: { bg: '#fce7f3', border: '#ec4899', text: '#9d174d' },
  cache: { bg: '#e0e7ff', border: '#6366f1', text: '#3730a3' },
  queue: { bg: '#f3e8ff', border: '#8b5cf6', text: '#5b21b6' },
  external: { bg: '#ccfbf1', border: '#14b8a6', text: '#0f766e' },
  default: { bg: '#f1f5f9', border: '#64748b', text: '#334155' },
};

function SystemNode({ data, selected }: NodeProps<SystemNodeData>) {
  const colors = nodeColors[data.type] || nodeColors.default;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="px-4 py-3 rounded-xl border-2 shadow-sm cursor-pointer transition-all duration-200 min-w-[120px] text-center"
        style={{
          backgroundColor: colors.bg,
          borderColor: selected ? colors.border : `${colors.border}66`,
          boxShadow: selected ? `0 0 0 3px ${colors.border}33` : 'none',
        }}
      >
        <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-slate-400" />
        <p className="text-sm font-semibold" style={{ color: colors.text }}>
          {data.label}
        </p>
        <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-slate-400" />
      </div>

      <AnimatePresence>
        {isHovered && data.description && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 px-3 py-2 rounded-lg bg-slate-800 text-white text-xs whitespace-nowrap shadow-lg pointer-events-none"
          >
            {data.description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const nodeTypes = {
  systemNode: SystemNode,
};

interface SystemDiagramProps {
  nodes: Node<SystemNodeData>[];
  edges: Edge[];
  title?: string;
  height?: number;
}

export default function SystemDiagram({ nodes: initialNodes, edges: initialEdges, title, height = 400 }: SystemDiagramProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id === selectedNode ? null : node.id);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: n.id === node.id ? !n.selected : false,
      }))
    );
  }, [selectedNode, setNodes]);

  return (
    <div className="w-full rounded-2xl border border-border bg-surface overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-border bg-surface-muted">
          <h3 className="text-sm font-semibold text-primary">{title}</h3>
          <p className="text-xs text-text-muted mt-0.5">Click nodes to explore · Drag to pan · Scroll to zoom</p>
        </div>
      )}
      <div style={{ height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={16} size={1} color="#e2e8f0" />
          <Controls className="!shadow-sm !border-border" />
          <MiniMap
            className="!rounded-lg !shadow-sm !border-border"
            nodeColor={(node) => nodeColors[(node.data as SystemNodeData)?.type]?.border || '#64748b'}
            maskColor="rgba(255,255,255,0.8)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
