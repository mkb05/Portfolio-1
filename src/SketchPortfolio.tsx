import React, { useState, useEffect } from "react";

// --- DATA ---
const skillsList = [
  { name: "Python", icon: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
  {
    name: "LangGraph & RAG",
    icon: "M18 8A3 3 0 1 0 18 2a3 3 0 0 0 0 6zm-12 7A3 3 0 1 0 6 9a3 3 0 0 0 0 6zm12 7A3 3 0 1 0 18 16a3 3 0 0 0 0 6z",
  },
  {
    name: "React & Angular",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  { name: "FastAPI & Node.js", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
  {
    name: "Kafka & Redis",
    icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  },
  {
    name: "Spring Boot",
    icon: "M11 20A7 7 0 0 1 4 13c0-3.87 3.13-7 7-7h5v5a7 7 0 0 1-7 7z M11 13l4-4",
  },
  {
    name: "ChromaDB & SQL",
    icon: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5 M21 5c0 1.66-4 3-9 3S3 6.66 3 5s4-3 9-3 9 1.34 9 3z",
  },
  {
    name: "Docker & Cloud",
    icon: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
  },
];

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
      "Automated Evaluation Pipeline: Implemented a background-task-driven suite using Synthetic Dataset Generation.",
      "Metrics Dashboard: Live visualization of Accuracy/Faithfulness scores (1-5 scale) for rapid debugging.",
      "Packaged the React web interface into a standalone, cross-platform desktop application using Electron for native OS integration.",
    ],
    tags: [
      "Electron",
      "FastAPI",
      "LangGraph",
      "Ollama",
      "ChromaDB",
      "SQLite",
      "React",
    ],
    github: "https://github.com/mkb05/FastAPI-Hybrid-RAG-Engine.git",
    demo: "https://veris-engine-8s83ow9t6-manojkumars-projects-3a02fe42.vercel.app/",
    images: [
      "/Landing-page.png",
      "/Evaluation Dashboard.png",
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

const experience = [
  {
    title: "Application Developer @ Accenture",
    date: "Nov 2024 - Present",
    points: [
      "Engineered a conversational Angular application for innovation contests with a unified chat-driven interface.",
      "Designed a Multi-Role Workflow Engine supporting Participant, Evaluator, and Moderator personas via RBAC.",
      "Authored a Figma-to-Code MCP server automating frontend scaffolding by natively querying Figma design trees.",
    ],
  },
  {
    title: "Graduate Engineer Trainee @ Blaosys Pvt Ltd",
    date: "Jul 2024 - Nov 2024",
    points: [
      "Architected an end-to-end Ad Management System featuring complex ad rotation logic.",
      "Led the reconstruction of the corporate site using Laravel/PHP, boosting Lighthouse SEO score from 16 to 90.",
    ],
  },
];

// --- ICONS & HELPERS ---
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

const CustomStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
      @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
      
      .font-sketch { font-family: 'Kalam', cursive; }
      
      /* Blueprint Background Grid */
      .bg-grid-pattern {
        background-color: #fafaf9;
        background-image: radial-gradient(#d6d3d1 2px, transparent 2px);
        background-size: 32px 32px;
      }
      
      /* The Excalidraw-style rough border effect with dynamic hover */
      .sketch-box {
        border-width: 2px;
        border-style: solid;
        border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
      }
      
      .sketch-box:hover {
        border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px;
        transform: translateY(-8px) scale(1.03) rotate(-1deg);
        box-shadow: 8px 12px 0px rgba(0,0,0,0.15);
        z-index: 30;
      }

      .sketch-box-dashed {
        border-width: 2px;
        border-style: dashed;
        border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .sketch-box-dashed:hover {
        transform: translateY(-8px) scale(1.03) rotate(1deg);
        box-shadow: 8px 12px 0px rgba(0,0,0,0.15);
        background-color: #ffffff;
        z-index: 30;
      }

      /* Animated SVG Arrows */
      .sketch-arrow {
        stroke: #94a3b8;
        stroke-width: 3;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .data-flow-arrow {
        stroke: #3b82f6; /* Blue flow */
        stroke-width: 3.5;
        fill: none;
        stroke-dasharray: 10 15;
        animation: flow 1s linear infinite;
        stroke-linecap: round;
      }
      
      .data-flow-arrow.reverse {
        animation: flow-reverse 1s linear infinite;
        stroke: #f97316; /* Orange flow */
      }

      @keyframes flow {
        to { stroke-dashoffset: -25; }
      }
      
      @keyframes flow-reverse {
        to { stroke-dashoffset: 25; }
      }

      /* Floating Animation for Nodes */
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      /* Modal Entrance */
      .modal-enter {
        animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      @keyframes popIn {
        from { opacity: 0; transform: scale(0.9) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }

      /* Staggered Children Fade In */
      .stagger-1 { animation: fadeIn 0.4s ease forwards 0.1s; opacity: 0; }
      .stagger-2 { animation: fadeIn 0.4s ease forwards 0.2s; opacity: 0; }
      .stagger-3 { animation: fadeIn 0.4s ease forwards 0.3s; opacity: 0; }
      
      @keyframes fadeIn {
        to { opacity: 1; transform: translateY(0); }
        from { opacity: 0; transform: translateY(10px); }
      }

      /* Scribble Highlight Effect */
      .scribble-highlight {
        position: relative;
        display: inline-block;
        z-index: 1;
      }
      .scribble-highlight::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40%;
        background-color: #fde047; /* Yellow marker */
        z-index: -1;
        transform: rotate(-1deg);
        border-radius: 4px 8px 4px 8px;
        animation: drawScribble 0.5s ease-out forwards 0.4s;
        transform-origin: left;
        scale: 0 1;
      }
      @keyframes drawScribble {
        to { scale: 1 1; }
      }

  
    `,
    }}
  />
);

export default function SketchPortfolio() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
  }>({ isOpen: false, images: [], index: 0 });

  const nextImage = () =>
    setLightbox((p) => ({ ...p, index: (p.index + 1) % p.images.length }));
  const prevImage = () =>
    setLightbox((p) => ({
      ...p,
      index: (p.index - 1 + p.images.length) % p.images.length,
    }));

  // Disable body scroll when a modal is open to prevent background scrolling
  useEffect(() => {
    if (activeModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [activeModal]);

  // Handle Mouse Move for Parallax Canvas Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate mouse position relative to center of screen (-1 to 1)
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const SvgConnectors = () => {
    // Parallax movement for arrows
    const transformStyle = {
      transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
      transition: "transform 0.1s ease-out",
    };

    return (
      <div
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
        style={transformStyle}
      >
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker
              id="arrowhead-blue"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>

          {/* Base Paths ordered 1->2->3->4->5 */}
          <path
            className="sketch-arrow"
            d="M 25% 35% Q 30% 45% 38% 45%"
            markerEnd="url(#arrowhead)"
          />
          <path
            className="sketch-arrow"
            d="M 65% 35% Q 70% 30% 75% 25%"
            markerEnd="url(#arrowhead)"
          />
          <path
            className="sketch-arrow"
            d="M 75% 45% Q 50% 55% 25% 70%"
            markerEnd="url(#arrowhead)"
          />
          <path
            className="sketch-arrow"
            strokeDasharray="6,6"
            d="M 25% 85% Q 45% 95% 70% 80%"
            markerEnd="url(#arrowhead)"
          />

          {/* Animated Data Flow Overlays */}
          <path className="data-flow-arrow" d="M 25% 35% Q 30% 45% 38% 45%" />
          <path className="data-flow-arrow" d="M 65% 35% Q 70% 30% 75% 25%" />
          <path
            className="data-flow-arrow reverse"
            d="M 75% 45% Q 50% 55% 25% 70%"
          />
          <path className="data-flow-arrow" d="M 25% 85% Q 45% 95% 70% 80%" />
        </svg>

        {/* Floating Diagram Labels */}
        <div className="absolute left-[26%] top-[38%] bg-white px-3 py-1 font-sketch text-blue-600 text-xs border-2 border-blue-200 rounded-xl shadow-sm rotate-[-5deg]">
          User Query
        </div>
        <div className="absolute left-[45%] top-[25%] bg-white px-3 py-1 font-sketch text-purple-600 text-xs border-2 border-purple-200 rounded-xl shadow-sm rotate-[3deg]">
          Store/Fetch
        </div>
        <div className="absolute left-[75%] top-[56%] bg-white px-3 py-1 font-sketch text-orange-600 text-xs border-2 border-orange-200 rounded-xl shadow-sm rotate-[-2deg]">
          Context Sent
        </div>
        <div className="absolute left-[45%] top-[95%] bg-white px-3 py-1 font-sketch text-slate-600 text-xs border-2 border-slate-200 rounded-xl shadow-sm rotate-[4deg]">
          Async Eval
        </div>
      </div>
    );
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "profile":
        return (
          <div className="space-y-4 text-left">
            <h2 className="text-4xl font-bold text-slate-800 border-b-4 border-yellow-300 pb-2 inline-block stagger-1">
              Manojkumar B
            </h2>
            <p className="text-xl text-slate-600 font-bold stagger-2">
              Full-Stack &{" "}
              <span className="scribble-highlight">AI Engineer</span>
            </p>
            <p className="text-slate-700 text-lg stagger-3">
              Specializing in building enterprise web applications and
              AI-powered developer tools. Passionate about shipping practical,
              multi-agent LLM systems that solve real problems at scale.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 stagger-3 pt-4">
              <a
                href="mailto:mkbellerimath@gmail.com"
                className="px-6 py-3 sketch-box bg-slate-800 text-white border-slate-800 hover:bg-slate-700 hover:text-white flex items-center gap-2 text-lg"
              >
                <Icon
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  size={20}
                />{" "}
                Send Email
              </a>
              <a
                href="https://github.com/mkb05"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 sketch-box border-slate-800 text-slate-800 hover:bg-slate-100 flex items-center gap-2 text-lg"
              >
                <Icon
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  size={20}
                />{" "}
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mkb05/"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 sketch-box border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white flex items-center gap-2 text-lg"
              >
                <Icon
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M2 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0"
                  size={20}
                />{" "}
                LinkedIn
              </a>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="space-y-8 text-left">
            <h2 className="text-4xl font-bold text-orange-600 border-b-4 border-orange-200 pb-2 inline-block stagger-1">
              Professional Experience
            </h2>
            <div className="space-y-10 mt-6">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className={`border-l-4 border-orange-400 pl-6 relative stagger-${i + 2}`}
                >
                  <div className="absolute w-6 h-6 bg-white border-4 border-orange-500 rounded-full -left-[15px] top-1"></div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">
                    {exp.title}
                  </h3>
                  <span className="text-md font-bold text-orange-500 block mb-4 bg-orange-100 w-fit px-3 py-1 rounded-md">
                    {exp.date}
                  </span>
                  <ul className="space-y-3">
                    {exp.points.map((pt, j) => (
                      <li
                        key={j}
                        className="text-slate-700 text-lg flex items-start gap-3"
                      >
                        <span className="text-orange-500 font-bold mt-0.5">
                          ▹
                        </span>{" "}
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-8 text-left">
            <h2 className="text-4xl font-bold text-teal-700 border-b-4 border-teal-300 pb-2 inline-block stagger-1">
              Featured Orchestrations
            </h2>
            <div className="grid gap-8 mt-6">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className={`sketch-box border-teal-400 bg-teal-50/80 p-8 hover:bg-white stagger-${(i % 3) + 1}`}
                >
                  <h3 className="text-3xl font-bold text-teal-900 mb-3">
                    {proj.title}
                  </h3>
                  <p className="text-slate-700 mb-5 text-lg font-medium">
                    {proj.description}
                  </p>
                  <div className="flex gap-4 mb-4">
                    {proj.github !== "#" && (
                      <a
                        href={proj.github}
                        target="_blank"
                        className="text-blue-600 font-bold underline"
                      >
                        GitHub Repo
                      </a>
                    )}
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        className="text-teal-600 font-bold underline"
                      >
                        Live Demo
                      </a>
                    )}
                    {proj.images.length > 0 && (
                      <button
                        onClick={() =>
                          setLightbox({
                            isOpen: true,
                            images: proj.images,
                            index: 0,
                          })
                        }
                        className="text-purple-600 font-bold underline cursor-pointer"
                      >
                        View UI Gallery
                      </button>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {proj.details.map((det, j) => (
                      <li
                        key={j}
                        className="text-slate-700 text-md flex items-start gap-3"
                      >
                        <Icon
                          d="M5 12h14M12 5l7 7-7 7"
                          size={18}
                          className="text-teal-600 mt-1 shrink-0"
                        />{" "}
                        {det}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    {proj.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-4 py-1.5 bg-white border-2 border-teal-200 rounded-lg text-sm text-teal-800 font-bold shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="space-y-8 text-left">
            <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-300 pb-2 inline-block stagger-1">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {skillsList.map((skill, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-5 p-5 sketch-box border-purple-400 bg-purple-50 hover:bg-white hover:border-purple-600 stagger-${(i % 3) + 1}`}
                >
                  <span className="p-3 bg-white rounded-xl border-2 border-purple-200 text-purple-600 shadow-sm">
                    <Icon d={skill.icon} size={28} />
                  </span>
                  <span className="font-bold text-slate-800 text-xl">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case "education":
        return (
          <div className="space-y-8 text-left">
            <h2 className="text-4xl font-bold text-slate-800 border-b-4 border-slate-300 pb-2 inline-block stagger-1">
              Education & Certifications
            </h2>

            <div className="sketch-box border-slate-400 p-8 bg-slate-50 mt-6 stagger-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h3 className="text-2xl font-bold text-slate-800">
                  B.E. Computer Science
                </h3>
                <span className="text-md font-bold text-slate-600 border-2 border-slate-300 px-4 py-1.5 rounded-lg bg-white shadow-sm">
                  2020 - 2024
                </span>
              </div>
              <p className="text-slate-600 text-xl">
                KLE College of Engineering & Technology
              </p>
            </div>

            <div className="sketch-box border-slate-400 p-8 bg-slate-50 stagger-3">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Icon
                  d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z"
                  size={28}
                  className="text-slate-600"
                />
                Advanced Certifications
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 bg-white p-4 border-2 border-slate-200 rounded-xl sketch-box">
                  <span className="text-green-500 mt-1 font-bold text-xl">
                    ✓
                  </span>
                  <span className="text-slate-800 font-bold text-lg">
                    Nanodegree on Agentic AI Engineer with LangChain/LangGraph
                  </span>
                </li>
                <li className="flex items-start gap-4 bg-white p-4 border-2 border-slate-200 rounded-xl sketch-box">
                  <span className="text-green-500 mt-1 font-bold text-xl">
                    ✓
                  </span>
                  <span className="text-slate-800 font-bold text-lg">
                    Large Language Models (LLMs) and Retrieval Augmented
                    Generation (RAG)
                  </span>
                </li>
                <li className="flex items-start gap-4 bg-white p-4 border-2 border-slate-200 rounded-xl sketch-box">
                  <span className="text-green-500 mt-1 font-bold text-xl">
                    ✓
                  </span>
                  <span className="text-slate-800 font-bold text-lg">
                    MCP Context AI Apps with Anthropic
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative min-h-screen bg-grid-pattern text-slate-800 font-sketch p-4 md:p-8 overflow-x-hidden selection:bg-teal-200 selection:text-teal-900 transition-all duration-300"
      onMouseMove={handleMouseMove}
    >
      <CustomStyles />

      {/* Header Info (Visible purely as doc title to set the scene) */}
      <div className="w-full max-w-sm mx-auto mb-6 flex flex-col items-center text-slate-600 text-sm bg-white/90 backdrop-blur-sm border-2 border-slate-300 p-3 rounded-xl shadow-md z-20 relative overflow-hidden">
        <span className="font-bold flex items-center gap-2 text-slate-800 text-md w-full truncate px-2">
          <Icon d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" size={16} />
          <span className="truncate">
            manoj_portfolio_architecture_final.excalidraw
          </span>
        </span>
        <span className="text-xs mt-1 text-slate-500 flex items-center gap-2 w-full justify-center">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
          Live Environment: Click nodes to inspect modules
        </span>
      </div>

      <div className="relative w-full max-w-7xl mx-auto aspect-auto  min-h-[1800px] pt-10">
        {/* Draw the connecting arrows only on desktop */}
        <SvgConnectors />

        {/* --- MOBILE: Flex Column | DESKTOP: Absolute Diagram Mapping --- */}
        {/* Parallax effect applied to the container of the nodes */}
        <div
          className="flex flex-col gap-8 lg:block w-full h-full relative z-10"
          style={{
            transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* 1. Client Layer (Top Left) */}
          <div
            className="sketch-box border-slate-600 p-6 lg:absolute lg:w-[25%] lg:left-[5%] lg:top-[5%] animate-float hover:border-slate-800 cursor-pointer"
            style={{ animationDelay: "0s" }}
            onClick={() => setActiveModal("profile")}
          >
            <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 pb-3">
              <span className="text-slate-800 text-xl font-bold">
                Client Layer
              </span>
              <span className="text-xs bg-slate-800 text-white px-3 py-1 rounded-md font-sans">
                Presentation
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                <Icon
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  size={28}
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">
                  Manojkumar B
                </h3>
                <p className="text-md text-slate-600 font-sans mt-1">
                  Full-Stack & AI Engineer
                </p>
              </div>
            </div>
          </div>

          {/* 2. Orchestration Layer (Center) */}
          <div
            className="sketch-box border-teal-600 p-6 lg:absolute lg:w-[25%] lg:left-[38%] lg:top-[5%] animate-float hover:border-teal-800 cursor-pointersketch-box border-teal-600 p-6 lg:absolute lg:w-[25%] lg:left-[38%] lg:top-[5%] animate-float hover:border-teal-800 cursor-pointer"
            style={{ animationDelay: "0.5s" }}
            onClick={() => setActiveModal("projects")}
          >
            <div className="flex items-center justify-between mb-5 border-b-2 border-teal-300 pb-3">
              <span className="text-teal-900 text-2xl font-bold flex items-center gap-2">
                <Icon d="M2 7h20v10H2z M12 22v-5 M8 22h8" size={24} />
                Orchestration Layer
              </span>
              <span className="text-xs bg-teal-600 text-white px-3 py-1 rounded-md font-bold uppercase tracking-wider font-sans">
                Control
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {projects.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-teal-200 rounded-xl p-4 flex items-center justify-between group-hover:border-teal-500 transition-colors shadow-sm"
                >
                  <div>
                    <span className="font-bold text-slate-800 text-md block">
                      {p.title}
                    </span>
                    <span className="text-xs text-slate-500 font-sans font-medium">
                      {p.tags.slice(0, 3).join(" • ")}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                    <Icon
                      d="M9 18l6-6-6-6"
                      size={18}
                      className="text-teal-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Persistence Layer (Top Right) */}
          <div
            className="sketch-box border-purple-500 bg-[#faf5ff] p-6 lg:absolute lg:w-[30%] lg:h-[40%] lg:left-[70%] lg:top-[5%] flex flex-col cursor-pointer shadow-lg group animate-float"
            style={{ animationDelay: "1.5s" }}
            onClick={() => setActiveModal("skills")}
          >
            <div className="flex items-center justify-between mb-4 border-b-2 border-purple-300 pb-3">
              <span className="text-purple-900 text-xl font-bold">
                Persistence Layer
              </span>
              <span className="text-xs bg-purple-600 text-white px-3 py-1 rounded-md font-sans">
                Data
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="w-full sketch-box border-purple-400 bg-white p-4">
                <div className="text-center mb-3 font-bold text-slate-700 text-sm border-b border-dashed border-purple-200 pb-2">
                  ChromaDB / Vector / Tech Stack
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillsList.slice(0, 6).map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-50 border border-purple-200 text-purple-800 text-xs px-2 py-1 rounded font-sans font-bold"
                    >
                      {s.name.split(" ")[0]}
                    </span>
                  ))}
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded font-sans font-bold">
                    + More
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Intelligence Layer (Bottom Left) */}
          <div
            className="sketch-box border-orange-600 bg-[#fff7ed] p-6 lg:absolute lg:w-[30%] lg:h-[30%] lg:left-[2%] lg:top-[20%] flex flex-col cursor-pointer shadow-lg group animate-float"
            style={{ animationDelay: "1s" }}
            onClick={() => setActiveModal("experience")}
          >
            <div className="flex items-center justify-between mb-4 border-b-2 border-orange-300 pb-3">
              <span className="text-orange-800 text-xl font-bold">
                Intelligence Layer
              </span>
              <span className="text-xs bg-orange-500 text-white px-3 py-1 rounded-md font-sans">
                Logic
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="sketch-box border-orange-400 bg-white p-4 text-center group-hover:bg-orange-50 transition-colors">
                <span className="font-bold text-slate-800 block text-md">
                  Application Developer
                </span>
                <span className="text-sm text-orange-600 font-sans font-bold">
                  Accenture (Present)
                </span>
              </div>

              <div className="sketch-box border-orange-400 bg-white p-4 text-center group-hover:bg-orange-50 transition-colors">
                <span className="font-bold text-slate-800 block text-md">
                  Graduate Engineer Trainee
                </span>
                <span className="text-sm text-orange-600 font-sans font-bold">
                  Blaosys Pvt Ltd
                </span>
              </div>
            </div>
          </div>

          {/* 5. Background Tasks (Bottom Right) */}
          <div
            className="sketch-box-dashed border-slate-600 bg-white p-6 lg:absolute lg:w-[30%] lg:h-[30%] lg:left-[50%] lg:top-[95%] flex flex-col cursor-pointer shadow-lg group hover:bg-slate-50 animate-float"
            style={{ animationDelay: "0.8s" }}
            onClick={() => setActiveModal("education")}
          >
            <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 pb-3">
              <span className="text-slate-800 text-xl font-bold">
                Background Tasks
              </span>
              <span className="text-xs border border-slate-400 text-slate-600 px-3 py-1 rounded-md font-sans bg-slate-100">
                Async
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-3">
              <div className="flex items-center gap-3 bg-white p-2 border border-slate-200 rounded sketch-box shadow-sm">
                <Icon
                  d="M12 14l9-5-9-5-9 5 9 5z"
                  size={20}
                  className="text-blue-500"
                />
                <span className="text-md font-bold text-slate-700">
                  B.E. Computer Science
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white p-2 border border-slate-200 rounded sketch-box shadow-sm">
                <Icon
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  size={20}
                  className="text-green-500"
                />
                <span className="text-md font-bold text-slate-700">
                  3x AI Certifications
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DETAILED MODAL OVERLAY --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div
            className="sketch-box bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 relative shadow-2xl modal-enter bg-grid-pattern"
            style={{ backgroundSize: "20px 20px" }} // Smaller grid for modal
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center sketch-box border-slate-400 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-500 bg-white z-10 transition-colors"
            >
              <Icon d="M18 6L6 18 M6 6l12 12" size={24} />
            </button>
            <div className="mt-2 font-sketch pr-8 bg-white/90 p-6 rounded-xl border-2 border-slate-200 backdrop-blur-md">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Gallery */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox({ isOpen: false, images: [], index: 0 })}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-10 text-white p-4 sketch-box border-white"
          >
            <Icon d="M15 18l-6-6 6-6" />
          </button>
          <img
            src={lightbox.images[lightbox.index]}
            alt="Gallery"
            className="max-h-[80vh] object-contain"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-10 text-white p-4 sketch-box border-white"
          >
            <Icon d="M9 18l6-6-6-6" />
          </button>
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setLightbox({ isOpen: false, images: [], index: 0 })}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
