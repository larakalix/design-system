import { type Node, type Edge } from '@xyflow/react';

interface SystemNodeData {
  label: string;
  description?: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'queue' | 'external' | 'default';
}

interface DiagramPreset {
  title: string;
  nodes: Node<SystemNodeData>[];
  edges: Edge[];
  height?: number;
}

export const diagramPresets: Record<string, DiagramPreset> = {
  'how-does-grpc-work': {
    title: 'gRPC Communication Flow',
    height: 350,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 100, y: 50 }, data: { label: 'Client App', type: 'client', description: 'Application making RPC calls' } },
      { id: 'stub', type: 'systemNode', position: { x: 100, y: 150 }, data: { label: 'gRPC Stub', type: 'gateway', description: 'Client-side proxy generated from .proto' } },
      { id: 'http2', type: 'systemNode', position: { x: 100, y: 250 }, data: { label: 'HTTP/2', type: 'external', description: 'Binary protocol over HTTP/2 for transport' } },
      { id: 'server', type: 'systemNode', position: { x: 400, y: 250 }, data: { label: 'HTTP/2', type: 'external', description: 'Server-side HTTP/2 connection' } },
      { id: 'service', type: 'systemNode', position: { x: 400, y: 150 }, data: { label: 'gRPC Service', type: 'service', description: 'Server implementation of the service' } },
      { id: 'handler', type: 'systemNode', position: { x: 400, y: 50 }, data: { label: 'Business Logic', type: 'service', description: 'Actual service implementation' } },
    ],
    edges: [
      { id: 'e1', source: 'client', target: 'stub', animated: true, label: 'method call' },
      { id: 'e2', source: 'stub', target: 'http2', animated: true, label: 'serialize (protobuf)' },
      { id: 'e3', source: 'http2', target: 'server', animated: true, label: 'binary stream' },
      { id: 'e4', source: 'server', target: 'service', animated: true },
      { id: 'e5', source: 'service', target: 'handler', animated: true },
    ],
  },

  'docker-vs-kubernetes-which-one-should-we-use': {
    title: 'Docker vs Kubernetes Architecture',
    height: 400,
    nodes: [
      { id: 'docker', type: 'systemNode', position: { x: 50, y: 50 }, data: { label: 'Docker', type: 'external', description: 'Container runtime - packages apps' } },
      { id: 'container', type: 'systemNode', position: { x: 50, y: 150 }, data: { label: 'Container', type: 'service', description: 'Isolated process with its own filesystem' } },
      { id: 'k8s', type: 'systemNode', position: { x: 350, y: 50 }, data: { label: 'Kubernetes', type: 'gateway', description: 'Container orchestration platform' } },
      { id: 'pod', type: 'systemNode', position: { x: 350, y: 150 }, data: { label: 'Pod', type: 'service', description: 'Smallest deployable unit, wraps containers' } },
      { id: 'deployment', type: 'systemNode', position: { x: 350, y: 250 }, data: { label: 'Deployment', type: 'service', description: 'Manages pod replicas and updates' } },
      { id: 'service-k8s', type: 'systemNode', position: { x: 350, y: 350 }, data: { label: 'Service', type: 'gateway', description: 'Exposes pods to network traffic' } },
    ],
    edges: [
      { id: 'e1', source: 'docker', target: 'container', animated: true },
      { id: 'e2', source: 'k8s', target: 'pod', animated: true },
      { id: 'e3', source: 'pod', target: 'deployment', animated: true },
      { id: 'e4', source: 'deployment', target: 'service-k8s', animated: true },
      { id: 'e5', source: 'container', target: 'pod', animated: true, label: 'runs inside', style: { strokeDasharray: '5,5' } },
    ],
  },

  'what-happens-when-you-type-google-com-into-a-browser': {
    title: 'What Happens When You Type google.com',
    height: 450,
    nodes: [
      { id: 'browser', type: 'systemNode', position: { x: 50, y: 50 }, data: { label: 'Browser', type: 'client', description: 'User enters URL' } },
      { id: 'dns', type: 'systemNode', position: { x: 50, y: 150 }, data: { label: 'DNS Lookup', type: 'external', description: 'Resolves domain to IP address' } },
      { id: 'tcp', type: 'systemNode', position: { x: 50, y: 250 }, data: { label: 'TCP Handshake', type: 'external', description: 'Establishes connection' } },
      { id: 'tls', type: 'systemNode', position: { x: 50, y: 350 }, data: { label: 'TLS/SSL', type: 'external', description: 'Encrypts the connection' } },
      { id: 'request', type: 'systemNode', position: { x: 350, y: 350 }, data: { label: 'HTTP Request', type: 'gateway', description: 'Sends GET request' } },
      { id: 'server', type: 'systemNode', position: { x: 350, y: 250 }, data: { label: 'Web Server', type: 'service', description: 'Processes the request' } },
      { id: 'response', type: 'systemNode', position: { x: 350, y: 150 }, data: { label: 'HTTP Response', type: 'gateway', description: 'Returns HTML/CSS/JS' } },
      { id: 'render', type: 'systemNode', position: { x: 350, y: 50 }, data: { label: 'Render Page', type: 'client', description: 'Browser renders the page' } },
    ],
    edges: [
      { id: 'e1', source: 'browser', target: 'dns', animated: true },
      { id: 'e2', source: 'dns', target: 'tcp', animated: true },
      { id: 'e3', source: 'tcp', target: 'tls', animated: true },
      { id: 'e4', source: 'tls', target: 'request', animated: true },
      { id: 'e5', source: 'request', target: 'server', animated: true },
      { id: 'e6', source: 'server', target: 'response', animated: true },
      { id: 'e7', source: 'response', target: 'render', animated: true },
    ],
  },

  'how-kubernetes-works': {
    title: 'Kubernetes Architecture',
    height: 450,
    nodes: [
      { id: 'kubectl', type: 'systemNode', position: { x: 200, y: 50 }, data: { label: 'kubectl', type: 'client', description: 'CLI tool to interact with cluster' } },
      { id: 'api', type: 'systemNode', position: { x: 200, y: 150 }, data: { label: 'API Server', type: 'gateway', description: 'Central management point' } },
      { id: 'etcd', type: 'systemNode', position: { x: 450, y: 150 }, data: { label: 'etcd', type: 'database', description: 'Distributed key-value store' } },
      { id: 'scheduler', type: 'systemNode', position: { x: 50, y: 250 }, data: { label: 'Scheduler', type: 'service', description: 'Assigns pods to nodes' } },
      { id: 'controller', type: 'systemNode', position: { x: 200, y: 250 }, data: { label: 'Controller', type: 'service', description: 'Maintains desired state' } },
      { id: 'kubelet', type: 'systemNode', position: { x: 350, y: 250 }, data: { label: 'Kubelet', type: 'service', description: 'Agent on each node' } },
      { id: 'pod', type: 'systemNode', position: { x: 200, y: 350 }, data: { label: 'Pod', type: 'service', description: 'Runs containers' } },
      { id: 'container', type: 'systemNode', position: { x: 200, y: 450 }, data: { label: 'Container', type: 'service', description: 'Your application' } },
    ],
    edges: [
      { id: 'e1', source: 'kubectl', target: 'api', animated: true },
      { id: 'e2', source: 'api', target: 'etcd', animated: true },
      { id: 'e3', source: 'api', target: 'scheduler', animated: true },
      { id: 'e4', source: 'api', target: 'controller', animated: true },
      { id: 'e5', source: 'api', target: 'kubelet', animated: true },
      { id: 'e6', source: 'scheduler', target: 'pod', animated: true },
      { id: 'e7', source: 'kubelet', target: 'pod', animated: true },
      { id: 'e8', source: 'pod', target: 'container', animated: true },
    ],
  },

  'how-amazon-s3-works': {
    title: 'Amazon S3 Architecture',
    height: 350,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 50, y: 100 }, data: { label: 'User/App', type: 'client', description: 'Makes API requests' } },
      { id: 'dns-s3', type: 'systemNode', position: { x: 200, y: 100 }, data: { label: 'DNS Router', type: 'gateway', description: 'Routes to nearest datacenter' } },
      { id: 'lb', type: 'systemNode', position: { x: 350, y: 100 }, data: { label: 'Load Balancer', type: 'gateway', description: 'Distributes requests' } },
      { id: 'frontend', type: 'systemNode', position: { x: 500, y: 50 }, data: { label: 'Front-end', type: 'service', description: 'Authentication & routing' } },
      { id: 'metadata', type: 'systemNode', position: { x: 500, y: 150 }, data: { label: 'Metadata Service', type: 'database', description: 'Object metadata index' } },
      { id: 'storage', type: 'systemNode', position: { x: 650, y: 100 }, data: { label: 'Storage Nodes', type: 'database', description: 'Actual object storage' } },
    ],
    edges: [
      { id: 'e1', source: 'user', target: 'dns-s3', animated: true, label: 'PUT/GET' },
      { id: 'e2', source: 'dns-s3', target: 'lb', animated: true },
      { id: 'e3', source: 'lb', target: 'frontend', animated: true },
      { id: 'e4', source: 'frontend', target: 'metadata', animated: true },
      { id: 'e5', source: 'frontend', target: 'storage', animated: true },
      { id: 'e6', source: 'metadata', target: 'storage', animated: true },
    ],
  },

  'redis-vs-memcached': {
    title: 'Redis vs Memcached Comparison',
    height: 400,
    nodes: [
      { id: 'app', type: 'systemNode', position: { x: 200, y: 50 }, data: { label: 'Application', type: 'client', description: 'Needs fast data access' } },
      { id: 'redis', type: 'systemNode', position: { x: 100, y: 200 }, data: { label: 'Redis', type: 'cache', description: 'In-memory data structure store. Supports strings, lists, sets, hashes, pub/sub, persistence' } },
      { id: 'memcached', type: 'systemNode', position: { x: 300, y: 200 }, data: { label: 'Memcached', type: 'cache', description: 'Simple key-value cache. Pure caching, no persistence, multi-threaded' } },
      { id: 'redis-features', type: 'systemNode', position: { x: 50, y: 350 }, data: { label: 'Persistence, Pub/Sub, Clustering', type: 'default', description: 'Advanced features' } },
      { id: 'memcached-features', type: 'systemNode', position: { x: 350, y: 350 }, data: { label: 'Simplicity, Multi-thread', type: 'default', description: 'Lightweight caching' } },
    ],
    edges: [
      { id: 'e1', source: 'app', target: 'redis', animated: true, label: 'option 1' },
      { id: 'e2', source: 'app', target: 'memcached', animated: true, label: 'option 2' },
      { id: 'e3', source: 'redis', target: 'redis-features', animated: true },
      { id: 'e4', source: 'memcached', target: 'memcached-features', animated: true },
    ],
  },

  'api-gateway': {
    title: 'API Gateway Pattern',
    height: 400,
    nodes: [
      { id: 'clients', type: 'systemNode', position: { x: 250, y: 50 }, data: { label: 'Clients', type: 'client', description: 'Web, Mobile, Third-party' } },
      { id: 'gateway', type: 'systemNode', position: { x: 250, y: 150 }, data: { label: 'API Gateway', type: 'gateway', description: 'Auth, Rate limiting, Routing' } },
      { id: 'svc1', type: 'systemNode', position: { x: 50, y: 280 }, data: { label: 'User Service', type: 'service', description: 'User management' } },
      { id: 'svc2', type: 'systemNode', position: { x: 200, y: 280 }, data: { label: 'Order Service', type: 'service', description: 'Order processing' } },
      { id: 'svc3', type: 'systemNode', position: { x: 350, y: 280 }, data: { label: 'Payment Service', type: 'service', description: 'Payment handling' } },
      { id: 'svc4', type: 'systemNode', position: { x: 500, y: 280 }, data: { label: 'Inventory Service', type: 'service', description: 'Stock management' } },
    ],
    edges: [
      { id: 'e1', source: 'clients', target: 'gateway', animated: true },
      { id: 'e2', source: 'gateway', target: 'svc1', animated: true },
      { id: 'e3', source: 'gateway', target: 'svc2', animated: true },
      { id: 'e4', source: 'gateway', target: 'svc3', animated: true },
      { id: 'e5', source: 'gateway', target: 'svc4', animated: true },
    ],
  },

  'load-balancer': {
    title: 'Load Balancer Architecture',
    height: 350,
    nodes: [
      { id: 'users', type: 'systemNode', position: { x: 250, y: 50 }, data: { label: 'Users', type: 'client', description: 'Incoming traffic' } },
      { id: 'lb', type: 'systemNode', position: { x: 250, y: 150 }, data: { label: 'Load Balancer', type: 'gateway', description: 'Distributes traffic (Round Robin, Least Conn, etc)' } },
      { id: 's1', type: 'systemNode', position: { x: 50, y: 280 }, data: { label: 'Server 1', type: 'service', description: 'Handles requests' } },
      { id: 's2', type: 'systemNode', position: { x: 200, y: 280 }, data: { label: 'Server 2', type: 'service', description: 'Handles requests' } },
      { id: 's3', type: 'systemNode', position: { x: 350, y: 280 }, data: { label: 'Server 3', type: 'service', description: 'Handles requests' } },
      { id: 's4', type: 'systemNode', position: { x: 500, y: 280 }, data: { label: 'Server 4', type: 'service', description: 'Handles requests' } },
    ],
    edges: [
      { id: 'e1', source: 'users', target: 'lb', animated: true },
      { id: 'e2', source: 'lb', target: 's1', animated: true },
      { id: 'e3', source: 'lb', target: 's2', animated: true },
      { id: 'e4', source: 'lb', target: 's3', animated: true },
      { id: 'e5', source: 'lb', target: 's4', animated: true },
    ],
  },

  'microservices': {
    title: 'Microservices Architecture',
    height: 450,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 400, y: 50 }, data: { label: 'Client', type: 'client', description: 'Web/Mobile app' } },
      { id: 'api-gw', type: 'systemNode', position: { x: 400, y: 150 }, data: { label: 'API Gateway', type: 'gateway', description: 'Single entry point' } },
      { id: 'user-svc', type: 'systemNode', position: { x: 50, y: 280 }, data: { label: 'User Service', type: 'service', description: 'Manages users' } },
      { id: 'order-svc', type: 'systemNode', position: { x: 200, y: 280 }, data: { label: 'Order Service', type: 'service', description: 'Manages orders' } },
      { id: 'payment-svc', type: 'systemNode', position: { x: 350, y: 280 }, data: { label: 'Payment Service', type: 'service', description: 'Processes payments' } },
      { id: 'notification-svc', type: 'systemNode', position: { x: 500, y: 280 }, data: { label: 'Notification Service', type: 'service', description: 'Sends alerts' } },
      { id: 'db', type: 'systemNode', position: { x: 650, y: 280 }, data: { label: 'Service DBs', type: 'database', description: 'Each service owns its DB' } },
      { id: 'message-q', type: 'systemNode', position: { x: 400, y: 400 }, data: { label: 'Message Queue', type: 'queue', description: 'Async communication' } },
    ],
    edges: [
      { id: 'e1', source: 'client', target: 'api-gw', animated: true },
      { id: 'e2', source: 'api-gw', target: 'user-svc', animated: true },
      { id: 'e3', source: 'api-gw', target: 'order-svc', animated: true },
      { id: 'e4', source: 'api-gw', target: 'payment-svc', animated: true },
      { id: 'e5', source: 'api-gw', target: 'notification-svc', animated: true },
      { id: 'e6', source: 'order-svc', target: 'db', animated: true },
      { id: 'e7', source: 'payment-svc', target: 'message-q', animated: true },
      { id: 'e8', source: 'message-q', target: 'notification-svc', animated: true },
    ],
  },

  'cache': {
    title: 'Caching Architecture',
    height: 350,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 50, y: 150 }, data: { label: 'Client', type: 'client', description: 'Requests data' } },
      { id: 'app', type: 'systemNode', position: { x: 200, y: 150 }, data: { label: 'Application', type: 'service', description: 'Business logic' } },
      { id: 'cache', type: 'systemNode', position: { x: 350, y: 50 }, data: { label: 'Cache (Redis)', type: 'cache', description: 'Fast in-memory store' } },
      { id: 'db', type: 'systemNode', position: { x: 350, y: 250 }, data: { label: 'Database', type: 'database', description: 'Persistent storage' } },
    ],
    edges: [
      { id: 'e1', source: 'client', target: 'app', animated: true },
      { id: 'e2', source: 'app', target: 'cache', animated: true, label: '1. Check cache' },
      { id: 'e3', source: 'app', target: 'db', animated: true, label: '2. Cache miss → DB' },
      { id: 'e4', source: 'db', target: 'cache', animated: true, label: '3. Write to cache' },
    ],
  },
};

export function getDiagramForSlug(slug: string): DiagramPreset | null {
  return diagramPresets[slug] || null;
}
