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
    title: "Veris Engine",
    description:
      "A production-grade Corrective Retrieval-Augmented Generation (CRAG) system designed to eliminate LLM hallucinations in enterprise environments.",
    details: [
      "Orchestrated a deterministic Multi-Agent pipeline using LangGraph (Query Rewriter → Retriever → Grader → Synthesizer).",
      "Implemented a 'Document Grader' agent (LLM-as-a-judge) that validates context relevance before generation, halting processes if hallucinations are detected.",
      "Developed a Hybrid Retrieval system combining ChromaDB (semantic vector search) with BM25 (lexical search) for high-precision document recall.",
      "Ensured multi-tenant data security by engineering session-strict isolation, dynamically creating independent vector indices per user session.",
    ],
    tags: ["FastAPI", "LangGraph", "Ollama", "ChromaDB", "SQLite", "React"],
    github: "https://github.com/mkb05/FastAPI-Hybrid-RAG-Engine.git",
    demo: "https://veris-engine-8s83ow9t6-manojkumars-projects-3a02fe42.vercel.app/",
    images: [
      "/Landing-page.png",
      "/AI response bubble.png",
      "/Connversation.png",
      "/Preview mode.png",
    ],
  },
  {
    title: "AI-Powered Bug Analysis Agent",
    description:
      "An intelligent agentic system that transforms traditional debugging by utilizing Abstract Syntax Tree (AST) parsing for context-aware code analysis.",
    details: [
      "Engineered an AST-based chunking engine to segment repositories by classes, functions, and modules, preserving semantic boundaries far better than naive line-splitting.",
      "Implemented incremental indexing using file hashing to optimize rebuilds, storing embeddings locally in .idx files to reduce dependency on cloud vector DBs.",
      "Utilized Xenova BGE-M3 to generate dual embeddings (raw code + LLM-summarized semantic intent), drastically improving retrieval accuracy for bug-fix queries.",
      "Integrated with Azure DevOps REST API to auto-populate bug contexts, automatically generating root-cause analysis and retest cases.",
    ],
    tags: ["Node.js", "AST Parsing", "Xenova BGE-M3", "Azure DevOps API"],
    github: "#",
    demo: null,
    images: [],
  },
  {
    title: "Swiftmart E-Commerce Platform",
    description:
      "A scalable, event-driven e-commerce platform built on a microservices architecture focusing on high availability and asynchronous processing.",
    details: [
      "Architected a database-per-service microservices ecosystem with dedicated User, Product, Inventory, Order, Payment, and API Gateway services.",
      "Engineered asynchronous event-driven communication for order processing using Apache Kafka to ensure eventual consistency and fault tolerance.",
      "Implemented centralized API routing, JWT-based authentication, and optimized trending product retrieval using Redis ZSET caching.",
      "Developed a responsive frontend using Angular and integrated MySQL for persistent, distributed data storage to improve scalability and maintainability.",
    ],
    tags: ["Spring Boot", "Kafka", "Redis", "Angular", "Microservices"],
    github: "https://github.com/mkb05/SwiftMart",
    demo: null,
    images: [],
  },
];

const Portfolio: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Lightbox State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = () => {
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % projects[activeIndex].images.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projects[activeIndex].images.length - 1 : prev - 1,
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-blue-900 selection:text-white pb-12">
      {/* Header */}

      {/* TSX-Safe Custom Animation Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(15px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { 
          animation: fade-in 0.8s ease-out forwards; 
          opacity: 0; 
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `,
        }}
      />

      <header className="max-w-5xl mx-auto px-6 py-24 animate-fade-in border-b border-gray-800">
        <div className="flex items-center gap-2 text-blue-400 mb-6">
          <Icon
            d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7Z"
            className="w-5 h-5"
          />
          <span className="font-mono text-sm tracking-wider uppercase">
            Open To Work
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Manojkumar B
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10">
          Full-Stack Software Engineer specializing in building enterprise web
          applications and{" "}
          <span className="text-white font-semibold">
            AI-powered developer tools
          </span>
          . Passionate about shipping practical, multi-agent LLM systems that
          solve real problems at scale.
        </p>

        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <a
            href="mailto:mkbellerimath@gmail.com"
            className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-500 rounded transition-colors shadow-lg shadow-blue-900/20"
          >
            mkbellerimath@gmail.com
          </a>
          <a
            href="https://github.com/mkb05"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-700 hover:border-white hover:bg-gray-800 rounded transition-all text-gray-300"
          >
            <Icon
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              size={16}
            />
            GitHub
          </a>
          {/* LinkedIn Button */}
          {/* LinkedIn Button */}
          {/* LinkedIn Button using the standard Icon component! */}
          <a
            href="https://www.linkedin.com/in/mkb05/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0077b5] text-white hover:bg-[#005582] rounded transition-all shadow-lg shadow-blue-900/20"
          >
            <Icon
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M2 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0"
              size={16}
            />
            Connect with me
          </a>
          <span className="px-5 py-2.5 bg-gray-900/50 border border-gray-800 rounded text-gray-500">
            Bengaluru, India
          </span>
        </div>
      </header>

      {/* Projects Pagination Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 animate-fade-in delay-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Icon d="M22 12h-4l-3 9L9 3l-3 9H2" className="text-blue-500" />
            Featured Architectures
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? projects.length - 1 : prev - 1,
                )
              }
              className="p-2 border border-gray-700 text-gray-400 rounded hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Icon d="m15 18-6-6 6-6" size={20} />
            </button>
            <button
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % projects.length)
              }
              className="p-2 border border-gray-700 text-gray-400 rounded hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Icon d="m9 18 6-6-6-6" size={20} />
            </button>
          </div>
        </div>

        {/* Project Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-8 md:p-10 rounded-2xl hover:border-gray-600 transition-all duration-500 shadow-xl relative overflow-hidden">
          {/* Project Header & Dynamic Action Buttons */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6 relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {projects[activeIndex].title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-2 lg:mt-0">
              {/* Conditional Source Code / Proprietary Button */}
              {projects[activeIndex].github === "#" ? (
                <span
                  className="flex-shrink-0 flex items-center gap-2 text-sm font-mono text-gray-500 bg-gray-900 px-4 py-2 rounded-full border border-gray-800 cursor-not-allowed"
                  title="Source code is proprietary"
                >
                  <Icon
                    d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4"
                    size={14}
                  />{" "}
                  Proprietary
                </span>
              ) : (
                <a
                  href={projects[activeIndex].github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 flex items-center gap-2 text-sm font-mono text-gray-300 hover:text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full border border-gray-700 transition-colors"
                >
                  <Icon
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    size={14}
                  />{" "}
                  Source Code
                </a>
              )}

              {/* Conditional Demo Link */}
              {projects[activeIndex].demo && (
                <a
                  href={projects[activeIndex].demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 flex items-center gap-2 text-sm font-mono text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30 transition-colors"
                >
                  <Icon
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
                    size={14}
                  />{" "}
                  Live Demo
                </a>
              )}

              {/* Conditional View UI Gallery Button */}
              {projects[activeIndex].images &&
                projects[activeIndex].images.length > 0 && (
                  <button
                    onClick={openLightbox}
                    className="flex-shrink-0 flex items-center gap-2 text-sm font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30 transition-colors"
                  >
                    <Icon
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                      size={14}
                    />{" "}
                    View UI
                  </button>
                )}
            </div>
          </div>

          <p className="text-gray-400 mb-8 text-lg relative z-10">
            {projects[activeIndex].description}
          </p>

          <ul className="space-y-4 mb-10 text-gray-300 relative z-10">
            {projects[activeIndex].details.map((detail, i) => (
              <li key={i} className="flex gap-3 items-start">
                <Icon
                  d="M5 12h14M12 5l7 7-7 7"
                  className="text-blue-500 mt-1 flex-shrink-0"
                  size={16}
                />
                <span className="leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-800/50 relative z-10">
            {projects[activeIndex].tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-950 px-3 py-1.5 rounded-md text-xs font-mono text-gray-400 border border-gray-800/80 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 animate-fade-in delay-200">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <Icon
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            className="text-blue-500"
          />
          Enterprise Experience
        </h2>
        <div className="space-y-12 pl-4 md:pl-0">
          <div className="group relative border-l-2 border-gray-800 pl-8 hover:border-blue-500 transition-colors duration-300">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gray-950 border-2 border-gray-800 group-hover:border-blue-500 transition-colors duration-300"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <h3 className="text-xl font-bold text-white">
                Application Developer @ Accenture
              </h3>
              <span className="text-blue-400 font-mono text-sm bg-blue-500/10 px-3 py-1 rounded-full w-fit">
                Nov 2024 - Present
              </span>
            </div>
            <ul className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <li>
                <strong className="text-gray-200 font-medium">
                  AI-Powered Contest Management & Evaluation Platform:
                </strong>{" "}
                Engineered a conversational Angular application enabling
                employees to discover innovation contests, submit ideas, and
                track participation through a unified chat-driven interface.
              </li>
              <li>
                <strong className="text-gray-200 font-medium">
                  Multi-Role Workflow Engine:
                </strong>{" "}
                Designed an architecture supporting Participant, Evaluator,
                Moderator, and Admin personas—each with distinct permissions, UI
                experiences, and workflow actions enforced via RBAC.
              </li>
              <li>
                <strong className="text-gray-200 font-medium">
                  End-to-End Evaluation Flow:
                </strong>{" "}
                Built the system for evaluators to review and rate submissions,
                and for moderators to assign and rebalance workloads,
                maintaining full audit trails across states (Draft, Submitted,
                Under Review, Assigned, Evaluated, Approved, Rejected).
              </li>
              <li>
                <strong className="text-gray-200 font-medium">
                  Figma-to-Code MCP Server:
                </strong>{" "}
                Authored a Model Context Protocol (MCP) server to automate
                frontend scaffolding by natively querying Figma design trees via
                REST API, drastically reducing design-to-development turnaround.
              </li>
            </ul>
          </div>

          <div className="group relative border-l-2 border-gray-800 pl-8 hover:border-blue-500 transition-colors duration-300">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gray-950 border-2 border-gray-800 group-hover:border-blue-500 transition-colors duration-300"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <h3 className="text-xl font-bold text-white">
                Graduate Engineer Trainee @ Blaosys Pvt Ltd
              </h3>
              <span className="text-gray-500 font-mono text-sm bg-gray-900 px-3 py-1 rounded-full w-fit">
                Jul 2024 - Nov 2024
              </span>
            </div>
            <ul className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <li>
                <strong className="text-gray-200 font-medium">
                  Ad Management Engine:
                </strong>{" "}
                Architected an end-to-end Ad Management System featuring a
                custom Admin Dashboard, complex ad rotation, and timeline
                sequencing logic.
              </li>
              <li>
                <strong className="text-gray-200 font-medium">
                  SEO & Performance Overhaul:
                </strong>{" "}
                Led the reconstruction of the corporate landing site using
                Laravel/PHP, implementing structural upgrades that boosted the
                organic search Lighthouse score from 16 to 90.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education & Footer */}
      <section className="max-w-5xl mx-auto px-6 py-16 animate-fade-in delay-300 border-t border-gray-800/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              B.E. Computer Science
            </h3>
            <p className="text-gray-500 font-mono text-sm">
              KLE College of Engineering & Technology (2020 - 2024)
            </p>
          </div>
          <div className="text-sm font-mono text-gray-400 space-y-1 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <p className="text-white font-sans font-bold mb-2">
              Advanced Certifications
            </p>
            <p>
              ▹Nanodegre on Agentic AI Engineer with LangChain and LangGraph
            </p>

            <p>
              ▹Large Language Models(LLMs) and Retrieval Augmented Generation
              (RAG)
            </p>
            <p>▹ MCP Context AI Apps with Anthropic</p>
            <p>▹ AI Programming with Python</p>
          </div>
        </div>
      </section>

      {/* Fullscreen UI Image Lightbox Modal */}
      {isModalOpen && projects[activeIndex].images && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 backdrop-blur-md p-4 md:p-12 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white bg-gray-900 p-2 rounded-full transition-colors z-50"
          >
            <Icon d="M18 6L6 18 M6 6l12 12" size={24} />
          </button>

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Main Image */}
            <img
              src={projects[activeIndex].images[currentImageIndex]}
              alt={`${projects[activeIndex].title} UI Screenshot`}
              className="max-w-full max-h-full object-contain rounded-lg border border-gray-800 shadow-2xl"
            />

            {/* Navigation Controls */}
            {projects[activeIndex].images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-0 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full transition-colors border border-gray-700"
                >
                  <Icon d="m15 18-6-6 6-6" size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full transition-colors border border-gray-700"
                >
                  <Icon d="m9 18 6-6-6-6" size={24} />
                </button>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {projects[activeIndex].images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentImageIndex ? "bg-emerald-500" : "bg-gray-700 hover:bg-gray-500"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
