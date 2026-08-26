import { type Node, type Edge } from '@xyflow/react';

interface SystemNodeData {
  label: string;
  description?: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'queue' | 'external' | 'default';
  metric?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  details?: string[];
}

interface DiagramPreset {
  title: string;
  nodes: Node<SystemNodeData>[];
  edges: Edge[];
  height?: number;
}

export const diagramPresets: Record<string, DiagramPreset> = {
  'how-to-design-a-system-like-instagram': {
    title: 'Instagram System Design',
    height: 743,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 375, y: 27 }, data: { label: 'User', type: 'client', description: 'Mobile/Web app', metric: '2B+ users', status: 'success', details: ['iOS/Android', 'React Web'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 45, y: 27 }, data: { label: 'CDN', type: 'cache', description: 'Edge delivery', metric: '<50ms', status: 'success', details: ['CloudFront', 'Cloudflare'] } },
      { id: 'lb', type: 'systemNode', position: { x: 195, y: 189 }, data: { label: 'Load Balancer', type: 'gateway', description: 'Traffic distribution', metric: '1M+ RPS', status: 'success', details: ['NGINX', 'HAProxy'] } },
      { id: 'api', type: 'systemNode', position: { x: 495, y: 189 }, data: { label: 'API Gateway', type: 'gateway', description: 'Auth & rate limit', metric: '10K+ QPS', status: 'success', details: ['OAuth 2.0', 'Rate limiting'] } },
      { id: 'post', type: 'systemNode', position: { x: 45, y: 365 }, data: { label: 'Post Service', type: 'service', description: 'Upload photos', metric: '95M/day', status: 'success', details: ['Image resize', 'Filter apply'] } },
      { id: 'feed', type: 'systemNode', position: { x: 270, y: 365 }, data: { label: 'Feed Service', type: 'service', description: 'Generate feed', metric: 'p99 <200ms', status: 'success', details: ['Fan-out', 'Ranking'] } },
      { id: 'user-svc', type: 'systemNode', position: { x: 525, y: 365 }, data: { label: 'User Service', type: 'service', description: 'Profiles & auth', metric: '500M profiles', status: 'success', details: ['Followers', 'Auth tokens'] } },
      { id: 'postgres', type: 'systemNode', position: { x: 120, y: 567 }, data: { label: 'PostgreSQL', type: 'database', description: 'Structured data', metric: '100TB+', status: 'success', details: ['Users', 'Posts metadata'] } },
      { id: 's3', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'S3 Storage', type: 'database', description: 'Photo blobs', metric: '100B+ objects', status: 'success', details: ['Originals', 'Thumbnails'] } },
      { id: 'redis', type: 'systemNode', position: { x: 630, y: 567 }, data: { label: 'Redis', type: 'cache', description: 'Feed cache', metric: '10M+ keys', status: 'success', details: ['Hot feeds', 'Session store'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'lb', animated: true, label: 'HTTPS' },
      { id: 'e1', source: 'cdn', target: 'user', animated: true, label: 'Images' },
      { id: 'e2', source: 'lb', target: 'api', animated: true, label: 'Route' },
      { id: 'e3', source: 'api', target: 'post', animated: true, label: 'POST' },
      { id: 'e4', source: 'api', target: 'feed', animated: true, label: 'GET' },
      { id: 'e5', source: 'api', target: 'user-svc', animated: true, label: 'Auth' },
      { id: 'e6', source: 'post', target: 's3', animated: true, label: 'Store' },
      { id: 'e7', source: 'post', target: 'postgres', animated: true, label: 'Metadata' },
      { id: 'e8', source: 'feed', target: 'redis', animated: true, label: 'Cache' },
      { id: 'e9', source: 'feed', target: 'postgres', animated: true, label: 'Query' },
      { id: 'e10', source: 'user-svc', target: 'postgres', animated: true, label: 'CRUD' }
    ],
  },
  'how-netflix-built-a-distributed-counter': {
    title: 'Netflix Distributed Counter',
    height: 648,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Client', type: 'client', description: 'View/like request', metric: '1M+ events/s', status: 'success', details: ['Mobile', 'TV', 'Web'] } },
      { id: 'gateway', type: 'systemNode', position: { x: 375, y: 203 }, data: { label: 'API Gateway', type: 'gateway', description: 'Route & aggregate', metric: 'Zuul', status: 'success', details: ['Auth', 'Rate limit'] } },
      { id: 'counter1', type: 'systemNode', position: { x: 45, y: 378 }, data: { label: 'Counter Node 1', type: 'service', description: 'Shard A', metric: 'Count: 4.2M', status: 'success', details: ['Video ID hash', 'In-memory'] } },
      { id: 'counter2', type: 'systemNode', position: { x: 345, y: 378 }, data: { label: 'Counter Node 2', type: 'service', description: 'Shard B', metric: 'Count: 3.8M', status: 'success', details: ['Video ID hash', 'In-memory'] } },
      { id: 'counter3', type: 'systemNode', position: { x: 645, y: 378 }, data: { label: 'Counter Node 3', type: 'service', description: 'Shard C', metric: 'Count: 5.1M', status: 'success', details: ['Video ID hash', 'In-memory'] } },
      { id: 'cassandra', type: 'systemNode', position: { x: 195, y: 567 }, data: { label: 'Cassandra', type: 'database', description: 'Eventual consistency', metric: '3 replicas', status: 'success', details: ['Counters CF', 'Quorum'] } },
      { id: 'kafka', type: 'systemNode', position: { x: 525, y: 567 }, data: { label: 'Kafka', type: 'queue', description: 'Event stream', metric: '10 partitions', status: 'success', details: ['Async pipeline', 'Spark consumer'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'gateway', animated: true, label: 'gRPC' },
      { id: 'e1', source: 'gateway', target: 'counter1', animated: true, label: 'Shard A' },
      { id: 'e2', source: 'gateway', target: 'counter2', animated: true, label: 'Shard B' },
      { id: 'e3', source: 'gateway', target: 'counter3', animated: true, label: 'Shard C' },
      { id: 'e4', source: 'counter1', target: 'cassandra', animated: true, label: 'Persist' },
      { id: 'e5', source: 'counter2', target: 'cassandra', animated: true, label: 'Persist' },
      { id: 'e6', source: 'counter3', target: 'cassandra', animated: true, label: 'Persist' },
      { id: 'e7', source: 'counter1', target: 'kafka', animated: true, label: 'Event' },
      { id: 'e8', source: 'counter2', target: 'kafka', animated: true, label: 'Event' },
      { id: 'e9', source: 'counter3', target: 'kafka', animated: true, label: 'Event' }
    ],
  },
  'how-does-grpc-work': {
    title: 'gRPC Architecture',
    height: 567,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Client', type: 'client', description: 'Stub', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'protobuf', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Protobuf', type: 'cache', description: 'Serialize', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'http2', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'HTTP/2', type: 'gateway', description: 'Transport', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'server', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Server', type: 'service', description: 'Handler', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'unary', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Unary', type: 'service', description: 'Req/resp', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'stream', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Streaming', type: 'queue', description: 'Bidirectional', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'codegen', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Code Gen', type: 'service', description: 'Auto generate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fast', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Fast', type: 'external', description: 'Binary', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'typesafe', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Type-safe', type: 'external', description: 'Schema', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'grpc', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'gRPC', type: 'client', description: 'Modern RPC', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'protobuf', animated: true },
      { id: 'e1', source: 'protobuf', target: 'http2', animated: true },
      { id: 'e2', source: 'http2', target: 'server', animated: true },
      { id: 'e3', source: 'unary', target: 'stream', animated: true },
      { id: 'e4', source: 'stream', target: 'codegen', animated: true },
      { id: 'e5', source: 'fast', target: 'typesafe', animated: true },
      { id: 'e6', source: 'client', target: 'grpc', animated: true },
      { id: 'e7', source: 'server', target: 'grpc', animated: true },
      { id: 'e8', source: 'typesafe', target: 'grpc', animated: true }
    ],
  },
  'how-does-docker-work': {
    title: 'Docker Architecture',
    height: 540,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Docker Client', type: 'client', description: 'CLI/GUI', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'daemon', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Docker Daemon', type: 'gateway', description: 'dockerd', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'registry', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Docker Hub', type: 'external', description: 'Image registry', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'image', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'Docker Image', type: 'cache', description: 'Read-only layers', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'container', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Container', type: 'service', description: 'Running instance', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'volume', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Volume', type: 'database', description: 'Persistent storage', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'daemon', animated: true },
      { id: 'e1', source: 'daemon', target: 'registry', animated: true },
      { id: 'e2', source: 'daemon', target: 'image', animated: true },
      { id: 'e3', source: 'image', target: 'container', animated: true },
      { id: 'e4', source: 'container', target: 'volume', animated: true }
    ],
  },
  'how-does-https-work': {
    title: 'HTTPS Handshake',
    height: 608,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Client', type: 'client', description: 'Browser', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'tcp', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'TCP Handshake', type: 'gateway', description: 'SYN-SYN/ACK-ACK', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tls', type: 'systemNode', position: { x: 375, y: 216 }, data: { label: 'TLS Handshake', type: 'gateway', description: 'Key exchange', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cert', type: 'systemNode', position: { x: 675, y: 216 }, data: { label: 'Certificate', type: 'cache', description: 'X.509 verify', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'encrypt', type: 'systemNode', position: { x: 375, y: 365 }, data: { label: 'Encrypted Data', type: 'service', description: 'AES session', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'server', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Server', type: 'service', description: 'Web server', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'tcp', animated: true },
      { id: 'e1', source: 'tcp', target: 'tls', animated: true },
      { id: 'e2', source: 'tls', target: 'cert', animated: true },
      { id: 'e3', source: 'tls', target: 'encrypt', animated: true },
      { id: 'e4', source: 'client', target: 'server', animated: true }
    ],
  },
  'how-dns-works': {
    title: 'DNS Resolution Flow',
    height: 540,
    nodes: [
      { id: 'browser', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Browser', type: 'client', description: 'User query', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'resolver', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'DNS Resolver', type: 'gateway', description: 'Recursive lookup', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'root', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Root Server', type: 'external', description: '.com/.org', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'tld', type: 'systemNode', position: { x: 675, y: 216 }, data: { label: 'TLD Server', type: 'external', description: 'example.com NS', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'auth', type: 'systemNode', position: { x: 675, y: 365 }, data: { label: 'Authoritative', type: 'database', description: 'IP address', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cache', type: 'systemNode', position: { x: 375, y: 216 }, data: { label: 'DNS Cache', type: 'cache', description: 'TTL cached', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } }
    ],
    edges: [
      { id: 'e0', source: 'browser', target: 'resolver', animated: true },
      { id: 'e1', source: 'resolver', target: 'root', animated: true },
      { id: 'e2', source: 'root', target: 'tld', animated: true },
      { id: 'e3', source: 'tld', target: 'auth', animated: true },
      { id: 'e4', source: 'resolver', target: 'cache', animated: true },
      { id: 'e5', source: 'cache', target: 'browser', animated: true }
    ],
  },
  'how-apache-kafka-works': {
    title: 'Kafka Architecture',
    height: 608,
    nodes: [
      { id: 'producer', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Producer', type: 'client', description: 'Publish events', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'broker1', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Broker 1', type: 'gateway', description: 'Leader partition', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'broker2', type: 'systemNode', position: { x: 300, y: 216 }, data: { label: 'Broker 2', type: 'gateway', description: 'Replica', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'topic', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Topic', type: 'queue', description: 'Event stream', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'partition', type: 'systemNode', position: { x: 525, y: 216 }, data: { label: 'Partition', type: 'queue', description: 'Ordered log', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'consumer1', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Consumer 1', type: 'service', description: 'Group A', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'consumer2', type: 'systemNode', position: { x: 750, y: 216 }, data: { label: 'Consumer 2', type: 'service', description: 'Group B', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'zookeeper', type: 'systemNode', position: { x: 300, y: 365 }, data: { label: 'ZooKeeper', type: 'database', description: 'Coordination', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } }
    ],
    edges: [
      { id: 'e0', source: 'producer', target: 'broker1', animated: true },
      { id: 'e1', source: 'broker1', target: 'topic', animated: true },
      { id: 'e2', source: 'topic', target: 'partition', animated: true },
      { id: 'e3', source: 'partition', target: 'consumer1', animated: true },
      { id: 'e4', source: 'partition', target: 'consumer2', animated: true },
      { id: 'e5', source: 'broker1', target: 'broker2', animated: true },
      { id: 'e6', source: 'broker1', target: 'zookeeper', animated: true }
    ],
  },
  'how-rabbitmq-works': {
    title: 'RabbitMQ Message Flow',
    height: 540,
    nodes: [
      { id: 'producer', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Producer', type: 'client', description: 'Send message', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'exchange', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Exchange', type: 'gateway', description: 'Route message', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'queue1', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Queue A', type: 'queue', description: 'Buffer messages', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'queue2', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Queue B', type: 'queue', description: 'Buffer messages', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'consumer1', type: 'systemNode', position: { x: 225, y: 405 }, data: { label: 'Consumer 1', type: 'service', description: 'Process A', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'consumer2', type: 'systemNode', position: { x: 675, y: 405 }, data: { label: 'Consumer 2', type: 'service', description: 'Process B', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } }
    ],
    edges: [
      { id: 'e0', source: 'producer', target: 'exchange', animated: true },
      { id: 'e1', source: 'exchange', target: 'queue1', animated: true },
      { id: 'e2', source: 'exchange', target: 'queue2', animated: true },
      { id: 'e3', source: 'queue1', target: 'consumer1', animated: true },
      { id: 'e4', source: 'queue2', target: 'consumer2', animated: true }
    ],
  },
  'how-cqrs-works': {
    title: 'CQRS Pattern',
    height: 608,
    nodes: [
      { id: 'command', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Command', type: 'client', description: 'Write request', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'cmd-handler', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Command Handler', type: 'service', description: 'Validate & process', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'write-db', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Write DB', type: 'database', description: 'Transactional', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'event-bus', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Event Bus', type: 'queue', description: 'Domain events', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'read-model', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Read Model', type: 'cache', description: 'Optimized views', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'query', type: 'systemNode', position: { x: 75, y: 405 }, data: { label: 'Query', type: 'client', description: 'Read request', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'query-handler', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Query Handler', type: 'service', description: 'Fetch data', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } }
    ],
    edges: [
      { id: 'e0', source: 'command', target: 'cmd-handler', animated: true },
      { id: 'e1', source: 'cmd-handler', target: 'write-db', animated: true },
      { id: 'e2', source: 'write-db', target: 'event-bus', animated: true },
      { id: 'e3', source: 'event-bus', target: 'read-model', animated: true },
      { id: 'e4', source: 'query', target: 'query-handler', animated: true },
      { id: 'e5', source: 'query-handler', target: 'read-model', animated: true }
    ],
  },
  'how-large-language-models-work': {
    title: 'LLM Pipeline',
    height: 675,
    nodes: [
      { id: 'data', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Training Data', type: 'database', description: 'Web, books, code', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'tokenize', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Tokenizer', type: 'service', description: 'BPE/WordPiece', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'embed', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Embeddings', type: 'cache', description: 'Vector representation', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'pretrain', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Pre-training', type: 'gateway', description: 'Next token prediction', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'transformer', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Transformer', type: 'gateway', description: 'Attention layers', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'finetune', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Fine-tuning', type: 'service', description: 'RLHF/Instruction', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'inference', type: 'systemNode', position: { x: 675, y: 405 }, data: { label: 'Inference', type: 'external', description: 'Generate output', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'output', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Response', type: 'client', description: 'Human-readable', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'data', target: 'tokenize', animated: true },
      { id: 'e1', source: 'tokenize', target: 'embed', animated: true },
      { id: 'e2', source: 'embed', target: 'pretrain', animated: true },
      { id: 'e3', source: 'pretrain', target: 'transformer', animated: true },
      { id: 'e4', source: 'transformer', target: 'finetune', animated: true },
      { id: 'e5', source: 'finetune', target: 'inference', animated: true },
      { id: 'e6', source: 'inference', target: 'output', animated: true }
    ],
  },
  'what-is-retrieval-augmented-generation-rag': {
    title: 'RAG Architecture',
    height: 608,
    nodes: [
      { id: 'docs', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Documents', type: 'database', description: 'Knowledge base', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'chunk', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Chunking', type: 'service', description: 'Split text', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'embed', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Embedding Model', type: 'gateway', description: 'Vectorize', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'vector-db', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Vector DB', type: 'database', description: 'Pinecone/Milvus', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'query', type: 'systemNode', position: { x: 75, y: 405 }, data: { label: 'User Query', type: 'client', description: 'Question', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'retrieve', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Retriever', type: 'service', description: 'Semantic search', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'llm', type: 'systemNode', position: { x: 675, y: 405 }, data: { label: 'LLM', type: 'external', description: 'GPT/Claude', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'response', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Response', type: 'client', description: 'Answer', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'docs', target: 'chunk', animated: true },
      { id: 'e1', source: 'chunk', target: 'embed', animated: true },
      { id: 'e2', source: 'embed', target: 'vector-db', animated: true },
      { id: 'e3', source: 'query', target: 'retrieve', animated: true },
      { id: 'e4', source: 'retrieve', target: 'vector-db', animated: true },
      { id: 'e5', source: 'retrieve', target: 'llm', animated: true },
      { id: 'e6', source: 'llm', target: 'response', animated: true }
    ],
  },
  'what-is-an-ai-agent': {
    title: 'AI Agent Loop',
    height: 567,
    nodes: [
      { id: 'env', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Environment', type: 'external', description: 'World state', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'sensors', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Sensors', type: 'client', description: 'Perceive', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'agent', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'AI Agent', type: 'gateway', description: 'Reason & plan', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'memory', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Memory', type: 'database', description: 'Store context', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'tools', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Tools', type: 'service', description: 'APIs, search', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'actuators', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Actuators', type: 'service', description: 'Take action', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'output', type: 'systemNode', position: { x: 75, y: 405 }, data: { label: 'Action', type: 'external', description: 'Change world', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'env', target: 'sensors', animated: true },
      { id: 'e1', source: 'sensors', target: 'agent', animated: true },
      { id: 'e2', source: 'agent', target: 'memory', animated: true },
      { id: 'e3', source: 'agent', target: 'tools', animated: true },
      { id: 'e4', source: 'agent', target: 'actuators', animated: true },
      { id: 'e5', source: 'actuators', target: 'output', animated: true }
    ],
  },
  'how-llms-see-the-world': {
    title: 'From Text to Tokens',
    height: 540,
    nodes: [
      { id: 'text', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Text Input', type: 'client', description: '"Hello world"', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'tokenize', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Tokenizer', type: 'service', description: 'Split to tokens', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'tokens', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Tokens', type: 'cache', description: '[15496, 995]', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'embed', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Embedding', type: 'gateway', description: 'Vector space', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'transformer', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Transformer', type: 'gateway', description: 'Attention + FFN', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'logits', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Logits', type: 'service', description: 'Probability dist', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'output', type: 'systemNode', position: { x: 675, y: 405 }, data: { label: 'Output Token', type: 'client', description: 'Next word', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'text', target: 'tokenize', animated: true },
      { id: 'e1', source: 'tokenize', target: 'tokens', animated: true },
      { id: 'e2', source: 'tokens', target: 'embed', animated: true },
      { id: 'e3', source: 'embed', target: 'transformer', animated: true },
      { id: 'e4', source: 'transformer', target: 'logits', animated: true },
      { id: 'e5', source: 'logits', target: 'output', animated: true }
    ],
  },
  '12-algorithms-for-system-design-interviews': {
    title: '12 System Design Algorithms',
    height: 810,
    nodes: [
      { id: 'bloom', type: 'systemNode', position: { x: 45, y: 41 }, data: { label: 'Bloom Filter', type: 'cache', description: 'Probabilistic check', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'geohash', type: 'systemNode', position: { x: 345, y: 41 }, data: { label: 'Geohash', type: 'service', description: 'Location indexing', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'hyperloglog', type: 'systemNode', position: { x: 645, y: 41 }, data: { label: 'HyperLogLog', type: 'service', description: 'Cardinality', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'consistent', type: 'systemNode', position: { x: 45, y: 176 }, data: { label: 'Consistent Hash', type: 'gateway', description: 'Data distribution', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'merkle', type: 'systemNode', position: { x: 345, y: 176 }, data: { label: 'Merkle Tree', type: 'database', description: 'Data sync', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'raft', type: 'systemNode', position: { x: 645, y: 176 }, data: { label: 'Raft', type: 'gateway', description: 'Consensus', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'lossy', type: 'systemNode', position: { x: 45, y: 311 }, data: { label: 'Lossy Count', type: 'service', description: 'Frequency', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'count-min', type: 'systemNode', position: { x: 345, y: 311 }, data: { label: 'Count-Min Sketch', type: 'cache', description: 'Frequency est', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'skip-list', type: 'systemNode', position: { x: 645, y: 311 }, data: { label: 'Skip List', type: 'database', description: 'Fast search', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'ring', type: 'systemNode', position: { x: 45, y: 446 }, data: { label: 'Ring Buffer', type: 'queue', description: 'Circular queue', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'token-bucket', type: 'systemNode', position: { x: 345, y: 446 }, data: { label: 'Token Bucket', type: 'gateway', description: 'Rate limiting', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'leaky-bucket', type: 'systemNode', position: { x: 645, y: 446 }, data: { label: 'Leaky Bucket', type: 'gateway', description: 'Rate limiting', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } }
    ],
    edges: [
      { id: 'e0', source: 'bloom', target: 'geohash', animated: true },
      { id: 'e1', source: 'geohash', target: 'hyperloglog', animated: true },
      { id: 'e2', source: 'consistent', target: 'merkle', animated: true },
      { id: 'e3', source: 'merkle', target: 'raft', animated: true },
      { id: 'e4', source: 'lossy', target: 'count-min', animated: true },
      { id: 'e5', source: 'count-min', target: 'skip-list', animated: true },
      { id: 'e6', source: 'ring', target: 'token-bucket', animated: true },
      { id: 'e7', source: 'token-bucket', target: 'leaky-bucket', animated: true }
    ],
  },
  'top-20-system-design-concepts-you-should-know': {
    title: 'Core System Design Concepts',
    height: 878,
    nodes: [
      { id: 'lb', type: 'systemNode', position: { x: 45, y: 41 }, data: { label: 'Load Balancing', type: 'gateway', description: 'Distribute traffic', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cache', type: 'systemNode', position: { x: 345, y: 41 }, data: { label: 'Caching', type: 'cache', description: 'Speed up reads', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 645, y: 41 }, data: { label: 'CDN', type: 'external', description: 'Edge delivery', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'db', type: 'systemNode', position: { x: 45, y: 176 }, data: { label: 'Database', type: 'database', description: 'Persistence', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'nosql', type: 'systemNode', position: { x: 345, y: 176 }, data: { label: 'NoSQL', type: 'database', description: 'Flexible schema', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'sharding', type: 'systemNode', position: { x: 645, y: 176 }, data: { label: 'Sharding', type: 'gateway', description: 'Horizontal split', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'replication', type: 'systemNode', position: { x: 45, y: 311 }, data: { label: 'Replication', type: 'service', description: 'Data copies', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cap', type: 'systemNode', position: { x: 345, y: 311 }, data: { label: 'CAP Theorem', type: 'external', description: 'Consistency/Availability', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mq', type: 'systemNode', position: { x: 645, y: 311 }, data: { label: 'Message Queue', type: 'queue', description: 'Async comms', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'micro', type: 'systemNode', position: { x: 45, y: 446 }, data: { label: 'Microservices', type: 'service', description: 'Decoupled services', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'api-gw', type: 'systemNode', position: { x: 345, y: 446 }, data: { label: 'API Gateway', type: 'gateway', description: 'Entry point', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'rate-limit', type: 'systemNode', position: { x: 645, y: 446 }, data: { label: 'Rate Limiting', type: 'gateway', description: 'Throttle', metric: '10K QPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'circuit', type: 'systemNode', position: { x: 45, y: 581 }, data: { label: 'Circuit Breaker', type: 'service', description: 'Fail fast', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'id-gen', type: 'systemNode', position: { x: 345, y: 581 }, data: { label: 'ID Generation', type: 'service', description: 'Unique IDs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'search', type: 'systemNode', position: { x: 645, y: 581 }, data: { label: 'Search Index', type: 'cache', description: 'Full-text', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } }
    ],
    edges: [
      { id: 'e0', source: 'lb', target: 'cache', animated: true },
      { id: 'e1', source: 'cache', target: 'cdn', animated: true },
      { id: 'e2', source: 'db', target: 'nosql', animated: true },
      { id: 'e3', source: 'nosql', target: 'sharding', animated: true },
      { id: 'e4', source: 'replication', target: 'cap', animated: true },
      { id: 'e5', source: 'cap', target: 'mq', animated: true },
      { id: 'e6', source: 'micro', target: 'api-gw', animated: true },
      { id: 'e7', source: 'api-gw', target: 'rate-limit', animated: true },
      { id: 'e8', source: 'circuit', target: 'id-gen', animated: true },
      { id: 'e9', source: 'id-gen', target: 'search', animated: true }
    ],
  },
  'load-balancers-vs-api-gateways-vs-reverse-proxy-an': {
    title: 'LB vs API Gateway vs Reverse Proxy',
    height: 608,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Client', type: 'client', description: 'Request', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'lb', type: 'systemNode', position: { x: 75, y: 203 }, data: { label: 'Load Balancer', type: 'gateway', description: 'Distribute traffic', metric: '1M+ RPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'api-gw', type: 'systemNode', position: { x: 375, y: 203 }, data: { label: 'API Gateway', type: 'gateway', description: 'Auth, routing', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'reverse', type: 'systemNode', position: { x: 675, y: 203 }, data: { label: 'Reverse Proxy', type: 'gateway', description: 'Cache, SSL', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'server1', type: 'systemNode', position: { x: 75, y: 405 }, data: { label: 'Server A', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'server2', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Server B', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'server3', type: 'systemNode', position: { x: 675, y: 405 }, data: { label: 'Server C', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'lb', animated: true },
      { id: 'e1', source: 'client', target: 'api-gw', animated: true },
      { id: 'e2', source: 'client', target: 'reverse', animated: true },
      { id: 'e3', source: 'lb', target: 'server1', animated: true },
      { id: 'e4', source: 'api-gw', target: 'server2', animated: true },
      { id: 'e5', source: 'reverse', target: 'server3', animated: true }
    ],
  },
  'rest-api-vs-graphql': {
    title: 'REST vs GraphQL',
    height: 567,
    nodes: [
      { id: 'client-rest', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Client', type: 'client', description: 'Multiple calls', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'rest', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'REST API', type: 'gateway', description: '/users, /posts', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'over-fetch', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Over-fetching', type: 'external', description: 'Extra data', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'client-gql', type: 'systemNode', position: { x: 75, y: 378 }, data: { label: 'Client', type: 'client', description: 'Single call', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'graphql', type: 'systemNode', position: { x: 375, y: 378 }, data: { label: 'GraphQL', type: 'gateway', description: 'Query schema', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'resolver', type: 'systemNode', position: { x: 675, y: 378 }, data: { label: 'Resolver', type: 'service', description: 'Fetch data', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'exact', type: 'systemNode', position: { x: 75, y: 540 }, data: { label: 'Exact Data', type: 'external', description: 'No waste', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'client-rest', target: 'rest', animated: true },
      { id: 'e1', source: 'rest', target: 'over-fetch', animated: true },
      { id: 'e2', source: 'client-gql', target: 'graphql', animated: true },
      { id: 'e3', source: 'graphql', target: 'resolver', animated: true },
      { id: 'e4', source: 'graphql', target: 'exact', animated: true }
    ],
  },
  'redis-vs-memcached': {
    title: 'Redis vs Memcached',
    height: 608,
    nodes: [
      { id: 'app', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Application', type: 'client', description: 'Cache need', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'redis', type: 'systemNode', position: { x: 150, y: 203 }, data: { label: 'Redis', type: 'cache', description: 'Rich data types', metric: '10M+ keys', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'memcached', type: 'systemNode', position: { x: 600, y: 203 }, data: { label: 'Memcached', type: 'cache', description: 'Simple strings', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'redis-persist', type: 'systemNode', position: { x: 75, y: 378 }, data: { label: 'Persistence', type: 'database', description: 'AOF/RDB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'redis-cluster', type: 'systemNode', position: { x: 300, y: 378 }, data: { label: 'Cluster', type: 'gateway', description: 'Redis Cluster', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'memcached-scale', type: 'systemNode', position: { x: 600, y: 378 }, data: { label: 'Scale', type: 'gateway', description: 'Horizontal', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'memcached-simple', type: 'systemNode', position: { x: 825, y: 378 }, data: { label: 'Simplicity', type: 'external', description: 'Low overhead', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'app', target: 'redis', animated: true },
      { id: 'e1', source: 'app', target: 'memcached', animated: true },
      { id: 'e2', source: 'redis', target: 'redis-persist', animated: true },
      { id: 'e3', source: 'redis', target: 'redis-cluster', animated: true },
      { id: 'e4', source: 'memcached', target: 'memcached-scale', animated: true },
      { id: 'e5', source: 'memcached', target: 'memcached-simple', animated: true }
    ],
  },
  'docker-vs-kubernetes-which-one-should-we-use': {
    title: 'Docker vs Kubernetes',
    height: 608,
    nodes: [
      { id: 'app', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Application', type: 'client', description: 'Containerize', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'docker', type: 'systemNode', position: { x: 150, y: 203 }, data: { label: 'Docker', type: 'service', description: 'Single node', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dockerfile', type: 'systemNode', position: { x: 75, y: 378 }, data: { label: 'Dockerfile', type: 'cache', description: 'Build image', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'container', type: 'systemNode', position: { x: 300, y: 378 }, data: { label: 'Container', type: 'service', description: 'Run instance', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'k8s', type: 'systemNode', position: { x: 600, y: 203 }, data: { label: 'Kubernetes', type: 'gateway', description: 'Orchestrate', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'pod', type: 'systemNode', position: { x: 525, y: 378 }, data: { label: 'Pod', type: 'service', description: 'Group containers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'service-k8s', type: 'systemNode', position: { x: 750, y: 378 }, data: { label: 'Service', type: 'gateway', description: 'Expose pods', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cluster', type: 'systemNode', position: { x: 600, y: 540 }, data: { label: 'Cluster', type: 'database', description: 'Multi-node', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } }
    ],
    edges: [
      { id: 'e0', source: 'app', target: 'docker', animated: true },
      { id: 'e1', source: 'app', target: 'k8s', animated: true },
      { id: 'e2', source: 'docker', target: 'dockerfile', animated: true },
      { id: 'e3', source: 'dockerfile', target: 'container', animated: true },
      { id: 'e4', source: 'k8s', target: 'pod', animated: true },
      { id: 'e5', source: 'pod', target: 'service-k8s', animated: true },
      { id: 'e6', source: 'service-k8s', target: 'cluster', animated: true }
    ],
  },
  'database-index-types-every-developer-should-know': {
    title: 'Database Index Types',
    height: 675,
    nodes: [
      { id: 'query', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'SQL Query', type: 'client', description: 'SELECT/WHERE', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'btree', type: 'systemNode', position: { x: 75, y: 203 }, data: { label: 'B-Tree', type: 'gateway', description: 'Default, ordered', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'hash', type: 'systemNode', position: { x: 300, y: 203 }, data: { label: 'Hash', type: 'cache', description: 'Exact match', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'bitmap', type: 'systemNode', position: { x: 525, y: 203 }, data: { label: 'Bitmap', type: 'cache', description: 'Low cardinality', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'gin', type: 'systemNode', position: { x: 750, y: 203 }, data: { label: 'GIN', type: 'gateway', description: 'Full-text, JSON', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'gist', type: 'systemNode', position: { x: 75, y: 378 }, data: { label: 'GiST', type: 'gateway', description: 'Geospatial', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'brin', type: 'systemNode', position: { x: 300, y: 378 }, data: { label: 'BRIN', type: 'database', description: 'Block range', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'partial', type: 'systemNode', position: { x: 525, y: 378 }, data: { label: 'Partial', type: 'service', description: 'Filtered rows', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'composite', type: 'systemNode', position: { x: 750, y: 378 }, data: { label: 'Composite', type: 'service', description: 'Multi-column', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'table', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'Table Data', type: 'database', description: 'Heap storage', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } }
    ],
    edges: [
      { id: 'e0', source: 'query', target: 'btree', animated: true },
      { id: 'e1', source: 'query', target: 'hash', animated: true },
      { id: 'e2', source: 'query', target: 'bitmap', animated: true },
      { id: 'e3', source: 'query', target: 'gin', animated: true },
      { id: 'e4', source: 'btree', target: 'table', animated: true },
      { id: 'e5', source: 'hash', target: 'table', animated: true },
      { id: 'e6', source: 'gin', target: 'gist', animated: true },
      { id: 'e7', source: 'brin', target: 'table', animated: true },
      { id: 'e8', source: 'partial', target: 'table', animated: true },
      { id: 'e9', source: 'composite', target: 'table', animated: true }
    ],
  },
  'a-cheatsheet-on-rest-api-design-best-practices': {
    title: 'REST API Best Practices',
    height: 675,
    nodes: [
      { id: 'naming', type: 'systemNode', position: { x: 75, y: 41 }, data: { label: 'Naming', type: 'service', description: '/users not /getUsers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'version', type: 'systemNode', position: { x: 345, y: 41 }, data: { label: 'Versioning', type: 'gateway', description: '/v1/users', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'status', type: 'systemNode', position: { x: 645, y: 41 }, data: { label: 'Status Codes', type: 'cache', description: '200, 201, 404', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'pagination', type: 'systemNode', position: { x: 75, y: 203 }, data: { label: 'Pagination', type: 'service', description: 'limit, offset', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'filter', type: 'systemNode', position: { x: 345, y: 203 }, data: { label: 'Filtering', type: 'service', description: '?status=active', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'auth', type: 'systemNode', position: { x: 645, y: 203 }, data: { label: 'Authentication', type: 'gateway', description: 'OAuth2/JWT', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'rate', type: 'systemNode', position: { x: 75, y: 365 }, data: { label: 'Rate Limit', type: 'gateway', description: 'X-RateLimit', metric: '10K QPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cache', type: 'systemNode', position: { x: 345, y: 365 }, data: { label: 'Caching', type: 'cache', description: 'ETag, Cache-Control', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'hateoas', type: 'systemNode', position: { x: 645, y: 365 }, data: { label: 'HATEOAS', type: 'external', description: 'Self-discoverable', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'docs', type: 'systemNode', position: { x: 345, y: 527 }, data: { label: 'Documentation', type: 'external', description: 'OpenAPI/Swagger', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'naming', target: 'version', animated: true },
      { id: 'e1', source: 'version', target: 'status', animated: true },
      { id: 'e2', source: 'pagination', target: 'filter', animated: true },
      { id: 'e3', source: 'filter', target: 'auth', animated: true },
      { id: 'e4', source: 'rate', target: 'cache', animated: true },
      { id: 'e5', source: 'cache', target: 'hateoas', animated: true },
      { id: 'e6', source: 'status', target: 'docs', animated: true },
      { id: 'e7', source: 'hateoas', target: 'docs', animated: true }
    ],
  },
  'a-cheatsheet-on-database-performance': {
    title: 'Database Performance Tips',
    height: 675,
    nodes: [
      { id: 'index', type: 'systemNode', position: { x: 75, y: 41 }, data: { label: 'Indexing', type: 'gateway', description: 'B-Tree, cover', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'query', type: 'systemNode', position: { x: 345, y: 41 }, data: { label: 'Query Opt', type: 'service', description: 'EXPLAIN ANALYZE', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'schema', type: 'systemNode', position: { x: 645, y: 41 }, data: { label: 'Schema Design', type: 'database', description: 'Normalize/Denorm', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'connection', type: 'systemNode', position: { x: 75, y: 203 }, data: { label: 'Pooling', type: 'gateway', description: 'PgBouncer', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'partition', type: 'systemNode', position: { x: 345, y: 203 }, data: { label: 'Partitioning', type: 'gateway', description: 'Shard by date', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cache', type: 'systemNode', position: { x: 645, y: 203 }, data: { label: 'Query Cache', type: 'cache', description: 'Redis result', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'replication', type: 'systemNode', position: { x: 75, y: 365 }, data: { label: 'Replication', type: 'service', description: 'Read replicas', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'batch', type: 'systemNode', position: { x: 345, y: 365 }, data: { label: 'Batch Writes', type: 'service', description: 'Bulk INSERT', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 645, y: 365 }, data: { label: 'Monitoring', type: 'external', description: 'Slow queries', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'scale', type: 'systemNode', position: { x: 345, y: 527 }, data: { label: 'Scaling', type: 'database', description: 'Vertical/Horiz', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } }
    ],
    edges: [
      { id: 'e0', source: 'index', target: 'query', animated: true },
      { id: 'e1', source: 'query', target: 'schema', animated: true },
      { id: 'e2', source: 'connection', target: 'partition', animated: true },
      { id: 'e3', source: 'partition', target: 'cache', animated: true },
      { id: 'e4', source: 'replication', target: 'batch', animated: true },
      { id: 'e5', source: 'batch', target: 'monitor', animated: true },
      { id: 'e6', source: 'schema', target: 'scale', animated: true },
      { id: 'e7', source: 'monitor', target: 'scale', animated: true }
    ],
  },
  'tcp-vs-udp': {
    title: 'TCP vs UDP',
    height: 608,
    nodes: [
      { id: 'app', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Application', type: 'client', description: 'Send data', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'tcp', type: 'systemNode', position: { x: 150, y: 203 }, data: { label: 'TCP', type: 'gateway', description: 'Reliable', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'udp', type: 'systemNode', position: { x: 600, y: 203 }, data: { label: 'UDP', type: 'gateway', description: 'Fast', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'handshake', type: 'systemNode', position: { x: 75, y: 378 }, data: { label: '3-Way Handshake', type: 'service', description: 'SYN-ACK', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'retransmit', type: 'systemNode', position: { x: 300, y: 378 }, data: { label: 'Retransmission', type: 'service', description: 'Lost packets', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'order', type: 'systemNode', position: { x: 75, y: 513 }, data: { label: 'Ordering', type: 'cache', description: 'Sequence nums', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'no-handshake', type: 'systemNode', position: { x: 525, y: 378 }, data: { label: 'No Handshake', type: 'external', description: 'Direct send', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'fire-forget', type: 'systemNode', position: { x: 750, y: 378 }, data: { label: 'Fire & Forget', type: 'external', description: 'No ACK', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'streaming', type: 'systemNode', position: { x: 600, y: 513 }, data: { label: 'Streaming', type: 'external', description: 'Video/audio', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'app', target: 'tcp', animated: true },
      { id: 'e1', source: 'app', target: 'udp', animated: true },
      { id: 'e2', source: 'tcp', target: 'handshake', animated: true },
      { id: 'e3', source: 'handshake', target: 'retransmit', animated: true },
      { id: 'e4', source: 'retransmit', target: 'order', animated: true },
      { id: 'e5', source: 'udp', target: 'no-handshake', animated: true },
      { id: 'e6', source: 'no-handshake', target: 'fire-forget', animated: true },
      { id: 'e7', source: 'fire-forget', target: 'streaming', animated: true }
    ],
  },
  'the-life-of-a-redis-query': {
    title: 'Life of a Redis Query',
    height: 567,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Client', type: 'client', description: 'GET/SET', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'parser', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Command Parser', type: 'service', description: 'Parse RESP', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'memory', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'In-Memory', type: 'cache', description: 'RAM storage', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'aof', type: 'systemNode', position: { x: 75, y: 270 }, data: { label: 'AOF Log', type: 'database', description: 'Append-only', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'rdb', type: 'systemNode', position: { x: 375, y: 270 }, data: { label: 'RDB Snapshot', type: 'database', description: 'Periodic save', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'replica', type: 'systemNode', position: { x: 675, y: 270 }, data: { label: 'Replica', type: 'service', description: 'Sync to slave', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'response', type: 'systemNode', position: { x: 375, y: 446 }, data: { label: 'Response', type: 'client', description: 'Return result', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'parser', animated: true },
      { id: 'e1', source: 'parser', target: 'memory', animated: true },
      { id: 'e2', source: 'memory', target: 'aof', animated: true },
      { id: 'e3', source: 'memory', target: 'rdb', animated: true },
      { id: 'e4', source: 'memory', target: 'replica', animated: true },
      { id: 'e5', source: 'memory', target: 'response', animated: true }
    ],
  },
  'what-is-event-sourcing-how-is-it-different-from-no': {
    title: 'Event Sourcing vs CRUD',
    height: 675,
    nodes: [
      { id: 'crud-client', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Client', type: 'client', description: 'Update', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'crud-api', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'API', type: 'gateway', description: 'Direct update', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'crud-db', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Database', type: 'database', description: 'Current state', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'crud-loss', type: 'systemNode', position: { x: 375, y: 203 }, data: { label: 'History Lost', type: 'external', description: 'No audit trail', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'es-client', type: 'systemNode', position: { x: 75, y: 378 }, data: { label: 'Client', type: 'client', description: 'Command', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'es-cmd', type: 'systemNode', position: { x: 375, y: 378 }, data: { label: 'Command Handler', type: 'service', description: 'Validate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'es-event', type: 'systemNode', position: { x: 675, y: 378 }, data: { label: 'Event Store', type: 'database', description: 'Append-only log', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'es-projection', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'Projection', type: 'cache', description: 'Read model', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'es-audit', type: 'systemNode', position: { x: 675, y: 540 }, data: { label: 'Full History', type: 'external', description: 'Audit trail', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'crud-client', target: 'crud-api', animated: true },
      { id: 'e1', source: 'crud-api', target: 'crud-db', animated: true },
      { id: 'e2', source: 'crud-db', target: 'crud-loss', animated: true },
      { id: 'e3', source: 'es-client', target: 'es-cmd', animated: true },
      { id: 'e4', source: 'es-cmd', target: 'es-event', animated: true },
      { id: 'e5', source: 'es-event', target: 'es-projection', animated: true },
      { id: 'e6', source: 'es-event', target: 'es-audit', animated: true }
    ],
  },
  'cicd-pipeline-explained': {
    title: 'CI/CD Pipeline',
    height: 540,
    nodes: [
      { id: 'code', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Code Commit', type: 'client', description: 'Push to Git', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'build', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Build', type: 'service', description: 'Compile, package', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'test', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Test', type: 'gateway', description: 'Unit, integration', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'security', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Security Scan', type: 'gateway', description: 'SAST/DAST', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'deploy-staging', type: 'systemNode', position: { x: 300, y: 270 }, data: { label: 'Deploy Staging', type: 'service', description: 'Pre-prod', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'approve', type: 'systemNode', position: { x: 525, y: 270 }, data: { label: 'Approve', type: 'external', description: 'Manual gate', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'deploy-prod', type: 'systemNode', position: { x: 750, y: 270 }, data: { label: 'Deploy Prod', type: 'service', description: 'Production', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 525, y: 446 }, data: { label: 'Monitor', type: 'external', description: 'Observability', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'code', target: 'build', animated: true },
      { id: 'e1', source: 'build', target: 'test', animated: true },
      { id: 'e2', source: 'test', target: 'security', animated: true },
      { id: 'e3', source: 'security', target: 'deploy-staging', animated: true },
      { id: 'e4', source: 'deploy-staging', target: 'approve', animated: true },
      { id: 'e5', source: 'approve', target: 'deploy-prod', animated: true },
      { id: 'e6', source: 'deploy-prod', target: 'monitor', animated: true }
    ],
  },
  'kubernetes-explained': {
    title: 'Kubernetes Architecture',
    height: 675,
    nodes: [
      { id: 'kubectl', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'kubectl', type: 'client', description: 'CLI', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'api', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'API Server', type: 'gateway', description: 'Control plane', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'etcd', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'etcd', type: 'database', description: 'Cluster state', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'scheduler', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Scheduler', type: 'service', description: 'Assign pods', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'controller', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Controller', type: 'service', description: 'Manage state', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'kubelet', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Kubelet', type: 'service', description: 'Node agent', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'pod', type: 'systemNode', position: { x: 375, y: 419 }, data: { label: 'Pod', type: 'service', description: 'Containers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'service', type: 'systemNode', position: { x: 675, y: 419 }, data: { label: 'Service', type: 'gateway', description: 'Expose pods', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'ingress', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Ingress', type: 'gateway', description: 'HTTP routing', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } }
    ],
    edges: [
      { id: 'e0', source: 'kubectl', target: 'api', animated: true },
      { id: 'e1', source: 'api', target: 'etcd', animated: true },
      { id: 'e2', source: 'api', target: 'scheduler', animated: true },
      { id: 'e3', source: 'api', target: 'controller', animated: true },
      { id: 'e4', source: 'scheduler', target: 'kubelet', animated: true },
      { id: 'e5', source: 'kubelet', target: 'pod', animated: true },
      { id: 'e6', source: 'pod', target: 'service', animated: true },
      { id: 'e7', source: 'service', target: 'ingress', animated: true }
    ],
  },
  'session-cookie-jwt-token-sso-and-oauth-20-explaine': {
    title: 'Authentication Methods',
    height: 743,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'User', type: 'client', description: 'Login', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'session', type: 'systemNode', position: { x: 75, y: 203 }, data: { label: 'Session', type: 'cache', description: 'Server-side store', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'cookie', type: 'systemNode', position: { x: 300, y: 203 }, data: { label: 'Cookie', type: 'cache', description: 'Browser storage', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'jwt', type: 'systemNode', position: { x: 525, y: 203 }, data: { label: 'JWT', type: 'gateway', description: 'Signed token', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'token', type: 'systemNode', position: { x: 750, y: 203 }, data: { label: 'API Token', type: 'gateway', description: 'Opaque key', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'sso', type: 'systemNode', position: { x: 150, y: 378 }, data: { label: 'SSO', type: 'external', description: 'Identity provider', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'oauth', type: 'systemNode', position: { x: 450, y: 378 }, data: { label: 'OAuth 2.0', type: 'external', description: 'Authorization', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'saml', type: 'systemNode', position: { x: 750, y: 378 }, data: { label: 'SAML', type: 'external', description: 'Enterprise SSO', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mfa', type: 'systemNode', position: { x: 300, y: 540 }, data: { label: 'MFA', type: 'service', description: '2FA/OTP', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'rbac', type: 'systemNode', position: { x: 600, y: 540 }, data: { label: 'RBAC', type: 'service', description: 'Role-based', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'secure', type: 'systemNode', position: { x: 450, y: 675 }, data: { label: 'Secure App', type: 'client', description: 'Protected', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'session', animated: true },
      { id: 'e1', source: 'user', target: 'cookie', animated: true },
      { id: 'e2', source: 'user', target: 'jwt', animated: true },
      { id: 'e3', source: 'user', target: 'token', animated: true },
      { id: 'e4', source: 'session', target: 'sso', animated: true },
      { id: 'e5', source: 'jwt', target: 'oauth', animated: true },
      { id: 'e6', source: 'token', target: 'saml', animated: true },
      { id: 'e7', source: 'sso', target: 'mfa', animated: true },
      { id: 'e8', source: 'oauth', target: 'rbac', animated: true },
      { id: 'e9', source: 'mfa', target: 'secure', animated: true },
      { id: 'e10', source: 'rbac', target: 'secure', animated: true }
    ],
  },
  'explaining-json-web-token-jwt-with-simple-terms': {
    title: 'JWT Structure',
    height: 540,
    nodes: [
      { id: 'header', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Header', type: 'gateway', description: 'alg: HS256', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'payload', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Payload', type: 'service', description: 'Claims: sub, exp', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'signature', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Signature', type: 'cache', description: 'HMAC(secret)', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'base64', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'Base64Url', type: 'external', description: 'Encode', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'concat', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Concatenate', type: 'service', description: 'header.payload', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'jwt', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'JWT Token', type: 'client', description: 'xxx.yyy.zzz', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'verify', type: 'systemNode', position: { x: 675, y: 405 }, data: { label: 'Verify', type: 'gateway', description: 'Check signature', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } }
    ],
    edges: [
      { id: 'e0', source: 'header', target: 'base64', animated: true },
      { id: 'e1', source: 'payload', target: 'base64', animated: true },
      { id: 'e2', source: 'base64', target: 'concat', animated: true },
      { id: 'e3', source: 'concat', target: 'jwt', animated: true },
      { id: 'e4', source: 'signature', target: 'jwt', animated: true },
      { id: 'e5', source: 'jwt', target: 'verify', animated: true }
    ],
  },
  'a-picture-is-worth-a-thousand-words-9-best-practic': {
    title: 'Microservices Best Practices',
    height: 743,
    nodes: [
      { id: 'db-per-service', type: 'systemNode', position: { x: 75, y: 41 }, data: { label: 'DB per Service', type: 'database', description: 'Isolate data', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'api-gw', type: 'systemNode', position: { x: 345, y: 41 }, data: { label: 'API Gateway', type: 'gateway', description: 'Single entry', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'async', type: 'systemNode', position: { x: 645, y: 41 }, data: { label: 'Async Comm', type: 'queue', description: 'Event-driven', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'circuit', type: 'systemNode', position: { x: 75, y: 203 }, data: { label: 'Circuit Breaker', type: 'service', description: 'Fail fast', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'observability', type: 'systemNode', position: { x: 345, y: 203 }, data: { label: 'Observability', type: 'external', description: 'Logs, metrics', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'ci-cd', type: 'systemNode', position: { x: 645, y: 203 }, data: { label: 'CI/CD', type: 'service', description: 'Deploy fast', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'container', type: 'systemNode', position: { x: 75, y: 365 }, data: { label: 'Containers', type: 'service', description: 'Docker/K8s', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'version', type: 'systemNode', position: { x: 345, y: 365 }, data: { label: 'Versioning', type: 'gateway', description: 'Backward compat', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'security', type: 'systemNode', position: { x: 645, y: 365 }, data: { label: 'Security', type: 'gateway', description: 'Zero trust', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'decentralize', type: 'systemNode', position: { x: 345, y: 527 }, data: { label: 'Decentralize', type: 'external', description: 'Autonomous teams', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'db-per-service', target: 'api-gw', animated: true },
      { id: 'e1', source: 'api-gw', target: 'async', animated: true },
      { id: 'e2', source: 'circuit', target: 'observability', animated: true },
      { id: 'e3', source: 'observability', target: 'ci-cd', animated: true },
      { id: 'e4', source: 'container', target: 'version', animated: true },
      { id: 'e5', source: 'version', target: 'security', animated: true },
      { id: 'e6', source: 'async', target: 'decentralize', animated: true },
      { id: 'e7', source: 'security', target: 'decentralize', animated: true }
    ],
  },
  'the-9-algorithms-that-dominate-our-world': {
    title: 'The 9 Algorithms That Dominate Our World',
    height: 743,
    nodes: [
      { id: 'sorting', type: 'systemNode', position: { x: 45, y: 41 }, data: { label: 'Sorting', type: 'service', description: 'QuickSort, MergeSort', metric: 'O(n log n)', status: 'success', details: ['Search engines', 'Databases'] } },
      { id: 'dijkstra', type: 'systemNode', position: { x: 345, y: 41 }, data: { label: "Dijkstra's", type: 'gateway', description: 'Shortest path', metric: 'O(V²)', status: 'success', details: ['GPS', 'Networks'] } },
      { id: 'transformers', type: 'systemNode', position: { x: 645, y: 41 }, data: { label: 'Transformers', type: 'external', description: 'Attention mechanism', metric: 'O(n²)', status: 'success', details: ['ChatGPT', 'BERT'] } },
      { id: 'link-analysis', type: 'systemNode', position: { x: 45, y: 216 }, data: { label: 'Link Analysis', type: 'service', description: 'PageRank', metric: 'O(n)', status: 'success', details: ['Google Search', 'Social graphs'] } },
      { id: 'rsa', type: 'systemNode', position: { x: 345, y: 216 }, data: { label: 'RSA', type: 'cache', description: 'Public-key crypto', metric: '2048-bit', status: 'success', details: ['HTTPS', 'SSH'] } },
      { id: 'factorization', type: 'systemNode', position: { x: 645, y: 216 }, data: { label: 'Integer Factorization', type: 'database', description: 'Prime factors', metric: 'Hard problem', status: 'info', details: ['Cryptography', 'Security'] } },
      { id: 'cnn', type: 'systemNode', position: { x: 45, y: 392 }, data: { label: 'CNN', type: 'external', description: 'Convolution', metric: 'O(n²)', status: 'success', details: ['Image rec', 'Vision'] } },
      { id: 'huffman', type: 'systemNode', position: { x: 345, y: 392 }, data: { label: 'Huffman Coding', type: 'queue', description: 'Compression', metric: 'Optimal', status: 'success', details: ['ZIP', 'JPEG'] } },
      { id: 'sha', type: 'systemNode', position: { x: 645, y: 392 }, data: { label: 'SHA', type: 'client', description: 'Hash function', metric: '256-bit', status: 'success', details: ['Blockchain', 'Integrity'] } }
    ],
    edges: [
      { id: 'e0', source: 'sorting', target: 'link-analysis', animated: true },
      { id: 'e1', source: 'dijkstra', target: 'rsa', animated: true },
      { id: 'e2', source: 'transformers', target: 'factorization', animated: true },
      { id: 'e3', source: 'link-analysis', target: 'cnn', animated: true },
      { id: 'e4', source: 'rsa', target: 'huffman', animated: true },
      { id: 'e5', source: 'factorization', target: 'sha', animated: true },
    ],
  },
  'a-crash-course-on-architectural-scalability': {
    title: 'Scalability Strategies',
    height: 540,
    nodes: [
      { id: 'vertical', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'Vertical Scaling', type: 'service', description: 'Bigger machine', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'horizontal', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Horizontal Scaling', type: 'gateway', description: 'More machines', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'bottleneck1', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'CPU', type: 'external', description: 'Upgrade cores', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'bottleneck2', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Memory', type: 'external', description: 'Add RAM', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'bottleneck3', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Disk', type: 'external', description: 'SSD/Sharding', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'bottleneck4', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Network', type: 'external', description: 'Bandwidth/CDN', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'auto', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Auto-scaling', type: 'gateway', description: 'Dynamic adjust', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } }
    ],
    edges: [
      { id: 'e0', source: 'vertical', target: 'bottleneck1', animated: true },
      { id: 'e1', source: 'vertical', target: 'bottleneck2', animated: true },
      { id: 'e2', source: 'horizontal', target: 'bottleneck3', animated: true },
      { id: 'e3', source: 'horizontal', target: 'bottleneck4', animated: true },
      { id: 'e4', source: 'bottleneck1', target: 'auto', animated: true },
      { id: 'e5', source: 'bottleneck3', target: 'auto', animated: true }
    ],
  },
  '0-to-15-billion-guests-airbnbs-architectural-evolu': {
    title: 'Airbnb Architectural Evolution',
    height: 540,
    nodes: [
      { id: 'monolith', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Monolith (Rails)', type: 'service', description: 'Single app', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'services', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Microservices', type: 'gateway', description: 'Split by domain', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'data', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Data Platform', type: 'database', description: 'Airflow/Spark', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'api', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'API Layer', type: 'gateway', description: 'GraphQL', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'ml', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'ML Platform', type: 'external', description: 'Recommendations', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'global', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Global Scale', type: 'external', description: '200+ countries', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'monolith', target: 'services', animated: true },
      { id: 'e1', source: 'services', target: 'api', animated: true },
      { id: 'e2', source: 'services', target: 'data', animated: true },
      { id: 'e3', source: 'api', target: 'ml', animated: true },
      { id: 'e4', source: 'data', target: 'ml', animated: true },
      { id: 'e5', source: 'ml', target: 'global', animated: true }
    ],
  },
  '24-good-resources-to-learn-software-architecture-i': {
    title: 'Software Architecture Learning Path',
    height: 608,
    nodes: [
      { id: 'books', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Books', type: 'database', description: 'DDIA, Clean Arch', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'blogs', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Tech Blogs', type: 'external', description: 'Netflix, Uber', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'youtube', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'YouTube', type: 'external', description: 'ByteByteGo', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'practice', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Practice', type: 'service', description: 'Build systems', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fundamentals', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'Fundamentals', type: 'gateway', description: 'HTTP, DB, OS', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'patterns', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Patterns', type: 'gateway', description: 'Microservices, CQRS', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tools', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Tools', type: 'service', description: 'K8s, Kafka', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'expert', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'Expert', type: 'client', description: 'Design at scale', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'books', target: 'fundamentals', animated: true },
      { id: 'e1', source: 'blogs', target: 'fundamentals', animated: true },
      { id: 'e2', source: 'youtube', target: 'patterns', animated: true },
      { id: 'e3', source: 'practice', target: 'patterns', animated: true },
      { id: 'e4', source: 'fundamentals', target: 'tools', animated: true },
      { id: 'e5', source: 'patterns', target: 'tools', animated: true },
      { id: 'e6', source: 'tools', target: 'expert', animated: true }
    ],
  },
  'the-shopify-tech-stack': {
    title: 'Shopify Tech Stack',
    height: 608,
    nodes: [
      { id: 'storefront', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Storefront', type: 'client', description: 'Liquid/Rails', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'api', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'GraphQL API', type: 'gateway', description: 'Unified API', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'backend', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Rails Monolith', type: 'service', description: 'Core commerce', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'mysql', type: 'systemNode', position: { x: 150, y: 243 }, data: { label: 'MySQL', type: 'database', description: 'Primary DB', metric: '50TB+', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'redis', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Redis', type: 'cache', description: 'Session/cache', metric: '10M+ keys', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'kafka', type: 'systemNode', position: { x: 600, y: 243 }, data: { label: 'Kafka', type: 'queue', description: 'Events', metric: '10 partitions', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'search', type: 'systemNode', position: { x: 225, y: 405 }, data: { label: 'Elasticsearch', type: 'cache', description: 'Product search', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'payments', type: 'systemNode', position: { x: 525, y: 405 }, data: { label: 'Payments', type: 'external', description: 'Stripe/PayPal', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'scale', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'Scale', type: 'external', description: '4M+ merchants', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'storefront', target: 'api', animated: true },
      { id: 'e1', source: 'api', target: 'backend', animated: true },
      { id: 'e2', source: 'backend', target: 'mysql', animated: true },
      { id: 'e3', source: 'backend', target: 'redis', animated: true },
      { id: 'e4', source: 'backend', target: 'kafka', animated: true },
      { id: 'e5', source: 'kafka', target: 'search', animated: true },
      { id: 'e6', source: 'backend', target: 'payments', animated: true },
      { id: 'e7', source: 'payments', target: 'scale', animated: true }
    ],
  },
  'how-amazon-s3-works': {
    title: 'Amazon S3 Architecture',
    height: 648,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'User', type: 'client', description: 'Upload/download', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'dns', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'DNS', type: 'gateway', description: 'Route53', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'lb', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Load Balancer', type: 'gateway', description: 'Distribute', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'api', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'S3 API', type: 'gateway', description: 'REST/SOAP', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'auth', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Auth', type: 'gateway', description: 'IAM/ACL', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'metadata', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Metadata', type: 'database', description: 'Index', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'storage', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Object Store', type: 'database', description: 'Durability', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'replica', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Replica', type: 'database', description: '3 copies', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'dns', animated: true },
      { id: 'e1', source: 'dns', target: 'lb', animated: true },
      { id: 'e2', source: 'lb', target: 'api', animated: true },
      { id: 'e3', source: 'api', target: 'auth', animated: true },
      { id: 'e4', source: 'auth', target: 'metadata', animated: true },
      { id: 'e5', source: 'metadata', target: 'storage', animated: true },
      { id: 'e6', source: 'storage', target: 'replica', animated: true }
    ],
  },
  'everyone-talks-about-transformers-how-transformers': {
    title: 'Transformer Architecture',
    height: 675,
    nodes: [
      { id: 'input', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Input', type: 'client', description: 'Tokenized text', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'embed', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Embedding', type: 'service', description: 'Positional encoding', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'encoder', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Encoder', type: 'gateway', description: 'Self-attention xN', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'decoder', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Decoder', type: 'gateway', description: 'Masked attention xN', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'attention', type: 'systemNode', position: { x: 300, y: 378 }, data: { label: 'Multi-Head Attention', type: 'external', description: 'Q, K, V', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'ffn', type: 'systemNode', position: { x: 600, y: 378 }, data: { label: 'Feed Forward', type: 'service', description: 'Dense layers', metric: 'p99 <200ms', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'output', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'Output', type: 'client', description: 'Logits + Softmax', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'input', target: 'embed', animated: true },
      { id: 'e1', source: 'embed', target: 'encoder', animated: true },
      { id: 'e2', source: 'embed', target: 'decoder', animated: true },
      { id: 'e3', source: 'encoder', target: 'attention', animated: true },
      { id: 'e4', source: 'decoder', target: 'attention', animated: true },
      { id: 'e5', source: 'attention', target: 'ffn', animated: true },
      { id: 'e6', source: 'ffn', target: 'output', animated: true }
    ],
  },
  'the-system-design-topic-map': {
    title: 'System Design Topic Map',
    height: 810,
    nodes: [
      { id: 'requirements', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Requirements', type: 'client', description: 'Functional/Non-functional', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'api', type: 'systemNode', position: { x: 75, y: 176 }, data: { label: 'API Design', type: 'gateway', description: 'REST/GraphQL', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'data', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Data Model', type: 'database', description: 'Schema design', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'scale', type: 'systemNode', position: { x: 675, y: 176 }, data: { label: 'Scalability', type: 'gateway', description: 'Horizontal/Vertical', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'db', type: 'systemNode', position: { x: 75, y: 338 }, data: { label: 'Database', type: 'database', description: 'SQL/NoSQL', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cache', type: 'systemNode', position: { x: 300, y: 338 }, data: { label: 'Caching', type: 'cache', description: 'Redis/CDN', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'mq', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'Message Queue', type: 'queue', description: 'Kafka/RabbitMQ', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'lb', type: 'systemNode', position: { x: 750, y: 338 }, data: { label: 'Load Balancer', type: 'gateway', description: 'Distribute traffic', metric: '1M+ RPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'micro', type: 'systemNode', position: { x: 150, y: 500 }, data: { label: 'Microservices', type: 'service', description: 'Service boundaries', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'obs', type: 'systemNode', position: { x: 375, y: 500 }, data: { label: 'Observability', type: 'external', description: 'Logs/metrics', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'security', type: 'systemNode', position: { x: 600, y: 500 }, data: { label: 'Security', type: 'gateway', description: 'Auth/encrypt', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 375, y: 662 }, data: { label: 'Deployment', type: 'service', description: 'CI/CD', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } }
    ],
    edges: [
      { id: 'e0', source: 'requirements', target: 'api', animated: true },
      { id: 'e1', source: 'requirements', target: 'data', animated: true },
      { id: 'e2', source: 'requirements', target: 'scale', animated: true },
      { id: 'e3', source: 'api', target: 'db', animated: true },
      { id: 'e4', source: 'api', target: 'cache', animated: true },
      { id: 'e5', source: 'data', target: 'mq', animated: true },
      { id: 'e6', source: 'scale', target: 'lb', animated: true },
      { id: 'e7', source: 'db', target: 'micro', animated: true },
      { id: 'e8', source: 'cache', target: 'obs', animated: true },
      { id: 'e9', source: 'mq', target: 'security', animated: true },
      { id: 'e10', source: 'lb', target: 'deploy', animated: true }
    ],
  },
  'how-transformers-architecture-works': {
    title: 'Transformer Flow',
    height: 675,
    nodes: [
      { id: 'token', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Tokens', type: 'client', description: 'Hello world', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'embed', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Embeddings', type: 'service', description: '512-dim vectors', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'self-attn', type: 'systemNode', position: { x: 150, y: 311 }, data: { label: 'Self-Attention', type: 'gateway', description: 'Q × K^T × V', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'add-norm1', type: 'systemNode', position: { x: 375, y: 311 }, data: { label: 'Add & Norm', type: 'service', description: 'Residual + LayerNorm', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ffn', type: 'systemNode', position: { x: 600, y: 311 }, data: { label: 'FFN', type: 'service', description: 'ReLU(GELU)', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'add-norm2', type: 'systemNode', position: { x: 375, y: 446 }, data: { label: 'Add & Norm', type: 'service', description: 'Residual + LayerNorm', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'stack', type: 'systemNode', position: { x: 150, y: 446 }, data: { label: '×6 or ×12', type: 'external', description: 'Stack layers', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'output', type: 'systemNode', position: { x: 375, y: 581 }, data: { label: 'Output', type: 'client', description: 'Next token prob', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'token', target: 'embed', animated: true },
      { id: 'e1', source: 'embed', target: 'self-attn', animated: true },
      { id: 'e2', source: 'self-attn', target: 'add-norm1', animated: true },
      { id: 'e3', source: 'add-norm1', target: 'ffn', animated: true },
      { id: 'e4', source: 'ffn', target: 'add-norm2', animated: true },
      { id: 'e5', source: 'add-norm2', target: 'stack', animated: true },
      { id: 'e6', source: 'stack', target: 'output', animated: true }
    ],
  },
  'amazon-key-architecture-with-third-party-integrati': {
    title: 'Amazon Key Architecture',
    height: 567,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'User', type: 'client', description: 'Order', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'amazon', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Amazon', type: 'gateway', description: 'Key service', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'carrier', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Carrier', type: 'service', description: 'Delivery', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'smart-lock', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'Smart Lock', type: 'external', description: 'IoT device', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'camera', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Cloud Cam', type: 'external', description: 'Monitor', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'auth', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Authorization', type: 'gateway', description: 'Temporary key', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'verify', type: 'systemNode', position: { x: 375, y: 419 }, data: { label: 'Verification', type: 'service', description: 'Identity', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deliver', type: 'systemNode', position: { x: 675, y: 419 }, data: { label: 'Deliver', type: 'client', description: 'In-home', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'amazon', animated: true },
      { id: 'e1', source: 'amazon', target: 'carrier', animated: true },
      { id: 'e2', source: 'carrier', target: 'smart-lock', animated: true },
      { id: 'e3', source: 'carrier', target: 'camera', animated: true },
      { id: 'e4', source: 'amazon', target: 'auth', animated: true },
      { id: 'e5', source: 'auth', target: 'verify', animated: true },
      { id: 'e6', source: 'verify', target: 'deliver', animated: true }
    ],
  },
  'how-data-lake-architecture-works': {
    title: 'Data Lake Architecture',
    height: 608,
    nodes: [
      { id: 'sources', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Data Sources', type: 'client', description: 'Apps, logs, IoT', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'ingest', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Ingestion', type: 'gateway', description: 'Batch + Stream', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'raw', type: 'systemNode', position: { x: 150, y: 338 }, data: { label: 'Raw Zone', type: 'database', description: 'Structured/Unstructured', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'curated', type: 'systemNode', position: { x: 375, y: 338 }, data: { label: 'Curated Zone', type: 'database', description: 'Cleaned data', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'consumption', type: 'systemNode', position: { x: 600, y: 338 }, data: { label: 'Consumption', type: 'database', description: 'Aggregated', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'analytics', type: 'systemNode', position: { x: 225, y: 500 }, data: { label: 'Analytics', type: 'service', description: 'BI/ML/SQL', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'governance', type: 'systemNode', position: { x: 525, y: 500 }, data: { label: 'Governance', type: 'external', description: 'Security/Quality', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'sources', target: 'ingest', animated: true },
      { id: 'e1', source: 'ingest', target: 'raw', animated: true },
      { id: 'e2', source: 'raw', target: 'curated', animated: true },
      { id: 'e3', source: 'curated', target: 'consumption', animated: true },
      { id: 'e4', source: 'consumption', target: 'analytics', animated: true },
      { id: 'e5', source: 'consumption', target: 'governance', animated: true }
    ],
  },
  'how-netflix-built-a-distributed-counter-2': {
    title: 'Netflix Distributed Counter v2',
    height: 567,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Client', type: 'client', description: 'View/like', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'gateway', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'API Gateway', type: 'gateway', description: 'Route', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'counter', type: 'systemNode', position: { x: 75, y: 311 }, data: { label: 'Counter Service', type: 'service', description: 'Aggregate', metric: 'Count: active', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cassandra', type: 'systemNode', position: { x: 375, y: 311 }, data: { label: 'Cassandra', type: 'database', description: 'Counters CF', metric: '3 replicas', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'kafka', type: 'systemNode', position: { x: 675, y: 311 }, data: { label: 'Kafka', type: 'queue', description: 'Events', metric: '10 partitions', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'spark', type: 'systemNode', position: { x: 225, y: 446 }, data: { label: 'Spark', type: 'service', description: 'Batch aggregate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'redis', type: 'systemNode', position: { x: 525, y: 446 }, data: { label: 'Redis', type: 'cache', description: 'Real-time', metric: '10M+ keys', status: 'success', details: ['TTL', 'Eviction'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'gateway', animated: true },
      { id: 'e1', source: 'gateway', target: 'counter', animated: true },
      { id: 'e2', source: 'counter', target: 'cassandra', animated: true },
      { id: 'e3', source: 'counter', target: 'kafka', animated: true },
      { id: 'e4', source: 'kafka', target: 'spark', animated: true },
      { id: 'e5', source: 'spark', target: 'redis', animated: true },
      { id: 'e6', source: 'counter', target: 'redis', animated: true }
    ],
  },
  'shopify-tech-stacks-and-tools': {
    title: 'Shopify Tech Stack',
    height: 608,
    nodes: [
      { id: 'rails', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Rails', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'mysql', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'MySQL', type: 'database', description: 'Database', metric: '50TB+', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'redis', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Redis', type: 'cache', description: 'Cache', metric: '10M+ keys', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'kafka', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Kafka', type: 'queue', description: 'Events', metric: '10 partitions', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'react', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'React', type: 'external', description: 'Frontend', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'graphql', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'GraphQL', type: 'gateway', description: 'API', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'search', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Elasticsearch', type: 'cache', description: 'Search', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'liquid', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Liquid', type: 'service', description: 'Templating', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'shopify', type: 'systemNode', position: { x: 488, y: 419 }, data: { label: 'Shopify', type: 'client', description: 'Stack', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'rails', target: 'mysql', animated: true },
      { id: 'e1', source: 'mysql', target: 'redis', animated: true },
      { id: 'e2', source: 'redis', target: 'kafka', animated: true },
      { id: 'e3', source: 'react', target: 'graphql', animated: true },
      { id: 'e4', source: 'graphql', target: 'search', animated: true },
      { id: 'e5', source: 'search', target: 'liquid', animated: true },
      { id: 'e6', source: 'liquid', target: 'shopify', animated: true },
      { id: 'e7', source: 'kafka', target: 'shopify', animated: true }
    ],
  },
  '24-good-resources-to-learn-software-architecture-i-2': {
    title: 'Software Architecture Resources',
    height: 567,
    nodes: [
      { id: 'books', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Books', type: 'database', description: 'DDIA, Clean Arch', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'blogs', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Blogs', type: 'external', description: 'Netflix, Uber', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'youtube', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'YouTube', type: 'external', description: 'ByteByteGo', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'practice', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Practice', type: 'service', description: 'Build', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fundamentals', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Fundamentals', type: 'gateway', description: 'HTTP, DB', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'patterns', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Patterns', type: 'gateway', description: 'Microservices', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tools', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Tools', type: 'service', description: 'K8s', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'expert', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Expert', type: 'client', description: 'Architect', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'books', target: 'fundamentals', animated: true },
      { id: 'e1', source: 'blogs', target: 'fundamentals', animated: true },
      { id: 'e2', source: 'youtube', target: 'patterns', animated: true },
      { id: 'e3', source: 'practice', target: 'patterns', animated: true },
      { id: 'e4', source: 'fundamentals', target: 'tools', animated: true },
      { id: 'e5', source: 'patterns', target: 'tools', animated: true },
      { id: 'e6', source: 'tools', target: 'expert', animated: true }
    ],
  },
  'how-can-cache-systems-go-wrong': {
    title: 'Cache Problems & Solutions',
    height: 675,
    nodes: [
      { id: 'problem1', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Thunder Herd', type: 'external', description: 'Concurrent misses', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'problem2', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Cache Penetration', type: 'external', description: 'Invalid keys', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'problem3', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Cache Breakdown', type: 'external', description: 'Hot key expires', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'problem4', type: 'systemNode', position: { x: 75, y: 203 }, data: { label: 'Cache Avalanche', type: 'external', description: 'Mass expiration', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'sol1', type: 'systemNode', position: { x: 75, y: 378 }, data: { label: 'Mutex/Lock', type: 'gateway', description: 'Single rebuild', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'sol2', type: 'systemNode', position: { x: 375, y: 378 }, data: { label: 'Bloom Filter', type: 'cache', description: 'Block invalid', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'sol3', type: 'systemNode', position: { x: 675, y: 378 }, data: { label: 'Never Expire', type: 'cache', description: 'Async refresh', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'sol4', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'Random TTL', type: 'service', description: 'Stagger expiry', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cache', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Cache Layer', type: 'cache', description: 'Redis', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } }
    ],
    edges: [
      { id: 'e0', source: 'problem1', target: 'sol1', animated: true },
      { id: 'e1', source: 'problem2', target: 'sol2', animated: true },
      { id: 'e2', source: 'problem3', target: 'sol3', animated: true },
      { id: 'e3', source: 'problem4', target: 'sol4', animated: true },
      { id: 'e4', source: 'problem1', target: 'cache', animated: true },
      { id: 'e5', source: 'problem2', target: 'cache', animated: true },
      { id: 'e6', source: 'problem3', target: 'cache', animated: true },
      { id: 'e7', source: 'problem4', target: 'cache', animated: true }
    ],
  },
  '8-system-design-concepts-explained-in-1-diagram': {
    title: '8 System Design Concepts',
    height: 675,
    nodes: [
      { id: 'availability', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Availability', type: 'gateway', description: 'Uptime 99.99%', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'reliability', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Reliability', type: 'service', description: 'Fault tolerant', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'efficiency', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Efficiency', type: 'cache', description: 'Low latency', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'scalability', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Scalability', type: 'gateway', description: 'Handle growth', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'maintainability', type: 'systemNode', position: { x: 150, y: 243 }, data: { label: 'Maintainability', type: 'service', description: 'Easy to update', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'security', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Security', type: 'gateway', description: 'Protect data', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'observability', type: 'systemNode', position: { x: 600, y: 243 }, data: { label: 'Observability', type: 'external', description: 'Monitor/debug', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'usability', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Usability', type: 'client', description: 'User friendly', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'availability', target: 'reliability', animated: true },
      { id: 'e1', source: 'reliability', target: 'efficiency', animated: true },
      { id: 'e2', source: 'efficiency', target: 'scalability', animated: true },
      { id: 'e3', source: 'maintainability', target: 'security', animated: true },
      { id: 'e4', source: 'security', target: 'observability', animated: true },
      { id: 'e5', source: 'scalability', target: 'usability', animated: true },
      { id: 'e6', source: 'observability', target: 'usability', animated: true }
    ],
  },
  'the-evolution-of-scaling-at-netflix': {
    title: 'Netflix Scaling Evolution',
    height: 540,
    nodes: [
      { id: 'v1', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Monolith', type: 'service', description: 'Single app', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'v2', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Microservices', type: 'gateway', description: 'Service split', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'v3', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Cloud Native', type: 'external', description: 'AWS migration', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'db1', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Oracle', type: 'database', description: 'Single DB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'db2', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Cassandra', type: 'database', description: 'Distributed', metric: '3 replicas', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Open Connect', type: 'cache', description: 'Custom CDN', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'global', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Global Scale', type: 'client', description: '230M+ users', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'v1', target: 'v2', animated: true },
      { id: 'e1', source: 'v2', target: 'v3', animated: true },
      { id: 'e2', source: 'v1', target: 'db1', animated: true },
      { id: 'e3', source: 'v2', target: 'db2', animated: true },
      { id: 'e4', source: 'v3', target: 'cdn', animated: true },
      { id: 'e5', source: 'db2', target: 'global', animated: true },
      { id: 'e6', source: 'cdn', target: 'global', animated: true }
    ],
  },
  'how-clean-architecture-works': {
    title: 'Clean Architecture Layers',
    height: 608,
    nodes: [
      { id: 'entities', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Entities', type: 'database', description: 'Business logic', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'usecases', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Use Cases', type: 'service', description: 'Application', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'interface', type: 'systemNode', position: { x: 375, y: 311 }, data: { label: 'Interface Adapters', type: 'gateway', description: 'Controllers', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'framework', type: 'systemNode', position: { x: 375, y: 446 }, data: { label: 'Frameworks', type: 'external', description: 'UI, DB', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'dependency', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Dependency Rule', type: 'gateway', description: 'Inward only', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'testable', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Testable', type: 'service', description: 'No UI needed', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'independent', type: 'systemNode', position: { x: 675, y: 378 }, data: { label: 'Independent', type: 'service', description: 'No framework', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'clean', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Clean', type: 'client', description: 'Architecture', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'entities', target: 'usecases', animated: true },
      { id: 'e1', source: 'usecases', target: 'interface', animated: true },
      { id: 'e2', source: 'interface', target: 'framework', animated: true },
      { id: 'e3', source: 'dependency', target: 'testable', animated: true },
      { id: 'e4', source: 'testable', target: 'independent', animated: true },
      { id: 'e5', source: 'entities', target: 'clean', animated: true },
      { id: 'e6', source: 'framework', target: 'clean', animated: true }
    ],
  },
  'where-do-we-cache-data': {
    title: 'Caching Layers',
    height: 608,
    nodes: [
      { id: 'browser', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Browser Cache', type: 'client', description: 'HTTP cache', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'CDN', type: 'cache', description: 'Edge cache', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'app', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Application Cache', type: 'service', description: 'In-memory', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'redis', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'Redis', type: 'cache', description: 'Distributed cache', metric: '10M+ keys', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'db', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Database Cache', type: 'database', description: 'Buffer pool', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'disk', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Disk Cache', type: 'database', description: 'OS page cache', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'user', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'User', type: 'client', description: 'Request', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'browser', animated: true },
      { id: 'e1', source: 'browser', target: 'cdn', animated: true },
      { id: 'e2', source: 'cdn', target: 'app', animated: true },
      { id: 'e3', source: 'app', target: 'redis', animated: true },
      { id: 'e4', source: 'redis', target: 'db', animated: true },
      { id: 'e5', source: 'db', target: 'disk', animated: true }
    ],
  },
  'apache-kafka-explained-at-the-high-level': {
    title: 'Kafka High-Level Architecture',
    height: 540,
    nodes: [
      { id: 'producer', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Producer', type: 'client', description: 'Publish events', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'cluster', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Kafka Cluster', type: 'gateway', description: 'Brokers', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'consumer', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Consumer', type: 'service', description: 'Subscribe', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'topic', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'Topic', type: 'queue', description: 'Event stream', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'partition', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Partition', type: 'queue', description: 'Parallelism', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'offset', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Offset', type: 'database', description: 'Track position', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } }
    ],
    edges: [
      { id: 'e0', source: 'producer', target: 'cluster', animated: true },
      { id: 'e1', source: 'cluster', target: 'topic', animated: true },
      { id: 'e2', source: 'topic', target: 'partition', animated: true },
      { id: 'e3', source: 'partition', target: 'consumer', animated: true },
      { id: 'e4', source: 'consumer', target: 'offset', animated: true }
    ],
  },
  '24-good-resources-to-learn-software-architecture-i-3': {
    title: 'Software Architecture Resources v3',
    height: 567,
    nodes: [
      { id: 'books', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Books', type: 'database', description: 'DDIA, Clean Arch', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'blogs', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Blogs', type: 'external', description: 'Netflix, Uber', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'youtube', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'YouTube', type: 'external', description: 'ByteByteGo', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'practice', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Practice', type: 'service', description: 'Build', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fundamentals', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Fundamentals', type: 'gateway', description: 'HTTP, DB', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'patterns', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Patterns', type: 'gateway', description: 'Microservices', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tools', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Tools', type: 'service', description: 'K8s', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'expert', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Expert', type: 'client', description: 'Architect', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'books', target: 'fundamentals', animated: true },
      { id: 'e1', source: 'blogs', target: 'fundamentals', animated: true },
      { id: 'e2', source: 'youtube', target: 'patterns', animated: true },
      { id: 'e3', source: 'practice', target: 'patterns', animated: true },
      { id: 'e4', source: 'fundamentals', target: 'tools', animated: true },
      { id: 'e5', source: 'patterns', target: 'tools', animated: true },
      { id: 'e6', source: 'tools', target: 'expert', animated: true }
    ],
  },
  'batch-vs-stream-processing': {
    title: 'Batch vs Stream Processing',
    height: 608,
    nodes: [
      { id: 'source', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Data Source', type: 'database', description: 'Raw data', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'batch', type: 'systemNode', position: { x: 150, y: 203 }, data: { label: 'Batch', type: 'service', description: 'Scheduled jobs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'stream', type: 'systemNode', position: { x: 600, y: 203 }, data: { label: 'Stream', type: 'service', description: 'Real-time', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'hdfs', type: 'systemNode', position: { x: 75, y: 378 }, data: { label: 'HDFS/S3', type: 'database', description: 'Storage', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'spark', type: 'systemNode', position: { x: 225, y: 378 }, data: { label: 'Spark/Hadoop', type: 'service', description: 'Process', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'kafka', type: 'systemNode', position: { x: 525, y: 378 }, data: { label: 'Kafka/Kinesis', type: 'queue', description: 'Ingest', metric: '10 partitions', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'flink', type: 'systemNode', position: { x: 675, y: 378 }, data: { label: 'Flink/Storm', type: 'service', description: 'Process', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'warehouse', type: 'systemNode', position: { x: 225, y: 540 }, data: { label: 'Data Warehouse', type: 'database', description: 'Analytics', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'dashboard', type: 'systemNode', position: { x: 600, y: 540 }, data: { label: 'Dashboard', type: 'client', description: 'Real-time', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'source', target: 'batch', animated: true },
      { id: 'e1', source: 'source', target: 'stream', animated: true },
      { id: 'e2', source: 'batch', target: 'hdfs', animated: true },
      { id: 'e3', source: 'hdfs', target: 'spark', animated: true },
      { id: 'e4', source: 'spark', target: 'warehouse', animated: true },
      { id: 'e5', source: 'stream', target: 'kafka', animated: true },
      { id: 'e6', source: 'kafka', target: 'flink', animated: true },
      { id: 'e7', source: 'flink', target: 'dashboard', animated: true }
    ],
  },
  'what-are-modular-monoliths': {
    title: 'Modular Monolith',
    height: 567,
    nodes: [
      { id: 'monolith', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Monolith', type: 'service', description: 'Single deploy', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'modular', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Modular', type: 'gateway', description: 'Internal split', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'module-a', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Module A', type: 'service', description: 'Users', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'module-b', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Module B', type: 'service', description: 'Orders', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'module-c', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Module C', type: 'service', description: 'Payments', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'shared', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Shared Lib', type: 'cache', description: 'Common', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'db', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Database', type: 'database', description: 'Single', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Deploy', type: 'gateway', description: 'One unit', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'scale', type: 'systemNode', position: { x: 638, y: 419 }, data: { label: 'Scale', type: 'external', description: 'Whole app', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'monolith', target: 'modular', animated: true },
      { id: 'e1', source: 'modular', target: 'module-a', animated: true },
      { id: 'e2', source: 'modular', target: 'module-b', animated: true },
      { id: 'e3', source: 'modular', target: 'module-c', animated: true },
      { id: 'e4', source: 'module-a', target: 'shared', animated: true },
      { id: 'e5', source: 'module-b', target: 'shared', animated: true },
      { id: 'e6', source: 'module-c', target: 'shared', animated: true },
      { id: 'e7', source: 'shared', target: 'db', animated: true },
      { id: 'e8', source: 'db', target: 'deploy', animated: true },
      { id: 'e9', source: 'deploy', target: 'scale', animated: true }
    ],
  },
  'top-20-system-design-concepts-you-should-know-2': {
    title: '20 System Design Concepts',
    height: 810,
    nodes: [
      { id: 'lb', type: 'systemNode', position: { x: 45, y: 41 }, data: { label: 'Load Balancing', type: 'gateway', description: 'Distribute', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cache', type: 'systemNode', position: { x: 270, y: 41 }, data: { label: 'Caching', type: 'cache', description: 'Speed up', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 495, y: 41 }, data: { label: 'CDN', type: 'external', description: 'Edge', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'db', type: 'systemNode', position: { x: 720, y: 41 }, data: { label: 'Database', type: 'database', description: 'Persistence', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'nosql', type: 'systemNode', position: { x: 45, y: 176 }, data: { label: 'NoSQL', type: 'database', description: 'Flexible', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'shard', type: 'systemNode', position: { x: 270, y: 176 }, data: { label: 'Sharding', type: 'gateway', description: 'Split data', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'replica', type: 'systemNode', position: { x: 495, y: 176 }, data: { label: 'Replication', type: 'service', description: 'Copies', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cap', type: 'systemNode', position: { x: 720, y: 176 }, data: { label: 'CAP Theorem', type: 'external', description: 'Trade-offs', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mq', type: 'systemNode', position: { x: 45, y: 311 }, data: { label: 'Message Queue', type: 'queue', description: 'Async', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'micro', type: 'systemNode', position: { x: 270, y: 311 }, data: { label: 'Microservices', type: 'service', description: 'Decoupled', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'api-gw', type: 'systemNode', position: { x: 495, y: 311 }, data: { label: 'API Gateway', type: 'gateway', description: 'Entry', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'rate', type: 'systemNode', position: { x: 720, y: 311 }, data: { label: 'Rate Limit', type: 'gateway', description: 'Throttle', metric: '10K QPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'circuit', type: 'systemNode', position: { x: 45, y: 446 }, data: { label: 'Circuit Breaker', type: 'service', description: 'Fail fast', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'id', type: 'systemNode', position: { x: 270, y: 446 }, data: { label: 'ID Gen', type: 'service', description: 'Unique IDs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'search', type: 'systemNode', position: { x: 495, y: 446 }, data: { label: 'Search', type: 'cache', description: 'Full-text', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'consistent', type: 'systemNode', position: { x: 720, y: 446 }, data: { label: 'Consistent Hash', type: 'gateway', description: 'Distribution', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'bloom', type: 'systemNode', position: { x: 158, y: 581 }, data: { label: 'Bloom Filter', type: 'cache', description: 'Probabilistic', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'quorum', type: 'systemNode', position: { x: 383, y: 581 }, data: { label: 'Quorum', type: 'gateway', description: 'Consensus', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'checksum', type: 'systemNode', position: { x: 608, y: 581 }, data: { label: 'Checksum', type: 'service', description: 'Integrity', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'system', type: 'systemNode', position: { x: 383, y: 716 }, data: { label: 'System Design', type: 'client', description: '20 concepts', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'lb', target: 'cache', animated: true },
      { id: 'e1', source: 'cache', target: 'cdn', animated: true },
      { id: 'e2', source: 'db', target: 'nosql', animated: true },
      { id: 'e3', source: 'nosql', target: 'shard', animated: true },
      { id: 'e4', source: 'shard', target: 'replica', animated: true },
      { id: 'e5', source: 'replica', target: 'cap', animated: true },
      { id: 'e6', source: 'cap', target: 'mq', animated: true },
      { id: 'e7', source: 'mq', target: 'micro', animated: true },
      { id: 'e8', source: 'micro', target: 'api-gw', animated: true },
      { id: 'e9', source: 'api-gw', target: 'rate', animated: true },
      { id: 'e10', source: 'rate', target: 'circuit', animated: true },
      { id: 'e11', source: 'circuit', target: 'id', animated: true },
      { id: 'e12', source: 'id', target: 'search', animated: true },
      { id: 'e13', source: 'search', target: 'consistent', animated: true },
      { id: 'e14', source: 'consistent', target: 'bloom', animated: true },
      { id: 'e15', source: 'bloom', target: 'quorum', animated: true },
      { id: 'e16', source: 'quorum', target: 'checksum', animated: true },
      { id: 'e17', source: 'checksum', target: 'system', animated: true }
    ],
  },
  'big-data-pipeline-cheatsheet-for-aws-azure-and-goo': {
    title: 'Big Data Pipeline (AWS/Azure/GCP)',
    height: 675,
    nodes: [
      { id: 'ingest', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Ingestion', type: 'client', description: 'Kinesis/EventHub/PubSub', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'store', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Data Lake', type: 'database', description: 'S3/ADLS/GCS', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'process', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Processing', type: 'service', description: 'Spark/Databricks/BigQuery', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'transform', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'ETL/ELT', type: 'service', description: 'Transform data', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'warehouse', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Data Warehouse', type: 'database', description: 'Redshift/Synapse/BQ', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'analytics', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Analytics', type: 'external', description: 'BI/ML', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'visualize', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Visualization', type: 'client', description: 'QuickSight/PowerBI/Looker', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'ingest', target: 'store', animated: true },
      { id: 'e1', source: 'store', target: 'transform', animated: true },
      { id: 'e2', source: 'transform', target: 'warehouse', animated: true },
      { id: 'e3', source: 'store', target: 'process', animated: true },
      { id: 'e4', source: 'process', target: 'warehouse', animated: true },
      { id: 'e5', source: 'warehouse', target: 'analytics', animated: true },
      { id: 'e6', source: 'analytics', target: 'visualize', animated: true }
    ],
  },
  'forward-proxy-versus-reverse-proxy': {
    title: 'Forward vs Reverse Proxy',
    height: 608,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'User', type: 'client', description: 'Browse web', metric: '2B+ MAU', status: 'success', details: ['Mobile', 'Web', 'Desktop'] } },
      { id: 'forward', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Forward Proxy', type: 'gateway', description: 'Client-side', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'internet', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Internet', type: 'external', description: 'Websites', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'client', type: 'systemNode', position: { x: 75, y: 311 }, data: { label: 'Client', type: 'client', description: 'Request', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'reverse', type: 'systemNode', position: { x: 375, y: 311 }, data: { label: 'Reverse Proxy', type: 'gateway', description: 'Server-side', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'server1', type: 'systemNode', position: { x: 225, y: 473 }, data: { label: 'Server A', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'server2', type: 'systemNode', position: { x: 525, y: 473 }, data: { label: 'Server B', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'forward', animated: true },
      { id: 'e1', source: 'forward', target: 'internet', animated: true },
      { id: 'e2', source: 'client', target: 'reverse', animated: true },
      { id: 'e3', source: 'reverse', target: 'server1', animated: true },
      { id: 'e4', source: 'reverse', target: 'server2', animated: true }
    ],
  },
  'apache-kafka-vs-rabbitmq': {
    title: 'Kafka vs RabbitMQ',
    height: 675,
    nodes: [
      { id: 'producer', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Producer', type: 'client', description: 'Send message', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'kafka', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Kafka', type: 'gateway', description: 'Log-based', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'rabbit', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'RabbitMQ', type: 'gateway', description: 'Queue-based', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'partition', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Partition', type: 'queue', description: 'Ordered log', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'broker', type: 'systemNode', position: { x: 450, y: 243 }, data: { label: 'Broker', type: 'service', description: 'Persistence', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'exchange', type: 'systemNode', position: { x: 600, y: 243 }, data: { label: 'Exchange', type: 'gateway', description: 'Routing', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'queue', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Queue', type: 'queue', description: 'FIFO buffer', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'consumer1', type: 'systemNode', position: { x: 300, y: 432 }, data: { label: 'Consumer Group', type: 'service', description: 'Kafka', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'consumer2', type: 'systemNode', position: { x: 675, y: 432 }, data: { label: 'Worker', type: 'service', description: 'RabbitMQ', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'use1', type: 'systemNode', position: { x: 300, y: 567 }, data: { label: 'Event Streaming', type: 'external', description: 'Logs/metrics', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'use2', type: 'systemNode', position: { x: 675, y: 567 }, data: { label: 'Task Queue', type: 'external', description: 'Background jobs', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } }
    ],
    edges: [
      { id: 'e0', source: 'producer', target: 'kafka', animated: true },
      { id: 'e1', source: 'producer', target: 'rabbit', animated: true },
      { id: 'e2', source: 'kafka', target: 'partition', animated: true },
      { id: 'e3', source: 'kafka', target: 'broker', animated: true },
      { id: 'e4', source: 'rabbit', target: 'exchange', animated: true },
      { id: 'e5', source: 'exchange', target: 'queue', animated: true },
      { id: 'e6', source: 'partition', target: 'consumer1', animated: true },
      { id: 'e7', source: 'queue', target: 'consumer2', animated: true },
      { id: 'e8', source: 'consumer1', target: 'use1', animated: true },
      { id: 'e9', source: 'consumer2', target: 'use2', animated: true }
    ],
  },
  'why-is-nginx-so-popular': {
    title: 'Nginx Architecture',
    height: 540,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Client', type: 'client', description: 'HTTP request', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'nginx', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Nginx', type: 'gateway', description: 'Event-driven', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'static', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Static Files', type: 'cache', description: 'Direct serve', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'upstream', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Upstream', type: 'gateway', description: 'Load balance', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'app1', type: 'systemNode', position: { x: 150, y: 405 }, data: { label: 'App Server 1', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'app2', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'App Server 2', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'app3', type: 'systemNode', position: { x: 600, y: 405 }, data: { label: 'App Server 3', type: 'service', description: 'Backend', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cache', type: 'systemNode', position: { x: 675, y: 243 }, data: { label: 'Cache', type: 'cache', description: 'Redis/Memcached', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'nginx', animated: true },
      { id: 'e1', source: 'nginx', target: 'static', animated: true },
      { id: 'e2', source: 'nginx', target: 'upstream', animated: true },
      { id: 'e3', source: 'upstream', target: 'app1', animated: true },
      { id: 'e4', source: 'upstream', target: 'app2', animated: true },
      { id: 'e5', source: 'upstream', target: 'app3', animated: true },
      { id: 'e6', source: 'nginx', target: 'cache', animated: true }
    ],
  },
  'the-open-source-ai-stack': {
    title: 'Open Source AI Stack',
    height: 608,
    nodes: [
      { id: 'pytorch', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'PyTorch', type: 'external', description: 'Framework', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'tensorflow', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'TensorFlow', type: 'external', description: 'Google', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'jax', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'JAX', type: 'service', description: 'Google', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'scikit', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Scikit-learn', type: 'service', description: 'Classic ML', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'huggingface', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'HuggingFace', type: 'external', description: 'Models', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mlflow', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'MLflow', type: 'service', description: 'Tracking', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ray', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Ray', type: 'external', description: 'Distributed', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'open', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Open Source', type: 'client', description: 'AI', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'pytorch', target: 'tensorflow', animated: true },
      { id: 'e1', source: 'tensorflow', target: 'jax', animated: true },
      { id: 'e2', source: 'jax', target: 'scikit', animated: true },
      { id: 'e3', source: 'huggingface', target: 'mlflow', animated: true },
      { id: 'e4', source: 'mlflow', target: 'ray', animated: true },
      { id: 'e5', source: 'scikit', target: 'open', animated: true },
      { id: 'e6', source: 'ray', target: 'open', animated: true }
    ],
  },
  '30-useful-ai-apps-that-can-help-you-in-2025': {
    title: 'AI Apps by Category',
    height: 675,
    nodes: [
      { id: 'coding', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Coding', type: 'service', description: 'Copilot, Cursor', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'writing', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Writing', type: 'service', description: 'ChatGPT, Claude', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'design', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Design', type: 'external', description: 'Midjourney, DALL-E', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'video', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Video', type: 'external', description: 'Runway, Sora', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'audio', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Audio', type: 'service', description: 'ElevenLabs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'productivity', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Productivity', type: 'cache', description: 'Notion AI', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'research', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Research', type: 'database', description: 'Perplexity', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'meeting', type: 'systemNode', position: { x: 188, y: 405 }, data: { label: 'Meetings', type: 'service', description: 'Otter.ai', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'automation', type: 'systemNode', position: { x: 413, y: 405 }, data: { label: 'Automation', type: 'gateway', description: 'Zapier, Make', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'learning', type: 'systemNode', position: { x: 638, y: 405 }, data: { label: 'Learning', type: 'client', description: 'Khanmingy', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'all', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: '30+ AI Apps', type: 'client', description: 'Every use case', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'coding', target: 'writing', animated: true },
      { id: 'e1', source: 'writing', target: 'design', animated: true },
      { id: 'e2', source: 'design', target: 'video', animated: true },
      { id: 'e3', source: 'audio', target: 'productivity', animated: true },
      { id: 'e4', source: 'productivity', target: 'research', animated: true },
      { id: 'e5', source: 'meeting', target: 'automation', animated: true },
      { id: 'e6', source: 'automation', target: 'learning', animated: true },
      { id: 'e7', source: 'video', target: 'all', animated: true },
      { id: 'e8', source: 'research', target: 'all', animated: true },
      { id: 'e9', source: 'learning', target: 'all', animated: true }
    ],
  },
  'deepseek-1-pager': {
    title: 'DeepSeek Architecture',
    height: 567,
    nodes: [
      { id: 'input', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Input', type: 'client', description: 'Text', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'token', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Tokenizer', type: 'service', description: 'BPE', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'model', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'DeepSeek-V3', type: 'external', description: '671B params', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'moe', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'MoE', type: 'gateway', description: '37B active', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'mla', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'MLA', type: 'service', description: 'Attention', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'output', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Output', type: 'client', description: 'Response', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'input', target: 'token', animated: true },
      { id: 'e1', source: 'token', target: 'model', animated: true },
      { id: 'e2', source: 'model', target: 'moe', animated: true },
      { id: 'e3', source: 'moe', target: 'mla', animated: true },
      { id: 'e4', source: 'mla', target: 'output', animated: true }
    ],
  },
  'generative-adversarial-network-gan-ai-by-hand': {
    title: 'GAN Architecture',
    height: 567,
    nodes: [
      { id: 'noise', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Noise', type: 'client', description: 'Random input', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'generator', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Generator', type: 'service', description: 'Create fake', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'real', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Real Data', type: 'database', description: 'Training set', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'fake', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'Fake Image', type: 'external', description: 'Generated', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'discriminator', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Discriminator', type: 'gateway', description: 'Real or fake?', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'loss-g', type: 'systemNode', position: { x: 225, y: 405 }, data: { label: 'G Loss', type: 'service', description: 'Fool D', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'loss-d', type: 'systemNode', position: { x: 525, y: 405 }, data: { label: 'D Loss', type: 'service', description: 'Detect fake', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'train', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'Training', type: 'external', description: 'Minimax game', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'noise', target: 'generator', animated: true },
      { id: 'e1', source: 'generator', target: 'fake', animated: true },
      { id: 'e2', source: 'real', target: 'discriminator', animated: true },
      { id: 'e3', source: 'fake', target: 'discriminator', animated: true },
      { id: 'e4', source: 'discriminator', target: 'loss-d', animated: true },
      { id: 'e5', source: 'generator', target: 'loss-g', animated: true },
      { id: 'e6', source: 'loss-g', target: 'train', animated: true },
      { id: 'e7', source: 'loss-d', target: 'train', animated: true }
    ],
  },
  'xais-grok-3-one-pager': {
    title: 'xAI Grok-3 Architecture',
    height: 540,
    nodes: [
      { id: 'input', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Input', type: 'client', description: 'Text/image', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'tokenizer', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Tokenizer', type: 'service', description: 'Tokenize', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'transformer', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Transformer', type: 'gateway', description: 'Attention', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'moex', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'MoE', type: 'external', description: 'Mixture of Experts', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'reasoning', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Reasoning', type: 'gateway', description: 'Chain of thought', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'compute', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Compute', type: 'database', description: 'Colossus cluster', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'output', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Output', type: 'client', description: 'Response', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'grok', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Grok-3', type: 'external', description: 'xAI', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'input', target: 'tokenizer', animated: true },
      { id: 'e1', source: 'tokenizer', target: 'transformer', animated: true },
      { id: 'e2', source: 'transformer', target: 'moex', animated: true },
      { id: 'e3', source: 'moex', target: 'reasoning', animated: true },
      { id: 'e4', source: 'reasoning', target: 'compute', animated: true },
      { id: 'e5', source: 'compute', target: 'output', animated: true },
      { id: 'e6', source: 'output', target: 'grok', animated: true }
    ],
  },
  'the-generative-ai-learning-roadmap': {
    title: 'Generative AI Learning Path',
    height: 675,
    nodes: [
      { id: 'python', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Python', type: 'client', description: 'Programming', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'ml', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'ML Basics', type: 'service', description: 'Regression, CNN', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dl', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Deep Learning', type: 'gateway', description: 'PyTorch/TF', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'nlp', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'NLP', type: 'service', description: 'Transformers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'llm', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'LLMs', type: 'external', description: 'GPT, Claude', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'prompt', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Prompt Eng', type: 'cache', description: 'Few-shot', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'rag', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'RAG', type: 'gateway', description: 'Retrieval', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'fine-tune', type: 'systemNode', position: { x: 188, y: 405 }, data: { label: 'Fine-tuning', type: 'service', description: 'LoRA, RLHF', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'agents', type: 'systemNode', position: { x: 413, y: 405 }, data: { label: 'AI Agents', type: 'external', description: 'AutoGPT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 638, y: 405 }, data: { label: 'Deployment', type: 'service', description: 'API, scaling', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'expert', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'GenAI Expert', type: 'client', description: 'Build apps', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'python', target: 'ml', animated: true },
      { id: 'e1', source: 'ml', target: 'dl', animated: true },
      { id: 'e2', source: 'dl', target: 'nlp', animated: true },
      { id: 'e3', source: 'nlp', target: 'llm', animated: true },
      { id: 'e4', source: 'llm', target: 'prompt', animated: true },
      { id: 'e5', source: 'prompt', target: 'rag', animated: true },
      { id: 'e6', source: 'rag', target: 'fine-tune', animated: true },
      { id: 'e7', source: 'fine-tune', target: 'agents', animated: true },
      { id: 'e8', source: 'agents', target: 'deploy', animated: true },
      { id: 'e9', source: 'deploy', target: 'expert', animated: true }
    ],
  },
  'what-is-mcp': {
    title: 'Model Context Protocol (MCP)',
    height: 567,
    nodes: [
      { id: 'llm', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'LLM', type: 'external', description: 'Claude/GPT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mcp', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'MCP', type: 'gateway', description: 'Protocol', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'server', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'MCP Server', type: 'service', description: 'Tool provider', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'tools', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Tools', type: 'service', description: 'Functions', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'resources', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Resources', type: 'database', description: 'Data', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'prompts', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Prompts', type: 'cache', description: 'Templates', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'context', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Context', type: 'cache', description: 'Shared state', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'integrate', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Integrate', type: 'gateway', description: 'Connect', metric: '10K QPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'extend', type: 'systemNode', position: { x: 600, y: 419 }, data: { label: 'Extend', type: 'client', description: 'LLM capabilities', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'llm', target: 'mcp', animated: true },
      { id: 'e1', source: 'mcp', target: 'server', animated: true },
      { id: 'e2', source: 'server', target: 'tools', animated: true },
      { id: 'e3', source: 'server', target: 'resources', animated: true },
      { id: 'e4', source: 'server', target: 'prompts', animated: true },
      { id: 'e5', source: 'tools', target: 'context', animated: true },
      { id: 'e6', source: 'resources', target: 'context', animated: true },
      { id: 'e7', source: 'prompts', target: 'integrate', animated: true },
      { id: 'e8', source: 'context', target: 'extend', animated: true },
      { id: 'e9', source: 'integrate', target: 'extend', animated: true }
    ],
  },
  'virtualization-vs-containerization': {
    title: 'VM vs Container Architecture',
    height: 608,
    nodes: [
      { id: 'host', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Host OS', type: 'database', description: 'Physical machine', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'vm-approach', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'Virtualization', type: 'gateway', description: 'Full isolation', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'container-approach', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'Containerization', type: 'gateway', description: 'Process isolation', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'guest-os', type: 'systemNode', position: { x: 75, y: 338 }, data: { label: 'Guest OS', type: 'service', description: 'Per VM', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'app-vm', type: 'systemNode', position: { x: 300, y: 338 }, data: { label: 'App + Libs', type: 'service', description: 'Inside VM', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'shared-os', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'Shared OS', type: 'service', description: 'Host kernel', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'app-container', type: 'systemNode', position: { x: 750, y: 338 }, data: { label: 'App + Libs', type: 'service', description: 'Inside container', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'slow', type: 'systemNode', position: { x: 188, y: 500 }, data: { label: 'Slow boot', type: 'external', description: 'Minutes', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'fast', type: 'systemNode', position: { x: 638, y: 500 }, data: { label: 'Fast boot', type: 'external', description: 'Seconds', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'host', target: 'vm-approach', animated: true },
      { id: 'e1', source: 'host', target: 'container-approach', animated: true },
      { id: 'e2', source: 'vm-approach', target: 'guest-os', animated: true },
      { id: 'e3', source: 'guest-os', target: 'app-vm', animated: true },
      { id: 'e4', source: 'container-approach', target: 'shared-os', animated: true },
      { id: 'e5', source: 'shared-os', target: 'app-container', animated: true },
      { id: 'e6', source: 'app-vm', target: 'slow', animated: true },
      { id: 'e7', source: 'app-container', target: 'fast', animated: true }
    ],
  },
  'top-ai-coding-tools-for-developers-you-can-use-in-': {
    title: 'AI Coding Tools',
    height: 608,
    nodes: [
      { id: 'copilot', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'GitHub Copilot', type: 'service', description: 'Code completion', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cursor', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Cursor', type: 'service', description: 'AI IDE', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'chatgpt', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'ChatGPT', type: 'external', description: 'Code explain', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'claude', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Claude', type: 'external', description: 'Long context', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'tabnine', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Tabnine', type: 'cache', description: 'Private AI', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'codeium', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Codeium', type: 'cache', description: 'Free alternative', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'devin', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Devin', type: 'gateway', description: 'AI engineer', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'review', type: 'systemNode', position: { x: 188, y: 405 }, data: { label: 'Code Review', type: 'service', description: 'PR analysis', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'test', type: 'systemNode', position: { x: 413, y: 405 }, data: { label: 'Test Gen', type: 'service', description: 'Auto tests', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'debug', type: 'systemNode', position: { x: 638, y: 405 }, data: { label: 'Debug', type: 'external', description: 'Fix errors', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'productivity', type: 'systemNode', position: { x: 413, y: 540 }, data: { label: '10x Developer', type: 'client', description: 'Ship faster', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'copilot', target: 'cursor', animated: true },
      { id: 'e1', source: 'chatgpt', target: 'claude', animated: true },
      { id: 'e2', source: 'tabnine', target: 'codeium', animated: true },
      { id: 'e3', source: 'codeium', target: 'devin', animated: true },
      { id: 'e4', source: 'review', target: 'test', animated: true },
      { id: 'e5', source: 'test', target: 'debug', animated: true },
      { id: 'e6', source: 'cursor', target: 'productivity', animated: true },
      { id: 'e7', source: 'devin', target: 'productivity', animated: true },
      { id: 'e8', source: 'debug', target: 'productivity', animated: true }
    ],
  },
  'top-youtube-channels-and-blogs-for-ai-learning-in-': {
    title: 'AI Learning Resources',
    height: 567,
    nodes: [
      { id: 'two-min', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Two Minute Papers', type: 'external', description: 'Research', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'sentdex', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Sentdex', type: 'external', description: 'Python/ML', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'yannic', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Yannic Kilcher', type: 'external', description: 'Deep dives', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'code-bullet', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Code Bullet', type: 'external', description: 'Fun AI', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'blogs', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Blogs', type: 'service', description: 'Papers, articles', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'courses', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Courses', type: 'service', description: 'Coursera, fast.ai', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'practice', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Practice', type: 'service', description: 'Kaggle', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'expert', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'AI Expert', type: 'client', description: 'Keep learning', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'two-min', target: 'sentdex', animated: true },
      { id: 'e1', source: 'sentdex', target: 'yannic', animated: true },
      { id: 'e2', source: 'yannic', target: 'code-bullet', animated: true },
      { id: 'e3', source: 'blogs', target: 'courses', animated: true },
      { id: 'e4', source: 'courses', target: 'practice', animated: true },
      { id: 'e5', source: 'code-bullet', target: 'expert', animated: true },
      { id: 'e6', source: 'practice', target: 'expert', animated: true }
    ],
  },
  '12-mcp-servers-you-can-use-in-2025': {
    title: '12 MCP Servers for 2025',
    height: 675,
    nodes: [
      { id: 'filesystem', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Filesystem', type: 'database', description: 'Local files', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'github', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'GitHub', type: 'external', description: 'Code', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'slack', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Slack', type: 'external', description: 'Messages', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'postgres', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'PostgreSQL', type: 'database', description: 'Database', metric: '100TB+', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'brave', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Brave Search', type: 'external', description: 'Web search', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'puppeteer', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Puppeteer', type: 'service', description: 'Browser', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'aws', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'AWS', type: 'external', description: 'Cloud', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mcp', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'MCP', type: 'gateway', description: 'Protocol', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'llm', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'LLM', type: 'external', description: 'Claude/GPT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'apps', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: '12 MCP Servers', type: 'client', description: '2025', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'filesystem', target: 'github', animated: true },
      { id: 'e1', source: 'github', target: 'slack', animated: true },
      { id: 'e2', source: 'slack', target: 'postgres', animated: true },
      { id: 'e3', source: 'postgres', target: 'brave', animated: true },
      { id: 'e4', source: 'brave', target: 'puppeteer', animated: true },
      { id: 'e5', source: 'puppeteer', target: 'aws', animated: true },
      { id: 'e6', source: 'aws', target: 'mcp', animated: true },
      { id: 'e7', source: 'mcp', target: 'llm', animated: true },
      { id: 'e8', source: 'llm', target: 'apps', animated: true }
    ],
  },
  'jwt-simply-explained': {
    title: 'JWT Simply Explained',
    height: 567,
    nodes: [
      { id: 'header', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Header', type: 'gateway', description: 'alg: HS256', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'payload', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Payload', type: 'service', description: 'Claims', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'signature', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Signature', type: 'cache', description: 'HMAC', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'encode', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Base64Url', type: 'external', description: 'Encode', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'verify', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Verify', type: 'gateway', description: 'Check sig', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'jwt', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'JWT', type: 'client', description: 'xxx.yyy.zzz', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'header', target: 'encode', animated: true },
      { id: 'e1', source: 'payload', target: 'encode', animated: true },
      { id: 'e2', source: 'signature', target: 'verify', animated: true },
      { id: 'e3', source: 'encode', target: 'jwt', animated: true },
      { id: 'e4', source: 'verify', target: 'jwt', animated: true }
    ],
  },
  'ai-agent-versus-mcp': {
    title: 'AI Agent vs MCP',
    height: 567,
    nodes: [
      { id: 'agent', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'AI Agent', type: 'external', description: 'Autonomous', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'mcp', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'MCP', type: 'gateway', description: 'Protocol', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'tools', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Tools', type: 'service', description: 'Functions', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'context', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Context', type: 'cache', description: 'Shared', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'goal', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Goal', type: 'client', description: 'Objective', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'communicate', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Communicate', type: 'gateway', description: 'Standard', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'agent', target: 'tools', animated: true },
      { id: 'e1', source: 'mcp', target: 'context', animated: true },
      { id: 'e2', source: 'tools', target: 'goal', animated: true },
      { id: 'e3', source: 'context', target: 'communicate', animated: true },
      { id: 'e4', source: 'agent', target: 'mcp', animated: true }
    ],
  },
  'top-20-ai-concepts-you-should-know': {
    title: '20 AI Concepts',
    height: 743,
    nodes: [
      { id: 'ml', type: 'systemNode', position: { x: 45, y: 41 }, data: { label: 'Machine Learning', type: 'service', description: 'Learn from data', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dl', type: 'systemNode', position: { x: 270, y: 41 }, data: { label: 'Deep Learning', type: 'gateway', description: 'Neural nets', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'nlp', type: 'systemNode', position: { x: 495, y: 41 }, data: { label: 'NLP', type: 'service', description: 'Text', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cv', type: 'systemNode', position: { x: 720, y: 41 }, data: { label: 'Computer Vision', type: 'service', description: 'Images', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'llm', type: 'systemNode', position: { x: 45, y: 176 }, data: { label: 'LLM', type: 'external', description: 'GPT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'rag', type: 'systemNode', position: { x: 270, y: 176 }, data: { label: 'RAG', type: 'gateway', description: 'Retrieval', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'agent', type: 'systemNode', position: { x: 495, y: 176 }, data: { label: 'AI Agent', type: 'external', description: 'Autonomous', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'prompt', type: 'systemNode', position: { x: 720, y: 176 }, data: { label: 'Prompt Eng', type: 'cache', description: 'Optimize', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'fine', type: 'systemNode', position: { x: 45, y: 311 }, data: { label: 'Fine-tuning', type: 'service', description: 'Adapt', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'embedding', type: 'systemNode', position: { x: 270, y: 311 }, data: { label: 'Embedding', type: 'cache', description: 'Vectors', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'gan', type: 'systemNode', position: { x: 495, y: 311 }, data: { label: 'GAN', type: 'external', description: 'Generate', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'transformer', type: 'systemNode', position: { x: 720, y: 311 }, data: { label: 'Transformer', type: 'gateway', description: 'Attention', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'reinforce', type: 'systemNode', position: { x: 158, y: 446 }, data: { label: 'RL', type: 'service', description: 'Rewards', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'supervise', type: 'systemNode', position: { x: 383, y: 446 }, data: { label: 'Supervised', type: 'service', description: 'Labeled', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'unsupervise', type: 'systemNode', position: { x: 608, y: 446 }, data: { label: 'Unsupervised', type: 'service', description: 'Patterns', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ai', type: 'systemNode', position: { x: 383, y: 581 }, data: { label: 'AI', type: 'client', description: '20 concepts', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'ml', target: 'dl', animated: true },
      { id: 'e1', source: 'dl', target: 'nlp', animated: true },
      { id: 'e2', source: 'nlp', target: 'cv', animated: true },
      { id: 'e3', source: 'llm', target: 'rag', animated: true },
      { id: 'e4', source: 'rag', target: 'agent', animated: true },
      { id: 'e5', source: 'agent', target: 'prompt', animated: true },
      { id: 'e6', source: 'fine', target: 'embedding', animated: true },
      { id: 'e7', source: 'embedding', target: 'gan', animated: true },
      { id: 'e8', source: 'gan', target: 'transformer', animated: true },
      { id: 'e9', source: 'reinforce', target: 'supervise', animated: true },
      { id: 'e10', source: 'supervise', target: 'unsupervise', animated: true },
      { id: 'e11', source: 'transformer', target: 'ai', animated: true }
    ],
  },
  'the-ai-application-stack-for-building-rag-apps': {
    title: 'RAG Application Stack',
    height: 675,
    nodes: [
      { id: 'llm', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'LLM', type: 'external', description: 'GPT/Claude', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'embedding', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'Embedding', type: 'gateway', description: 'Vectorize', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'vector-db', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Vector DB', type: 'database', description: 'Pinecone', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'retriever', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'Retriever', type: 'service', description: 'Semantic search', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'docs', type: 'systemNode', position: { x: 75, y: 338 }, data: { label: 'Documents', type: 'database', description: 'Knowledge base', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'chunking', type: 'systemNode', position: { x: 300, y: 338 }, data: { label: 'Chunking', type: 'service', description: 'Split text', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'query', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'User Query', type: 'client', description: 'Question', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'prompt', type: 'systemNode', position: { x: 300, y: 500 }, data: { label: 'Prompt', type: 'gateway', description: 'Context + query', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'response', type: 'systemNode', position: { x: 525, y: 500 }, data: { label: 'Response', type: 'client', description: 'Answer', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'docs', target: 'chunking', animated: true },
      { id: 'e1', source: 'chunking', target: 'embedding', animated: true },
      { id: 'e2', source: 'embedding', target: 'vector-db', animated: true },
      { id: 'e3', source: 'query', target: 'retriever', animated: true },
      { id: 'e4', source: 'retriever', target: 'vector-db', animated: true },
      { id: 'e5', source: 'retriever', target: 'prompt', animated: true },
      { id: 'e6', source: 'prompt', target: 'llm', animated: true },
      { id: 'e7', source: 'llm', target: 'response', animated: true }
    ],
  },
  'ai-vs-machine-learning-vs-deep-learning-vs-generat': {
    title: 'AI vs ML vs DL vs GenAI',
    height: 608,
    nodes: [
      { id: 'ai', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'AI', type: 'external', description: 'Broad field', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'ml', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'ML', type: 'gateway', description: 'Learn data', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'dl', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'DL', type: 'gateway', description: 'Neural nets', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'genai', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'GenAI', type: 'external', description: 'Create', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'subset1', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Subset', type: 'service', description: 'ML in AI', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'subset2', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Subset', type: 'service', description: 'DL in ML', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'subset3', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Subset', type: 'service', description: 'GenAI in DL', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'hierarchy', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Hierarchy', type: 'client', description: 'Nested', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'ai', target: 'subset1', animated: true },
      { id: 'e1', source: 'subset1', target: 'ml', animated: true },
      { id: 'e2', source: 'ml', target: 'subset2', animated: true },
      { id: 'e3', source: 'subset2', target: 'dl', animated: true },
      { id: 'e4', source: 'dl', target: 'subset3', animated: true },
      { id: 'e5', source: 'subset3', target: 'genai', animated: true },
      { id: 'e6', source: 'genai', target: 'hierarchy', animated: true }
    ],
  },
  'top-20-ai-agent-concepts-you-should-know': {
    title: '20 AI Agent Concepts',
    height: 743,
    nodes: [
      { id: 'agent', type: 'systemNode', position: { x: 45, y: 41 }, data: { label: 'Agent', type: 'external', description: 'Autonomous', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'tool', type: 'systemNode', position: { x: 270, y: 41 }, data: { label: 'Tool Use', type: 'service', description: 'APIs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'memory', type: 'systemNode', position: { x: 495, y: 41 }, data: { label: 'Memory', type: 'database', description: 'Recall', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'planning', type: 'systemNode', position: { x: 720, y: 41 }, data: { label: 'Planning', type: 'gateway', description: 'Strategy', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'reasoning', type: 'systemNode', position: { x: 45, y: 176 }, data: { label: 'Reasoning', type: 'gateway', description: 'Logic', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'chain', type: 'systemNode', position: { x: 270, y: 176 }, data: { label: 'Chain-of-Thought', type: 'service', description: 'Step by step', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'react', type: 'systemNode', position: { x: 495, y: 176 }, data: { label: 'ReAct', type: 'service', description: 'Reason + Act', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'reflection', type: 'systemNode', position: { x: 720, y: 176 }, data: { label: 'Reflection', type: 'service', description: 'Self-critique', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'multi', type: 'systemNode', position: { x: 45, y: 311 }, data: { label: 'Multi-agent', type: 'external', description: 'Collaborate', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'orchestrate', type: 'systemNode', position: { x: 270, y: 311 }, data: { label: 'Orchestration', type: 'gateway', description: 'Coordinate', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'mcp', type: 'systemNode', position: { x: 495, y: 311 }, data: { label: 'MCP', type: 'gateway', description: 'Protocol', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'autonomous', type: 'systemNode', position: { x: 720, y: 311 }, data: { label: 'Autonomous', type: 'external', description: 'Self-run', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'concepts', type: 'systemNode', position: { x: 383, y: 446 }, data: { label: '20 Concepts', type: 'client', description: 'AI Agents', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'agent', target: 'tool', animated: true },
      { id: 'e1', source: 'tool', target: 'memory', animated: true },
      { id: 'e2', source: 'memory', target: 'planning', animated: true },
      { id: 'e3', source: 'reasoning', target: 'chain', animated: true },
      { id: 'e4', source: 'chain', target: 'react', animated: true },
      { id: 'e5', source: 'react', target: 'reflection', animated: true },
      { id: 'e6', source: 'multi', target: 'orchestrate', animated: true },
      { id: 'e7', source: 'orchestrate', target: 'mcp', animated: true },
      { id: 'e8', source: 'mcp', target: 'autonomous', animated: true },
      { id: 'e9', source: 'planning', target: 'concepts', animated: true }
    ],
  },
  'rag-vs-agentic-rag': {
    title: 'RAG vs Agentic RAG',
    height: 567,
    nodes: [
      { id: 'rag', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'RAG', type: 'gateway', description: 'Retrieve', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'agentic', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Agentic RAG', type: 'external', description: 'Reason', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'query', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Query', type: 'client', description: 'User', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'retrieve', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Retrieve', type: 'service', description: 'Search', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'reason', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Reason', type: 'gateway', description: 'Plan', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tools', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Tools', type: 'service', description: 'Multi-step', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'simple', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Simple', type: 'service', description: 'Direct', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'complex', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Complex', type: 'external', description: 'Adaptive', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'choose', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Needs', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'rag', target: 'query', animated: true },
      { id: 'e1', source: 'rag', target: 'retrieve', animated: true },
      { id: 'e2', source: 'agentic', target: 'reason', animated: true },
      { id: 'e3', source: 'agentic', target: 'tools', animated: true },
      { id: 'e4', source: 'retrieve', target: 'simple', animated: true },
      { id: 'e5', source: 'tools', target: 'complex', animated: true },
      { id: 'e6', source: 'simple', target: 'choose', animated: true },
      { id: 'e7', source: 'complex', target: 'choose', animated: true }
    ],
  },
  '6-data-structures-to-save-storage': {
    title: 'Storage-Efficient Data Structures',
    height: 567,
    nodes: [
      { id: 'bloom', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Bloom Filter', type: 'cache', description: 'Probabilistic', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'hyperloglog', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'HyperLogLog', type: 'service', description: 'Cardinality', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'bitmap', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Bitmap', type: 'cache', description: 'Bits', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'trie', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Trie', type: 'gateway', description: 'Prefix', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'roaring', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Roaring Bitmap', type: 'cache', description: 'Compressed', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'cuckoo', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Cuckoo Filter', type: 'gateway', description: 'Delete support', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'save', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Save Storage', type: 'client', description: 'Efficient', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'bloom', target: 'hyperloglog', animated: true },
      { id: 'e1', source: 'hyperloglog', target: 'bitmap', animated: true },
      { id: 'e2', source: 'bitmap', target: 'trie', animated: true },
      { id: 'e3', source: 'trie', target: 'roaring', animated: true },
      { id: 'e4', source: 'roaring', target: 'cuckoo', animated: true },
      { id: 'e5', source: 'cuckoo', target: 'save', animated: true }
    ],
  },
  'the-generative-ai-tech-stack': {
    title: 'Generative AI Stack',
    height: 608,
    nodes: [
      { id: 'foundation', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Foundation Model', type: 'external', description: 'GPT, Claude', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'api', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'API Layer', type: 'gateway', description: 'OpenAI', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'orchestrate', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Orchestration', type: 'gateway', description: 'LangChain', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'vector', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Vector DB', type: 'database', description: 'Pinecone', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'prompt', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Prompt Mgmt', type: 'cache', description: 'Templates', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'eval', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Evaluation', type: 'service', description: 'Test', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Deployment', type: 'service', description: 'Serve', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'genai', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'GenAI', type: 'client', description: 'Stack', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'foundation', target: 'api', animated: true },
      { id: 'e1', source: 'api', target: 'orchestrate', animated: true },
      { id: 'e2', source: 'orchestrate', target: 'vector', animated: true },
      { id: 'e3', source: 'vector', target: 'prompt', animated: true },
      { id: 'e4', source: 'prompt', target: 'eval', animated: true },
      { id: 'e5', source: 'eval', target: 'deploy', animated: true },
      { id: 'e6', source: 'deploy', target: 'genai', animated: true }
    ],
  },
  'the-agentic-ai-learning-roadmap': {
    title: 'Agentic AI Roadmap',
    height: 675,
    nodes: [
      { id: 'llm', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'LLM Basics', type: 'external', description: 'GPT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'prompt', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Prompt Eng', type: 'cache', description: 'Few-shot', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'rag', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'RAG', type: 'gateway', description: 'Retrieval', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tools', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Tool Use', type: 'service', description: 'APIs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'memory', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Memory', type: 'database', description: 'Context', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'planning', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Planning', type: 'gateway', description: 'Strategy', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'multi', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Multi-agent', type: 'external', description: 'CrewAI', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'autonomous', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Autonomous', type: 'external', description: 'AutoGPT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Deploy', type: 'service', description: 'Production', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'agentic', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Agentic AI', type: 'client', description: 'Expert', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'llm', target: 'prompt', animated: true },
      { id: 'e1', source: 'prompt', target: 'rag', animated: true },
      { id: 'e2', source: 'rag', target: 'tools', animated: true },
      { id: 'e3', source: 'tools', target: 'memory', animated: true },
      { id: 'e4', source: 'memory', target: 'planning', animated: true },
      { id: 'e5', source: 'planning', target: 'multi', animated: true },
      { id: 'e6', source: 'multi', target: 'autonomous', animated: true },
      { id: 'e7', source: 'autonomous', target: 'deploy', animated: true },
      { id: 'e8', source: 'deploy', target: 'agentic', animated: true }
    ],
  },
  '12-mcp-servers-you-can-use-in-2025-2': {
    title: '12 MCP Servers for 2025 (v2)',
    height: 675,
    nodes: [
      { id: 'filesystem', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Filesystem', type: 'database', description: 'Local files', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'github', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'GitHub', type: 'external', description: 'Code', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'slack', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Slack', type: 'external', description: 'Messages', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'postgres', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'PostgreSQL', type: 'database', description: 'Database', metric: '100TB+', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'brave', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Brave Search', type: 'external', description: 'Web search', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'puppeteer', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Puppeteer', type: 'service', description: 'Browser', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'aws', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'AWS', type: 'external', description: 'Cloud', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mcp', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'MCP', type: 'gateway', description: 'Protocol', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'llm', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'LLM', type: 'external', description: 'Claude/GPT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'apps', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: '12 MCP Servers', type: 'client', description: '2025', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'filesystem', target: 'github', animated: true },
      { id: 'e1', source: 'github', target: 'slack', animated: true },
      { id: 'e2', source: 'slack', target: 'postgres', animated: true },
      { id: 'e3', source: 'postgres', target: 'brave', animated: true },
      { id: 'e4', source: 'brave', target: 'puppeteer', animated: true },
      { id: 'e5', source: 'puppeteer', target: 'aws', animated: true },
      { id: 'e6', source: 'aws', target: 'mcp', animated: true },
      { id: 'e7', source: 'mcp', target: 'llm', animated: true },
      { id: 'e8', source: 'llm', target: 'apps', animated: true }
    ],
  },
  '12-mcp-servers-you-can-use-in-2025-3': {
    title: '12 MCP Servers for 2025 (v3)',
    height: 675,
    nodes: [
      { id: 'filesystem', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Filesystem', type: 'database', description: 'Local files', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'github', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'GitHub', type: 'external', description: 'Code', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'slack', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Slack', type: 'external', description: 'Messages', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'postgres', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'PostgreSQL', type: 'database', description: 'Database', metric: '100TB+', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'brave', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Brave Search', type: 'external', description: 'Web search', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'puppeteer', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Puppeteer', type: 'service', description: 'Browser', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'aws', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'AWS', type: 'external', description: 'Cloud', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mcp', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'MCP', type: 'gateway', description: 'Protocol', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'llm', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'LLM', type: 'external', description: 'Claude/GPT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'apps', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: '12 MCP Servers', type: 'client', description: '2025', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'filesystem', target: 'github', animated: true },
      { id: 'e1', source: 'github', target: 'slack', animated: true },
      { id: 'e2', source: 'slack', target: 'postgres', animated: true },
      { id: 'e3', source: 'postgres', target: 'brave', animated: true },
      { id: 'e4', source: 'brave', target: 'puppeteer', animated: true },
      { id: 'e5', source: 'puppeteer', target: 'aws', animated: true },
      { id: 'e6', source: 'aws', target: 'mcp', animated: true },
      { id: 'e7', source: 'mcp', target: 'llm', animated: true },
      { id: 'e8', source: 'llm', target: 'apps', animated: true }
    ],
  },
  'mcp-versus-a2a-protocol': {
    title: 'MCP vs A2A Protocol',
    height: 567,
    nodes: [
      { id: 'mcp', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'MCP', type: 'gateway', description: 'Context', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'a2a', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'A2A', type: 'gateway', description: 'Agent-to-agent', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'server', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'MCP Server', type: 'service', description: 'Tools', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'client', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'MCP Client', type: 'client', description: 'LLM', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'agent1', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Agent A', type: 'external', description: 'Sender', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'agent2', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Agent B', type: 'external', description: 'Receiver', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'mcp', target: 'server', animated: true },
      { id: 'e1', source: 'server', target: 'client', animated: true },
      { id: 'e2', source: 'a2a', target: 'agent1', animated: true },
      { id: 'e3', source: 'agent1', target: 'agent2', animated: true },
      { id: 'e4', source: 'client', target: 'agent2', animated: true }
    ],
  },
  'key-terms-in-domain-driven-design': {
    title: 'Domain-Driven Design Terms',
    height: 675,
    nodes: [
      { id: 'domain', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Domain', type: 'database', description: 'Business problem', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'bounded-context', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'Bounded Context', type: 'gateway', description: 'Model boundary', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'entity', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Entity', type: 'service', description: 'Has identity', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'value-object', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'Value Object', type: 'cache', description: 'Immutable', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'aggregate', type: 'systemNode', position: { x: 75, y: 338 }, data: { label: 'Aggregate', type: 'gateway', description: 'Consistency boundary', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'repository', type: 'systemNode', position: { x: 300, y: 338 }, data: { label: 'Repository', type: 'database', description: 'Persistence', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'service', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'Domain Service', type: 'service', description: 'Business logic', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'factory', type: 'systemNode', position: { x: 750, y: 338 }, data: { label: 'Factory', type: 'service', description: 'Create objects', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'event', type: 'systemNode', position: { x: 188, y: 500 }, data: { label: 'Domain Event', type: 'queue', description: 'Something happened', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'ubiquitous', type: 'systemNode', position: { x: 563, y: 500 }, data: { label: 'Ubiquitous Language', type: 'external', description: 'Shared terms', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'ddd', type: 'systemNode', position: { x: 375, y: 648 }, data: { label: 'DDD', type: 'client', description: 'Design approach', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'domain', target: 'bounded-context', animated: true },
      { id: 'e1', source: 'bounded-context', target: 'entity', animated: true },
      { id: 'e2', source: 'entity', target: 'value-object', animated: true },
      { id: 'e3', source: 'entity', target: 'aggregate', animated: true },
      { id: 'e4', source: 'aggregate', target: 'repository', animated: true },
      { id: 'e5', source: 'aggregate', target: 'service', animated: true },
      { id: 'e6', source: 'service', target: 'factory', animated: true },
      { id: 'e7', source: 'factory', target: 'event', animated: true },
      { id: 'e8', source: 'event', target: 'ubiquitous', animated: true },
      { id: 'e9', source: 'ubiquitous', target: 'ddd', animated: true }
    ],
  },
  'top-ai-agent-frameworks-you-should-know': {
    title: 'AI Agent Frameworks',
    height: 608,
    nodes: [
      { id: 'langchain', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'LangChain', type: 'service', description: 'Chains', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'autogpt', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'AutoGPT', type: 'external', description: 'Autonomous', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'crewai', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'CrewAI', type: 'service', description: 'Multi-agent', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dspy', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'DSPy', type: 'service', description: 'Optimize', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: ' llamaindex', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'LlamaIndex', type: 'external', description: 'RAG', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'haystack', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Haystack', type: 'service', description: 'NLP', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'semantic', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Semantic Kernel', type: 'service', description: 'Microsoft', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'tools', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Tools', type: 'service', description: 'Integrate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'memory', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Memory', type: 'database', description: 'Store', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'framework', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Frameworks', type: 'client', description: 'AI Agents', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'langchain', target: 'autogpt', animated: true },
      { id: 'e1', source: 'autogpt', target: 'crewai', animated: true },
      { id: 'e2', source: 'crewai', target: 'dspy', animated: true },
      { id: 'e3', source: 'dspy', target: ' llamaindex', animated: true },
      { id: 'e4', source: ' llamaindex', target: 'haystack', animated: true },
      { id: 'e5', source: 'haystack', target: 'semantic', animated: true },
      { id: 'e6', source: 'semantic', target: 'tools', animated: true },
      { id: 'e7', source: 'tools', target: 'memory', animated: true },
      { id: 'e8', source: 'memory', target: 'framework', animated: true }
    ],
  },
  'how-openais-gpt-oss-120b-and-20b-models-work': {
    title: 'GPT-OSS Architecture',
    height: 567,
    nodes: [
      { id: 'input', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Input', type: 'client', description: 'Prompt', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'token', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Tokenize', type: 'service', description: 'BPE', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'model120b', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'GPT-OSS 120B', type: 'external', description: 'Large', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'model20b', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'GPT-OSS 20B', type: 'external', description: 'Small', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'transformer', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Transformer', type: 'gateway', description: 'Layers', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'output', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Output', type: 'client', description: 'Generate', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'input', target: 'token', animated: true },
      { id: 'e1', source: 'token', target: 'model120b', animated: true },
      { id: 'e2', source: 'token', target: 'model20b', animated: true },
      { id: 'e3', source: 'model120b', target: 'transformer', animated: true },
      { id: 'e4', source: 'model20b', target: 'transformer', animated: true },
      { id: 'e5', source: 'transformer', target: 'output', animated: true }
    ],
  },
  'ai-agent-versus-mcp-2': {
    title: 'AI Agent vs MCP (v2)',
    height: 567,
    nodes: [
      { id: 'agent', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'AI Agent', type: 'external', description: 'Autonomous', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'mcp', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'MCP', type: 'gateway', description: 'Protocol', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'tools', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Tools', type: 'service', description: 'Functions', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'context', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Context', type: 'cache', description: 'Shared', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'goal', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Goal', type: 'client', description: 'Objective', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'communicate', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Communicate', type: 'gateway', description: 'Standard', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'agent', target: 'tools', animated: true },
      { id: 'e1', source: 'mcp', target: 'context', animated: true },
      { id: 'e2', source: 'tools', target: 'goal', animated: true },
      { id: 'e3', source: 'context', target: 'communicate', animated: true },
      { id: 'e4', source: 'agent', target: 'mcp', animated: true }
    ],
  },
  'the-open-source-rag-stack': {
    title: 'Open Source RAG Stack',
    height: 608,
    nodes: [
      { id: 'llama', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'LlamaIndex', type: 'external', description: 'Framework', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'langchain', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'LangChain', type: 'service', description: 'Chains', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ollama', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Ollama', type: 'external', description: 'Local LLM', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'chroma', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'ChromaDB', type: 'database', description: 'Vector DB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'huggingface', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'HuggingFace', type: 'external', description: 'Models', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'sentence', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Sentence Transformers', type: 'service', description: 'Embeddings', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fastapi', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'FastAPI', type: 'gateway', description: 'API', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'open', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Open Source', type: 'client', description: 'RAG', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'llama', target: 'langchain', animated: true },
      { id: 'e1', source: 'langchain', target: 'ollama', animated: true },
      { id: 'e2', source: 'ollama', target: 'chroma', animated: true },
      { id: 'e3', source: 'huggingface', target: 'sentence', animated: true },
      { id: 'e4', source: 'sentence', target: 'fastapi', animated: true },
      { id: 'e5', source: 'chroma', target: 'open', animated: true },
      { id: 'e6', source: 'fastapi', target: 'open', animated: true }
    ],
  },
  'n8n-versus-langgraph': {
    title: 'N8N vs LangGraph',
    height: 567,
    nodes: [
      { id: 'n8n', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'N8N', type: 'external', description: 'No-code', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'langgraph', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'LangGraph', type: 'service', description: 'Code', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'visual', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Visual', type: 'client', description: 'Drag-drop', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'workflow', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Workflow', type: 'gateway', description: 'Automate', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'graph', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Graph', type: 'gateway', description: 'State', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'agent', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Agent', type: 'external', description: 'Complex', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'simple', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Simple', type: 'service', description: 'Quick', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'flexible', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Flexible', type: 'external', description: 'Custom', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'choose', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Needs', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'n8n', target: 'visual', animated: true },
      { id: 'e1', source: 'n8n', target: 'workflow', animated: true },
      { id: 'e2', source: 'langgraph', target: 'graph', animated: true },
      { id: 'e3', source: 'langgraph', target: 'agent', animated: true },
      { id: 'e4', source: 'visual', target: 'simple', animated: true },
      { id: 'e5', source: 'workflow', target: 'simple', animated: true },
      { id: 'e6', source: 'graph', target: 'flexible', animated: true },
      { id: 'e7', source: 'agent', target: 'flexible', animated: true },
      { id: 'e8', source: 'simple', target: 'choose', animated: true },
      { id: 'e9', source: 'flexible', target: 'choose', animated: true }
    ],
  },
  '6-steps-to-create-a-new-ai-model': {
    title: '6 Steps to Create an AI Model',
    height: 675,
    nodes: [
      { id: 'data', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: '1. Data', type: 'database', description: 'Collect', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'clean', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: '2. Clean', type: 'service', description: 'Preprocess', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'model', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: '3. Model', type: 'gateway', description: 'Choose', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'train', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: '4. Train', type: 'service', description: 'Fit', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'eval', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: '5. Evaluate', type: 'gateway', description: 'Metrics', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: '6. Deploy', type: 'external', description: 'Serve', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Monitor', type: 'external', description: 'Track', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'data', target: 'clean', animated: true },
      { id: 'e1', source: 'clean', target: 'model', animated: true },
      { id: 'e2', source: 'model', target: 'train', animated: true },
      { id: 'e3', source: 'train', target: 'eval', animated: true },
      { id: 'e4', source: 'eval', target: 'deploy', animated: true },
      { id: 'e5', source: 'deploy', target: 'monitor', animated: true }
    ],
  },
  'access-control-clearly-explained': {
    title: 'Access Control',
    height: 567,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'User', type: 'client', description: 'Request', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'authn', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'AuthN', type: 'gateway', description: 'Who', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'authz', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'AuthZ', type: 'gateway', description: 'What', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'resource', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Resource', type: 'database', description: 'Protect', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'rbac', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'RBAC', type: 'service', description: 'Roles', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'abac', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'ABAC', type: 'service', description: 'Attributes', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'acl', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'ACL', type: 'service', description: 'Lists', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'authn', animated: true },
      { id: 'e1', source: 'authn', target: 'authz', animated: true },
      { id: 'e2', source: 'authz', target: 'resource', animated: true },
      { id: 'e3', source: 'authz', target: 'rbac', animated: true },
      { id: 'e4', source: 'rbac', target: 'abac', animated: true },
      { id: 'e5', source: 'abac', target: 'acl', animated: true }
    ],
  },
  'full-fine-tuning-vs-lora-vs-rag': {
    title: 'Fine-tuning vs LoRA vs RAG',
    height: 608,
    nodes: [
      { id: 'full', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Full Fine-tune', type: 'service', description: 'All params', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'lora', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'LoRA', type: 'gateway', description: 'Low rank', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'rag', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'RAG', type: 'gateway', description: 'Retrieve', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'cost', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Cost', type: 'external', description: 'High/Med/Low', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'data', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Data', type: 'database', description: 'Training', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'adapt', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Adapt', type: 'service', description: 'Domain', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'choose', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Choose', type: 'client', description: 'Use case', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'full', target: 'cost', animated: true },
      { id: 'e1', source: 'lora', target: 'cost', animated: true },
      { id: 'e2', source: 'rag', target: 'cost', animated: true },
      { id: 'e3', source: 'full', target: 'data', animated: true },
      { id: 'e4', source: 'lora', target: 'adapt', animated: true },
      { id: 'e5', source: 'rag', target: 'adapt', animated: true },
      { id: 'e6', source: 'data', target: 'choose', animated: true },
      { id: 'e7', source: 'adapt', target: 'choose', animated: true }
    ],
  },
  'mcp-vs-api-whats-the-difference': {
    title: 'MCP vs API',
    height: 567,
    nodes: [
      { id: 'api', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'API', type: 'gateway', description: 'Request/response', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'mcp', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'MCP', type: 'external', description: 'Model context', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'http', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'HTTP/REST', type: 'service', description: 'Standard', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'grpc', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'gRPC', type: 'service', description: 'Binary', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'context', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Context', type: 'cache', description: 'Shared state', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'tool', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Tools', type: 'service', description: 'Function call', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'sync', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Synchronous', type: 'service', description: 'Wait for resp', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'async', type: 'systemNode', position: { x: 638, y: 419 }, data: { label: 'Asynchronous', type: 'queue', description: 'Event-driven', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'choose', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Based on need', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'api', target: 'http', animated: true },
      { id: 'e1', source: 'api', target: 'grpc', animated: true },
      { id: 'e2', source: 'mcp', target: 'context', animated: true },
      { id: 'e3', source: 'mcp', target: 'tool', animated: true },
      { id: 'e4', source: 'http', target: 'sync', animated: true },
      { id: 'e5', source: 'grpc', target: 'sync', animated: true },
      { id: 'e6', source: 'context', target: 'async', animated: true },
      { id: 'e7', source: 'tool', target: 'async', animated: true },
      { id: 'e8', source: 'sync', target: 'choose', animated: true },
      { id: 'e9', source: 'async', target: 'choose', animated: true }
    ],
  },
  'types-of-ai-agents': {
    title: 'AI Agent Types',
    height: 567,
    nodes: [
      { id: 'reactive', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Reactive', type: 'service', description: 'No memory', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deliberative', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Deliberative', type: 'gateway', description: 'Plan', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'hybrid', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Hybrid', type: 'gateway', description: 'Both', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'multi', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Multi-agent', type: 'external', description: 'Collaborate', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'goal', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Goal-based', type: 'service', description: 'Objective', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'learning', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Learning', type: 'external', description: 'Adapt', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'autonomous', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Autonomous', type: 'gateway', description: 'Self-run', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'types', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Agent Types', type: 'client', description: 'AI', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'reactive', target: 'deliberative', animated: true },
      { id: 'e1', source: 'deliberative', target: 'hybrid', animated: true },
      { id: 'e2', source: 'hybrid', target: 'multi', animated: true },
      { id: 'e3', source: 'multi', target: 'goal', animated: true },
      { id: 'e4', source: 'goal', target: 'learning', animated: true },
      { id: 'e5', source: 'learning', target: 'autonomous', animated: true },
      { id: 'e6', source: 'autonomous', target: 'types', animated: true }
    ],
  },
  'how-ai-agents-chain-tools-memory-and-reasoning': {
    title: 'AI Agent Components',
    height: 567,
    nodes: [
      { id: 'reasoning', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Reasoning', type: 'gateway', description: 'Brain', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'memory', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'Memory', type: 'database', description: 'Short/long term', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'tools', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Tools', type: 'service', description: 'APIs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'planning', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'Planning', type: 'gateway', description: 'Strategy', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'observation', type: 'systemNode', position: { x: 150, y: 338 }, data: { label: 'Observation', type: 'client', description: 'Perceive', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'action', type: 'systemNode', position: { x: 375, y: 338 }, data: { label: 'Action', type: 'service', description: 'Execute', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'feedback', type: 'systemNode', position: { x: 600, y: 338 }, data: { label: 'Feedback', type: 'queue', description: 'Learn', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'agent', type: 'systemNode', position: { x: 375, y: 500 }, data: { label: 'AI Agent', type: 'client', description: 'Autonomous', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'reasoning', target: 'memory', animated: true },
      { id: 'e1', source: 'reasoning', target: 'tools', animated: true },
      { id: 'e2', source: 'reasoning', target: 'planning', animated: true },
      { id: 'e3', source: 'memory', target: 'observation', animated: true },
      { id: 'e4', source: 'tools', target: 'action', animated: true },
      { id: 'e5', source: 'planning', target: 'feedback', animated: true },
      { id: 'e6', source: 'observation', target: 'agent', animated: true },
      { id: 'e7', source: 'action', target: 'agent', animated: true },
      { id: 'e8', source: 'feedback', target: 'agent', animated: true }
    ],
  },
  'rag-vs-fine-tuning-which-one-should-you-use': {
    title: 'RAG vs Fine-tuning',
    height: 567,
    nodes: [
      { id: 'rag', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'RAG', type: 'gateway', description: 'Retrieve', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'finetune', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Fine-tuning', type: 'service', description: 'Train', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'docs', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Documents', type: 'database', description: 'External', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'vector', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Vector DB', type: 'database', description: 'Search', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'data', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Training Data', type: 'database', description: 'Curated', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'model', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Model', type: 'external', description: 'Update weights', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'dynamic', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Dynamic', type: 'service', description: 'Real-time', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'static', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Static', type: 'external', description: 'Fixed', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'choose', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Use case', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'rag', target: 'docs', animated: true },
      { id: 'e1', source: 'rag', target: 'vector', animated: true },
      { id: 'e2', source: 'finetune', target: 'data', animated: true },
      { id: 'e3', source: 'finetune', target: 'model', animated: true },
      { id: 'e4', source: 'vector', target: 'dynamic', animated: true },
      { id: 'e5', source: 'model', target: 'static', animated: true },
      { id: 'e6', source: 'dynamic', target: 'choose', animated: true },
      { id: 'e7', source: 'static', target: 'choose', animated: true }
    ],
  },
  'why-is-deepseek-ocr-such-a-big-deal': {
    title: 'DeepSeek OCR',
    height: 540,
    nodes: [
      { id: 'image', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Image', type: 'client', description: 'Document', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'preprocess', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Preprocess', type: 'service', description: 'Enhance', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'model', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'DeepSeek', type: 'external', description: 'Vision model', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'ocr', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'OCR', type: 'gateway', description: 'Text extract', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'layout', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Layout', type: 'service', description: 'Structure', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'table', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Table', type: 'service', description: 'Parse', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'formula', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Formula', type: 'external', description: 'Math', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'accurate', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Accurate', type: 'client', description: 'DeepSeek OCR', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'image', target: 'preprocess', animated: true },
      { id: 'e1', source: 'preprocess', target: 'model', animated: true },
      { id: 'e2', source: 'model', target: 'ocr', animated: true },
      { id: 'e3', source: 'ocr', target: 'layout', animated: true },
      { id: 'e4', source: 'layout', target: 'table', animated: true },
      { id: 'e5', source: 'table', target: 'formula', animated: true },
      { id: 'e6', source: 'formula', target: 'accurate', animated: true }
    ],
  },
  'the-ai-agent-tech-stack': {
    title: 'AI Agent Tech Stack',
    height: 608,
    nodes: [
      { id: 'llm', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'LLM', type: 'external', description: 'GPT/Claude', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'framework', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Framework', type: 'gateway', description: 'LangChain', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tools', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Tools', type: 'service', description: 'APIs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'memory', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Memory', type: 'database', description: 'Vector DB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'planning', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Planning', type: 'gateway', description: 'Reasoning', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'observation', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Observation', type: 'client', description: 'Perceive', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'action', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Action', type: 'service', description: 'Execute', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Deploy', type: 'service', description: 'Serve', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'agent', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'AI Agent', type: 'client', description: 'Stack', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'llm', target: 'framework', animated: true },
      { id: 'e1', source: 'framework', target: 'tools', animated: true },
      { id: 'e2', source: 'tools', target: 'memory', animated: true },
      { id: 'e3', source: 'memory', target: 'planning', animated: true },
      { id: 'e4', source: 'planning', target: 'observation', animated: true },
      { id: 'e5', source: 'observation', target: 'action', animated: true },
      { id: 'e6', source: 'action', target: 'deploy', animated: true },
      { id: 'e7', source: 'deploy', target: 'agent', animated: true }
    ],
  },
  'how-to-build-a-basic-rag-application-on-aws': {
    title: 'RAG on AWS',
    height: 608,
    nodes: [
      { id: 's3', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'S3', type: 'database', description: 'Documents', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'lambda', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Lambda', type: 'service', description: 'Process', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'bedrock', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Bedrock', type: 'external', description: 'Embedding', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'opensearch', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'OpenSearch', type: 'database', description: 'Vector DB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'api', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'API Gateway', type: 'gateway', description: 'Entry', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'query', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'User Query', type: 'client', description: 'Question', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'retrieve', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Retrieve', type: 'service', description: 'Search', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'llm', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'LLM', type: 'external', description: 'Generate', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'response', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Response', type: 'client', description: 'Answer', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 's3', target: 'lambda', animated: true },
      { id: 'e1', source: 'lambda', target: 'bedrock', animated: true },
      { id: 'e2', source: 'bedrock', target: 'opensearch', animated: true },
      { id: 'e3', source: 'api', target: 'query', animated: true },
      { id: 'e4', source: 'query', target: 'retrieve', animated: true },
      { id: 'e5', source: 'retrieve', target: 'opensearch', animated: true },
      { id: 'e6', source: 'retrieve', target: 'llm', animated: true },
      { id: 'e7', source: 'llm', target: 'response', animated: true }
    ],
  },
  'virtualization-vs-containerization-2': {
    title: 'Virtualization vs Containerization',
    height: 608,
    nodes: [
      { id: 'hardware', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Hardware', type: 'database', description: 'Physical server', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'hypervisor', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'Hypervisor', type: 'gateway', description: 'VM management', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'docker-engine', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'Docker Engine', type: 'gateway', description: 'Container runtime', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'vm1', type: 'systemNode', position: { x: 75, y: 338 }, data: { label: 'VM 1', type: 'service', description: 'OS + App', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'vm2', type: 'systemNode', position: { x: 300, y: 338 }, data: { label: 'VM 2', type: 'service', description: 'OS + App', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'container1', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'Container 1', type: 'service', description: 'App only', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'container2', type: 'systemNode', position: { x: 750, y: 338 }, data: { label: 'Container 2', type: 'service', description: 'App only', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'heavy', type: 'systemNode', position: { x: 188, y: 500 }, data: { label: 'Heavy', type: 'external', description: 'GBs per VM', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'light', type: 'systemNode', position: { x: 638, y: 500 }, data: { label: 'Light', type: 'external', description: 'MBs per container', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'hardware', target: 'hypervisor', animated: true },
      { id: 'e1', source: 'hardware', target: 'docker-engine', animated: true },
      { id: 'e2', source: 'hypervisor', target: 'vm1', animated: true },
      { id: 'e3', source: 'hypervisor', target: 'vm2', animated: true },
      { id: 'e4', source: 'docker-engine', target: 'container1', animated: true },
      { id: 'e5', source: 'docker-engine', target: 'container2', animated: true },
      { id: 'e6', source: 'vm1', target: 'heavy', animated: true },
      { id: 'e7', source: 'container1', target: 'light', animated: true }
    ],
  },
  'how-do-airtags-work': {
    title: 'AirTag Architecture',
    height: 567,
    nodes: [
      { id: 'tag', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'AirTag', type: 'external', description: 'Device', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'ble', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Bluetooth', type: 'gateway', description: 'Low energy', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'iphone', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'iPhone', type: 'client', description: 'Relay', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'findmy', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Find My', type: 'service', description: 'Network', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'uwb', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'UWB', type: 'gateway', description: 'Precision', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'location', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Location', type: 'database', description: 'Encrypted', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'owner', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Owner', type: 'client', description: 'See', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'tag', target: 'ble', animated: true },
      { id: 'e1', source: 'ble', target: 'iphone', animated: true },
      { id: 'e2', source: 'iphone', target: 'findmy', animated: true },
      { id: 'e3', source: 'tag', target: 'uwb', animated: true },
      { id: 'e4', source: 'uwb', target: 'location', animated: true },
      { id: 'e5', source: 'findmy', target: 'owner', animated: true },
      { id: 'e6', source: 'location', target: 'owner', animated: true }
    ],
  },
  'virtualization-explained-from-bare-metal-to-hosted': {
    title: 'Virtualization Types',
    height: 567,
    nodes: [
      { id: 'bare', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Bare Metal', type: 'database', description: 'Type 1', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'hosted', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Hosted', type: 'service', description: 'Type 2', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'hardware', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Hardware', type: 'database', description: 'Physical', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'hypervisor', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Hypervisor', type: 'gateway', description: 'VMM', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'vm1', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'VM 1', type: 'service', description: 'Guest OS', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'vm2', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'VM 2', type: 'service', description: 'Guest OS', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'container', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Container', type: 'external', description: 'Docker', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'isolate', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Isolation', type: 'gateway', description: 'Secure', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'virtual', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Virtualization', type: 'client', description: 'Abstract', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'bare', target: 'hosted', animated: true },
      { id: 'e1', source: 'hosted', target: 'hardware', animated: true },
      { id: 'e2', source: 'hardware', target: 'hypervisor', animated: true },
      { id: 'e3', source: 'hypervisor', target: 'vm1', animated: true },
      { id: 'e4', source: 'hypervisor', target: 'vm2', animated: true },
      { id: 'e5', source: 'vm2', target: 'container', animated: true },
      { id: 'e6', source: 'container', target: 'isolate', animated: true },
      { id: 'e7', source: 'isolate', target: 'virtual', animated: true }
    ],
  },
  'hub-switch-router-explained': {
    title: 'Hub vs Switch vs Router',
    height: 567,
    nodes: [
      { id: 'hub', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Hub', type: 'service', description: 'Layer 1', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'switch', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Switch', type: 'gateway', description: 'Layer 2', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'router', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Router', type: 'gateway', description: 'Layer 3', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'broadcast', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Broadcast', type: 'external', description: 'All ports', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'mac', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'MAC table', type: 'cache', description: 'Learn', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'ip', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'IP routing', type: 'gateway', description: 'Forward', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'compare', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Compare', type: 'client', description: 'Choose', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'hub', target: 'broadcast', animated: true },
      { id: 'e1', source: 'switch', target: 'mac', animated: true },
      { id: 'e2', source: 'router', target: 'ip', animated: true },
      { id: 'e3', source: 'broadcast', target: 'compare', animated: true },
      { id: 'e4', source: 'mac', target: 'compare', animated: true },
      { id: 'e5', source: 'ip', target: 'compare', animated: true }
    ],
  },
  'the-ultimate-api-learning-roadmap': {
    title: 'API Learning Roadmap',
    height: 608,
    nodes: [
      { id: 'http', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'HTTP Basics', type: 'gateway', description: 'Methods, status', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'rest', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'REST', type: 'service', description: 'Resources, CRUD', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'json', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'JSON/XML', type: 'cache', description: 'Data format', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'auth', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Authentication', type: 'gateway', description: 'JWT, OAuth', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'design', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'API Design', type: 'service', description: 'Versioning, docs', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'test', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Testing', type: 'service', description: 'Postman, unit', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'graphql', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'GraphQL', type: 'external', description: 'Queries', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'grpc', type: 'systemNode', position: { x: 188, y: 405 }, data: { label: 'gRPC', type: 'external', description: 'Protobuf', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'webhook', type: 'systemNode', position: { x: 413, y: 405 }, data: { label: 'Webhooks', type: 'queue', description: 'Events', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'expert', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'API Expert', type: 'client', description: 'Design at scale', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'http', target: 'rest', animated: true },
      { id: 'e1', source: 'rest', target: 'json', animated: true },
      { id: 'e2', source: 'json', target: 'auth', animated: true },
      { id: 'e3', source: 'auth', target: 'design', animated: true },
      { id: 'e4', source: 'design', target: 'test', animated: true },
      { id: 'e5', source: 'test', target: 'graphql', animated: true },
      { id: 'e6', source: 'graphql', target: 'grpc', animated: true },
      { id: 'e7', source: 'grpc', target: 'webhook', animated: true },
      { id: 'e8', source: 'webhook', target: 'expert', animated: true }
    ],
  },
  'top-12-tips-for-api-security': {
    title: 'API Security Checklist',
    height: 743,
    nodes: [
      { id: 'https', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'HTTPS', type: 'gateway', description: 'TLS encryption', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'oauth', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'OAuth2', type: 'external', description: 'Delegated auth', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'webauthn', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'WebAuthn', type: 'external', description: 'Passwordless', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'api-keys', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Leveled API Keys', type: 'cache', description: 'Scoped access', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'authz', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Authorization', type: 'gateway', description: 'RBAC/ABAC', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'rate-limit', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Rate Limiting', type: 'gateway', description: 'Throttle', metric: '10K QPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'input-val', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Input Validation', type: 'service', description: 'Sanitize', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cors', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'CORS', type: 'service', description: 'Origin control', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'logging', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Audit Logging', type: 'database', description: 'Track access', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'versioning', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Versioning', type: 'service', description: 'Deprecate old', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'errors', type: 'systemNode', position: { x: 750, y: 419 }, data: { label: 'Error Handling', type: 'service', description: 'No leak info', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'secure', type: 'systemNode', position: { x: 413, y: 594 }, data: { label: 'Secure API', type: 'client', description: 'Defense in depth', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'https', target: 'authz', animated: true },
      { id: 'e1', source: 'oauth', target: 'rate-limit', animated: true },
      { id: 'e2', source: 'webauthn', target: 'input-val', animated: true },
      { id: 'e3', source: 'api-keys', target: 'input-val', animated: true },
      { id: 'e4', source: 'authz', target: 'cors', animated: true },
      { id: 'e5', source: 'rate-limit', target: 'logging', animated: true },
      { id: 'e6', source: 'input-val', target: 'versioning', animated: true },
      { id: 'e7', source: 'cors', target: 'secure', animated: true },
      { id: 'e8', source: 'logging', target: 'secure', animated: true },
      { id: 'e9', source: 'versioning', target: 'errors', animated: true },
      { id: 'e10', source: 'errors', target: 'secure', animated: true }
    ],
  },
  'top-5-common-ways-to-improve-api-performance': {
    title: 'API Performance Optimization',
    height: 608,
    nodes: [
      { id: 'pagination', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Pagination', type: 'service', description: 'Limit/offset', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'caching', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Caching', type: 'cache', description: 'Redis/CDN', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'compression', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Compression', type: 'gateway', description: 'Gzip/Brotli', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'async', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Async', type: 'queue', description: 'Queue heavy tasks', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'db-opt', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'DB Optimization', type: 'database', description: 'Index, query', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'connection', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Connection Pool', type: 'gateway', description: 'Reuse', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'batch', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Batching', type: 'service', description: 'Bulk ops', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fast', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Fast API', type: 'client', description: '< 200ms', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'pagination', target: 'db-opt', animated: true },
      { id: 'e1', source: 'caching', target: 'connection', animated: true },
      { id: 'e2', source: 'compression', target: 'batch', animated: true },
      { id: 'e3', source: 'async', target: 'batch', animated: true },
      { id: 'e4', source: 'db-opt', target: 'fast', animated: true },
      { id: 'e5', source: 'connection', target: 'fast', animated: true },
      { id: 'e6', source: 'batch', target: 'fast', animated: true }
    ],
  },
  '30-free-apis-for-developers': {
    title: '30 Free APIs for Developers',
    height: 608,
    nodes: [
      { id: 'weather', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Weather', type: 'external', description: 'OpenWeather', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'maps', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Maps', type: 'external', description: 'Google Maps', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'payment', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Payment', type: 'external', description: 'Stripe', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'auth', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Auth', type: 'gateway', description: 'Auth0', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'social', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Social', type: 'external', description: 'Twitter', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'email', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Email', type: 'service', description: 'SendGrid', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'sms', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'SMS', type: 'service', description: 'Twilio', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'storage', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Storage', type: 'database', description: 'Cloudinary', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'ml', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'ML', type: 'external', description: 'OpenAI', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'apis', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: '30+ APIs', type: 'client', description: 'Free', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'weather', target: 'maps', animated: true },
      { id: 'e1', source: 'maps', target: 'payment', animated: true },
      { id: 'e2', source: 'payment', target: 'auth', animated: true },
      { id: 'e3', source: 'auth', target: 'social', animated: true },
      { id: 'e4', source: 'social', target: 'email', animated: true },
      { id: 'e5', source: 'email', target: 'sms', animated: true },
      { id: 'e6', source: 'sms', target: 'storage', animated: true },
      { id: 'e7', source: 'storage', target: 'ml', animated: true },
      { id: 'e8', source: 'ml', target: 'apis', animated: true }
    ],
  },
  'http1-http2-http3': {
    title: 'HTTP Evolution',
    height: 567,
    nodes: [
      { id: 'http1', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'HTTP/1.1', type: 'service', description: '1997', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'http2', type: 'systemNode', position: { x: 450, y: 68 }, data: { label: 'HTTP/2', type: 'gateway', description: '2015', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http3', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'HTTP/3', type: 'external', description: 'QUIC', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'text', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Text', type: 'service', description: 'Human readable', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'binary', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Binary', type: 'gateway', description: 'Efficient', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'quic', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'QUIC', type: 'external', description: 'UDP-based', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'fast', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Fast', type: 'external', description: '0-RTT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'sequential', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Sequential', type: 'service', description: 'One at a time', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'multiplex', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Multiplex', type: 'gateway', description: 'Parallel', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'modern', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Modern Web', type: 'client', description: 'HTTP/3', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'http1', target: 'text', animated: true },
      { id: 'e1', source: 'text', target: 'sequential', animated: true },
      { id: 'e2', source: 'http2', target: 'binary', animated: true },
      { id: 'e3', source: 'binary', target: 'multiplex', animated: true },
      { id: 'e4', source: 'http3', target: 'quic', animated: true },
      { id: 'e5', source: 'quic', target: 'fast', animated: true },
      { id: 'e6', source: 'sequential', target: 'modern', animated: true },
      { id: 'e7', source: 'multiplex', target: 'modern', animated: true },
      { id: 'e8', source: 'fast', target: 'modern', animated: true }
    ],
  },
  'structure-of-url': {
    title: 'URL Structure',
    height: 473,
    nodes: [
      { id: 'protocol', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Protocol', type: 'gateway', description: 'https://', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'domain', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Domain', type: 'service', description: 'example.com', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'port', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Port', type: 'service', description: ':443', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'path', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Path', type: 'database', description: '/path', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'query', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Query', type: 'cache', description: '?key=val', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'fragment', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Fragment', type: 'cache', description: '#section', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'url', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'URL', type: 'client', description: 'Complete', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'protocol', target: 'domain', animated: true },
      { id: 'e1', source: 'domain', target: 'port', animated: true },
      { id: 'e2', source: 'port', target: 'path', animated: true },
      { id: 'e3', source: 'path', target: 'query', animated: true },
      { id: 'e4', source: 'query', target: 'fragment', animated: true },
      { id: 'e5', source: 'fragment', target: 'url', animated: true }
    ],
  },
  'how-to-learn-backend-development': {
    title: 'Backend Development Path',
    height: 675,
    nodes: [
      { id: 'language', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Language', type: 'client', description: 'Python, Go, Java', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'http', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'HTTP', type: 'gateway', description: 'Methods, status', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'database', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Database', type: 'database', description: 'SQL/NoSQL', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'api', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'API Design', type: 'gateway', description: 'REST/GraphQL', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'auth', type: 'systemNode', position: { x: 75, y: 338 }, data: { label: 'Auth', type: 'gateway', description: 'JWT/OAuth', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cache', type: 'systemNode', position: { x: 300, y: 338 }, data: { label: 'Caching', type: 'cache', description: 'Redis', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'queue', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'Queue', type: 'queue', description: 'RabbitMQ', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'test', type: 'systemNode', position: { x: 750, y: 338 }, data: { label: 'Testing', type: 'service', description: 'Unit, integration', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 188, y: 500 }, data: { label: 'Deployment', type: 'service', description: 'Docker, CI/CD', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 413, y: 500 }, data: { label: 'Monitoring', type: 'external', description: 'Logs, metrics', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'scale', type: 'systemNode', position: { x: 638, y: 500 }, data: { label: 'Scaling', type: 'gateway', description: 'Horizontal', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'backend', type: 'systemNode', position: { x: 413, y: 648 }, data: { label: 'Backend Dev', type: 'client', description: 'Full stack', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'language', target: 'http', animated: true },
      { id: 'e1', source: 'http', target: 'database', animated: true },
      { id: 'e2', source: 'database', target: 'api', animated: true },
      { id: 'e3', source: 'api', target: 'auth', animated: true },
      { id: 'e4', source: 'auth', target: 'cache', animated: true },
      { id: 'e5', source: 'cache', target: 'queue', animated: true },
      { id: 'e6', source: 'queue', target: 'test', animated: true },
      { id: 'e7', source: 'test', target: 'deploy', animated: true },
      { id: 'e8', source: 'deploy', target: 'monitor', animated: true },
      { id: 'e9', source: 'monitor', target: 'scale', animated: true },
      { id: 'e10', source: 'scale', target: 'backend', animated: true }
    ],
  },
  'how-to-learn-api-development': {
    title: 'API Development Path',
    height: 608,
    nodes: [
      { id: 'http', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'HTTP Basics', type: 'gateway', description: 'Methods, status', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'json', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'JSON/XML', type: 'cache', description: 'Data format', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'rest', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'REST', type: 'service', description: 'Resources', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'crud', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'CRUD', type: 'service', description: 'Create, read...', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'auth', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Auth', type: 'gateway', description: 'JWT, API keys', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'validation', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Validation', type: 'service', description: 'Input check', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'docs', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Documentation', type: 'external', description: 'OpenAPI', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'test', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Testing', type: 'service', description: 'Postman', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'version', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Versioning', type: 'service', description: '/v1, /v2', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'api-dev', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'API Developer', type: 'client', description: 'Build APIs', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'http', target: 'json', animated: true },
      { id: 'e1', source: 'json', target: 'rest', animated: true },
      { id: 'e2', source: 'rest', target: 'crud', animated: true },
      { id: 'e3', source: 'crud', target: 'auth', animated: true },
      { id: 'e4', source: 'auth', target: 'validation', animated: true },
      { id: 'e5', source: 'validation', target: 'docs', animated: true },
      { id: 'e6', source: 'docs', target: 'test', animated: true },
      { id: 'e7', source: 'test', target: 'version', animated: true },
      { id: 'e8', source: 'version', target: 'api-dev', animated: true }
    ],
  },
  'the-5-pillars-of-api-design': {
    title: '5 Pillars of API Design',
    height: 567,
    nodes: [
      { id: 'usability', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Usability', type: 'client', description: 'Intuitive', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'reliability', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Reliability', type: 'service', description: 'Consistent', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'scalability', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Scalability', type: 'gateway', description: 'Handle growth', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'security', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Security', type: 'gateway', description: 'Protect data', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'performance', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Performance', type: 'cache', description: 'Fast response', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'maintainability', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Maintainability', type: 'service', description: 'Easy update', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'great-api', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Great API', type: 'client', description: 'All pillars', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'usability', target: 'reliability', animated: true },
      { id: 'e1', source: 'reliability', target: 'scalability', animated: true },
      { id: 'e2', source: 'scalability', target: 'security', animated: true },
      { id: 'e3', source: 'security', target: 'performance', animated: true },
      { id: 'e4', source: 'performance', target: 'maintainability', animated: true },
      { id: 'e5', source: 'maintainability', target: 'great-api', animated: true }
    ],
  },
  'top-5-common-ways-to-improve-api-performance-2': {
    title: 'API Performance Optimization',
    height: 608,
    nodes: [
      { id: 'pagination', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Pagination', type: 'service', description: 'Limit/offset/cursor', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'caching', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Caching', type: 'cache', description: 'Redis/CDN/ETag', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'compression', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Compression', type: 'gateway', description: 'Gzip/Brotli', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'async', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Async Processing', type: 'queue', description: 'Queue heavy tasks', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'connection', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Keep-Alive', type: 'gateway', description: 'Reuse TCP', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'db-opt', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'DB Optimization', type: 'database', description: 'Index, query', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'batch', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Batching', type: 'service', description: 'Bulk operations', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fast', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Fast API', type: 'client', description: '< 200ms p99', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'pagination', target: 'connection', animated: true },
      { id: 'e1', source: 'caching', target: 'db-opt', animated: true },
      { id: 'e2', source: 'compression', target: 'batch', animated: true },
      { id: 'e3', source: 'async', target: 'batch', animated: true },
      { id: 'e4', source: 'connection', target: 'fast', animated: true },
      { id: 'e5', source: 'db-opt', target: 'fast', animated: true },
      { id: 'e6', source: 'batch', target: 'fast', animated: true }
    ],
  },
  'tokens-vs-api-keys': {
    title: 'Tokens vs API Keys',
    height: 567,
    nodes: [
      { id: 'api-key', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'API Key', type: 'cache', description: 'Opaque string', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'token', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Token (JWT)', type: 'gateway', description: 'Self-contained', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'simple', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Simple', type: 'service', description: 'Easy to use', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'stateless', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Stateful', type: 'service', description: 'Server lookup', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'rich', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Rich Data', type: 'service', description: 'Claims inside', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'verifiable', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Verifiable', type: 'gateway', description: 'Signature', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'revoke', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Hard to Revoke', type: 'external', description: 'Stateless issue', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'choose', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Choose', type: 'client', description: 'Based on needs', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'api-key', target: 'simple', animated: true },
      { id: 'e1', source: 'api-key', target: 'stateless', animated: true },
      { id: 'e2', source: 'token', target: 'rich', animated: true },
      { id: 'e3', source: 'token', target: 'verifiable', animated: true },
      { id: 'e4', source: 'simple', target: 'revoke', animated: true },
      { id: 'e5', source: 'stateless', target: 'revoke', animated: true },
      { id: 'e6', source: 'rich', target: 'choose', animated: true },
      { id: 'e7', source: 'verifiable', target: 'choose', animated: true },
      { id: 'e8', source: 'revoke', target: 'choose', animated: true }
    ],
  },
  'what-happens-when-you-type-a-url-into-a-browser': {
    title: 'URL to Webpage',
    height: 608,
    nodes: [
      { id: 'url', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'URL', type: 'client', description: 'Type address', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'parse', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Parse', type: 'service', description: 'Protocol, host', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dns', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'DNS', type: 'gateway', description: 'Resolve IP', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tcp', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'TCP', type: 'gateway', description: 'Handshake', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tls', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'TLS', type: 'gateway', description: 'Encrypt', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'HTTP', type: 'service', description: 'Request', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'server', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Server', type: 'service', description: 'Process', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'render', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Render', type: 'client', description: 'DOM, CSS', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'page', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Page', type: 'client', description: 'Loaded', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'url', target: 'parse', animated: true },
      { id: 'e1', source: 'parse', target: 'dns', animated: true },
      { id: 'e2', source: 'dns', target: 'tcp', animated: true },
      { id: 'e3', source: 'tcp', target: 'tls', animated: true },
      { id: 'e4', source: 'tls', target: 'http', animated: true },
      { id: 'e5', source: 'http', target: 'server', animated: true },
      { id: 'e6', source: 'server', target: 'render', animated: true },
      { id: 'e7', source: 'render', target: 'page', animated: true }
    ],
  },
  'how-https-works': {
    title: 'HTTPS Handshake',
    height: 567,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Client', type: 'client', description: 'Browser', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'hello', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Client Hello', type: 'service', description: 'Cipher suites', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'server-hello', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Server Hello', type: 'service', description: 'Certificate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'server', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Server', type: 'service', description: 'Web server', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'key-exchange', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Key Exchange', type: 'gateway', description: 'DH/ECDH', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'session', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Session Key', type: 'cache', description: 'Symmetric', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'encrypt', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Encrypt', type: 'gateway', description: 'AES', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'secure', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Secure', type: 'client', description: 'HTTPS', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'hello', animated: true },
      { id: 'e1', source: 'hello', target: 'server-hello', animated: true },
      { id: 'e2', source: 'server-hello', target: 'server', animated: true },
      { id: 'e3', source: 'server', target: 'key-exchange', animated: true },
      { id: 'e4', source: 'key-exchange', target: 'session', animated: true },
      { id: 'e5', source: 'session', target: 'encrypt', animated: true },
      { id: 'e6', source: 'encrypt', target: 'secure', animated: true }
    ],
  },
  'common-http-status-codes': {
    title: 'HTTP Status Codes',
    height: 608,
    nodes: [
      { id: '1xx', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: '1xx', type: 'service', description: 'Informational', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: '2xx', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: '2xx', type: 'gateway', description: 'Success', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: '3xx', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: '3xx', type: 'gateway', description: 'Redirect', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: '4xx', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: '4xx', type: 'external', description: 'Client error', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: '5xx', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: '5xx', type: 'external', description: 'Server error', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: '200', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: '200 OK', type: 'gateway', description: 'Success', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: '404', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: '404 Not Found', type: 'external', description: 'Missing', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: '500', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: '500 Error', type: 'external', description: 'Server fail', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'status', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Status Codes', type: 'client', description: 'HTTP', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: '1xx', target: '2xx', animated: true },
      { id: 'e1', source: '2xx', target: '3xx', animated: true },
      { id: 'e2', source: '3xx', target: '4xx', animated: true },
      { id: 'e3', source: '4xx', target: '5xx', animated: true },
      { id: 'e4', source: '2xx', target: '200', animated: true },
      { id: 'e5', source: '4xx', target: '404', animated: true },
      { id: 'e6', source: '5xx', target: '500', animated: true },
      { id: 'e7', source: '200', target: 'status', animated: true },
      { id: 'e8', source: '404', target: 'status', animated: true },
      { id: 'e9', source: '500', target: 'status', animated: true }
    ],
  },
  'best-practices-in-api-design': {
    title: 'API Design Best Practices',
    height: 608,
    nodes: [
      { id: 'naming', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Naming', type: 'service', description: 'Nouns, plural', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'versioning', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Versioning', type: 'gateway', description: 'URL/header', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'errors', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Error Handling', type: 'service', description: 'Standard format', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'pagination', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Pagination', type: 'service', description: 'Cursor/offset', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'filtering', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Filtering', type: 'service', description: 'Query params', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'sorting', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Sorting', type: 'service', description: 'Order by', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'partial', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Partial Response', type: 'cache', description: 'Fields', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'idempotency', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Idempotency', type: 'gateway', description: 'Safe retry', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'hateoas', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'HATEOAS', type: 'external', description: 'Self-discover', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'great', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Great API', type: 'client', description: 'Consistent', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'naming', target: 'versioning', animated: true },
      { id: 'e1', source: 'versioning', target: 'errors', animated: true },
      { id: 'e2', source: 'errors', target: 'pagination', animated: true },
      { id: 'e3', source: 'pagination', target: 'filtering', animated: true },
      { id: 'e4', source: 'filtering', target: 'sorting', animated: true },
      { id: 'e5', source: 'sorting', target: 'partial', animated: true },
      { id: 'e6', source: 'partial', target: 'idempotency', animated: true },
      { id: 'e7', source: 'idempotency', target: 'hateoas', animated: true },
      { id: 'e8', source: 'hateoas', target: 'great', animated: true }
    ],
  },
  'api-vs-sdk': {
    title: 'API vs SDK',
    height: 540,
    nodes: [
      { id: 'api', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'API', type: 'gateway', description: 'Interface', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'sdk', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'SDK', type: 'service', description: 'Toolkit', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'rest', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'REST/GraphQL', type: 'service', description: 'HTTP', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'integration', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Integration', type: 'gateway', description: 'Manual', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'libraries', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Libraries', type: 'cache', description: 'Pre-built', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'tools', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Tools', type: 'service', description: 'Debug, docs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'custom', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Custom', type: 'external', description: 'Flexible', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'rapid', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Rapid', type: 'client', description: 'Fast dev', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'api', target: 'rest', animated: true },
      { id: 'e1', source: 'api', target: 'integration', animated: true },
      { id: 'e2', source: 'sdk', target: 'libraries', animated: true },
      { id: 'e3', source: 'sdk', target: 'tools', animated: true },
      { id: 'e4', source: 'rest', target: 'custom', animated: true },
      { id: 'e5', source: 'integration', target: 'custom', animated: true },
      { id: 'e6', source: 'libraries', target: 'rapid', animated: true },
      { id: 'e7', source: 'tools', target: 'rapid', animated: true },
      { id: 'e8', source: 'custom', target: 'rapid', animated: true }
    ],
  },
  'how-to-debug-a-slow-api': {
    title: 'Debugging a Slow API',
    height: 608,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'User Report', type: 'client', description: 'Slow!', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'metrics', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'Check Metrics', type: 'service', description: 'p95, p99', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'logs', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Check Logs', type: 'service', description: 'Errors, trace', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'apm', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'APM Tool', type: 'external', description: 'Distributed trace', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'db', type: 'systemNode', position: { x: 75, y: 338 }, data: { label: 'DB Slow?', type: 'database', description: 'Query time', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'network', type: 'systemNode', position: { x: 300, y: 338 }, data: { label: 'Network?', type: 'gateway', description: 'Latency, DNS', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'code', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'Code?', type: 'service', description: 'Algorithm', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'external', type: 'systemNode', position: { x: 750, y: 338 }, data: { label: 'External?', type: 'external', description: '3rd party', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'fix', type: 'systemNode', position: { x: 300, y: 500 }, data: { label: 'Apply Fix', type: 'gateway', description: 'Optimize', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'verify', type: 'systemNode', position: { x: 525, y: 500 }, data: { label: 'Verify', type: 'client', description: 'Monitor', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'metrics', animated: true },
      { id: 'e1', source: 'user', target: 'logs', animated: true },
      { id: 'e2', source: 'user', target: 'apm', animated: true },
      { id: 'e3', source: 'metrics', target: 'db', animated: true },
      { id: 'e4', source: 'logs', target: 'network', animated: true },
      { id: 'e5', source: 'apm', target: 'code', animated: true },
      { id: 'e6', source: 'db', target: 'fix', animated: true },
      { id: 'e7', source: 'network', target: 'fix', animated: true },
      { id: 'e8', source: 'code', target: 'fix', animated: true },
      { id: 'e9', source: 'external', target: 'fix', animated: true },
      { id: 'e10', source: 'fix', target: 'verify', animated: true }
    ],
  },
  'how-to-design-good-apis': {
    title: 'Good API Design Principles',
    height: 608,
    nodes: [
      { id: 'consistent', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Consistency', type: 'gateway', description: 'Same patterns', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'intuitive', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Intuitive', type: 'client', description: 'Easy to use', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'documented', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Documented', type: 'external', description: 'OpenAPI', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'versioned', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Versioned', type: 'gateway', description: '/v1, /v2', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'secure', type: 'systemNode', position: { x: 150, y: 243 }, data: { label: 'Secure', type: 'gateway', description: 'Auth, rate limit', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'performant', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Performant', type: 'cache', description: 'Caching, pagination', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'testable', type: 'systemNode', position: { x: 600, y: 243 }, data: { label: 'Testable', type: 'service', description: 'Mock, sandbox', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'resilient', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Resilient', type: 'service', description: 'Errors, retries', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'great', type: 'systemNode', position: { x: 375, y: 540 }, data: { label: 'Great API', type: 'client', description: 'Invisible', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'consistent', target: 'secure', animated: true },
      { id: 'e1', source: 'intuitive', target: 'performant', animated: true },
      { id: 'e2', source: 'documented', target: 'testable', animated: true },
      { id: 'e3', source: 'versioned', target: 'resilient', animated: true },
      { id: 'e4', source: 'secure', target: 'great', animated: true },
      { id: 'e5', source: 'performant', target: 'great', animated: true },
      { id: 'e6', source: 'testable', target: 'great', animated: true },
      { id: 'e7', source: 'resilient', target: 'great', animated: true }
    ],
  },
  'popular-backend-tech-stack': {
    title: 'Backend Tech Stack',
    height: 608,
    nodes: [
      { id: 'language', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Language', type: 'client', description: 'Node, Python, Go', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'framework', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Framework', type: 'service', description: 'Express, Django', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'database', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Database', type: 'database', description: 'PostgreSQL', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cache', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Cache', type: 'cache', description: 'Redis', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'api', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'API', type: 'gateway', description: 'REST/GraphQL', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'auth', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Auth', type: 'gateway', description: 'JWT/OAuth', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'queue', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Queue', type: 'queue', description: 'RabbitMQ', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'docker', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Docker', type: 'service', description: 'Containerize', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'k8s', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Kubernetes', type: 'external', description: 'Orchestrate', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'backend', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Backend', type: 'client', description: 'Full stack', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'language', target: 'framework', animated: true },
      { id: 'e1', source: 'framework', target: 'database', animated: true },
      { id: 'e2', source: 'framework', target: 'cache', animated: true },
      { id: 'e3', source: 'api', target: 'auth', animated: true },
      { id: 'e4', source: 'auth', target: 'queue', animated: true },
      { id: 'e5', source: 'database', target: 'docker', animated: true },
      { id: 'e6', source: 'cache', target: 'k8s', animated: true },
      { id: 'e7', source: 'docker', target: 'backend', animated: true },
      { id: 'e8', source: 'k8s', target: 'backend', animated: true }
    ],
  },
  'http-vs-https': {
    title: 'HTTP vs HTTPS',
    height: 540,
    nodes: [
      { id: 'http', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'HTTP', type: 'service', description: 'Port 80', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'https', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'HTTPS', type: 'gateway', description: 'Port 443', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'plain', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Plain Text', type: 'external', description: 'Unencrypted', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'tls', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'TLS/SSL', type: 'gateway', description: 'Encrypted', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'certificate', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Certificate', type: 'cache', description: 'X.509', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'secure', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Secure', type: 'external', description: 'Auth + Encrypt', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'fast', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Fast', type: 'service', description: 'No overhead', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'safe', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Safe', type: 'client', description: 'Protected', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'http', target: 'plain', animated: true },
      { id: 'e1', source: 'http', target: 'fast', animated: true },
      { id: 'e2', source: 'https', target: 'tls', animated: true },
      { id: 'e3', source: 'tls', target: 'certificate', animated: true },
      { id: 'e4', source: 'certificate', target: 'secure', animated: true },
      { id: 'e5', source: 'https', target: 'safe', animated: true },
      { id: 'e6', source: 'fast', target: 'safe', animated: true }
    ],
  },
  '5-rest-api-authentication-methods': {
    title: '5 API Authentication Methods',
    height: 675,
    nodes: [
      { id: 'basic', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Basic Auth', type: 'gateway', description: 'Base64 user:pass', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'api-key', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'API Key', type: 'cache', description: 'Header param', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'jwt', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'JWT', type: 'gateway', description: 'Signed token', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'oauth', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'OAuth 2.0', type: 'external', description: 'Delegated auth', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'mfa', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'MFA', type: 'service', description: '2FA/OTP', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'session', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Session', type: 'cache', description: 'Cookie-based', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'scope', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Scope', type: 'service', description: 'Permissions', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'compare', type: 'systemNode', position: { x: 375, y: 405 }, data: { label: 'Comparison', type: 'external', description: 'Security vs ease', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'choose', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Based on needs', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'basic', target: 'mfa', animated: true },
      { id: 'e1', source: 'api-key', target: 'session', animated: true },
      { id: 'e2', source: 'jwt', target: 'scope', animated: true },
      { id: 'e3', source: 'oauth', target: 'scope', animated: true },
      { id: 'e4', source: 'mfa', target: 'compare', animated: true },
      { id: 'e5', source: 'session', target: 'compare', animated: true },
      { id: 'e6', source: 'scope', target: 'compare', animated: true },
      { id: 'e7', source: 'compare', target: 'choose', animated: true }
    ],
  },
  'what-is-a-rest-api': {
    title: 'REST API Principles',
    height: 540,
    nodes: [
      { id: 'resource', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Resource', type: 'database', description: 'User, Order', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'url', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'URL', type: 'gateway', description: '/users/123', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http', type: 'systemNode', position: { x: 450, y: 176 }, data: { label: 'HTTP Method', type: 'gateway', description: 'GET/POST/PUT/DELETE', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'stateless', type: 'systemNode', position: { x: 750, y: 176 }, data: { label: 'Stateless', type: 'service', description: 'No session', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'json', type: 'systemNode', position: { x: 150, y: 338 }, data: { label: 'JSON/XML', type: 'cache', description: 'Representation', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'status', type: 'systemNode', position: { x: 450, y: 338 }, data: { label: 'Status Code', type: 'service', description: '200, 404, 500', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'client', type: 'systemNode', position: { x: 750, y: 338 }, data: { label: 'Client', type: 'client', description: 'Consumer', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'server', type: 'systemNode', position: { x: 375, y: 500 }, data: { label: 'Server', type: 'service', description: 'Provider', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } }
    ],
    edges: [
      { id: 'e0', source: 'resource', target: 'url', animated: true },
      { id: 'e1', source: 'resource', target: 'http', animated: true },
      { id: 'e2', source: 'http', target: 'stateless', animated: true },
      { id: 'e3', source: 'url', target: 'json', animated: true },
      { id: 'e4', source: 'http', target: 'status', animated: true },
      { id: 'e5', source: 'json', target: 'client', animated: true },
      { id: 'e6', source: 'status', target: 'client', animated: true },
      { id: 'e7', source: 'client', target: 'server', animated: true }
    ],
  },
  'the-http-mindmap': {
    title: 'HTTP Evolution',
    height: 540,
    nodes: [
      { id: 'http1', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'HTTP/1.1', type: 'service', description: '1997, text', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'http2', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'HTTP/2', type: 'gateway', description: '2015, binary', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http3', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'HTTP/3', type: 'external', description: 'QUIC, UDP', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'persistent', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Persistent', type: 'service', description: 'Keep-alive', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'pipelining', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Pipelining', type: 'service', description: 'Multiple reqs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'multiplex', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Multiplex', type: 'gateway', description: 'Single conn', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'push', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Server Push', type: 'gateway', description: 'Proactive', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'quic', type: 'systemNode', position: { x: 375, y: 419 }, data: { label: 'QUIC', type: 'external', description: '0-RTT', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'fast', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Faster Web', type: 'client', description: 'Modern HTTP', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'http1', target: 'persistent', animated: true },
      { id: 'e1', source: 'persistent', target: 'pipelining', animated: true },
      { id: 'e2', source: 'pipelining', target: 'http2', animated: true },
      { id: 'e3', source: 'http2', target: 'multiplex', animated: true },
      { id: 'e4', source: 'http2', target: 'push', animated: true },
      { id: 'e5', source: 'push', target: 'http3', animated: true },
      { id: 'e6', source: 'http3', target: 'quic', animated: true },
      { id: 'e7', source: 'quic', target: 'fast', animated: true }
    ],
  },
  'can-a-web-server-provide-real-time-updates': {
    title: 'Real-time Web Communication',
    height: 567,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Client', type: 'client', description: 'Browser', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'polling', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Short Polling', type: 'service', description: 'Repeated requests', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'long-polling', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Long Polling', type: 'service', description: 'Hold connection', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'sse', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'SSE', type: 'gateway', description: 'Server-sent events', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'websocket', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'WebSocket', type: 'gateway', description: 'Bi-directional', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'grpc', type: 'systemNode', position: { x: 375, y: 419 }, data: { label: 'gRPC Stream', type: 'external', description: 'HTTP/2 streams', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'realtime', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Real-time', type: 'client', description: 'Live updates', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'polling', animated: true },
      { id: 'e1', source: 'polling', target: 'long-polling', animated: true },
      { id: 'e2', source: 'long-polling', target: 'sse', animated: true },
      { id: 'e3', source: 'sse', target: 'websocket', animated: true },
      { id: 'e4', source: 'websocket', target: 'grpc', animated: true },
      { id: 'e5', source: 'grpc', target: 'realtime', animated: true }
    ],
  },
  'evolution-of-http': {
    title: 'Evolution of HTTP',
    height: 540,
    nodes: [
      { id: 'http09', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'HTTP/0.9', type: 'service', description: '1991, GET only', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'http10', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'HTTP/1.0', type: 'service', description: '1996, headers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'http11', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'HTTP/1.1', type: 'gateway', description: '1997, persistent', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http2', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'HTTP/2', type: 'gateway', description: '2015, binary', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http3', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'HTTP/3', type: 'external', description: 'QUIC, UDP', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'speed', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Faster', type: 'external', description: 'Multiplex', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'secure', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Secure', type: 'external', description: 'TLS', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'modern', type: 'systemNode', position: { x: 638, y: 419 }, data: { label: 'Modern Web', type: 'client', description: 'HTTP/3', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'http09', target: 'http10', animated: true },
      { id: 'e1', source: 'http10', target: 'http11', animated: true },
      { id: 'e2', source: 'http11', target: 'http2', animated: true },
      { id: 'e3', source: 'http2', target: 'http3', animated: true },
      { id: 'e4', source: 'http3', target: 'speed', animated: true },
      { id: 'e5', source: 'speed', target: 'secure', animated: true },
      { id: 'e6', source: 'secure', target: 'modern', animated: true }
    ],
  },
  'postgresql-101-the-everything-database': {
    title: 'PostgreSQL Architecture',
    height: 608,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 75, y: 41 }, data: { label: 'Client', type: 'client', description: 'SQL query', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'connection', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Connection Pool', type: 'gateway', description: 'Manage sessions', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'parser', type: 'systemNode', position: { x: 75, y: 176 }, data: { label: 'Parser', type: 'service', description: 'Parse SQL', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'optimizer', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Query Optimizer', type: 'gateway', description: 'Execution plan', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'executor', type: 'systemNode', position: { x: 675, y: 176 }, data: { label: 'Executor', type: 'service', description: 'Run plan', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'buffer', type: 'systemNode', position: { x: 225, y: 338 }, data: { label: 'Shared Buffer', type: 'cache', description: 'In-memory cache', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'wal', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'WAL', type: 'queue', description: 'Write-ahead log', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'storage', type: 'systemNode', position: { x: 375, y: 500 }, data: { label: 'Disk Storage', type: 'database', description: 'Table data', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'connection', animated: true },
      { id: 'e1', source: 'connection', target: 'parser', animated: true },
      { id: 'e2', source: 'parser', target: 'optimizer', animated: true },
      { id: 'e3', source: 'optimizer', target: 'executor', animated: true },
      { id: 'e4', source: 'executor', target: 'buffer', animated: true },
      { id: 'e5', source: 'executor', target: 'wal', animated: true },
      { id: 'e6', source: 'buffer', target: 'storage', animated: true },
      { id: 'e7', source: 'wal', target: 'storage', animated: true }
    ],
  },
  'which-database-should-i-use-on-aws': {
    title: 'AWS Database Selection',
    height: 675,
    nodes: [
      { id: 'rds', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Amazon RDS', type: 'database', description: 'PostgreSQL/MySQL', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'dynamodb', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'DynamoDB', type: 'database', description: 'NoSQL key-value', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'elasticache', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'ElastiCache', type: 'cache', description: 'Redis/Memcached', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'documentdb', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'DocumentDB', type: 'database', description: 'MongoDB compat', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'keyspaces', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Keyspaces', type: 'database', description: 'Cassandra', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'neptune', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Neptune', type: 'database', description: 'Graph DB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'timestream', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Timestream', type: 'database', description: 'Time series', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'qldb', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'QLDB', type: 'database', description: 'Ledger', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'redshift', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Redshift', type: 'database', description: 'Data warehouse', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'choose', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Based on use case', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'rds', target: 'dynamodb', animated: true },
      { id: 'e1', source: 'dynamodb', target: 'elasticache', animated: true },
      { id: 'e2', source: 'documentdb', target: 'keyspaces', animated: true },
      { id: 'e3', source: 'keyspaces', target: 'neptune', animated: true },
      { id: 'e4', source: 'neptune', target: 'timestream', animated: true },
      { id: 'e5', source: 'timestream', target: 'qldb', animated: true },
      { id: 'e6', source: 'qldb', target: 'redshift', animated: true },
      { id: 'e7', source: 'redshift', target: 'choose', animated: true }
    ],
  },
  'the-4-types-of-sql-joins': {
    title: 'SQL Joins',
    height: 540,
    nodes: [
      { id: 'inner', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'INNER', type: 'gateway', description: 'Match', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'left', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'LEFT', type: 'service', description: 'All left', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'right', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'RIGHT', type: 'service', description: 'All right', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'full', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'FULL', type: 'external', description: 'All', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'table-a', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Table A', type: 'database', description: 'Left', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'table-b', type: 'systemNode', position: { x: 563, y: 243 }, data: { label: 'Table B', type: 'database', description: 'Right', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'on', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'ON', type: 'gateway', description: 'Condition', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'result', type: 'systemNode', position: { x: 375, y: 419 }, data: { label: 'Result', type: 'client', description: 'Joined', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'inner', target: 'table-a', animated: true },
      { id: 'e1', source: 'left', target: 'table-a', animated: true },
      { id: 'e2', source: 'right', target: 'table-b', animated: true },
      { id: 'e3', source: 'full', target: 'table-b', animated: true },
      { id: 'e4', source: 'table-a', target: 'on', animated: true },
      { id: 'e5', source: 'table-b', target: 'on', animated: true },
      { id: 'e6', source: 'on', target: 'result', animated: true }
    ],
  },
  'visualizing-a-sql-query': {
    title: 'SQL Query Execution',
    height: 608,
    nodes: [
      { id: 'query', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'SQL Query', type: 'client', description: 'SELECT', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'parser', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Parser', type: 'service', description: 'Syntax', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'analyzer', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Analyzer', type: 'service', description: 'Validate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'optimizer', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Optimizer', type: 'gateway', description: 'Plan', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'executor', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Executor', type: 'service', description: 'Run', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'storage', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Storage', type: 'database', description: 'Read', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'result', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Result', type: 'client', description: 'Rows', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'visual', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Visualize', type: 'external', description: 'Explain', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'query', target: 'parser', animated: true },
      { id: 'e1', source: 'parser', target: 'analyzer', animated: true },
      { id: 'e2', source: 'analyzer', target: 'optimizer', animated: true },
      { id: 'e3', source: 'optimizer', target: 'executor', animated: true },
      { id: 'e4', source: 'executor', target: 'storage', animated: true },
      { id: 'e5', source: 'storage', target: 'result', animated: true },
      { id: 'e6', source: 'result', target: 'visual', animated: true }
    ],
  },
  'how-sql-query-executes-in-a-database': {
    title: 'SQL Query Execution',
    height: 608,
    nodes: [
      { id: 'transport', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Transport', type: 'gateway', description: 'TCP/Unix', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'parser', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Parser', type: 'service', description: 'Syntax check', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'resolver', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Resolver', type: 'service', description: 'Table/column', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'optimizer', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Optimizer', type: 'gateway', description: 'Choose plan', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'executor', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Executor', type: 'service', description: 'Run plan', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'storage', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Storage Engine', type: 'database', description: 'Read/write', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'buffer', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Buffer Pool', type: 'cache', description: 'In-memory', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'result', type: 'systemNode', position: { x: 375, y: 419 }, data: { label: 'Result', type: 'client', description: 'Return rows', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'transport', target: 'parser', animated: true },
      { id: 'e1', source: 'parser', target: 'resolver', animated: true },
      { id: 'e2', source: 'resolver', target: 'optimizer', animated: true },
      { id: 'e3', source: 'optimizer', target: 'executor', animated: true },
      { id: 'e4', source: 'executor', target: 'storage', animated: true },
      { id: 'e5', source: 'storage', target: 'buffer', animated: true },
      { id: 'e6', source: 'buffer', target: 'result', animated: true }
    ],
  },
  '5-database-normal-forms-every-developer-should-kno': {
    title: 'Database Normal Forms',
    height: 608,
    nodes: [
      { id: '1nf', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: '1NF', type: 'service', description: 'Atomic values', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: '2nf', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: '2NF', type: 'service', description: 'No partial dep', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: '3nf', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: '3NF', type: 'service', description: 'No transitive', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'bcnf', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'BCNF', type: 'gateway', description: 'Every det is key', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: '4nf', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: '4NF', type: 'external', description: 'No multi-valued', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: '5nf', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: '5NF', type: 'external', description: 'No join dep', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'denormalized', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Denormalized', type: 'cache', description: 'Read optimized', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'redundancy', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Redundancy', type: 'external', description: 'Eliminate', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'integrity', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Data Integrity', type: 'client', description: 'Goal', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: '1nf', target: '2nf', animated: true },
      { id: 'e1', source: '2nf', target: '3nf', animated: true },
      { id: 'e2', source: '3nf', target: 'bcnf', animated: true },
      { id: 'e3', source: 'bcnf', target: '4nf', animated: true },
      { id: 'e4', source: '4nf', target: '5nf', animated: true },
      { id: 'e5', source: '5nf', target: 'denormalized', animated: true },
      { id: 'e6', source: '1nf', target: 'redundancy', animated: true },
      { id: 'e7', source: '5nf', target: 'integrity', animated: true },
      { id: 'e8', source: 'denormalized', target: 'integrity', animated: true }
    ],
  },
  'how-mongodb-works': {
    title: 'MongoDB Architecture',
    height: 608,
    nodes: [
      { id: 'client', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Client', type: 'client', description: 'Query', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'mongos', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Mongos Router', type: 'gateway', description: 'Query routing', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'config', type: 'systemNode', position: { x: 75, y: 176 }, data: { label: 'Config Server', type: 'database', description: 'Metadata', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'shard1', type: 'systemNode', position: { x: 75, y: 338 }, data: { label: 'Shard 1', type: 'service', description: 'Primary + Replica', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'shard2', type: 'systemNode', position: { x: 375, y: 338 }, data: { label: 'Shard 2', type: 'service', description: 'Primary + Replica', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'shard3', type: 'systemNode', position: { x: 675, y: 338 }, data: { label: 'Shard 3', type: 'service', description: 'Primary + Replica', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'replica', type: 'systemNode', position: { x: 375, y: 500 }, data: { label: 'Replica Set', type: 'database', description: 'Replication', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } }
    ],
    edges: [
      { id: 'e0', source: 'client', target: 'mongos', animated: true },
      { id: 'e1', source: 'mongos', target: 'config', animated: true },
      { id: 'e2', source: 'mongos', target: 'shard1', animated: true },
      { id: 'e3', source: 'mongos', target: 'shard2', animated: true },
      { id: 'e4', source: 'mongos', target: 'shard3', animated: true },
      { id: 'e5', source: 'shard1', target: 'replica', animated: true },
      { id: 'e6', source: 'shard2', target: 'replica', animated: true },
      { id: 'e7', source: 'shard3', target: 'replica', animated: true }
    ],
  },
  '5-data-structures-that-make-db-queries-super-fast': {
    title: '5 DB Query Structures',
    height: 608,
    nodes: [
      { id: 'btree', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'B-Tree', type: 'gateway', description: 'Default', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'hash', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Hash', type: 'cache', description: 'Exact', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'bitmap', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Bitmap', type: 'cache', description: 'Low card', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'gin', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'GIN', type: 'gateway', description: 'Full-text', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'gist', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'GiST', type: 'gateway', description: 'Spatial', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'query', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Query', type: 'client', description: 'Fast', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'btree', target: 'hash', animated: true },
      { id: 'e1', source: 'hash', target: 'bitmap', animated: true },
      { id: 'e2', source: 'bitmap', target: 'gin', animated: true },
      { id: 'e3', source: 'gin', target: 'gist', animated: true },
      { id: 'e4', source: 'gist', target: 'query', animated: true }
    ],
  },
  'how-to-learn-databases': {
    title: 'Database Learning Path',
    height: 608,
    nodes: [
      { id: 'sql', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'SQL Basics', type: 'client', description: 'CRUD, JOINs', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'normalization', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Normalization', type: 'service', description: '1NF-3NF', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'indexing', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Indexing', type: 'gateway', description: 'B-Tree, Hash', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'transactions', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Transactions', type: 'gateway', description: 'ACID', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'nosql', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'NoSQL', type: 'database', description: 'Mongo, Redis', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'scaling', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Scaling', type: 'gateway', description: 'Shard, Replica', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'optimization', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Optimization', type: 'service', description: 'Query tuning', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'internals', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Internals', type: 'external', description: 'Storage engine', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'distributed', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Distributed', type: 'external', description: 'CAP, consensus', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'expert', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'DB Expert', type: 'client', description: 'Design at scale', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'sql', target: 'normalization', animated: true },
      { id: 'e1', source: 'normalization', target: 'indexing', animated: true },
      { id: 'e2', source: 'indexing', target: 'transactions', animated: true },
      { id: 'e3', source: 'transactions', target: 'nosql', animated: true },
      { id: 'e4', source: 'nosql', target: 'scaling', animated: true },
      { id: 'e5', source: 'scaling', target: 'optimization', animated: true },
      { id: 'e6', source: 'optimization', target: 'internals', animated: true },
      { id: 'e7', source: 'internals', target: 'distributed', animated: true },
      { id: 'e8', source: 'distributed', target: 'expert', animated: true }
    ],
  },
  'sql-injection-sqli': {
    title: 'SQL Injection Attack',
    height: 540,
    nodes: [
      { id: 'attacker', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Attacker', type: 'external', description: 'Malicious', metric: 'Threat', status: 'error', details: ['Injection', 'Exploit'] } },
      { id: 'input', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'User Input', type: 'client', description: "Malicious input", metric: "'; DROP", status: 'error', details: ['Unsanitized', 'Dangerous'] } },
      { id: 'app', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Application', type: 'service', description: 'No sanitize', metric: 'Vulnerable', status: 'warning', details: ['No validation', 'Direct query'] } },
      { id: 'database', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Database', type: 'database', description: 'Execute', metric: 'Compromised', status: 'error', details: ['Execute SQL', 'Data loss'] } },
      { id: 'steal', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Steal Data', type: 'external', description: 'Exfiltrate', metric: 'Breach', status: 'error', details: ['Dump tables', 'Extract data'] } },
      { id: 'defense', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Defense', type: 'gateway', description: 'Parametrize', metric: 'Secure', status: 'success', details: ['Prepared stmt', 'Validate'] } },
      { id: 'safe', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Safe', type: 'client', description: 'Sanitize', metric: 'Protected', status: 'success', details: ['Input clean', 'Safe query'] } }
    ],
    edges: [
      { id: 'e0', source: 'attacker', target: 'input', animated: true },
      { id: 'e1', source: 'input', target: 'app', animated: true },
      { id: 'e2', source: 'app', target: 'database', animated: true },
      { id: 'e3', source: 'database', target: 'steal', animated: true },
      { id: 'e4', source: 'steal', target: 'defense', animated: true },
      { id: 'e5', source: 'defense', target: 'safe', animated: true },
      { id: 'e6', source: 'app', target: 'safe', animated: true }
    ],
  },
  'database-types-you-should-know-in-2025': {
    title: 'Database Types in 2025',
    height: 675,
    nodes: [
      { id: 'relational', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Relational', type: 'database', description: 'PostgreSQL', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'document', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Document', type: 'database', description: 'MongoDB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'key-value', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Key-Value', type: 'cache', description: 'Redis', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'graph', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Graph', type: 'database', description: 'Neo4j', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'column', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Column', type: 'database', description: 'Cassandra', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'search', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Search', type: 'cache', description: 'Elasticsearch', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'time', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Time-Series', type: 'database', description: 'InfluxDB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'vector', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Vector', type: 'external', description: 'Pinecone', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'ledger', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Ledger', type: 'database', description: 'QLDB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'spatial', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Spatial', type: 'database', description: 'PostGIS', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'choose', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Right tool', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'relational', target: 'document', animated: true },
      { id: 'e1', source: 'document', target: 'key-value', animated: true },
      { id: 'e2', source: 'key-value', target: 'graph', animated: true },
      { id: 'e3', source: 'graph', target: 'column', animated: true },
      { id: 'e4', source: 'column', target: 'search', animated: true },
      { id: 'e5', source: 'search', target: 'time', animated: true },
      { id: 'e6', source: 'time', target: 'vector', animated: true },
      { id: 'e7', source: 'vector', target: 'ledger', animated: true },
      { id: 'e8', source: 'ledger', target: 'spatial', animated: true },
      { id: 'e9', source: 'spatial', target: 'choose', animated: true }
    ],
  },
  '10-essential-components-of-a-production-web-applic': {
    title: 'Production Web App Components',
    height: 743,
    nodes: [
      { id: 'cicd', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'CI/CD', type: 'gateway', description: 'Automate deploy', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'lb', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Load Balancer', type: 'gateway', description: 'Distribute', metric: '1M+ RPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'app', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Application', type: 'service', description: 'Business logic', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'db', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Database', type: 'database', description: 'Persistence', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cache', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Cache', type: 'cache', description: 'Redis', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'queue', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Queue', type: 'queue', description: 'Async tasks', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'CDN', type: 'external', description: 'Static assets', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Monitoring', type: 'external', description: 'Metrics/logs', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'auth', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Auth', type: 'gateway', description: 'Identity', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'config', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Config', type: 'service', description: 'Env mgmt', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'production', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Production', type: 'client', description: '10 components', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'cicd', target: 'lb', animated: true },
      { id: 'e1', source: 'lb', target: 'app', animated: true },
      { id: 'e2', source: 'app', target: 'db', animated: true },
      { id: 'e3', source: 'app', target: 'cache', animated: true },
      { id: 'e4', source: 'app', target: 'queue', animated: true },
      { id: 'e5', source: 'lb', target: 'cdn', animated: true },
      { id: 'e6', source: 'app', target: 'monitor', animated: true },
      { id: 'e7', source: 'app', target: 'auth', animated: true },
      { id: 'e8', source: 'app', target: 'config', animated: true },
      { id: 'e9', source: 'monitor', target: 'production', animated: true }
    ],
  },
  'git-vs-github': {
    title: 'Git vs GitHub',
    height: 540,
    nodes: [
      { id: 'git', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'Git', type: 'service', description: 'Version control', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'github', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'GitHub', type: 'external', description: 'Git hosting', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'local', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Local Repo', type: 'database', description: '.git', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'commit', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Commit', type: 'service', description: 'Snapshot', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'remote', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Remote Repo', type: 'database', description: 'Origin', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'collaborate', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Collaborate', type: 'gateway', description: 'PR, Issues', metric: '10K QPS', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'offline', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Offline', type: 'service', description: 'Local work', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'online', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Online', type: 'client', description: 'Cloud', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'git', target: 'local', animated: true },
      { id: 'e1', source: 'git', target: 'commit', animated: true },
      { id: 'e2', source: 'github', target: 'remote', animated: true },
      { id: 'e3', source: 'github', target: 'collaborate', animated: true },
      { id: 'e4', source: 'local', target: 'offline', animated: true },
      { id: 'e5', source: 'remote', target: 'online', animated: true },
      { id: 'e6', source: 'offline', target: 'online', animated: true }
    ],
  },
  'a-handy-cheat-sheet-for-the-most-popular-cloud-ser': {
    title: 'Cloud Services Cheat Sheet',
    height: 675,
    nodes: [
      { id: 'compute', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Compute', type: 'service', description: 'EC2, Lambda', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'storage', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Storage', type: 'database', description: 'S3, EBS', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'database', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Database', type: 'database', description: 'RDS, DynamoDB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'network', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Network', type: 'gateway', description: 'VPC, ELB', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'security', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Security', type: 'gateway', description: 'IAM, KMS', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'monitoring', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Monitoring', type: 'external', description: 'CloudWatch', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'queue', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Queue', type: 'queue', description: 'SQS, SNS', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'container', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Container', type: 'service', description: 'ECS, EKS', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'serverless', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Serverless', type: 'external', description: 'Lambda', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'cloud', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Cloud', type: 'client', description: 'Services', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'compute', target: 'storage', animated: true },
      { id: 'e1', source: 'storage', target: 'database', animated: true },
      { id: 'e2', source: 'database', target: 'network', animated: true },
      { id: 'e3', source: 'network', target: 'security', animated: true },
      { id: 'e4', source: 'security', target: 'monitoring', animated: true },
      { id: 'e5', source: 'monitoring', target: 'queue', animated: true },
      { id: 'e6', source: 'queue', target: 'container', animated: true },
      { id: 'e7', source: 'container', target: 'serverless', animated: true },
      { id: 'e8', source: 'serverless', target: 'cloud', animated: true }
    ],
  },
  'how-kubernetes-works': {
    title: 'Kubernetes Architecture',
    height: 675,
    nodes: [
      { id: 'kubectl', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'kubectl', type: 'client', description: 'CLI', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'api', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'API Server', type: 'gateway', description: 'Control plane', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'etcd', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'etcd', type: 'database', description: 'State store', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'scheduler', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Scheduler', type: 'service', description: 'Assign pods', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'controller', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Controller', type: 'service', description: 'Manage', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'kubelet', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Kubelet', type: 'service', description: 'Node agent', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'pod', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Pod', type: 'service', description: 'Containers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'service', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Service', type: 'gateway', description: 'Expose', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'ingress', type: 'systemNode', position: { x: 638, y: 419 }, data: { label: 'Ingress', type: 'gateway', description: 'HTTP route', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'k8s', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Kubernetes', type: 'client', description: 'Orchestration', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'kubectl', target: 'api', animated: true },
      { id: 'e1', source: 'api', target: 'etcd', animated: true },
      { id: 'e2', source: 'api', target: 'scheduler', animated: true },
      { id: 'e3', source: 'api', target: 'controller', animated: true },
      { id: 'e4', source: 'scheduler', target: 'kubelet', animated: true },
      { id: 'e5', source: 'kubelet', target: 'pod', animated: true },
      { id: 'e6', source: 'pod', target: 'service', animated: true },
      { id: 'e7', source: 'service', target: 'ingress', animated: true },
      { id: 'e8', source: 'ingress', target: 'k8s', animated: true }
    ],
  },
  'a-simplified-git-workflow': {
    title: 'Git Workflow',
    height: 567,
    nodes: [
      { id: 'clone', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Clone', type: 'service', description: 'Copy', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'branch', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Branch', type: 'gateway', description: 'Feature', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'commit', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Commit', type: 'service', description: 'Save', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'push', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Push', type: 'gateway', description: 'Remote', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'pr', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'PR', type: 'external', description: 'Review', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'merge', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Merge', type: 'gateway', description: 'Main', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Deploy', type: 'external', description: 'Release', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'clone', target: 'branch', animated: true },
      { id: 'e1', source: 'branch', target: 'commit', animated: true },
      { id: 'e2', source: 'commit', target: 'push', animated: true },
      { id: 'e3', source: 'push', target: 'pr', animated: true },
      { id: 'e4', source: 'pr', target: 'merge', animated: true },
      { id: 'e5', source: 'merge', target: 'deploy', animated: true }
    ],
  },
  'top-30-aws-services-that-are-commonly-used': {
    title: 'Top AWS Services',
    height: 675,
    nodes: [
      { id: 'ec2', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'EC2', type: 'service', description: 'Compute', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 's3', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'S3', type: 'database', description: 'Storage', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'rds', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'RDS', type: 'database', description: 'Database', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'lambda', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Lambda', type: 'external', description: 'Serverless', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'vpc', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'VPC', type: 'gateway', description: 'Network', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'iam', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'IAM', type: 'gateway', description: 'Security', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cloudfront', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'CloudFront', type: 'external', description: 'CDN', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'sqs', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'SQS', type: 'queue', description: 'Queue', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'dynamodb', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'DynamoDB', type: 'database', description: 'NoSQL', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'ecs', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'ECS/EKS', type: 'service', description: 'Containers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'aws', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'AWS', type: 'client', description: '30+ services', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'ec2', target: 's3', animated: true },
      { id: 'e1', source: 's3', target: 'rds', animated: true },
      { id: 'e2', source: 'rds', target: 'lambda', animated: true },
      { id: 'e3', source: 'lambda', target: 'vpc', animated: true },
      { id: 'e4', source: 'vpc', target: 'iam', animated: true },
      { id: 'e5', source: 'iam', target: 'cloudfront', animated: true },
      { id: 'e6', source: 'cloudfront', target: 'sqs', animated: true },
      { id: 'e7', source: 'sqs', target: 'dynamodb', animated: true },
      { id: 'e8', source: 'dynamodb', target: 'ecs', animated: true },
      { id: 'e9', source: 'ecs', target: 'aws', animated: true }
    ],
  },
  'how-to-learn-cloud-computing': {
    title: 'Cloud Computing Learning Path',
    height: 608,
    nodes: [
      { id: 'iaas', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'IaaS', type: 'database', description: 'VM, storage', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'paas', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'PaaS', type: 'service', description: 'Heroku, RDS', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'saas', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'SaaS', type: 'client', description: 'Gmail, Slack', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'aws', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'AWS', type: 'external', description: 'EC2, S3', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'azure', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Azure', type: 'external', description: 'Microsoft', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'gcp', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'GCP', type: 'external', description: 'Google', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'serverless', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Serverless', type: 'gateway', description: 'Lambda', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'containers', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Containers', type: 'service', description: 'Docker/K8s', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cloud', type: 'systemNode', position: { x: 300, y: 567 }, data: { label: 'Cloud Expert', type: 'client', description: 'Multi-cloud', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'iaas', target: 'paas', animated: true },
      { id: 'e1', source: 'paas', target: 'saas', animated: true },
      { id: 'e2', source: 'aws', target: 'azure', animated: true },
      { id: 'e3', source: 'azure', target: 'gcp', animated: true },
      { id: 'e4', source: 'serverless', target: 'containers', animated: true },
      { id: 'e5', source: 'iaas', target: 'cloud', animated: true },
      { id: 'e6', source: 'gcp', target: 'cloud', animated: true },
      { id: 'e7', source: 'containers', target: 'cloud', animated: true }
    ],
  },
  'top-kubernetes-scaling-strategies-you-must-know': {
    title: 'Kubernetes Scaling Strategies',
    height: 608,
    nodes: [
      { id: 'hpa', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'HPA', type: 'gateway', description: 'Horizontal Pod', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'vpa', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'VPA', type: 'gateway', description: 'Vertical Pod', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cluster', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Cluster Autoscaler', type: 'gateway', description: 'Add/remove nodes', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'keda', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'KEDA', type: 'external', description: 'Event-driven', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'metrics', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Metrics', type: 'service', description: 'CPU/Memory', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'custom', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Custom Metrics', type: 'service', description: 'QPS/Latency', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'events', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Events', type: 'queue', description: 'Queue depth', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'pod', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Pod', type: 'service', description: 'Scale target', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'node', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Node', type: 'database', description: 'Infrastructure', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cost', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Cost Efficient', type: 'client', description: 'Right size', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'hpa', target: 'metrics', animated: true },
      { id: 'e1', source: 'vpa', target: 'metrics', animated: true },
      { id: 'e2', source: 'cluster', target: 'custom', animated: true },
      { id: 'e3', source: 'keda', target: 'events', animated: true },
      { id: 'e4', source: 'metrics', target: 'pod', animated: true },
      { id: 'e5', source: 'custom', target: 'node', animated: true },
      { id: 'e6', source: 'events', target: 'pod', animated: true },
      { id: 'e7', source: 'pod', target: 'cost', animated: true },
      { id: 'e8', source: 'node', target: 'cost', animated: true }
    ],
  },
  'how-to-learn-kubernetes': {
    title: 'Kubernetes Learning Path',
    height: 608,
    nodes: [
      { id: 'containers', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Containers', type: 'service', description: 'Docker basics', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'pods', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Pods', type: 'service', description: 'Basic unit', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deployment', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Deployment', type: 'gateway', description: 'Manage pods', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'service', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Service', type: 'gateway', description: 'Expose', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'configmap', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'ConfigMap', type: 'cache', description: 'Config', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'secret', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Secret', type: 'gateway', description: 'Sensitive', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'ingress', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Ingress', type: 'gateway', description: 'HTTP routing', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'helm', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Helm', type: 'service', description: 'Package', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Monitor', type: 'external', description: 'Prometheus', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'expert', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'K8s Expert', type: 'client', description: 'Production', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'containers', target: 'pods', animated: true },
      { id: 'e1', source: 'pods', target: 'deployment', animated: true },
      { id: 'e2', source: 'deployment', target: 'service', animated: true },
      { id: 'e3', source: 'service', target: 'configmap', animated: true },
      { id: 'e4', source: 'configmap', target: 'secret', animated: true },
      { id: 'e5', source: 'secret', target: 'ingress', animated: true },
      { id: 'e6', source: 'ingress', target: 'helm', animated: true },
      { id: 'e7', source: 'helm', target: 'monitor', animated: true },
      { id: 'e8', source: 'monitor', target: 'expert', animated: true }
    ],
  },
  'how-do-companies-ship-code-to-production': {
    title: 'Code to Production Pipeline',
    height: 675,
    nodes: [
      { id: 'plan', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Plan', type: 'client', description: 'Jira, backlog', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'code', type: 'systemNode', position: { x: 225, y: 68 }, data: { label: 'Code', type: 'service', description: 'Git', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'review', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Review', type: 'gateway', description: 'PR', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'build', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Build', type: 'service', description: 'Compile', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'test', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Test', type: 'gateway', description: 'CI', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'stage', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Stage', type: 'service', description: 'Pre-prod', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'security', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Security', type: 'gateway', description: 'SAST/DAST', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'approval', type: 'systemNode', position: { x: 563, y: 243 }, data: { label: 'Approval', type: 'external', description: 'Manual gate', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Deploy', type: 'service', description: 'CD', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Monitor', type: 'external', description: 'Observability', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'rollback', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Rollback', type: 'external', description: 'Revert', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'prod', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Production', type: 'client', description: 'Live', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'plan', target: 'code', animated: true },
      { id: 'e1', source: 'code', target: 'review', animated: true },
      { id: 'e2', source: 'review', target: 'build', animated: true },
      { id: 'e3', source: 'build', target: 'test', animated: true },
      { id: 'e4', source: 'test', target: 'stage', animated: true },
      { id: 'e5', source: 'stage', target: 'security', animated: true },
      { id: 'e6', source: 'security', target: 'approval', animated: true },
      { id: 'e7', source: 'approval', target: 'deploy', animated: true },
      { id: 'e8', source: 'deploy', target: 'monitor', animated: true },
      { id: 'e9', source: 'monitor', target: 'rollback', animated: true },
      { id: 'e10', source: 'rollback', target: 'prod', animated: true }
    ],
  },
  'a-cheatsheet-on-kubernetes': {
    title: 'Kubernetes Cheatsheet',
    height: 675,
    nodes: [
      { id: 'pod', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Pod', type: 'service', description: 'Basic unit', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deployment', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Deployment', type: 'gateway', description: 'Manage pods', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'service', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Service', type: 'gateway', description: 'Expose', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'ingress', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Ingress', type: 'gateway', description: 'HTTP route', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'configmap', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'ConfigMap', type: 'cache', description: 'Config', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'secret', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Secret', type: 'gateway', description: 'Sensitive', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'pv', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'PV/PVC', type: 'database', description: 'Storage', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'namespace', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Namespace', type: 'service', description: 'Isolate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'helm', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Helm', type: 'service', description: 'Package', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'k8s', type: 'systemNode', position: { x: 525, y: 567 }, data: { label: 'Kubernetes', type: 'client', description: 'Orchestration', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'pod', target: 'deployment', animated: true },
      { id: 'e1', source: 'deployment', target: 'service', animated: true },
      { id: 'e2', source: 'service', target: 'ingress', animated: true },
      { id: 'e3', source: 'ingress', target: 'configmap', animated: true },
      { id: 'e4', source: 'configmap', target: 'secret', animated: true },
      { id: 'e5', source: 'secret', target: 'pv', animated: true },
      { id: 'e6', source: 'pv', target: 'namespace', animated: true },
      { id: 'e7', source: 'namespace', target: 'helm', animated: true },
      { id: 'e8', source: 'helm', target: 'k8s', animated: true }
    ],
  },
  'the-aws-tech-stack': {
    title: 'AWS Tech Stack',
    height: 608,
    nodes: [
      { id: 'ec2', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'EC2', type: 'service', description: 'Compute', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 's3', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'S3', type: 'database', description: 'Storage', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'rds', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'RDS', type: 'database', description: 'Database', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'lambda', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Lambda', type: 'external', description: 'Serverless', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'elb', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'ELB', type: 'gateway', description: 'Load balance', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cloudfront', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'CloudFront', type: 'external', description: 'CDN', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'route53', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Route 53', type: 'gateway', description: 'DNS', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cloudwatch', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'CloudWatch', type: 'external', description: 'Monitor', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'iam', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'IAM', type: 'gateway', description: 'Security', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'aws', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'AWS', type: 'client', description: 'Stack', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'ec2', target: 's3', animated: true },
      { id: 'e1', source: 's3', target: 'rds', animated: true },
      { id: 'e2', source: 'rds', target: 'lambda', animated: true },
      { id: 'e3', source: 'lambda', target: 'elb', animated: true },
      { id: 'e4', source: 'elb', target: 'cloudfront', animated: true },
      { id: 'e5', source: 'cloudfront', target: 'route53', animated: true },
      { id: 'e6', source: 'route53', target: 'cloudwatch', animated: true },
      { id: 'e7', source: 'cloudwatch', target: 'iam', animated: true },
      { id: 'e8', source: 'iam', target: 'aws', animated: true }
    ],
  },
  'the-linux-cron-cheatsheet': {
    title: 'Linux Cron Cheatsheet',
    height: 608,
    nodes: [
      { id: 'minute', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Minute', type: 'client', description: '0-59', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'hour', type: 'systemNode', position: { x: 225, y: 68 }, data: { label: 'Hour', type: 'client', description: '0-23', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'day', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Day', type: 'client', description: '1-31', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'month', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Month', type: 'client', description: '1-12', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'weekday', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Weekday', type: 'client', description: '0-7', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'examples', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Examples', type: 'service', description: '*/5 * * * *', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'crontab', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'crontab -e', type: 'gateway', description: 'Edit', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'log', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Logs', type: 'database', description: '/var/log/syslog', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'backup', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Backup', type: 'service', description: '0 2 * * *', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cleanup', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Cleanup', type: 'service', description: '0 3 * * 0', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'automate', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Automate', type: 'client', description: 'Schedule tasks', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'minute', target: 'hour', animated: true },
      { id: 'e1', source: 'hour', target: 'day', animated: true },
      { id: 'e2', source: 'day', target: 'month', animated: true },
      { id: 'e3', source: 'month', target: 'weekday', animated: true },
      { id: 'e4', source: 'weekday', target: 'examples', animated: true },
      { id: 'e5', source: 'examples', target: 'crontab', animated: true },
      { id: 'e6', source: 'crontab', target: 'log', animated: true },
      { id: 'e7', source: 'log', target: 'backup', animated: true },
      { id: 'e8', source: 'backup', target: 'cleanup', animated: true },
      { id: 'e9', source: 'cleanup', target: 'automate', animated: true }
    ],
  },
  'the-lifecycle-of-a-kubernetes-pod': {
    title: 'Kubernetes Pod Lifecycle',
    height: 608,
    nodes: [
      { id: 'manifest', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Pod Manifest', type: 'client', description: 'YAML', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'api-server', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'API Server', type: 'gateway', description: 'Validate', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'etcd', type: 'systemNode', position: { x: 75, y: 176 }, data: { label: 'etcd', type: 'database', description: 'Store state', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'scheduler', type: 'systemNode', position: { x: 675, y: 176 }, data: { label: 'Scheduler', type: 'service', description: 'Assign node', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'pending', type: 'systemNode', position: { x: 225, y: 338 }, data: { label: 'Pending', type: 'external', description: 'Wait for resources', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'running', type: 'systemNode', position: { x: 525, y: 338 }, data: { label: 'Running', type: 'service', description: 'Containers active', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'probe', type: 'systemNode', position: { x: 225, y: 473 }, data: { label: 'Health Probes', type: 'gateway', description: 'Liveness/Readiness', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'succeeded', type: 'systemNode', position: { x: 525, y: 473 }, data: { label: 'Succeeded', type: 'client', description: 'Completed', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'failed', type: 'systemNode', position: { x: 750, y: 473 }, data: { label: 'Failed', type: 'external', description: 'Error', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'manifest', target: 'api-server', animated: true },
      { id: 'e1', source: 'api-server', target: 'etcd', animated: true },
      { id: 'e2', source: 'api-server', target: 'scheduler', animated: true },
      { id: 'e3', source: 'scheduler', target: 'pending', animated: true },
      { id: 'e4', source: 'pending', target: 'running', animated: true },
      { id: 'e5', source: 'running', target: 'probe', animated: true },
      { id: 'e6', source: 'probe', target: 'succeeded', animated: true },
      { id: 'e7', source: 'running', target: 'failed', animated: true }
    ],
  },
  '9-docker-best-practices-you-should-know': {
    title: 'Docker Best Practices',
    height: 675,
    nodes: [
      { id: 'small', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Small Images', type: 'service', description: 'Alpine', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'layers', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Layer Caching', type: 'cache', description: 'Order matters', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'user', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Non-root User', type: 'gateway', description: 'Security', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'multistage', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Multi-stage', type: 'service', description: 'Reduce size', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'health', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Health Check', type: 'gateway', description: 'Monitor', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'env', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'ENV vars', type: 'cache', description: 'Config', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'ignore', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: '.dockerignore', type: 'service', description: 'Exclude', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'scan', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Scan', type: 'external', description: 'Vulnerabilities', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'compose', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Compose', type: 'service', description: 'Local dev', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'docker', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Docker', type: 'client', description: 'Best practices', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'small', target: 'layers', animated: true },
      { id: 'e1', source: 'layers', target: 'user', animated: true },
      { id: 'e2', source: 'user', target: 'multistage', animated: true },
      { id: 'e3', source: 'multistage', target: 'health', animated: true },
      { id: 'e4', source: 'health', target: 'env', animated: true },
      { id: 'e5', source: 'env', target: 'ignore', animated: true },
      { id: 'e6', source: 'ignore', target: 'scan', animated: true },
      { id: 'e7', source: 'scan', target: 'compose', animated: true },
      { id: 'e8', source: 'compose', target: 'docker', animated: true }
    ],
  },
  'cicd-simplified-visual-guide': {
    title: 'CI/CD Pipeline',
    height: 567,
    nodes: [
      { id: 'code', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Code', type: 'client', description: 'Git push', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'build', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Build', type: 'service', description: 'Compile', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'test', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Test', type: 'gateway', description: 'Verify', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Deploy', type: 'external', description: 'Release', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'unit', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Unit', type: 'service', description: 'Fast', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'integration', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Integration', type: 'service', description: 'Medium', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'e2e', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'E2E', type: 'external', description: 'Slow', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'code', target: 'build', animated: true },
      { id: 'e1', source: 'build', target: 'test', animated: true },
      { id: 'e2', source: 'test', target: 'deploy', animated: true },
      { id: 'e3', source: 'test', target: 'unit', animated: true },
      { id: 'e4', source: 'unit', target: 'integration', animated: true },
      { id: 'e5', source: 'integration', target: 'e2e', animated: true }
    ],
  },
  'how-gitflow-branching-works': {
    title: 'Gitflow Branching',
    height: 608,
    nodes: [
      { id: 'master', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Master', type: 'database', description: 'Production', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'develop', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Develop', type: 'gateway', description: 'Integration', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'feature', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Feature', type: 'service', description: 'New', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'release', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Release', type: 'external', description: 'Prep', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'hotfix', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Hotfix', type: 'external', description: 'Urgent', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'merge', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Merge', type: 'gateway', description: 'Back', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'master', target: 'develop', animated: true },
      { id: 'e1', source: 'develop', target: 'feature', animated: true },
      { id: 'e2', source: 'feature', target: 'release', animated: true },
      { id: 'e3', source: 'release', target: 'master', animated: true },
      { id: 'e4', source: 'master', target: 'hotfix', animated: true },
      { id: 'e5', source: 'hotfix', target: 'merge', animated: true }
    ],
  },
  'how-git-reset-works': {
    title: 'Git Reset Modes',
    height: 567,
    nodes: [
      { id: 'soft', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: '--soft', type: 'service', description: 'Keep staged', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'mixed', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: '--mixed', type: 'gateway', description: 'Keep working', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'hard', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: '--hard', type: 'external', description: 'Discard all', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'head', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'HEAD', type: 'cache', description: 'Pointer', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'staging', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Staging', type: 'cache', description: 'Index', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'working', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Working', type: 'database', description: 'Files', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'soft', target: 'head', animated: true },
      { id: 'e1', source: 'mixed', target: 'staging', animated: true },
      { id: 'e2', source: 'hard', target: 'working', animated: true },
      { id: 'e3', source: 'head', target: 'staging', animated: true },
      { id: 'e4', source: 'staging', target: 'working', animated: true }
    ],
  },
  'docker-vs-kubernetes': {
    title: 'Docker vs Kubernetes',
    height: 608,
    nodes: [
      { id: 'docker', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'Docker', type: 'service', description: 'Container runtime', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'k8s', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Kubernetes', type: 'gateway', description: 'Container orchestration', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'docker-build', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'docker build', type: 'service', description: 'Create image', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'docker-run', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'docker run', type: 'service', description: 'Start container', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'single-node', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Single Node', type: 'external', description: 'One machine', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'pod', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Pod', type: 'service', description: 'Group containers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deployment', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Deployment', type: 'gateway', description: 'Manage replicas', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'service', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Service', type: 'gateway', description: 'Expose pods', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'multi-node', type: 'systemNode', position: { x: 750, y: 419 }, data: { label: 'Multi-Node', type: 'external', description: 'Cluster', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'docker', target: 'docker-build', animated: true },
      { id: 'e1', source: 'docker-build', target: 'docker-run', animated: true },
      { id: 'e2', source: 'docker-run', target: 'single-node', animated: true },
      { id: 'e3', source: 'k8s', target: 'pod', animated: true },
      { id: 'e4', source: 'pod', target: 'deployment', animated: true },
      { id: 'e5', source: 'deployment', target: 'service', animated: true },
      { id: 'e6', source: 'service', target: 'multi-node', animated: true },
      { id: 'e7', source: 'docker', target: 'k8s', animated: true }
    ],
  },
  'how-to-learn-aws': {
    title: 'AWS Learning Path',
    height: 608,
    nodes: [
      { id: 'compute', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Compute', type: 'service', description: 'EC2/Lambda', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'storage', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Storage', type: 'database', description: 'S3/EBS', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'network', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Network', type: 'gateway', description: 'VPC/ELB', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'security', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Security', type: 'gateway', description: 'IAM/KMS', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'db', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Database', type: 'database', description: 'RDS/DynamoDB', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Monitor', type: 'external', description: 'CloudWatch', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'cert', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Certify', type: 'client', description: 'Solutions Arch', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'compute', target: 'storage', animated: true },
      { id: 'e1', source: 'storage', target: 'network', animated: true },
      { id: 'e2', source: 'network', target: 'security', animated: true },
      { id: 'e3', source: 'security', target: 'db', animated: true },
      { id: 'e4', source: 'db', target: 'monitor', animated: true },
      { id: 'e5', source: 'monitor', target: 'cert', animated: true }
    ],
  },
  'types-of-virtualization': {
    title: 'Virtualization Types',
    height: 567,
    nodes: [
      { id: 'server', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Server', type: 'service', description: 'VMs', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'desktop', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Desktop', type: 'service', description: 'VDI', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'network', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Network', type: 'gateway', description: 'SDN', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'storage', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Storage', type: 'database', description: 'SAN', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'app', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Application', type: 'service', description: 'Containers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'data', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Data', type: 'database', description: 'Abstract', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'os', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'OS', type: 'service', description: 'WSL', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'types', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Types', type: 'client', description: 'Virtualization', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'server', target: 'desktop', animated: true },
      { id: 'e1', source: 'desktop', target: 'network', animated: true },
      { id: 'e2', source: 'network', target: 'storage', animated: true },
      { id: 'e3', source: 'storage', target: 'app', animated: true },
      { id: 'e4', source: 'app', target: 'data', animated: true },
      { id: 'e5', source: 'data', target: 'os', animated: true },
      { id: 'e6', source: 'os', target: 'types', animated: true }
    ],
  },
  'cloudflare-vs-aws-vs-azure': {
    title: 'Cloudflare vs AWS vs Azure',
    height: 608,
    nodes: [
      { id: 'cloudflare', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'Cloudflare', type: 'external', description: 'CDN + Security', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'aws', type: 'systemNode', position: { x: 450, y: 68 }, data: { label: 'AWS', type: 'external', description: 'Full cloud', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'azure', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Azure', type: 'external', description: 'Microsoft', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'CDN', type: 'cache', description: 'Edge cache', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'waf', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'WAF', type: 'gateway', description: 'Firewall', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'compute', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Compute', type: 'service', description: 'EC2/VM', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'storage', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Storage', type: 'database', description: 'S3/Blob', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'edge', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Edge', type: 'external', description: 'Workers', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'global', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Global', type: 'external', description: 'Regions', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'choose', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Use case', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'cloudflare', target: 'cdn', animated: true },
      { id: 'e1', source: 'cloudflare', target: 'waf', animated: true },
      { id: 'e2', source: 'aws', target: 'compute', animated: true },
      { id: 'e3', source: 'aws', target: 'storage', animated: true },
      { id: 'e4', source: 'azure', target: 'compute', animated: true },
      { id: 'e5', source: 'cdn', target: 'edge', animated: true },
      { id: 'e6', source: 'compute', target: 'global', animated: true },
      { id: 'e7', source: 'edge', target: 'choose', animated: true },
      { id: 'e8', source: 'global', target: 'choose', animated: true }
    ],
  },
  'must-know-network-protocol-dependencies': {
    title: 'Protocol Dependencies',
    height: 608,
    nodes: [
      { id: 'ethernet', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Ethernet', type: 'database', description: 'Layer 2', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'ip', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'IP', type: 'gateway', description: 'Layer 3', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tcp', type: 'systemNode', position: { x: 150, y: 311 }, data: { label: 'TCP', type: 'gateway', description: 'Layer 4', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'udp', type: 'systemNode', position: { x: 600, y: 311 }, data: { label: 'UDP', type: 'gateway', description: 'Layer 4', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http', type: 'systemNode', position: { x: 75, y: 446 }, data: { label: 'HTTP', type: 'service', description: 'Layer 7', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'https', type: 'systemNode', position: { x: 300, y: 446 }, data: { label: 'HTTPS', type: 'service', description: 'TLS + HTTP', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dns', type: 'systemNode', position: { x: 525, y: 446 }, data: { label: 'DNS', type: 'service', description: 'Layer 7', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'quic', type: 'systemNode', position: { x: 750, y: 446 }, data: { label: 'QUIC', type: 'external', description: 'UDP-based', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'stack', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Protocol Stack', type: 'client', description: 'Dependencies', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'ethernet', target: 'ip', animated: true },
      { id: 'e1', source: 'ip', target: 'tcp', animated: true },
      { id: 'e2', source: 'ip', target: 'udp', animated: true },
      { id: 'e3', source: 'tcp', target: 'http', animated: true },
      { id: 'e4', source: 'tcp', target: 'https', animated: true },
      { id: 'e5', source: 'udp', target: 'dns', animated: true },
      { id: 'e6', source: 'udp', target: 'quic', animated: true },
      { id: 'e7', source: 'http', target: 'stack', animated: true },
      { id: 'e8', source: 'https', target: 'stack', animated: true },
      { id: 'e9', source: 'dns', target: 'stack', animated: true }
    ],
  },
  '9-clean-code-principles-to-keep-in-mind': {
    title: 'Clean Code Principles',
    height: 675,
    nodes: [
      { id: 'naming', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Naming', type: 'service', description: 'Meaningful', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'functions', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Functions', type: 'service', description: 'Small, single purpose', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'comments', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Comments', type: 'cache', description: 'Explain why', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'formatting', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Formatting', type: 'service', description: 'Consistent', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dry', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'DRY', type: 'gateway', description: 'No duplication', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'solid', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'SOLID', type: 'gateway', description: 'Design', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'testing', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Testing', type: 'service', description: 'TDD', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'error', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Error Handling', type: 'external', description: 'Exceptions', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'refactor', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Refactor', type: 'service', description: 'Improve', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'clean', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Clean Code', type: 'client', description: 'Readable', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'naming', target: 'functions', animated: true },
      { id: 'e1', source: 'functions', target: 'comments', animated: true },
      { id: 'e2', source: 'comments', target: 'formatting', animated: true },
      { id: 'e3', source: 'formatting', target: 'dry', animated: true },
      { id: 'e4', source: 'dry', target: 'solid', animated: true },
      { id: 'e5', source: 'solid', target: 'testing', animated: true },
      { id: 'e6', source: 'testing', target: 'error', animated: true },
      { id: 'e7', source: 'error', target: 'refactor', animated: true },
      { id: 'e8', source: 'refactor', target: 'clean', animated: true }
    ],
  },
  'what-is-the-solid-principle': {
    title: 'SOLID Principles',
    height: 608,
    nodes: [
      { id: 's', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Single Responsibility', type: 'service', description: 'One reason to change', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'o', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Open/Closed', type: 'gateway', description: 'Extend, not modify', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'l', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Liskov Substitution', type: 'service', description: 'Subtype replace', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'i', type: 'systemNode', position: { x: 225, y: 243 }, data: { label: 'Interface Segregation', type: 'gateway', description: 'Small interfaces', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'd', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Dependency Inversion', type: 'gateway', description: 'Depend on abstractions', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'maintainable', type: 'systemNode', position: { x: 225, y: 419 }, data: { label: 'Maintainable', type: 'service', description: 'Easy to change', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'extensible', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Extensible', type: 'service', description: 'Easy to add', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'quality', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Quality Code', type: 'client', description: 'SOLID', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 's', target: 'o', animated: true },
      { id: 'e1', source: 'o', target: 'l', animated: true },
      { id: 'e2', source: 'l', target: 'i', animated: true },
      { id: 'e3', source: 'i', target: 'd', animated: true },
      { id: 'e4', source: 's', target: 'maintainable', animated: true },
      { id: 'e5', source: 'o', target: 'extensible', animated: true },
      { id: 'e6', source: 'l', target: 'maintainable', animated: true },
      { id: 'e7', source: 'i', target: 'extensible', animated: true },
      { id: 'e8', source: 'd', target: 'quality', animated: true },
      { id: 'e9', source: 'maintainable', target: 'quality', animated: true },
      { id: 'e10', source: 'extensible', target: 'quality', animated: true }
    ],
  },
  'cross-site-scripting-xss-attacks': {
    title: 'XSS Attack Types',
    height: 567,
    nodes: [
      { id: 'attacker', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Attacker', type: 'external', description: 'Inject script', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'stored', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Stored XSS', type: 'database', description: 'Persistent', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'reflected', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Reflected XSS', type: 'gateway', description: 'URL param', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'dom', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'DOM XSS', type: 'client', description: 'Client-side', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'victim', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Victim', type: 'client', description: 'Browser', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'cookie', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Steal Cookie', type: 'cache', description: 'Session hijack', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'defense', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Defense', type: 'gateway', description: 'CSP, encode', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'safe', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Safe', type: 'client', description: 'Sanitize input', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'attacker', target: 'stored', animated: true },
      { id: 'e1', source: 'attacker', target: 'reflected', animated: true },
      { id: 'e2', source: 'attacker', target: 'dom', animated: true },
      { id: 'e3', source: 'stored', target: 'victim', animated: true },
      { id: 'e4', source: 'reflected', target: 'cookie', animated: true },
      { id: 'e5', source: 'dom', target: 'cookie', animated: true },
      { id: 'e6', source: 'victim', target: 'defense', animated: true },
      { id: 'e7', source: 'cookie', target: 'defense', animated: true },
      { id: 'e8', source: 'defense', target: 'safe', animated: true }
    ],
  },
  'latency-vs-throughput': {
    title: 'Latency vs Throughput',
    height: 540,
    nodes: [
      { id: 'latency', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Latency', type: 'client', description: 'Time', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'throughput', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Throughput', type: 'gateway', description: 'Volume', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'ms', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Milliseconds', type: 'service', description: 'Fast', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'rps', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Req/sec', type: 'service', description: 'Scale', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'tradeoff', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Tradeoff', type: 'external', description: 'Balance', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'optimize', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Optimize', type: 'client', description: 'Both', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'latency', target: 'ms', animated: true },
      { id: 'e1', source: 'throughput', target: 'rps', animated: true },
      { id: 'e2', source: 'ms', target: 'tradeoff', animated: true },
      { id: 'e3', source: 'rps', target: 'tradeoff', animated: true },
      { id: 'e4', source: 'tradeoff', target: 'optimize', animated: true }
    ],
  },
  'ip-address-cheat-sheet-every-engineer-should-know': {
    title: 'IP Address Types',
    height: 608,
    nodes: [
      { id: 'ipv4', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'IPv4', type: 'service', description: '32-bit', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ipv6', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'IPv6', type: 'external', description: '128-bit', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'private', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Private', type: 'cache', description: '10.0.0.0/8', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'public', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Public', type: 'gateway', description: 'Routable', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'loopback', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Loopback', type: 'cache', description: '127.0.0.1', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'multicast', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Multicast', type: 'queue', description: 'Group', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'subnet', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Subnet', type: 'gateway', description: 'CIDR', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'gateway', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Gateway', type: 'gateway', description: 'Default route', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'network', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Network', type: 'client', description: 'IP basics', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'ipv4', target: 'private', animated: true },
      { id: 'e1', source: 'ipv4', target: 'public', animated: true },
      { id: 'e2', source: 'ipv6', target: 'loopback', animated: true },
      { id: 'e3', source: 'ipv6', target: 'multicast', animated: true },
      { id: 'e4', source: 'private', target: 'subnet', animated: true },
      { id: 'e5', source: 'public', target: 'gateway', animated: true },
      { id: 'e6', source: 'subnet', target: 'network', animated: true },
      { id: 'e7', source: 'gateway', target: 'network', animated: true }
    ],
  },
  'which-protocols-run-on-tcp-and-udp': {
    title: 'Protocols on TCP vs UDP',
    height: 608,
    nodes: [
      { id: 'tcp', type: 'systemNode', position: { x: 225, y: 68 }, data: { label: 'TCP', type: 'gateway', description: 'Reliable', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'udp', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'UDP', type: 'gateway', description: 'Fast', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'HTTP/HTTPS', type: 'service', description: 'Web', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ftp', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'FTP/SFTP', type: 'service', description: 'File transfer', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'smtp', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'SMTP', type: 'service', description: 'Email', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dns-tcp', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'DNS (zone)', type: 'service', description: 'Large transfers', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dns-udp', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'DNS', type: 'external', description: 'Queries', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'dhcp', type: 'systemNode', position: { x: 750, y: 419 }, data: { label: 'DHCP', type: 'external', description: 'IP assignment', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'voip', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'VoIP', type: 'external', description: 'Voice', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'video', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Video Stream', type: 'external', description: 'RTMP/WebRTC', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'tcp', target: 'http', animated: true },
      { id: 'e1', source: 'tcp', target: 'ftp', animated: true },
      { id: 'e2', source: 'tcp', target: 'smtp', animated: true },
      { id: 'e3', source: 'tcp', target: 'dns-tcp', animated: true },
      { id: 'e4', source: 'udp', target: 'dns-udp', animated: true },
      { id: 'e5', source: 'udp', target: 'dhcp', animated: true },
      { id: 'e6', source: 'udp', target: 'voip', animated: true },
      { id: 'e7', source: 'udp', target: 'video', animated: true }
    ],
  },
  'the-building-blocks-of-modern-networking': {
    title: 'Modern Networking Stack',
    height: 608,
    nodes: [
      { id: 'physical', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Physical', type: 'database', description: 'Cables, WiFi', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'data-link', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Data Link', type: 'service', description: 'Ethernet, MAC', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'network', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Network', type: 'gateway', description: 'IP, Routing', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'transport', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Transport', type: 'gateway', description: 'TCP, UDP', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'session', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Session', type: 'service', description: 'TLS/SSL', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'presentation', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Presentation', type: 'service', description: 'JSON, XML', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'application', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Application', type: 'client', description: 'HTTP, DNS', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'osi', type: 'systemNode', position: { x: 375, y: 419 }, data: { label: 'OSI Model', type: 'external', description: '7 layers', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } }
    ],
    edges: [
      { id: 'e0', source: 'physical', target: 'data-link', animated: true },
      { id: 'e1', source: 'data-link', target: 'network', animated: true },
      { id: 'e2', source: 'network', target: 'transport', animated: true },
      { id: 'e3', source: 'transport', target: 'session', animated: true },
      { id: 'e4', source: 'session', target: 'presentation', animated: true },
      { id: 'e5', source: 'presentation', target: 'application', animated: true },
      { id: 'e6', source: 'application', target: 'osi', animated: true }
    ],
  },
  'network-services-that-power-modern-connectivity': {
    title: 'Network Services',
    height: 567,
    nodes: [
      { id: 'dns', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'DNS', type: 'gateway', description: 'Name resolution', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'dhcp', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'DHCP', type: 'service', description: 'IP assignment', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'nat', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'NAT', type: 'gateway', description: 'IP translate', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'vpn', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'VPN', type: 'external', description: 'Secure tunnel', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'firewall', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Firewall', type: 'gateway', description: 'Traffic filter', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'proxy', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Proxy', type: 'gateway', description: 'Forward/reverse', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'CDN', type: 'external', description: 'Edge cache', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'connectivity', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Connectivity', type: 'client', description: 'Modern network', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'dns', target: 'dhcp', animated: true },
      { id: 'e1', source: 'dhcp', target: 'nat', animated: true },
      { id: 'e2', source: 'nat', target: 'vpn', animated: true },
      { id: 'e3', source: 'vpn', target: 'firewall', animated: true },
      { id: 'e4', source: 'firewall', target: 'proxy', animated: true },
      { id: 'e5', source: 'proxy', target: 'cdn', animated: true },
      { id: 'e6', source: 'cdn', target: 'connectivity', animated: true }
    ],
  },
  'what-is-a-firewall': {
    title: 'Firewall Types',
    height: 540,
    nodes: [
      { id: 'packet', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Packet Filter', type: 'gateway', description: 'Layer 3/4', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'stateful', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Stateful', type: 'gateway', description: 'Connection track', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'proxy', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Proxy', type: 'gateway', description: 'Application layer', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'ngfw', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'NGFW', type: 'external', description: 'Deep inspect', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'allow', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Allow', type: 'service', description: 'Permit', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'deny', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Deny', type: 'external', description: 'Block', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'log', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Log', type: 'database', description: 'Audit', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'secure', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Secure', type: 'client', description: 'Protected', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'packet', target: 'stateful', animated: true },
      { id: 'e1', source: 'stateful', target: 'proxy', animated: true },
      { id: 'e2', source: 'proxy', target: 'ngfw', animated: true },
      { id: 'e3', source: 'ngfw', target: 'allow', animated: true },
      { id: 'e4', source: 'allow', target: 'deny', animated: true },
      { id: 'e5', source: 'deny', target: 'log', animated: true },
      { id: 'e6', source: 'log', target: 'secure', animated: true }
    ],
  },
  'modem-vs-router': {
    title: 'Modem vs Router',
    height: 540,
    nodes: [
      { id: 'modem', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Modem', type: 'service', description: 'ISP', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'router', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Router', type: 'gateway', description: 'LAN', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'signal', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Signal', type: 'external', description: 'Analog', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'wifi', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'WiFi', type: 'external', description: 'Wireless', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'internet', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Internet', type: 'database', description: 'WAN', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'devices', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Devices', type: 'client', description: 'Connect', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'modem', target: 'signal', animated: true },
      { id: 'e1', source: 'router', target: 'wifi', animated: true },
      { id: 'e2', source: 'signal', target: 'internet', animated: true },
      { id: 'e3', source: 'wifi', target: 'devices', animated: true },
      { id: 'e4', source: 'internet', target: 'router', animated: true }
    ],
  },
  'network-debugging-commands-every-engineer-should-k': {
    title: 'Network Debugging Commands',
    height: 608,
    nodes: [
      { id: 'ping', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'ping', type: 'client', description: 'Connectivity', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'traceroute', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'traceroute', type: 'service', description: 'Route path', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'netstat', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'netstat', type: 'service', description: 'Connections', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ss', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'ss', type: 'service', description: 'Socket stats', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'tcpdump', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'tcpdump', type: 'gateway', description: 'Packet capture', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'nc', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'nc', type: 'gateway', description: 'Netcat', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'curl', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'curl', type: 'external', description: 'HTTP test', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'dig', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'dig/nslookup', type: 'external', description: 'DNS query', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'iptables', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'iptables', type: 'gateway', description: 'Firewall rules', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'debug', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Debug Network', type: 'client', description: 'Find issues', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'ping', target: 'traceroute', animated: true },
      { id: 'e1', source: 'traceroute', target: 'netstat', animated: true },
      { id: 'e2', source: 'netstat', target: 'ss', animated: true },
      { id: 'e3', source: 'tcpdump', target: 'nc', animated: true },
      { id: 'e4', source: 'nc', target: 'curl', animated: true },
      { id: 'e5', source: 'dig', target: 'iptables', animated: true },
      { id: 'e6', source: 'ss', target: 'debug', animated: true },
      { id: 'e7', source: 'curl', target: 'debug', animated: true },
      { id: 'e8', source: 'iptables', target: 'debug', animated: true }
    ],
  },
  'common-network-protocols-every-engineer-should-kno': {
    title: 'Common Network Protocols',
    height: 675,
    nodes: [
      { id: 'http', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'HTTP/HTTPS', type: 'gateway', description: 'Web', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'dns', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'DNS', type: 'gateway', description: 'Name resolution', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'dhcp', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'DHCP', type: 'service', description: 'IP assignment', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ssh', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'SSH', type: 'external', description: 'Secure shell', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'ftp', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'FTP/SFTP', type: 'service', description: 'File transfer', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'smtp', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'SMTP', type: 'service', description: 'Email send', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'tcp', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'TCP', type: 'gateway', description: 'Reliable', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'udp', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'UDP', type: 'gateway', description: 'Fast', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'icmp', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'ICMP', type: 'service', description: 'Ping', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'network', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Network Stack', type: 'client', description: 'Protocols', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'http', target: 'dns', animated: true },
      { id: 'e1', source: 'dns', target: 'dhcp', animated: true },
      { id: 'e2', source: 'dhcp', target: 'ssh', animated: true },
      { id: 'e3', source: 'ssh', target: 'ftp', animated: true },
      { id: 'e4', source: 'ftp', target: 'smtp', animated: true },
      { id: 'e5', source: 'smtp', target: 'tcp', animated: true },
      { id: 'e6', source: 'tcp', target: 'udp', animated: true },
      { id: 'e7', source: 'udp', target: 'icmp', animated: true },
      { id: 'e8', source: 'icmp', target: 'network', animated: true }
    ],
  },
  '8-popular-network-protocols': {
    title: '8 Popular Network Protocols',
    height: 608,
    nodes: [
      { id: 'http', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'HTTP', type: 'gateway', description: 'Web', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'https', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'HTTPS', type: 'gateway', description: 'Secure web', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'ftp', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'FTP', type: 'service', description: 'File transfer', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ssh', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'SSH', type: 'external', description: 'Secure shell', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'dns', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'DNS', type: 'gateway', description: 'Names', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'dhcp', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'DHCP', type: 'service', description: 'IP assign', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'smtp', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'SMTP', type: 'service', description: 'Email', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'tcp', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'TCP', type: 'gateway', description: 'Reliable', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'protocols', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Protocols', type: 'client', description: 'Network', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'http', target: 'https', animated: true },
      { id: 'e1', source: 'https', target: 'ftp', animated: true },
      { id: 'e2', source: 'ftp', target: 'ssh', animated: true },
      { id: 'e3', source: 'ssh', target: 'dns', animated: true },
      { id: 'e4', source: 'dns', target: 'dhcp', animated: true },
      { id: 'e5', source: 'dhcp', target: 'smtp', animated: true },
      { id: 'e6', source: 'smtp', target: 'tcp', animated: true },
      { id: 'e7', source: 'tcp', target: 'protocols', animated: true }
    ],
  },
  'cookies-vs-sessions-vs-jwt-vs-paseto': {
    title: 'Auth Methods Compared',
    height: 675,
    nodes: [
      { id: 'cookie', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Cookie', type: 'cache', description: 'Browser', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'session', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Session', type: 'database', description: 'Server', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'jwt', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'JWT', type: 'gateway', description: 'Token', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'paseto', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'PASETO', type: 'external', description: 'Secure', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'state', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Stateful', type: 'service', description: 'Server', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'stateless', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Stateless', type: 'service', description: 'Client', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'compare', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Compare', type: 'client', description: 'Choose', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'cookie', target: 'state', animated: true },
      { id: 'e1', source: 'session', target: 'state', animated: true },
      { id: 'e2', source: 'jwt', target: 'stateless', animated: true },
      { id: 'e3', source: 'paseto', target: 'stateless', animated: true },
      { id: 'e4', source: 'state', target: 'compare', animated: true },
      { id: 'e5', source: 'stateless', target: 'compare', animated: true }
    ],
  },
  'jwt-101-key-to-stateless-authentication': {
    title: 'JWT Stateless Authentication',
    height: 567,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'User', type: 'client', description: 'Login', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'auth-server', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Auth Server', type: 'gateway', description: 'Verify', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'jwt', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'JWT', type: 'cache', description: 'Signed token', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'header', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Header', type: 'service', description: 'alg, typ', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'payload', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Payload', type: 'service', description: 'Claims', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'signature', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Signature', type: 'gateway', description: 'HMAC', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'api', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'API', type: 'service', description: 'Validate JWT', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'stateless', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Stateless', type: 'external', description: 'No session', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'secure', type: 'systemNode', position: { x: 600, y: 419 }, data: { label: 'Secure', type: 'client', description: 'Verify signature', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'auth-server', animated: true },
      { id: 'e1', source: 'auth-server', target: 'jwt', animated: true },
      { id: 'e2', source: 'jwt', target: 'header', animated: true },
      { id: 'e3', source: 'jwt', target: 'payload', animated: true },
      { id: 'e4', source: 'jwt', target: 'signature', animated: true },
      { id: 'e5', source: 'header', target: 'api', animated: true },
      { id: 'e6', source: 'payload', target: 'api', animated: true },
      { id: 'e7', source: 'signature', target: 'api', animated: true },
      { id: 'e8', source: 'api', target: 'stateless', animated: true },
      { id: 'e9', source: 'stateless', target: 'secure', animated: true }
    ],
  },
  'what-is-sso-single-sign-on': {
    title: 'Single Sign-On (SSO)',
    height: 540,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'User', type: 'client', description: 'Login once', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'idp', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Identity Provider', type: 'gateway', description: 'Auth server', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'app1', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'App A', type: 'service', description: 'Gmail', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'app2', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'App B', type: 'service', description: 'Drive', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'app3', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'App C', type: 'service', description: 'Calendar', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'token', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Token', type: 'cache', description: 'SAML/OIDC', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'session', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Session', type: 'cache', description: 'Shared', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'access', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Access All', type: 'client', description: 'One login', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'idp', animated: true },
      { id: 'e1', source: 'idp', target: 'token', animated: true },
      { id: 'e2', source: 'token', target: 'app1', animated: true },
      { id: 'e3', source: 'token', target: 'app2', animated: true },
      { id: 'e4', source: 'token', target: 'app3', animated: true },
      { id: 'e5', source: 'app1', target: 'session', animated: true },
      { id: 'e6', source: 'session', target: 'access', animated: true }
    ],
  },
  'how-two-factor-authentication-2fa-works': {
    title: 'Two-Factor Authentication',
    height: 540,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'User', type: 'client', description: 'Login', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'password', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Password', type: 'gateway', description: 'Something known', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'second', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Second Factor', type: 'gateway', description: 'Something owned', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'sms', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'SMS', type: 'service', description: 'Code', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'totp', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'TOTP', type: 'service', description: 'Google Auth', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'push', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Push', type: 'service', description: 'Notification', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'hardware', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Hardware', type: 'external', description: 'YubiKey', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'verify', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Verify', type: 'gateway', description: 'Check', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'access', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Access', type: 'client', description: 'Granted', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'password', animated: true },
      { id: 'e1', source: 'password', target: 'second', animated: true },
      { id: 'e2', source: 'second', target: 'sms', animated: true },
      { id: 'e3', source: 'second', target: 'totp', animated: true },
      { id: 'e4', source: 'second', target: 'push', animated: true },
      { id: 'e5', source: 'second', target: 'hardware', animated: true },
      { id: 'e6', source: 'sms', target: 'verify', animated: true },
      { id: 'e7', source: 'totp', target: 'verify', animated: true },
      { id: 'e8', source: 'verify', target: 'access', animated: true }
    ],
  },
  'how-does-sso-work': {
    title: 'SSO Flow',
    height: 567,
    nodes: [
      { id: 'user', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'User', type: 'client', description: 'Login', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'app', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'App', type: 'service', description: 'Request', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'idp', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'IdP', type: 'gateway', description: 'Auth', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'token', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Token', type: 'cache', description: 'SAML/OIDC', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'validate', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Validate', type: 'gateway', description: 'Check', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'access', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Access', type: 'client', description: 'Grant', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'user', target: 'app', animated: true },
      { id: 'e1', source: 'app', target: 'idp', animated: true },
      { id: 'e2', source: 'idp', target: 'token', animated: true },
      { id: 'e3', source: 'token', target: 'validate', animated: true },
      { id: 'e4', source: 'validate', target: 'access', animated: true }
    ],
  },
  'jwt-vs-paseto-the-two-players-of-token-based-authe': {
    title: 'JWT vs PASETO',
    height: 567,
    nodes: [
      { id: 'jwt', type: 'systemNode', position: { x: 225, y: 68 }, data: { label: 'JWT', type: 'gateway', description: 'Standard', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'paseto', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'PASETO', type: 'gateway', description: 'Secure-by-default', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'alg-none', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'alg=none issue', type: 'external', description: 'Vulnerable', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'hs256', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'HS256/RS256', type: 'service', description: 'Manual choice', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'v2-local', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'v2.local', type: 'service', description: 'Encrypted', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'v2-public', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'v2.public', type: 'service', description: 'Signed', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'complex', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Complex', type: 'external', description: 'Easy to misuse', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'simple', type: 'systemNode', position: { x: 638, y: 419 }, data: { label: 'Simple', type: 'external', description: 'Hard to misuse', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'choose', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Based on needs', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'jwt', target: 'alg-none', animated: true },
      { id: 'e1', source: 'jwt', target: 'hs256', animated: true },
      { id: 'e2', source: 'paseto', target: 'v2-local', animated: true },
      { id: 'e3', source: 'paseto', target: 'v2-public', animated: true },
      { id: 'e4', source: 'alg-none', target: 'complex', animated: true },
      { id: 'e5', source: 'hs256', target: 'complex', animated: true },
      { id: 'e6', source: 'v2-local', target: 'simple', animated: true },
      { id: 'e7', source: 'v2-public', target: 'simple', animated: true },
      { id: 'e8', source: 'complex', target: 'choose', animated: true },
      { id: 'e9', source: 'simple', target: 'choose', animated: true }
    ],
  },
  'cookies-vs-sessions': {
    title: 'Cookies vs Sessions',
    height: 540,
    nodes: [
      { id: 'cookie', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Cookie', type: 'cache', description: 'Client', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'session', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Session', type: 'database', description: 'Server', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'storage', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Storage', type: 'cache', description: 'Browser', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'memory', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Memory', type: 'database', description: 'RAM', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'size', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: '4KB limit', type: 'external', description: 'Small', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'secure', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'HttpOnly', type: 'gateway', description: 'Safe', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'cookie', target: 'storage', animated: true },
      { id: 'e1', source: 'session', target: 'memory', animated: true },
      { id: 'e2', source: 'storage', target: 'size', animated: true },
      { id: 'e3', source: 'memory', target: 'secure', animated: true },
      { id: 'e4', source: 'size', target: 'secure', animated: true }
    ],
  },
  'how-java-virtual-threads-work': {
    title: 'Java Virtual Threads',
    height: 567,
    nodes: [
      { id: 'platform', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'Platform Thread', type: 'service', description: 'OS thread', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'virtual', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Virtual Thread', type: 'external', description: 'Lightweight', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'heavy', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Heavy', type: 'external', description: '1MB stack', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'limited', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Limited', type: 'external', description: 'Thousands', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'light', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Light', type: 'cache', description: 'KBs', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'millions', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Millions', type: 'cache', description: 'Scalable', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'blocking', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Blocking', type: 'service', description: 'I/O wait', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'carrier', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Carrier', type: 'gateway', description: 'Mount/unmount', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'scalable', type: 'systemNode', position: { x: 638, y: 419 }, data: { label: 'Scalable', type: 'client', description: 'Concurrent', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'platform', target: 'heavy', animated: true },
      { id: 'e1', source: 'platform', target: 'limited', animated: true },
      { id: 'e2', source: 'virtual', target: 'light', animated: true },
      { id: 'e3', source: 'virtual', target: 'millions', animated: true },
      { id: 'e4', source: 'heavy', target: 'blocking', animated: true },
      { id: 'e5', source: 'light', target: 'carrier', animated: true },
      { id: 'e6', source: 'blocking', target: 'scalable', animated: true },
      { id: 'e7', source: 'carrier', target: 'scalable', animated: true }
    ],
  },
  '18-key-design-patterns-every-developer-should-know': {
    title: '18 Key Design Patterns',
    height: 743,
    nodes: [
      { id: 'factory', type: 'systemNode', position: { x: 45, y: 41 }, data: { label: 'Factory', type: 'service', description: 'Create', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'singleton', type: 'systemNode', position: { x: 270, y: 41 }, data: { label: 'Singleton', type: 'service', description: 'One instance', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'builder', type: 'systemNode', position: { x: 495, y: 41 }, data: { label: 'Builder', type: 'service', description: 'Construct', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'prototype', type: 'systemNode', position: { x: 720, y: 41 }, data: { label: 'Prototype', type: 'service', description: 'Clone', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'adapter', type: 'systemNode', position: { x: 45, y: 176 }, data: { label: 'Adapter', type: 'gateway', description: 'Wrap', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'bridge', type: 'systemNode', position: { x: 270, y: 176 }, data: { label: 'Bridge', type: 'gateway', description: 'Decouple', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'composite', type: 'systemNode', position: { x: 495, y: 176 }, data: { label: 'Composite', type: 'gateway', description: 'Tree', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'decorator', type: 'systemNode', position: { x: 720, y: 176 }, data: { label: 'Decorator', type: 'gateway', description: 'Add behavior', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'facade', type: 'systemNode', position: { x: 45, y: 311 }, data: { label: 'Facade', type: 'gateway', description: 'Simplify', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'proxy', type: 'systemNode', position: { x: 270, y: 311 }, data: { label: 'Proxy', type: 'gateway', description: 'Control', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'observer', type: 'systemNode', position: { x: 495, y: 311 }, data: { label: 'Observer', type: 'queue', description: 'Pub/sub', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'strategy', type: 'systemNode', position: { x: 720, y: 311 }, data: { label: 'Strategy', type: 'service', description: 'Interchange', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'command', type: 'systemNode', position: { x: 158, y: 446 }, data: { label: 'Command', type: 'service', description: 'Encapsulate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'iterator', type: 'systemNode', position: { x: 383, y: 446 }, data: { label: 'Iterator', type: 'service', description: 'Traverse', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'state', type: 'systemNode', position: { x: 608, y: 446 }, data: { label: 'State', type: 'service', description: 'Behavior', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'patterns', type: 'systemNode', position: { x: 383, y: 581 }, data: { label: '18 Patterns', type: 'client', description: 'Essential', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'factory', target: 'singleton', animated: true },
      { id: 'e1', source: 'singleton', target: 'builder', animated: true },
      { id: 'e2', source: 'builder', target: 'prototype', animated: true },
      { id: 'e3', source: 'adapter', target: 'bridge', animated: true },
      { id: 'e4', source: 'bridge', target: 'composite', animated: true },
      { id: 'e5', source: 'composite', target: 'decorator', animated: true },
      { id: 'e6', source: 'facade', target: 'proxy', animated: true },
      { id: 'e7', source: 'proxy', target: 'observer', animated: true },
      { id: 'e8', source: 'observer', target: 'strategy', animated: true },
      { id: 'e9', source: 'command', target: 'iterator', animated: true },
      { id: 'e10', source: 'iterator', target: 'state', animated: true },
      { id: 'e11', source: 'state', target: 'patterns', animated: true }
    ],
  },
  'what-do-version-numbers-mean': {
    title: 'Semantic Versioning',
    height: 540,
    nodes: [
      { id: 'major', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'MAJOR', type: 'external', description: 'Breaking', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'minor', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'MINOR', type: 'service', description: 'Features', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'patch', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'PATCH', type: 'gateway', description: 'Fixes', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: '1', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: '1.0.0', type: 'external', description: 'Release', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: '2', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: '1.1.0', type: 'service', description: 'New feature', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: '3', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: '1.1.1', type: 'gateway', description: 'Bug fix', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: '4', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: '2.0.0', type: 'external', description: 'Breaking', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'semver', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'SemVer', type: 'client', description: 'x.y.z', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'major', target: 'minor', animated: true },
      { id: 'e1', source: 'minor', target: 'patch', animated: true },
      { id: 'e2', source: '1', target: '2', animated: true },
      { id: 'e3', source: '2', target: '3', animated: true },
      { id: 'e4', source: '3', target: '4', animated: true },
      { id: 'e5', source: 'major', target: 'semver', animated: true },
      { id: 'e6', source: 'patch', target: 'semver', animated: true }
    ],
  },
  '9-oop-design-patterns-you-must-know': {
    title: '9 OOP Design Patterns',
    height: 675,
    nodes: [
      { id: 'singleton', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Singleton', type: 'service', description: 'One instance', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'factory', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Factory', type: 'service', description: 'Create objects', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'observer', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Observer', type: 'queue', description: 'Pub/sub', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'strategy', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Strategy', type: 'service', description: 'Interchangeable', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'decorator', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Decorator', type: 'gateway', description: 'Add behavior', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'adapter', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Adapter', type: 'gateway', description: 'Interface wrap', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'command', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Command', type: 'service', description: 'Encapsulate', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'proxy', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Proxy', type: 'gateway', description: 'Control access', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'builder', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Builder', type: 'service', description: 'Construct', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'patterns', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Patterns', type: 'client', description: 'OOP', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'singleton', target: 'factory', animated: true },
      { id: 'e1', source: 'factory', target: 'observer', animated: true },
      { id: 'e2', source: 'observer', target: 'strategy', animated: true },
      { id: 'e3', source: 'strategy', target: 'decorator', animated: true },
      { id: 'e4', source: 'decorator', target: 'adapter', animated: true },
      { id: 'e5', source: 'adapter', target: 'command', animated: true },
      { id: 'e6', source: 'command', target: 'proxy', animated: true },
      { id: 'e7', source: 'proxy', target: 'builder', animated: true },
      { id: 'e8', source: 'builder', target: 'patterns', animated: true }
    ],
  },
  'how-computer-memory-works': {
    title: 'Computer Memory Hierarchy',
    height: 608,
    nodes: [
      { id: 'register', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'Register', type: 'cache', description: 'CPU, fastest', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'l1', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'L1 Cache', type: 'cache', description: '32KB', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'l2', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'L2 Cache', type: 'cache', description: '256KB', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'l3', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'L3 Cache', type: 'cache', description: '8MB', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'ram', type: 'systemNode', position: { x: 375, y: 338 }, data: { label: 'RAM', type: 'database', description: '16GB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'ssd', type: 'systemNode', position: { x: 150, y: 338 }, data: { label: 'SSD', type: 'database', description: '512GB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'hdd', type: 'systemNode', position: { x: 600, y: 338 }, data: { label: 'HDD', type: 'database', description: '2TB', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'speed', type: 'systemNode', position: { x: 188, y: 500 }, data: { label: 'Fast', type: 'external', description: 'Low latency', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'capacity', type: 'systemNode', position: { x: 563, y: 500 }, data: { label: 'Large', type: 'external', description: 'High storage', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'memory', type: 'systemNode', position: { x: 375, y: 648 }, data: { label: 'Memory', type: 'client', description: 'Hierarchy', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'register', target: 'l1', animated: true },
      { id: 'e1', source: 'l1', target: 'l2', animated: true },
      { id: 'e2', source: 'l2', target: 'l3', animated: true },
      { id: 'e3', source: 'l3', target: 'ram', animated: true },
      { id: 'e4', source: 'ram', target: 'ssd', animated: true },
      { id: 'e5', source: 'ssd', target: 'hdd', animated: true },
      { id: 'e6', source: 'l1', target: 'speed', animated: true },
      { id: 'e7', source: 'hdd', target: 'capacity', animated: true },
      { id: 'e8', source: 'speed', target: 'memory', animated: true },
      { id: 'e9', source: 'capacity', target: 'memory', animated: true }
    ],
  },
  'concurrency-is-not-parallelism': {
    title: 'Concurrency ≠ Parallelism',
    height: 540,
    nodes: [
      { id: 'concurrency', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Concurrency', type: 'gateway', description: 'Structure', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'parallelism', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Parallelism', type: 'external', description: 'Execution', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'single', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Single Core', type: 'service', description: 'Switch', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'multi', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Multi Core', type: 'service', description: 'Simultaneous', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'dealing', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Dealing', type: 'client', description: 'Many', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'doing', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Doing', type: 'client', description: 'At once', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'concurrency', target: 'dealing', animated: true },
      { id: 'e1', source: 'parallelism', target: 'doing', animated: true },
      { id: 'e2', source: 'concurrency', target: 'single', animated: true },
      { id: 'e3', source: 'parallelism', target: 'multi', animated: true },
      { id: 'e4', source: 'single', target: 'doing', animated: true }
    ],
  },
  'what-are-some-of-the-most-popular-versioning-strat': {
    title: 'Versioning Strategies',
    height: 567,
    nodes: [
      { id: 'semver', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'SemVer', type: 'external', description: 'x.y.z', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'calendar', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Calendar', type: 'service', description: 'YYYY.MM.DD', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'commit', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Commit Hash', type: 'cache', description: 'Git SHA', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'api', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'API Version', type: 'gateway', description: '/v1, /v2', metric: 'Routing', status: 'success', details: ['Auth', 'SSL', 'Cache'] } },
      { id: 'url', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'URL Path', type: 'service', description: 'In path', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'header', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Header', type: 'service', description: 'Accept', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'param', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Query Param', type: 'service', description: '?v=1', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'choose', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Choose', type: 'client', description: 'Strategy', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'semver', target: 'calendar', animated: true },
      { id: 'e1', source: 'calendar', target: 'commit', animated: true },
      { id: 'e2', source: 'commit', target: 'api', animated: true },
      { id: 'e3', source: 'api', target: 'url', animated: true },
      { id: 'e4', source: 'url', target: 'header', animated: true },
      { id: 'e5', source: 'header', target: 'param', animated: true },
      { id: 'e6', source: 'param', target: 'choose', animated: true }
    ],
  },
  'python-vs-java': {
    title: 'Python vs Java',
    height: 567,
    nodes: [
      { id: 'python', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'Python', type: 'external', description: 'Dynamic', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'java', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Java', type: 'service', description: 'Static', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'easy', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Easy', type: 'service', description: 'Readable', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fast-dev', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Fast Dev', type: 'service', description: 'Prototyping', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'performance', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Performance', type: 'gateway', description: 'JVM', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'enterprise', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Enterprise', type: 'gateway', description: 'Scalable', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'data', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Data/ML', type: 'external', description: 'Python', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'backend', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Backend', type: 'external', description: 'Java', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'choose', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Context', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'python', target: 'easy', animated: true },
      { id: 'e1', source: 'python', target: 'fast-dev', animated: true },
      { id: 'e2', source: 'java', target: 'performance', animated: true },
      { id: 'e3', source: 'java', target: 'enterprise', animated: true },
      { id: 'e4', source: 'easy', target: 'data', animated: true },
      { id: 'e5', source: 'fast-dev', target: 'data', animated: true },
      { id: 'e6', source: 'performance', target: 'backend', animated: true },
      { id: 'e7', source: 'enterprise', target: 'backend', animated: true },
      { id: 'e8', source: 'data', target: 'choose', animated: true },
      { id: 'e9', source: 'backend', target: 'choose', animated: true }
    ],
  },
  'design-patterns-cheat-sheet': {
    title: 'Design Patterns',
    height: 675,
    nodes: [
      { id: 'creational', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Creational', type: 'service', description: 'Create objects', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'structural', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Structural', type: 'gateway', description: 'Compose classes', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'behavioral', type: 'systemNode', position: { x: 675, y: 68 }, data: { label: 'Behavioral', type: 'gateway', description: 'Communication', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'singleton', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Singleton', type: 'service', description: 'One instance', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'factory', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Factory', type: 'service', description: 'Create method', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'adapter', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Adapter', type: 'gateway', description: 'Interface wrap', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'observer', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Observer', type: 'queue', description: 'Pub/sub', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'strategy', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Strategy', type: 'service', description: 'Interchangeable', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'decorator', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Decorator', type: 'gateway', description: 'Add behavior', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'patterns', type: 'systemNode', position: { x: 563, y: 567 }, data: { label: 'Patterns', type: 'client', description: 'Reusable solutions', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'creational', target: 'singleton', animated: true },
      { id: 'e1', source: 'creational', target: 'factory', animated: true },
      { id: 'e2', source: 'structural', target: 'adapter', animated: true },
      { id: 'e3', source: 'structural', target: 'decorator', animated: true },
      { id: 'e4', source: 'behavioral', target: 'observer', animated: true },
      { id: 'e5', source: 'behavioral', target: 'strategy', animated: true },
      { id: 'e6', source: 'singleton', target: 'patterns', animated: true },
      { id: 'e7', source: 'adapter', target: 'patterns', animated: true },
      { id: 'e8', source: 'observer', target: 'patterns', animated: true }
    ],
  },
  'how-java-works': {
    title: 'Java Execution',
    height: 567,
    nodes: [
      { id: 'source', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: '.java', type: 'client', description: 'Source', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'compiler', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'javac', type: 'service', description: 'Compile', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'bytecode', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: '.class', type: 'cache', description: 'Bytecode', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'jvm', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'JVM', type: 'external', description: 'Runtime', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'jit', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'JIT', type: 'gateway', description: 'Optimize', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'machine', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Machine', type: 'database', description: 'Native', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'source', target: 'compiler', animated: true },
      { id: 'e1', source: 'compiler', target: 'bytecode', animated: true },
      { id: 'e2', source: 'bytecode', target: 'jvm', animated: true },
      { id: 'e3', source: 'jvm', target: 'jit', animated: true },
      { id: 'e4', source: 'jit', target: 'machine', animated: true }
    ],
  },
  'how-python-works': {
    title: 'Python Execution',
    height: 567,
    nodes: [
      { id: 'source', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: '.py', type: 'client', description: 'Source', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'interpreter', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Interpreter', type: 'service', description: 'CPython', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'bytecode', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: '.pyc', type: 'cache', description: 'Bytecode', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'vm', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'PVM', type: 'external', description: 'Virtual', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'gil', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'GIL', type: 'gateway', description: 'Lock', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'execute', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Execute', type: 'database', description: 'Run', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'source', target: 'interpreter', animated: true },
      { id: 'e1', source: 'interpreter', target: 'bytecode', animated: true },
      { id: 'e2', source: 'bytecode', target: 'vm', animated: true },
      { id: 'e3', source: 'vm', target: 'gil', animated: true },
      { id: 'e4', source: 'gil', target: 'execute', animated: true }
    ],
  },
  'popular-interview-question-what-is-the-difference-': {
    title: 'Process vs Thread',
    height: 567,
    nodes: [
      { id: 'process', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'Process', type: 'service', description: 'Independent', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'thread', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Thread', type: 'service', description: 'Lightweight', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'memory-p', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Own Memory', type: 'database', description: 'Isolated', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'memory-t', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Shared Memory', type: 'cache', description: 'Same process', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'context-p', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Heavy Context', type: 'external', description: 'Switch slow', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'context-t', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Light Context', type: 'external', description: 'Switch fast', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'crash-p', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Crash Isolated', type: 'service', description: 'Safe', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'crash-t', type: 'systemNode', position: { x: 638, y: 419 }, data: { label: 'Crash All', type: 'external', description: 'Risky', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'use', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Use Case', type: 'client', description: 'Choose wisely', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'process', target: 'memory-p', animated: true },
      { id: 'e1', source: 'process', target: 'context-p', animated: true },
      { id: 'e2', source: 'thread', target: 'memory-t', animated: true },
      { id: 'e3', source: 'thread', target: 'context-t', animated: true },
      { id: 'e4', source: 'memory-p', target: 'crash-p', animated: true },
      { id: 'e5', source: 'memory-t', target: 'crash-t', animated: true },
      { id: 'e6', source: 'crash-p', target: 'use', animated: true },
      { id: 'e7', source: 'crash-t', target: 'use', animated: true }
    ],
  },
  'things-every-developer-should-know-concurrency-is-': {
    title: 'Concurrency vs Parallelism',
    height: 540,
    nodes: [
      { id: 'concurrency', type: 'systemNode', position: { x: 150, y: 68 }, data: { label: 'Concurrency', type: 'gateway', description: 'Dealing with', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'parallelism', type: 'systemNode', position: { x: 600, y: 68 }, data: { label: 'Parallelism', type: 'external', description: 'Doing at once', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'single', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Single Core', type: 'service', description: 'Switch', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'multi', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Multi Core', type: 'service', description: 'Simultaneous', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'threads', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Threads', type: 'service', description: 'Concurrent', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'processes', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Processes', type: 'service', description: 'Parallel', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'different', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Different', type: 'external', description: 'Not same', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'know', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'Know', type: 'client', description: 'Dev essential', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'concurrency', target: 'single', animated: true },
      { id: 'e1', source: 'concurrency', target: 'threads', animated: true },
      { id: 'e2', source: 'parallelism', target: 'multi', animated: true },
      { id: 'e3', source: 'parallelism', target: 'processes', animated: true },
      { id: 'e4', source: 'single', target: 'different', animated: true },
      { id: 'e5', source: 'multi', target: 'different', animated: true },
      { id: 'e6', source: 'threads', target: 'know', animated: true },
      { id: 'e7', source: 'processes', target: 'know', animated: true }
    ],
  },
  'how-java-hashmaps-work': {
    title: 'Java HashMap',
    height: 567,
    nodes: [
      { id: 'key', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Key', type: 'client', description: 'Object', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'hash', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'hashCode()', type: 'service', description: 'Hash', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'bucket', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Bucket', type: 'database', description: 'Array', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'entry', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Entry', type: 'cache', description: 'Node', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'collision', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Collision', type: 'external', description: 'LinkedList', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'resize', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Resize', type: 'gateway', description: 'x2', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'key', target: 'hash', animated: true },
      { id: 'e1', source: 'hash', target: 'bucket', animated: true },
      { id: 'e2', source: 'bucket', target: 'entry', animated: true },
      { id: 'e3', source: 'entry', target: 'collision', animated: true },
      { id: 'e4', source: 'collision', target: 'resize', animated: true }
    ],
  },
  'what-happens-when-you-type-google-com-into-a-brows': {
    title: 'Type google.com → Page Loads',
    height: 608,
    nodes: [
      { id: 'browser', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Browser', type: 'client', description: 'URL', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'dns', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'DNS', type: 'gateway', description: 'Resolve IP', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tcp', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'TCP', type: 'gateway', description: 'Handshake', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'tls', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'TLS', type: 'gateway', description: 'Encrypt', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'http', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'HTTP', type: 'service', description: 'Request', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'server', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Server', type: 'service', description: 'Google', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'response', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Response', type: 'service', description: 'HTML', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'render', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Render', type: 'client', description: 'DOM + CSS', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'page', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Page', type: 'client', description: 'Loaded', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'browser', target: 'dns', animated: true },
      { id: 'e1', source: 'dns', target: 'tcp', animated: true },
      { id: 'e2', source: 'tcp', target: 'tls', animated: true },
      { id: 'e3', source: 'tls', target: 'http', animated: true },
      { id: 'e4', source: 'http', target: 'server', animated: true },
      { id: 'e5', source: 'server', target: 'response', animated: true },
      { id: 'e6', source: 'response', target: 'render', animated: true },
      { id: 'e7', source: 'render', target: 'page', animated: true }
    ],
  },
  'a-cheatsheet-on-infrastructure-as-code-landscape': {
    title: 'Infrastructure as Code',
    height: 608,
    nodes: [
      { id: 'terraform', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Terraform', type: 'service', description: 'HCL, multi-cloud', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'cloudformation', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'CloudFormation', type: 'external', description: 'AWS', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'pulumi', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Pulumi', type: 'service', description: 'Python/TS', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ansible', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Ansible', type: 'service', description: 'YAML, agentless', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'state', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'State', type: 'database', description: 'Remote backend', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'plan', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Plan', type: 'gateway', description: 'Preview', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'apply', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Apply', type: 'gateway', description: 'Execute', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'provision', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Provision', type: 'service', description: 'Create infra', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'iac', type: 'systemNode', position: { x: 563, y: 419 }, data: { label: 'IaC', type: 'client', description: 'Automate', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'terraform', target: 'state', animated: true },
      { id: 'e1', source: 'cloudformation', target: 'plan', animated: true },
      { id: 'e2', source: 'pulumi', target: 'apply', animated: true },
      { id: 'e3', source: 'ansible', target: 'provision', animated: true },
      { id: 'e4', source: 'state', target: 'plan', animated: true },
      { id: 'e5', source: 'plan', target: 'apply', animated: true },
      { id: 'e6', source: 'apply', target: 'provision', animated: true },
      { id: 'e7', source: 'provision', target: 'iac', animated: true }
    ],
  },
  'how-tiktok-manages-a-200k-file-frontend-monorepo': {
    title: 'TikTok MonoRepo Architecture',
    height: 567,
    nodes: [
      { id: 'monorepo', type: 'systemNode', position: { x: 375, y: 41 }, data: { label: 'MonoRepo', type: 'database', description: '200K files', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'nx', type: 'systemNode', position: { x: 150, y: 176 }, data: { label: 'Nx/Turborepo', type: 'gateway', description: 'Build system', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'shared', type: 'systemNode', position: { x: 375, y: 176 }, data: { label: 'Shared Libs', type: 'cache', description: 'Components', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'apps', type: 'systemNode', position: { x: 600, y: 176 }, data: { label: 'Apps', type: 'service', description: 'Web, Mobile', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'ci', type: 'systemNode', position: { x: 150, y: 338 }, data: { label: 'CI/CD', type: 'gateway', description: 'Affected tests', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'build', type: 'systemNode', position: { x: 375, y: 338 }, data: { label: 'Build Cache', type: 'cache', description: 'Remote cache', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 600, y: 338 }, data: { label: 'Deploy', type: 'service', description: 'Independent', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'scale', type: 'systemNode', position: { x: 375, y: 500 }, data: { label: 'Scale', type: 'client', description: '1B+ users', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'monorepo', target: 'nx', animated: true },
      { id: 'e1', source: 'monorepo', target: 'shared', animated: true },
      { id: 'e2', source: 'monorepo', target: 'apps', animated: true },
      { id: 'e3', source: 'nx', target: 'ci', animated: true },
      { id: 'e4', source: 'shared', target: 'build', animated: true },
      { id: 'e5', source: 'apps', target: 'deploy', animated: true },
      { id: 'e6', source: 'ci', target: 'build', animated: true },
      { id: 'e7', source: 'build', target: 'deploy', animated: true },
      { id: 'e8', source: 'deploy', target: 'scale', animated: true }
    ],
  },
  'my-favorite-10-books-for-software-developers': {
    title: '10 Essential Books',
    height: 675,
    nodes: [
      { id: 'ddia', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'DDIA', type: 'database', description: 'Design', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'clean', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Clean Code', type: 'service', description: 'Craft', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'algo', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Algorithms', type: 'gateway', description: 'CLRS', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'patterns', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Patterns', type: 'gateway', description: 'GoF', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'arch', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Architecture', type: 'external', description: 'Martin', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'os', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'OS', type: 'database', description: 'OSTEP', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'network', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Network', type: 'external', description: 'Tanenbaum', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'read', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Read', type: 'client', description: 'Learn', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'ddia', target: 'clean', animated: true },
      { id: 'e1', source: 'clean', target: 'algo', animated: true },
      { id: 'e2', source: 'algo', target: 'patterns', animated: true },
      { id: 'e3', source: 'patterns', target: 'arch', animated: true },
      { id: 'e4', source: 'arch', target: 'os', animated: true },
      { id: 'e5', source: 'os', target: 'network', animated: true },
      { id: 'e6', source: 'network', target: 'read', animated: true }
    ],
  },
  '18-common-ports-worth-knowing': {
    title: '18 Common Ports',
    height: 675,
    nodes: [
      { id: 'http', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: '80 HTTP', type: 'gateway', description: 'Web', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'https', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: '443 HTTPS', type: 'gateway', description: 'Secure', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'ssh', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: '22 SSH', type: 'external', description: 'Shell', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'ftp', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: '21 FTP', type: 'service', description: 'Files', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'dns', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: '53 DNS', type: 'gateway', description: 'Names', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'smtp', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: '25 SMTP', type: 'service', description: 'Email', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'db', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: '3306 MySQL', type: 'database', description: 'Database', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'redis', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: '6379 Redis', type: 'cache', description: 'Cache', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'mongo', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: '27017 Mongo', type: 'database', description: 'NoSQL', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'http', target: 'https', animated: true },
      { id: 'e1', source: 'https', target: 'ssh', animated: true },
      { id: 'e2', source: 'ssh', target: 'ftp', animated: true },
      { id: 'e3', source: 'ftp', target: 'dns', animated: true },
      { id: 'e4', source: 'dns', target: 'smtp', animated: true },
      { id: 'e5', source: 'smtp', target: 'db', animated: true },
      { id: 'e6', source: 'db', target: 'redis', animated: true },
      { id: 'e7', source: 'redis', target: 'mongo', animated: true }
    ],
  },
  'sqs-vs-sns-vs-eventbridge-vs-kinesis': {
    title: 'AWS Messaging Services',
    height: 675,
    nodes: [
      { id: 'sqs', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'SQS', type: 'queue', description: 'Queue', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'sns', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'SNS', type: 'gateway', description: 'Pub/Sub', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'eventbridge', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'EventBridge', type: 'gateway', description: 'Event bus', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'kinesis', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Kinesis', type: 'queue', description: 'Streaming', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'queue', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Queue', type: 'queue', description: 'FIFO', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'topic', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Topic', type: 'gateway', description: 'Multi-sub', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'rule', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Rules', type: 'gateway', description: 'Filter/route', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'shard', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Shards', type: 'database', description: 'Partition', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'use-sqs', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Decouple', type: 'service', description: 'Async tasks', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'use-sns', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Notify', type: 'service', description: 'Multi-endpoint', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'use-eb', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Route', type: 'service', description: 'Event-driven', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'use-k', type: 'systemNode', position: { x: 750, y: 419 }, data: { label: 'Stream', type: 'service', description: 'Real-time', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'choose', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Choose', type: 'client', description: 'Based on pattern', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'sqs', target: 'queue', animated: true },
      { id: 'e1', source: 'sns', target: 'topic', animated: true },
      { id: 'e2', source: 'eventbridge', target: 'rule', animated: true },
      { id: 'e3', source: 'kinesis', target: 'shard', animated: true },
      { id: 'e4', source: 'queue', target: 'use-sqs', animated: true },
      { id: 'e5', source: 'topic', target: 'use-sns', animated: true },
      { id: 'e6', source: 'rule', target: 'use-eb', animated: true },
      { id: 'e7', source: 'shard', target: 'use-k', animated: true },
      { id: 'e8', source: 'use-sqs', target: 'choose', animated: true },
      { id: 'e9', source: 'use-sns', target: 'choose', animated: true },
      { id: 'e10', source: 'use-eb', target: 'choose', animated: true },
      { id: 'e11', source: 'use-k', target: 'choose', animated: true }
    ],
  },
  'a-cheatsheet-on-comparing-key-value-stores': {
    title: 'Key-Value Stores',
    height: 608,
    nodes: [
      { id: 'redis', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Redis', type: 'cache', description: 'In-memory', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'memcached', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Memcached', type: 'cache', description: 'Simple', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'dynamodb', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'DynamoDB', type: 'database', description: 'AWS', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'etcd', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'etcd', type: 'database', description: 'Config', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'rocksdb', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'RocksDB', type: 'database', description: 'Embedded', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'cassandra', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Cassandra', type: 'database', description: 'Wide column', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'compare', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Compare', type: 'client', description: 'Use case', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'redis', target: 'memcached', animated: true },
      { id: 'e1', source: 'memcached', target: 'dynamodb', animated: true },
      { id: 'e2', source: 'dynamodb', target: 'etcd', animated: true },
      { id: 'e3', source: 'etcd', target: 'rocksdb', animated: true },
      { id: 'e4', source: 'rocksdb', target: 'cassandra', animated: true },
      { id: 'e5', source: 'cassandra', target: 'compare', animated: true }
    ],
  },
  'how-to-load-your-websites-at-lightning-speed': {
    title: 'Frontend Performance',
    height: 608,
    nodes: [
      { id: 'compress', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Compression', type: 'gateway', description: 'Gzip/Brotli', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'minify', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Minify', type: 'service', description: 'CSS/JS', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'lazy', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Lazy Load', type: 'service', description: 'Images', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'CDN', type: 'external', description: 'Edge cache', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'cache', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Browser Cache', type: 'cache', description: 'TTL', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'preload', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Preload', type: 'service', description: 'Critical assets', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'optimize', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Optimize', type: 'service', description: 'Images', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'http2', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'HTTP/2', type: 'gateway', description: 'Multiplex', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'fast', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Fast Site', type: 'client', description: '< 3s load', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'compress', target: 'minify', animated: true },
      { id: 'e1', source: 'minify', target: 'lazy', animated: true },
      { id: 'e2', source: 'lazy', target: 'cdn', animated: true },
      { id: 'e3', source: 'cdn', target: 'cache', animated: true },
      { id: 'e4', source: 'cache', target: 'preload', animated: true },
      { id: 'e5', source: 'preload', target: 'optimize', animated: true },
      { id: 'e6', source: 'optimize', target: 'http2', animated: true },
      { id: 'e7', source: 'http2', target: 'fast', animated: true }
    ],
  },
  'the-data-engineering-roadmap': {
    title: 'Data Engineering Roadmap',
    height: 675,
    nodes: [
      { id: 'python', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Python/SQL', type: 'client', description: 'Basics', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'storage', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Storage', type: 'database', description: 'S3, HDFS', metric: '100B+ objects', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'processing', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Processing', type: 'service', description: 'Spark', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'pipeline', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Pipeline', type: 'gateway', description: 'Airflow', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'warehouse', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Data Warehouse', type: 'database', description: 'Snowflake', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'lake', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Data Lake', type: 'database', description: 'Raw data', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'model', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Data Model', type: 'service', description: 'DBT', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: ' streaming', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Streaming', type: 'queue', description: 'Kafka', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'governance', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Governance', type: 'gateway', description: 'Quality', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'engineer', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Data Engineer', type: 'client', description: 'Expert', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'python', target: 'storage', animated: true },
      { id: 'e1', source: 'storage', target: 'processing', animated: true },
      { id: 'e2', source: 'processing', target: 'pipeline', animated: true },
      { id: 'e3', source: 'pipeline', target: 'warehouse', animated: true },
      { id: 'e4', source: 'warehouse', target: 'lake', animated: true },
      { id: 'e5', source: 'lake', target: 'model', animated: true },
      { id: 'e6', source: 'model', target: ' streaming', animated: true },
      { id: 'e7', source: ' streaming', target: 'governance', animated: true },
      { id: 'e8', source: 'governance', target: 'engineer', animated: true }
    ],
  },
  'the-large-language-model-glossary': {
    title: 'LLM Glossary',
    height: 675,
    nodes: [
      { id: 'token', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Token', type: 'client', description: 'Word piece', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'embedding', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Embedding', type: 'cache', description: 'Vector', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'attention', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Attention', type: 'gateway', description: 'Focus', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'transformer', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Transformer', type: 'gateway', description: 'Architecture', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'prompt', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Prompt', type: 'client', description: 'Input', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'completion', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Completion', type: 'service', description: 'Output', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'fine', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'Fine-tuning', type: 'service', description: 'Adapt', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'inference', type: 'systemNode', position: { x: 75, y: 419 }, data: { label: 'Inference', type: 'gateway', description: 'Generate', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'hallucinate', type: 'systemNode', position: { x: 300, y: 419 }, data: { label: 'Hallucination', type: 'external', description: 'Fake', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'context', type: 'systemNode', position: { x: 525, y: 419 }, data: { label: 'Context Window', type: 'database', description: 'Max tokens', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'glossary', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Glossary', type: 'client', description: 'LLM', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'token', target: 'embedding', animated: true },
      { id: 'e1', source: 'embedding', target: 'attention', animated: true },
      { id: 'e2', source: 'attention', target: 'transformer', animated: true },
      { id: 'e3', source: 'prompt', target: 'completion', animated: true },
      { id: 'e4', source: 'completion', target: 'fine', animated: true },
      { id: 'e5', source: 'fine', target: 'inference', animated: true },
      { id: 'e6', source: 'inference', target: 'hallucinate', animated: true },
      { id: 'e7', source: 'hallucinate', target: 'context', animated: true },
      { id: 'e8', source: 'context', target: 'glossary', animated: true }
    ],
  },
  'how-to-deploy-services': {
    title: 'Service Deployment Strategies',
    height: 567,
    nodes: [
      { id: 'plan', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Plan', type: 'client', description: 'Change review', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'build', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Build', type: 'service', description: 'Compile', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'test', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Test', type: 'gateway', description: 'Verify', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'blue-green', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'Blue-Green', type: 'gateway', description: 'Zero downtime', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'canary', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'Canary', type: 'service', description: 'Gradual', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'rolling', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'Rolling', type: 'service', description: 'Incremental', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'feature', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Feature Flags', type: 'cache', description: 'Toggle', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Monitor', type: 'external', description: 'Observe', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'rollback', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Rollback', type: 'external', description: 'Revert', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'deploy', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Deployed', type: 'client', description: 'Production', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'plan', target: 'build', animated: true },
      { id: 'e1', source: 'build', target: 'test', animated: true },
      { id: 'e2', source: 'test', target: 'blue-green', animated: true },
      { id: 'e3', source: 'blue-green', target: 'canary', animated: true },
      { id: 'e4', source: 'canary', target: 'rolling', animated: true },
      { id: 'e5', source: 'rolling', target: 'feature', animated: true },
      { id: 'e6', source: 'feature', target: 'monitor', animated: true },
      { id: 'e7', source: 'monitor', target: 'rollback', animated: true },
      { id: 'e8', source: 'rollback', target: 'deploy', animated: true }
    ],
  },
  'top-6-most-commonly-used-server-types': {
    title: '6 Common Server Types',
    height: 608,
    nodes: [
      { id: 'web', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Web Server', type: 'gateway', description: 'HTTP content', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'app', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'App Server', type: 'service', description: 'Business logic', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'db', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Database Server', type: 'database', description: 'Data storage', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'mail', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Mail Server', type: 'service', description: 'SMTP/IMAP', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'dns', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'DNS Server', type: 'gateway', description: 'Name resolution', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'file', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'File Server', type: 'database', description: 'Storage', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'CDN Server', type: 'external', description: 'Edge cache', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'infra', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Infrastructure', type: 'client', description: 'Server farm', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'web', target: 'app', animated: true },
      { id: 'e1', source: 'app', target: 'db', animated: true },
      { id: 'e2', source: 'db', target: 'mail', animated: true },
      { id: 'e3', source: 'mail', target: 'dns', animated: true },
      { id: 'e4', source: 'dns', target: 'file', animated: true },
      { id: 'e5', source: 'file', target: 'cdn', animated: true },
      { id: 'e6', source: 'web', target: 'infra', animated: true },
      { id: 'e7', source: 'cdn', target: 'infra', animated: true }
    ],
  },
  '16-coding-patterns-that-make-interviews-easy': {
    title: '16 Coding Patterns',
    height: 743,
    nodes: [
      { id: 'sliding', type: 'systemNode', position: { x: 45, y: 41 }, data: { label: 'Sliding Window', type: 'service', description: 'Subarray', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'twopointers', type: 'systemNode', position: { x: 270, y: 41 }, data: { label: 'Two Pointers', type: 'service', description: 'Sorted', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'bfs', type: 'systemNode', position: { x: 495, y: 41 }, data: { label: 'BFS', type: 'gateway', description: 'Level order', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'dfs', type: 'systemNode', position: { x: 720, y: 41 }, data: { label: 'DFS', type: 'gateway', description: 'Depth', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'binary', type: 'systemNode', position: { x: 45, y: 176 }, data: { label: 'Binary Search', type: 'gateway', description: 'Log n', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'topo', type: 'systemNode', position: { x: 270, y: 176 }, data: { label: 'Topological', type: 'external', description: 'Ordering', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'dp', type: 'systemNode', position: { x: 495, y: 176 }, data: { label: 'DP', type: 'external', description: 'Memoize', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'greedy', type: 'systemNode', position: { x: 720, y: 176 }, data: { label: 'Greedy', type: 'service', description: 'Local opt', metric: 'Active', status: 'success', details: ['Running'] } },
      { id: 'patterns', type: 'systemNode', position: { x: 383, y: 338 }, data: { label: '16 Patterns', type: 'client', description: 'Master', metric: 'Active', status: 'success', details: ['Running'] } }
    ],
    edges: [
      { id: 'e0', source: 'sliding', target: 'twopointers', animated: true },
      { id: 'e1', source: 'twopointers', target: 'bfs', animated: true },
      { id: 'e2', source: 'bfs', target: 'dfs', animated: true },
      { id: 'e3', source: 'dfs', target: 'binary', animated: true },
      { id: 'e4', source: 'binary', target: 'topo', animated: true },
      { id: 'e5', source: 'topo', target: 'dp', animated: true },
      { id: 'e6', source: 'dp', target: 'greedy', animated: true },
      { id: 'e7', source: 'greedy', target: 'patterns', animated: true }
    ],
  },
  'the-modern-software-stack': {
    title: 'Modern Software Stack',
    height: 608,
    nodes: [
      { id: 'frontend', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Frontend', type: 'client', description: 'React, Vue', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'backend', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Backend', type: 'service', description: 'Node, Go', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'database', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Database', type: 'database', description: 'PostgreSQL', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cache', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Cache', type: 'cache', description: 'Redis', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'queue', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Queue', type: 'queue', description: 'Kafka', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'search', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Search', type: 'cache', description: 'Elasticsearch', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'cdn', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'CDN', type: 'external', description: 'CloudFront', metric: '<50ms', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Monitor', type: 'external', description: 'Datadog', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'ci', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'CI/CD', type: 'service', description: 'GitHub Actions', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'stack', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Stack', type: 'client', description: 'Modern', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'frontend', target: 'backend', animated: true },
      { id: 'e1', source: 'backend', target: 'database', animated: true },
      { id: 'e2', source: 'backend', target: 'cache', animated: true },
      { id: 'e3', source: 'cache', target: 'queue', animated: true },
      { id: 'e4', source: 'queue', target: 'search', animated: true },
      { id: 'e5', source: 'search', target: 'cdn', animated: true },
      { id: 'e6', source: 'cdn', target: 'monitor', animated: true },
      { id: 'e7', source: 'monitor', target: 'ci', animated: true },
      { id: 'e8', source: 'ci', target: 'stack', animated: true }
    ],
  },
  'the-testing-pyramid': {
    title: 'Testing Pyramid',
    height: 608,
    nodes: [
      { id: 'unit', type: 'systemNode', position: { x: 375, y: 68 }, data: { label: 'Unit Tests', type: 'service', description: '70% - Fast', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'integration', type: 'systemNode', position: { x: 375, y: 243 }, data: { label: 'Integration', type: 'gateway', description: '20% - Medium', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'e2e', type: 'systemNode', position: { x: 375, y: 419 }, data: { label: 'E2E Tests', type: 'external', description: '10% - Slow', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'component', type: 'systemNode', position: { x: 150, y: 243 }, data: { label: 'Component', type: 'cache', description: 'Isolated', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'contract', type: 'systemNode', position: { x: 600, y: 243 }, data: { label: 'Contract', type: 'cache', description: 'API agree', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'ui', type: 'systemNode', position: { x: 150, y: 419 }, data: { label: 'UI Tests', type: 'client', description: 'Selenium/Playwright', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'api-test', type: 'systemNode', position: { x: 600, y: 419 }, data: { label: 'API Tests', type: 'client', description: 'Postman', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'quality', type: 'systemNode', position: { x: 375, y: 567 }, data: { label: 'Quality', type: 'client', description: 'Reliable software', metric: '2B+ MAU', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'unit', target: 'component', animated: true },
      { id: 'e1', source: 'component', target: 'integration', animated: true },
      { id: 'e2', source: 'integration', target: 'contract', animated: true },
      { id: 'e3', source: 'contract', target: 'e2e', animated: true },
      { id: 'e4', source: 'e2e', target: 'ui', animated: true },
      { id: 'e5', source: 'e2e', target: 'api-test', animated: true },
      { id: 'e6', source: 'ui', target: 'quality', animated: true },
      { id: 'e7', source: 'api-test', target: 'quality', animated: true }
    ],
  },
  'servers-you-should-know-in-modern-systems': {
    title: 'Modern Server Types',
    height: 608,
    nodes: [
      { id: 'web', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Web Server', type: 'gateway', description: 'Nginx, Apache', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'app', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'App Server', type: 'service', description: 'Business logic', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'db', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'DB Server', type: 'database', description: 'PostgreSQL', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'cache', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Cache Server', type: 'cache', description: 'Redis', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'message', type: 'systemNode', position: { x: 188, y: 243 }, data: { label: 'Message Broker', type: 'queue', description: 'Kafka', metric: 'Async', status: 'success', details: ['Durability', 'Ordering'] } },
      { id: 'search', type: 'systemNode', position: { x: 413, y: 243 }, data: { label: 'Search Server', type: 'cache', description: 'Elasticsearch', metric: 'Hot data', status: 'success', details: ['TTL', 'Eviction'] } },
      { id: 'file', type: 'systemNode', position: { x: 638, y: 243 }, data: { label: 'File Server', type: 'database', description: 'S3', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'monitor', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'Monitor Server', type: 'external', description: 'Prometheus', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'ci', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'CI/CD Server', type: 'service', description: 'Jenkins', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'system', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'System', type: 'client', description: 'Modern stack', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'web', target: 'app', animated: true },
      { id: 'e1', source: 'app', target: 'db', animated: true },
      { id: 'e2', source: 'app', target: 'cache', animated: true },
      { id: 'e3', source: 'app', target: 'message', animated: true },
      { id: 'e4', source: 'message', target: 'search', animated: true },
      { id: 'e5', source: 'db', target: 'file', animated: true },
      { id: 'e6', source: 'cache', target: 'monitor', animated: true },
      { id: 'e7', source: 'message', target: 'ci', animated: true },
      { id: 'e8', source: 'monitor', target: 'system', animated: true },
      { id: 'e9', source: 'ci', target: 'system', animated: true }
    ],
  },
  'system-performance-metrics-every-engineer-should-k': {
    title: 'System Performance Metrics',
    height: 675,
    nodes: [
      { id: 'latency', type: 'systemNode', position: { x: 75, y: 68 }, data: { label: 'Latency', type: 'client', description: 'Response time', metric: '500M+ users', status: 'success', details: ['Requests', 'Sessions'] } },
      { id: 'throughput', type: 'systemNode', position: { x: 300, y: 68 }, data: { label: 'Throughput', type: 'gateway', description: 'Req/sec', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'error-rate', type: 'systemNode', position: { x: 525, y: 68 }, data: { label: 'Error Rate', type: 'external', description: '5xx %', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'availability', type: 'systemNode', position: { x: 750, y: 68 }, data: { label: 'Availability', type: 'gateway', description: 'Uptime %', metric: 'Routing', status: 'success', details: ['Health check', 'Failover'] } },
      { id: 'p50', type: 'systemNode', position: { x: 75, y: 243 }, data: { label: 'p50', type: 'service', description: 'Median', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'p95', type: 'systemNode', position: { x: 300, y: 243 }, data: { label: 'p95', type: 'service', description: 'Tail latency', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'p99', type: 'systemNode', position: { x: 525, y: 243 }, data: { label: 'p99', type: 'service', description: 'Worst case', metric: 'Processing', status: 'success', details: ['Horizontal scale', 'Health checks'] } },
      { id: 'saturation', type: 'systemNode', position: { x: 750, y: 243 }, data: { label: 'Saturation', type: 'external', description: 'Resource use', metric: '3rd party', status: 'info', details: ['API', 'Webhook'] } },
      { id: 'cpu', type: 'systemNode', position: { x: 188, y: 419 }, data: { label: 'CPU', type: 'database', description: 'Utilization', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'memory', type: 'systemNode', position: { x: 413, y: 419 }, data: { label: 'Memory', type: 'database', description: 'RAM usage', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'disk', type: 'systemNode', position: { x: 638, y: 419 }, data: { label: 'Disk I/O', type: 'database', description: 'Read/write', metric: 'Persistent', status: 'success', details: ['Backup', 'Replication'] } },
      { id: 'healthy', type: 'systemNode', position: { x: 413, y: 567 }, data: { label: 'Healthy System', type: 'client', description: 'All green', metric: 'Active', status: 'success', details: ['Requests', 'Sessions'] } }
    ],
    edges: [
      { id: 'e0', source: 'latency', target: 'p50', animated: true },
      { id: 'e1', source: 'throughput', target: 'p95', animated: true },
      { id: 'e2', source: 'error-rate', target: 'p99', animated: true },
      { id: 'e3', source: 'availability', target: 'saturation', animated: true },
      { id: 'e4', source: 'p50', target: 'cpu', animated: true },
      { id: 'e5', source: 'p95', target: 'memory', animated: true },
      { id: 'e6', source: 'p99', target: 'disk', animated: true },
      { id: 'e7', source: 'saturation', target: 'cpu', animated: true },
      { id: 'e8', source: 'cpu', target: 'healthy', animated: true },
      { id: 'e9', source: 'memory', target: 'healthy', animated: true },
      { id: 'e10', source: 'disk', target: 'healthy', animated: true }
    ],
  },
};

// Static diagram-design HTML registry
// Maps topic slugs to their static diagram HTML paths
export const staticDiagrams: Record<string, { title: string; src: string; height?: number }> = {
  'forward-proxy-versus-reverse-proxy': {
    title: 'Proxy Architecture',
    src: '/diagrams/system-design/load-balancer.html',
    height: 648,
  },
  'how-can-cache-systems-go-wrong': {
    title: 'Cache Request Flow',
    src: '/diagrams/networking/cdn-flow.html',
    height: 648,
  },
  'how-data-lake-architecture-works': {
    title: 'Data Architecture',
    src: '/diagrams/databases/sharding.html',
    height: 702,
  },
  'what-are-modular-monoliths': {
    title: 'Monolith vs Microservices',
    src: '/diagrams/system-design/microservices-vs-monolith.html',
    height: 702,
  },
  'batch-vs-stream-processing': {
    title: 'Event-Driven Processing',
    src: '/diagrams/system-design/event-driven.html',
    height: 702,
  },
  '24-good-resources-to-learn-software-architecture-i-2': {
    title: '24 Good Resources to Learn Software Architecture in 2025',
    src: '/diagrams/system-design/24-good-resources-to-learn-software-architecture-i-2.html',
    height: 702,
  },
  '8-system-design-concepts-explained-in-1-diagram': {
    title: '8 System Design Concepts Explained in 1 Diagram',
    src: '/diagrams/system-design/8-system-design-concepts-explained-in-1-diagram.html',
    height: 702,
  },
  'apache-kafka-explained-at-the-high-level': {
    title: 'Apache Kafka Explained (At the high level)',
    src: '/diagrams/system-design/apache-kafka-explained-at-the-high-level.html',
    height: 702,
  },
  'apache-kafka-vs-rabbitmq': {
    title: 'Apache Kafka vs. RabbitMQ',
    src: '/diagrams/system-design/apache-kafka-vs-rabbitmq.html',
    height: 702,
  },
  'big-data-pipeline-cheatsheet-for-aws-azure-and-goo': {
    title: 'Big Data Pipeline Cheatsheet for AWS, Azure, and Google Cloud',
    src: '/diagrams/system-design/big-data-pipeline-cheatsheet-for-aws-azure-and-goo.html',
    height: 702,
  },
  'how-clean-architecture-works': {
    title: 'How Clean Architecture Works?',
    src: '/diagrams/system-design/how-clean-architecture-works.html',
    height: 702,
  },
  'how-netflix-built-a-distributed-counter-2': {
    title: 'How Netflix Built a Distributed Counter',
    src: '/diagrams/system-design/how-netflix-built-a-distributed-counter-2.html',
    height: 702,
  },
  'the-evolution-of-scaling-at-netflix': {
    title: 'The Evolution of Scaling at Netflix',
    src: '/diagrams/system-design/the-evolution-of-scaling-at-netflix.html',
    height: 567,
  },
  'top-20-system-design-concepts-you-should-know-2': {
    title: 'Top 20 System Design Concepts You Should Know',
    src: '/diagrams/system-design/top-20-system-design-concepts-you-should-know-2.html',
    height: 702,
  },
  'why-is-nginx-so-popular': {
    title: 'Why Is Nginx So Popular?',
    src: '/diagrams/system-design/why-is-nginx-so-popular.html',
    height: 702,
  },
  '6-data-structures-to-save-storage': {
    title: '6 Data Structures to Save Storage',
    src: '/diagrams/ai-ml/6-data-structures-to-save-storage.html',
    height: 702,
  },
  '6-steps-to-create-a-new-ai-model': {
    title: '6 Steps to Create a New AI Model',
    src: '/diagrams/ai-ml/6-steps-to-create-a-new-ai-model.html',
    height: 702,
  },
  'generative-adversarial-network-gan-ai-by-hand': {
    title: 'Generative Adversarial Network (GAN) - AI by Hand ✍',
    src: '/diagrams/ai-ml/generative-adversarial-network-gan-ai-by-hand.html',
    height: 702,
  },
  'how-ai-agents-chain-tools-memory-and-reasoning': {
    title: 'How AI Agents Chain Tools, Memory, and Reasoning?',
    src: '/diagrams/ai-ml/how-ai-agents-chain-tools-memory-and-reasoning.html',
    height: 702,
  },
  'how-do-airtags-work': {
    title: 'How do AirTags work?',
    src: '/diagrams/ai-ml/how-do-airtags-work.html',
    height: 702,
  },
  'how-openais-gpt-oss-120b-and-20b-models-work': {
    title: 'How OpenAI\'s GPT-OSS 120B and 20B Models Work?',
    src: '/diagrams/ai-ml/how-openais-gpt-oss-120b-and-20b-models-work.html',
    height: 702,
  },
  'how-to-build-a-basic-rag-application-on-aws': {
    title: 'How to Build a Basic RAG Application on AWS?',
    src: '/diagrams/ai-ml/how-to-build-a-basic-rag-application-on-aws.html',
    height: 702,
  },
  'hub-switch-router-explained': {
    title: 'Hub, Switch, & Router Explained',
    src: '/diagrams/ai-ml/hub-switch-router-explained.html',
    height: 702,
  },
  'key-terms-in-domain-driven-design': {
    title: 'Key Terms in Domain-Driven Design',
    src: '/diagrams/ai-ml/key-terms-in-domain-driven-design.html',
    height: 702,
  },
  'mcp-versus-a2a-protocol': {
    title: 'MCP Versus A2A Protocol',
    src: '/diagrams/ai-ml/mcp-versus-a2a-protocol.html',
    height: 702,
  },
  'top-ai-agent-frameworks-you-should-know': {
    title: 'Top AI Agent Frameworks You Should Know',
    src: '/diagrams/ai-ml/top-ai-agent-frameworks-you-should-know.html',
    height: 702,
  },
  'virtualization-explained-from-bare-metal-to-hosted': {
    title: 'Virtualization Explained: From Bare Metal to Hosted Hypervisors',
    src: '/diagrams/ai-ml/virtualization-explained-from-bare-metal-to-hosted.html',
    height: 702,
  },
  'virtualization-vs-containerization-2': {
    title: 'Virtualization vs. Containerization',
    src: '/diagrams/ai-ml/virtualization-vs-containerization-2.html',
    height: 702,
  },
  'what-is-mcp': {
    title: 'What is MCP?',
    src: '/diagrams/ai-ml/what-is-mcp.html',
    height: 702,
  },
  'best-practices-in-api-design': {
    title: 'Best Practices in API Design',
    src: '/diagrams/apis-web/best-practices-in-api-design.html',
    height: 702,
  },
  'evolution-of-http': {
    title: 'Evolution of HTTP',
    src: '/diagrams/apis-web/evolution-of-http.html',
    height: 567,
  },
  'how-https-works': {
    title: 'How HTTPS Works?',
    src: '/diagrams/apis-web/how-https-works.html',
    height: 702,
  },
  'how-to-debug-a-slow-api': {
    title: 'How to Debug a Slow API?',
    src: '/diagrams/apis-web/how-to-debug-a-slow-api.html',
    height: 702,
  },
  'how-to-design-good-apis': {
    title: 'How to Design Good APIs',
    src: '/diagrams/apis-web/how-to-design-good-apis.html',
    height: 702,
  },
  'how-to-learn-api-development': {
    title: 'How to Learn API Development?',
    src: '/diagrams/apis-web/how-to-learn-api-development.html',
    height: 702,
  },
  'how-to-learn-backend-development': {
    title: 'How to Learn Backend Development?',
    src: '/diagrams/apis-web/how-to-learn-backend-development.html',
    height: 702,
  },
  'http-vs-https': {
    title: 'HTTP vs. HTTPS',
    src: '/diagrams/apis-web/http-vs-https.html',
    height: 702,
  },
  'http1-http2-http3': {
    title: 'HTTP/1 -> HTTP/2 -> HTTP/3',
    src: '/diagrams/apis-web/http1-http2-http3.html',
    height: 756,
  },
  'structure-of-url': {
    title: 'Structure of URL',
    src: '/diagrams/apis-web/structure-of-url.html',
    height: 702,
  },
  'the-5-pillars-of-api-design': {
    title: 'The 5 Pillars of API Design',
    src: '/diagrams/apis-web/the-5-pillars-of-api-design.html',
    height: 702,
  },
  'what-happens-when-you-type-a-url-into-a-browser': {
    title: 'What happens when you type a URL into a browser?',
    src: '/diagrams/apis-web/what-happens-when-you-type-a-url-into-a-browser.html',
    height: 702,
  },
  'what-is-a-rest-api': {
    title: 'What is a REST API?',
    src: '/diagrams/apis-web/what-is-a-rest-api.html',
    height: 702,
  },
  '16-coding-patterns-that-make-interviews-easy': {
    title: '16 Coding Patterns That Make Interviews Easy',
    src: '/diagrams/career/16-coding-patterns-that-make-interviews-easy.html',
    height: 702,
  },
  'a-cheatsheet-on-infrastructure-as-code-landscape': {
    title: 'A Cheatsheet on Infrastructure as Code Landscape',
    src: '/diagrams/career/a-cheatsheet-on-infrastructure-as-code-landscape.html',
    height: 702,
  },
  'how-to-deploy-services': {
    title: 'How to Deploy Services',
    src: '/diagrams/career/how-to-deploy-services.html',
    height: 702,
  },
  'how-to-load-your-websites-at-lightning-speed': {
    title: 'How to load your websites at lightning speed',
    src: '/diagrams/career/how-to-load-your-websites-at-lightning-speed.html',
    height: 702,
  },
  'how-tiktok-manages-a-200k-file-frontend-monorepo': {
    title: 'How TikTok Manages a 200K File Frontend MonoRepo?',
    src: '/diagrams/career/how-tiktok-manages-a-200k-file-frontend-monorepo.html',
    height: 702,
  },
  'servers-you-should-know-in-modern-systems': {
    title: 'Servers You Should Know in Modern Systems',
    src: '/diagrams/career/servers-you-should-know-in-modern-systems.html',
    height: 702,
  },
  'the-large-language-model-glossary': {
    title: 'The Large-Language Model Glossary',
    src: '/diagrams/career/the-large-language-model-glossary.html',
    height: 702,
  },
  '5-data-structures-that-make-db-queries-super-fast': {
    title: '5 Data Structures That Make DB Queries Super Fast',
    src: '/diagrams/databases/5-data-structures-that-make-db-queries-super-fast.html',
    height: 702,
  },
  'how-mongodb-works': {
    title: 'How MongoDB Works?',
    src: '/diagrams/databases/how-mongodb-works.html',
    height: 702,
  },
  'how-sql-query-executes-in-a-database': {
    title: 'How SQL Query Executes In A Database?',
    src: '/diagrams/databases/how-sql-query-executes-in-a-database.html',
    height: 702,
  },
  'how-to-learn-databases': {
    title: 'How to Learn Databases?',
    src: '/diagrams/databases/how-to-learn-databases.html',
    height: 702,
  },
  'postgresql-101-the-everything-database': {
    title: 'PostgreSQL 101: The Everything Database',
    src: '/diagrams/databases/postgresql-101-the-everything-database.html',
    height: 702,
  },
  'a-simplified-git-workflow': {
    title: 'A Simplified Git Workflow',
    src: '/diagrams/devops/a-simplified-git-workflow.html',
    height: 702,
  },
  'cicd-simplified-visual-guide': {
    title: 'CI/CD Simplified Visual Guide',
    src: '/diagrams/devops/cicd-simplified-visual-guide.html',
    height: 702,
  },
  'how-do-companies-ship-code-to-production': {
    title: 'How Do Companies Ship Code to Production?',
    src: '/diagrams/devops/how-do-companies-ship-code-to-production.html',
    height: 702,
  },
  'how-git-reset-works': {
    title: 'How Git Reset Works?',
    src: '/diagrams/devops/how-git-reset-works.html',
    height: 702,
  },
  'how-gitflow-branching-works': {
    title: 'How Gitflow Branching Works?',
    src: '/diagrams/devops/how-gitflow-branching-works.html',
    height: 702,
  },
  'how-kubernetes-works': {
    title: 'How Kubernetes Works?',
    src: '/diagrams/devops/how-kubernetes-works.html',
    height: 702,
  },
  'how-to-learn-aws': {
    title: 'How to Learn AWS?',
    src: '/diagrams/devops/how-to-learn-aws.html',
    height: 702,
  },
  'how-to-learn-cloud-computing': {
    title: 'How to Learn Cloud Computing?',
    src: '/diagrams/devops/how-to-learn-cloud-computing.html',
    height: 702,
  },
  'how-to-learn-kubernetes': {
    title: 'How to Learn Kubernetes?',
    src: '/diagrams/devops/how-to-learn-kubernetes.html',
    height: 702,
  },
  'the-lifecycle-of-a-kubernetes-pod': {
    title: 'The Lifecycle of a Kubernetes Pod',
    src: '/diagrams/devops/the-lifecycle-of-a-kubernetes-pod.html',
    height: 567,
  },
  '8-popular-network-protocols': {
    title: '8 Popular Network Protocols',
    src: '/diagrams/networking/8-popular-network-protocols.html',
    height: 756,
  },
  'common-network-protocols-every-engineer-should-kno': {
    title: 'Common Network Protocols Every Engineer Should Know',
    src: '/diagrams/networking/common-network-protocols-every-engineer-should-kno.html',
    height: 756,
  },
  'latency-vs-throughput': {
    title: 'Latency vs. Throughput',
    src: '/diagrams/networking/latency-vs-throughput.html',
    height: 702,
  },
  'modem-vs-router': {
    title: 'Modem vs. Router',
    src: '/diagrams/networking/modem-vs-router.html',
    height: 702,
  },
  'must-know-network-protocol-dependencies': {
    title: 'Must-Know Network Protocol Dependencies',
    src: '/diagrams/networking/must-know-network-protocol-dependencies.html',
    height: 756,
  },
  'network-debugging-commands-every-engineer-should-k': {
    title: 'Network Debugging Commands Every Engineer Should Know',
    src: '/diagrams/networking/network-debugging-commands-every-engineer-should-k.html',
    height: 702,
  },
  'network-services-that-power-modern-connectivity': {
    title: 'Network Services That Power Modern Connectivity',
    src: '/diagrams/networking/network-services-that-power-modern-connectivity.html',
    height: 702,
  },
  'the-building-blocks-of-modern-networking': {
    title: 'The Building Blocks of Modern Networking',
    src: '/diagrams/networking/the-building-blocks-of-modern-networking.html',
    height: 702,
  },
  'what-is-a-firewall': {
    title: 'What is a Firewall?',
    src: '/diagrams/networking/what-is-a-firewall.html',
    height: 702,
  },
  'which-protocols-run-on-tcp-and-udp': {
    title: 'Which Protocols Run on TCP and UDP',
    src: '/diagrams/networking/which-protocols-run-on-tcp-and-udp.html',
    height: 756,
  },
  '18-key-design-patterns-every-developer-should-know': {
    title: '18 Key Design Patterns Every Developer Should Know',
    src: '/diagrams/programming/18-key-design-patterns-every-developer-should-know.html',
    height: 702,
  },
  '9-oop-design-patterns-you-must-know': {
    title: '9 OOP Design Patterns You Must Know',
    src: '/diagrams/programming/9-oop-design-patterns-you-must-know.html',
    height: 702,
  },
  'design-patterns-cheat-sheet': {
    title: 'Design Patterns Cheat Sheet',
    src: '/diagrams/programming/design-patterns-cheat-sheet.html',
    height: 702,
  },
  'how-computer-memory-works': {
    title: 'How Computer Memory Works?',
    src: '/diagrams/programming/how-computer-memory-works.html',
    height: 702,
  },
  'how-java-hashmaps-work': {
    title: 'How Java HashMaps Work?',
    src: '/diagrams/programming/how-java-hashmaps-work.html',
    height: 702,
  },
  'how-java-virtual-threads-work': {
    title: 'How Java Virtual Threads Work?',
    src: '/diagrams/programming/how-java-virtual-threads-work.html',
    height: 702,
  },
  'how-java-works': {
    title: 'How Java Works',
    src: '/diagrams/programming/how-java-works.html',
    height: 702,
  },
  'how-python-works': {
    title: 'How Python Works',
    src: '/diagrams/programming/how-python-works.html',
    height: 702,
  },
  'popular-interview-question-what-is-the-difference-': {
    title: 'Popular interview question: What is the difference between Process and Thread?',
    src: '/diagrams/programming/popular-interview-question-what-is-the-difference-.html',
    height: 702,
  },
  'how-does-sso-work': {
    title: 'How Does SSO Work?',
    src: '/diagrams/security/how-does-sso-work.html',
    height: 702,
  },
  'how-two-factor-authentication-2fa-works': {
    title: 'How Two-factor Authentication (2FA) Works?',
    src: '/diagrams/security/how-two-factor-authentication-2fa-works.html',
    height: 702,
  },
  'what-is-sso-single-sign-on': {
    title: 'What is SSO (Single Sign-On)?',
    src: '/diagrams/security/what-is-sso-single-sign-on.html',
    height: 702,
  },
};

export function getDiagramForSlug(slug: string): DiagramPreset | null {
  return diagramPresets[slug] || null;
}

export function getStaticDiagramForSlug(slug: string): { title: string; src: string; height?: number } | null {
  return staticDiagrams[slug] || null;
}
