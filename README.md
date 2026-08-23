# System Design Archive 2025

[![Astro](https://img.shields.io/badge/Astro-7.0+-BC52EE?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0-5A0EF8?logo=daisyui)](https://daisyui.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)

An interactive, open-source knowledge base built from the **Big Archive System Design 2025** — a comprehensive 442-page reference covering system design, software architecture, AI/ML, DevOps, networking, and more.

**[Live Demo](https://example.com)** | **[Topics](/topics)** | **[Categories](/categories)**

---

## Features

- **212 Topics** curated and organized into **10 categories**
- **Interactive Diagrams** powered by React Flow — click, pan, zoom, and explore system architectures
- **Dark Mode** with OS-aware detection and localStorage persistence
- **Live Search & Filters** — instantly search across all topics by title or category
- **Static Site Generation** — built with Astro for blazing-fast performance
- **Responsive Design** — works beautifully on mobile, tablet, and desktop
- **Accessibility First** — semantic HTML, keyboard navigation, ARIA labels

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 7](https://astro.build) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com) |
| Components | [React 19](https://react.dev) |
| Diagrams | [React Flow (xyflow)](https://xyflow.com) |
| Animations | [Framer Motion](https://framer.com/motion) |
| Icons | [Lucide](https://lucide.dev) |

---

## Project Structure

```
.
├── public/
│   ├── favicon.svg
│   └── images/
│       └── topics/              # Extracted diagrams from PDF (215 images)
├── src/
│   ├── components/
│   │   ├── atoms/               # Smallest UI units (Badge)
│   │   ├── molecules/           # Composed atoms (TopicCard, CategoryCard)
│   │   ├── organisms/           # Complex sections (Header, Footer)
│   │   ├── templates/           # Page-level layouts
│   │   └── react/               # Interactive React components
│   │       ├── SystemDiagram.tsx    # React Flow diagram renderer
│   │       └── DiagramViewer.tsx    # Wrapper for diagrams + images
│   ├── data/
│   │   ├── topics.json          # All 212 topics with metadata
│   │   └── diagrams.ts          # Interactive diagram presets
│   ├── layouts/
│   │   └── Layout.astro         # Base page layout
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── topics.astro         # All topics with search/filter
│   │   ├── categories.astro     # Topics grouped by category
│   │   ├── credits.astro        # Attribution page
│   │   └── topic/
│   │       └── [slug].astro     # Individual topic pages
│   ├── styles/
│   │   └── global.css           # Tailwind + DaisyUI + custom styles
│   └── content.config.ts
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js `>= 22.12.0`
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/larakalix/design-system.git
cd design-system

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The site will be available at `http://localhost:4321`.

### Build for Production

```bash
pnpm build
```

The static site will be generated in the `dist/` directory.

### Preview Production Build

```bash
pnpm preview
```

---

## Interactive Diagrams

Topics with matching diagram presets display **playful, interactive React Flow diagrams** alongside the original PDF images.

### Available Diagram Presets

| Topic Slug | Diagram |
|-----------|---------|
| `how-does-grpc-work` | gRPC Communication Flow |
| `docker-vs-kubernetes-which-one-should-we-use` | Docker vs Kubernetes Architecture |
| `what-happens-when-you-type-google-com-into-a-browser` | Browser Request Pipeline |
| `how-kubernetes-works` | Kubernetes Control Plane |
| `how-amazon-s3-works` | Amazon S3 Request Routing |
| `redis-vs-memcached` | Redis vs Memcached Comparison |
| *(generic patterns)* | API Gateway, Load Balancer, Microservices, Cache |

### How to Add a New Diagram

1. Open `src/data/diagrams.ts`
2. Add a new entry to `diagramPresets` with the topic slug as key:

```typescript
'my-new-topic-slug': {
  title: 'My Diagram Title',
  height: 400,
  nodes: [
    { id: 'a', type: 'systemNode', position: { x: 0, y: 0 }, data: { label: 'Node A', type: 'client', description: '...' } },
    { id: 'b', type: 'systemNode', position: { x: 200, y: 0 }, data: { label: 'Node B', type: 'service', description: '...' } },
  ],
  edges: [
    { id: 'e1', source: 'a', target: 'b', animated: true, label: 'request' },
  ],
},
```

3. Rebuild the site — the diagram will automatically appear on the topic page.

### Node Types

| Type | Color | Use Case |
|------|-------|----------|
| `client` | Blue | Users, browsers, mobile apps |
| `gateway` | Amber | API gateways, load balancers |
| `service` | Emerald | Application services |
| `database` | Pink | Databases, storage |
| `cache` | Indigo | Redis, Memcached |
| `queue` | Violet | Kafka, RabbitMQ |
| `external` | Teal | Third-party APIs, DNS |
| `default` | Slate | Generic nodes |

---

## Architecture

This project follows the **Atomic Design** methodology:

- **Atoms**: Basic building blocks (Badge)
- **Molecules**: Simple component groups (TopicCard, CategoryCard)
- **Organisms**: Complex UI sections (Header, Footer)
- **Templates**: Page-level layouts
- **Pages**: Complete views

This approach ensures **DRY principles** and makes components reusable, testable, and maintainable.

---

## Data Pipeline

The topic data is generated from the PDF table of contents:

1. **Extract TOC** — Parse pages 1-7 of the PDF to get topic titles and page numbers
2. **Categorize** — Use keyword matching to assign each topic to one of 10 categories
3. **Extract Content** — Pull text from each topic's page for previews
4. **Extract Images** — Use PyMuPDF to extract diagrams from each topic page
5. **Generate Slugs** — Create URL-friendly identifiers
6. **Build** — Astro generates 216 static pages at build time

---

## Customization

### Themes

DaisyUI themes are configured in `src/styles/global.css`. The default theme uses custom CSS properties that switch automatically in dark mode via the `html.dark` class.

To add a new DaisyUI theme, import it in `global.css`:

```css
@import "daisyui/themes/cupcake";
```

### Adding New Categories

1. Update `category_meta` in `src/data/topics.json`
2. Add category keywords in the categorization script
3. Update the Badge color map in `src/components/atoms/Badge.astro`

---

## Deployment

This is a static site that can be deployed anywhere:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag `dist/` folder or use Git integration
- **GitHub Pages**: Enable Pages in repo settings, set source to `gh-pages` branch
- **Cloudflare Pages**: Connect Git repository

---

## Attribution

All content is derived from the **Big Archive System Design 2025** PDF. This is an independent, non-commercial tribute created to make the material more accessible and interactive.

- **Original Source**: Big Archive System Design 2025
- **Pages**: 442
- **Topics**: 212
- **Categories**: 10

This project is **not affiliated** with the original publisher. If you find value in the content, please support the original authors.

---

## License

This project is open source and available under the [MIT License](LICENSE).

The original PDF content remains the property of its respective authors.

---

## Contributing

Contributions are welcome! Areas where help is appreciated:

- Adding more interactive diagram presets
- Improving content extraction from PDF pages
- Adding new features (bookmarks, progress tracking, etc.)
- Bug fixes and accessibility improvements

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## Acknowledgments

- [ByteByteGo](https://bytebytego.com) for the incredible System Design content
- [Astro](https://astro.build) for the blazing-fast static site generator
- [DaisyUI](https://daisyui.com) for the beautiful Tailwind components
- [React Flow](https://xyflow.com) for the interactive diagram library
- The open-source community for making this possible
