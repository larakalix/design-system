import React from 'react';
import SystemDiagram from './SystemDiagram';
import { getDiagramForSlug } from '../../data/diagrams';

interface DiagramViewerProps {
  slug: string;
  images: string[];
  topicTitle: string;
}

export default function DiagramViewer({ slug, images, topicTitle }: DiagramViewerProps) {
  const diagram = getDiagramForSlug(slug);

  return (
    <div className="space-y-8">
      {/* Interactive React Flow Diagram */}
      {diagram && (
        <div>
          <SystemDiagram
            nodes={diagram.nodes}
            edges={diagram.edges}
            title={diagram.title}
            height={diagram.height || 400}
          />
        </div>
      )}

      {/* Original Images from PDF */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-text-muted uppercase tracking-wider">Original Source Diagram</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          {images.map((img, i) => (
            <figure key={i} className="rounded-xl overflow-hidden border border-border bg-surface-muted">
              <img
                src={img}
                alt={`${topicTitle} - diagram ${i + 1}`}
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
