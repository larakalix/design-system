import React, { useCallback } from 'react';
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

interface SystemNodeData {
  label: string;
  description?: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'queue' | 'external' | 'default';
  metric?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  details?: string[];
}

const nodeColors: Record<string, { bg: string; border: string; text: string; lightBg: string }> = {
  client: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', lightBg: '#eff6ff' },
  gateway: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', lightBg: '#fffbeb' },
  service: { bg: '#d1fae5', border: '#10b981', text: '#065f46', lightBg: '#ecfdf5' },
  database: { bg: '#fce7f3', border: '#ec4899', text: '#9d174d', lightBg: '#fdf2f8' },
  cache: { bg: '#e0e7ff', border: '#6366f1', text: '#3730a3', lightBg: '#eef2ff' },
  queue: { bg: '#f3e8ff', border: '#8b5cf6', text: '#5b21b6', lightBg: '#faf5ff' },
  external: { bg: '#ccfbf1', border: '#14b8a6', text: '#0f766e', lightBg: '#f0fdfa' },
  default: { bg: '#f1f5f9', border: '#64748b', text: '#334155', lightBg: '#f8fafc' },
};

const statusColors: Record<string, string> = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

function SystemNode({ data, selected }: NodeProps<SystemNodeData>) {
  const colors = nodeColors[data.type] || nodeColors.default;
  const hasDetails = data.details && data.details.length > 0;
  const hasMetric = data.metric && data.metric.length > 0;

  return (
    <div className="relative group">
      <div
        className="rounded-xl border-2 shadow-sm cursor-pointer transition-all duration-200 min-w-[140px] max-w-[220px] overflow-hidden"
        style={{
          backgroundColor: colors.lightBg,
          borderColor: selected ? colors.border : `${colors.border}66`,
          boxShadow: selected ? `0 0 0 3px ${colors.border}33, 0 4px 12px ${colors.border}22` : '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-slate-400" />
        
        {/* Header with colored top border */}
        <div 
          className="px-3 py-2 border-b"
          style={{ 
            backgroundColor: colors.bg, 
            borderColor: `${colors.border}33`,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-bold leading-tight" style={{ color: colors.text }}>
              {data.label}
            </p>
            {data.status && (
              <span 
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
                style={{ backgroundColor: statusColors[data.status] }}
              >
                {data.status === 'success' ? 'OK' : data.status === 'error' ? 'ERR' : data.status === 'warning' ? 'WARN' : 'INFO'}
              </span>
            )}
          </div>
          {data.description && (
            <p className="text-[11px] mt-0.5 leading-tight opacity-70" style={{ color: colors.text }}>
              {data.description}
            </p>
          )}
        </div>

        {/* Metric */}
        {hasMetric && (
          <div className="px-3 py-1.5 bg-white/50">
            <p className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
              {data.metric}
            </p>
          </div>
        )}

        {/* Details list */}
        {hasDetails && (
          <div className="px-3 py-2 space-y-1">
            {data.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div 
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: colors.border }}
                />
                <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        )}

        <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-slate-400" />
      </div>

      {/* Tooltip on hover */}
      {data.description && !hasDetails && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 px-3 py-2 rounded-lg bg-slate-800 text-white text-xs whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {data.description}
        </div>
      )}
    </div>
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
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    // Toggle selection
  }, []);

  return (
    <div className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Click nodes to explore · Drag to pan · Scroll to zoom</p>
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
          <Controls className="!shadow-sm !border-stone-200 dark:!border-stone-700" />
          <MiniMap
            className="!rounded-lg !shadow-sm !border-stone-200 dark:!border-stone-700"
            nodeColor={(node) => nodeColors[(node.data as SystemNodeData)?.type]?.border || '#64748b'}
            maskColor="rgba(255,255,255,0.8)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
