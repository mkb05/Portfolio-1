import React, { useState } from "react";

// Native SVG Icon Component
const Icon: React.FC<{ d: string; className?: string; size?: number }> = ({
  d,
  className,
  size = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const projects = [
  {
    title: "Enterprise Multi-Agent CRAG System",
    description:
      "A production-ready RAG application using LangGraph and Llama 3.2. Features a multi-agent pipeline to prevent hallucinations and enforce strict session-based data isolation.",
    tags: ["FastAPI", "LangGraph", "Ollama", "ChromaDB", "SQLite"],
    pipeline: [
      "Query Rewriter",
      "Hybrid Retriever",
      "Document Grader",
      "Synthesizer",
    ],
    github: "https://github.com/mkb05/FastAPI-Hybrid-RAG-Engine.git",
  },
  {
    title: "AI-Powered Bug Analysis Agent",
    description:
      "An agentic RAG pipeline that ingests repository code via AST-based chunking. Performs semantic similarity search against bug contexts to generate automated fixes and root-cause analyses.",
    tags: ["Node.js", "AST Parsing", "Xenova BGE-M3", "Azure DevOps API"],
    pipeline: [
      "AST Chunking",
      "Embedding",
      "Semantic Search",
      "Root Cause Analysis",
    ],
    github: "#",
  },
];

const Portfolio: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () =>
    setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-blue-900 selection:text-white pb-12">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-20 border-b border-gray-800">
        <div className="flex items-center gap-2 text-blue-400 mb-4">
          <Icon
            d="M2 14h2M6 14h2M10 14h2M14 14h2M18 14h2M22 14h2M4 10h16M4 18h16M4 22h16M2 6h2M6 6h2M10 6h2M14 6h2M18 6h2M22 6h2"
            className="w-5 h-5"
          />
          <span className="font-mono text-sm tracking-wider uppercase">
            System Status: Online
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Manojkumar B
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-8">
          Full-Stack Software Engineer specializing in building enterprise web
          applications and{" "}
          <span className="text-white font-semibold">
            AI-powered developer tools
          </span>
          .
        </p>
        <div className="flex flex-wrap gap-3 font-mono text-sm">
          <a
            href="mailto:mkbellerimath@gmail.com"
            className="px-4 py-2 bg-gray-900 border border-gray-700 hover:border-blue-500 rounded transition-colors"
          >
            mkbellerimath@gmail.com
          </a>
          <span className="px-4 py-2 bg-gray-900 border border-gray-700 rounded text-gray-500">
            Bengaluru, India
          </span>
        </div>
      </header>

      {/* Projects Pagination */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon
              d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7Z"
              className="text-blue-500"
            />
            Featured Projects
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevProject}
              className="p-2 border border-gray-700 rounded hover:bg-gray-800"
            >
              <Icon d="m15 18-6-6 6-6" size={16} />
            </button>
            <button
              onClick={nextProject}
              className="p-2 border border-gray-700 rounded hover:bg-gray-800"
            >
              <Icon d="m9 18 6-6-6-6" size={16} />
            </button>
          </div>
        </div>

        <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            {projects[activeIndex].title}
          </h3>
          <p className="text-gray-400 mb-6">
            {projects[activeIndex].description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {projects[activeIndex].pipeline.map((step, i) => (
              <div
                key={i}
                className="bg-gray-950 p-4 rounded border border-gray-800 text-xs text-gray-400 font-mono"
              >
                {i + 1}. {step}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {projects[activeIndex].tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-900 px-3 py-1 rounded text-xs font-mono text-blue-400 border border-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={projects[activeIndex].github}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-white font-mono text-sm underline"
          >
            View Source Code
          </a>
        </div>
      </section>

      {/* Experience Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-8">Experience</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white">
              Application Developer @ Accenture
            </h3>
            <p className="text-gray-500 font-mono text-sm mb-2">
              Nov 2024 - Present
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
              <li>
                Architected AI-Powered Bug Analysis Agent using AST chunking &
                Xenova BGE-M3.
              </li>
              <li>
                Engineered AI Contest Management Ecosystem with RBAC and
                conversational chat interfaces.
              </li>
              <li>
                Developed Figma-to-Code MCP server to automate frontend code
                generation.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Graduate Engineer Trainee @ Blaosys Pvt Ltd
            </h3>
            <p className="text-gray-500 font-mono text-sm mb-2">
              Jul 2024 - Nov 2024
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
              <li>
                Designed end-to-end Ad Management System with complex campaign
                rotation logic.
              </li>
              <li>
                Rebuilt company landing page using Laravel, improving SEO score
                from 16 to 90.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-8">
          Education & Certifications
        </h2>
        <div className="text-gray-400 text-sm space-y-4">
          <p>
            <strong className="text-white">B.E. Computer Science</strong> | KLE
            College of Engineering (2024)
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Agentic AI Frameworks (Level 3A & 3B)</li>
            <li>MCP Context AI Apps with Anthropic</li>
            <li>Python Programming (PCEP™)</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-gray-900 text-center text-gray-600 text-sm font-mono">
        © {new Date().getFullYear()} Manojkumar B
      </footer>
    </div>
  );
};

export default Portfolio;
