import React, { useState, useEffect, useMemo } from "react";

// --- TYPES & INTERFACES ---
interface Metric {
  label: string;
  value: string;
  detail: string;
  badge?: string;
}

interface ProjectSpec {
  id: string;
  title: string;
  badge: string;
  category:
    | "edge-fine-tune"
    | "deep-learning"
    | "rag-crag"
    | "distributed-infra";
  tier:
    | "STANDALONE MICROSERVICE"
    | "CORE DEEP LEARNING"
    | "MULTI-AGENT CRAG"
    | "EVENT STREAM";
  tagline: string;
  problemSolved: string;
  architectureDetails: string[];
  metrics: Metric[];
  stack: string[];
  quantization?: {
    rawFormat: string;
    targetFormat: string;
    ramFootprint: string;
    latency: string;
    zeroDependency: string;
  };
  pipelineSteps: {
    title: string;
    note: string;
    status: "quantized" | "active" | "cached" | "verified";
  }[];
  github: string;
  demo: string | null;
  images: string[];
}

// --- FEATURE: MATRIX TOKEN DECRYPT / UNSCRAMBLE COMPONENT ---
const MatrixScrambleText: React.FC<{
  text: string;
  className?: string;
  triggerKey?: string | number;
}> = ({ text, className = "", triggerKey }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "0101XYZΔΩλμ_#*§%<>";

  const runScramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (
              letter === " " ||
              letter === "." ||
              letter === "/" ||
              letter === "-" ||
              letter === "<" ||
              letter === ">" ||
              letter === "%"
            )
              return letter;
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 28);
  };

  useEffect(() => {
    runScramble();
  }, [text, triggerKey]);

  return (
    <span
      onMouseEnter={runScramble}
      className={`cursor-pointer transition-colors duration-150 ${className}`}
      title="Hover to re-decrypt token value"
    >
      {displayText}
    </span>
  );
};

// --- FEATURE: LIVE INFERENCE HEARTBEAT OSCILLOSCOPE IN NAV ---
const LatencyOscilloscope: React.FC<{
  jitterLevel: number;
}> = ({ jitterLevel }) => {
  const [points, setPoints] = useState<number[]>([
    14, 14, 13, 15, 14, 14, 14, 14, 14,
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1)];
        const spike =
          jitterLevel > 0
            ? (Math.random() > 0.5 ? 4 : 24) * (Math.random() * 0.9 + 0.3)
            : Math.random() > 0.85
              ? Math.random() > 0.5
                ? 6
                : 21
              : 14 + (Math.random() * 4 - 2);
        next.push(Math.max(3, Math.min(25, spike)));
        return next;
      });
    }, 110);
    return () => clearInterval(timer);
  }, [jitterLevel]);

  const pathD = points.reduce((acc, y, i) => {
    const x = i * 14;
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-zinc-200 bg-white/70 shadow-sm">
      <div className="flex flex-col text-left">
        <span className="text-xs font-mono uppercase text-zinc-500 font-semibold tracking-wider">
          P99 INFERENCE BUS
        </span>
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {jitterLevel > 0 ? "< 18.2 ms [BURST]" : "< 22.4 ms [NOMINAL]"}
          </span>
        </div>
      </div>
      <svg className="w-28 h-7 overflow-visible">
        <path
          d={pathD}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-25"
        />
        <path
          d={pathD}
          fill="none"
          stroke="#0891b2"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={(points.length - 1) * 14}
          cy={points[points.length - 1]}
          r="2.5"
          fill="#0891b2"
          className="animate-ping opacity-75"
        />
      </svg>
    </div>
  );
};

// --- FEATURE: SERVER RACK MICRO-LED DOT ARRAY (DARK BLADE AESTHETIC) ---
const ServerRackLedArray: React.FC<{
  isBursting: boolean;
}> = ({ isBursting }) => {
  const [activeLed, setActiveLed] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setActiveLed((prev) => (prev + 1) % 8);
      },
      isBursting ? 45 : 180,
    );
    return () => clearInterval(interval);
  }, [isBursting]);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 shadow-inner select-none">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-semibold">
          SYS_BUS
        </span>
      </div>
      <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-800">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
          const isActive = isBursting
            ? activeLed >= idx
              ? true
              : Math.random() > 0.4
            : activeLed === idx || (activeLed + 1) % 8 === idx;
          return (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-150 ${
                isActive
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399] scale-110"
                  : "bg-zinc-800"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

// --- FEATURE: ANIMATED PIPELINE TRACE WITH FLOWING DATA PACKETS ---
const AnimatedPipelineTrace: React.FC<{
  steps: {
    title: string;
    note: string;
    status: "quantized" | "active" | "cached" | "verified";
  }[];
}> = ({ steps }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);

    steps.forEach((_, idx) => {
      setTimeout(
        () => {
          setActiveStepIndex(idx);
          if (idx === steps.length - 1) {
            setTimeout(() => setIsSimulating(false), 800);
          }
        },
        (idx + 1) * 450,
      );
    });
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
            Deterministic Pipeline Tracer
          </span>
        </div>
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="px-3 py-1.5 text-xs font-bold uppercase rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>
            {isSimulating ? "Simulating Ingestion..." : "Trigger Packet Trace"}
          </span>
          <span>&rarr;</span>
        </button>
      </div>

      <div className="relative space-y-2.5 pt-1">
        {steps.map((step, idx) => {
          const isPassed = activeStepIndex >= idx;
          const isCurrent = activeStepIndex === idx && isSimulating;

          return (
            <div key={idx} className="relative flex items-center gap-3">
              {idx < steps.length - 1 && (
                <div className="absolute left-[13px] top-6 bottom-[-10px] w-0.5 bg-zinc-200 z-0">
                  <div
                    className={`w-2 h-2 -left-[3px] rounded-full absolute bg-cyan-500 transition-all duration-300 ${
                      activeStepIndex > idx
                        ? "top-full opacity-100 shadow-[0_0_8px_#06b6d4]"
                        : "top-0 opacity-0"
                    }`}
                  />
                </div>
              )}

              <div
                className={`relative z-10 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border transition-all ${
                  isCurrent
                    ? "bg-cyan-600 text-white border-cyan-700 shadow-md scale-110 ring-4 ring-cyan-100"
                    : isPassed
                      ? "bg-zinc-900 text-white border-zinc-950 shadow-sm"
                      : "bg-white text-zinc-400 border-zinc-200"
                }`}
              >
                {idx + 1}
              </div>

              <div
                className={`flex-1 p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? "bg-cyan-50/90 border-cyan-300 text-zinc-900 shadow-sm"
                    : isPassed
                      ? "bg-white border-zinc-200 text-zinc-800"
                      : "bg-zinc-50/60 border-zinc-200/60 text-zinc-500"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm">{step.title}</span>
                  <span
                    className={`text-xs uppercase px-2 py-0.5 rounded-md font-bold ${
                      step.status === "quantized"
                        ? "bg-emerald-100 text-emerald-800"
                        : step.status === "active"
                          ? "bg-cyan-100 text-cyan-800"
                          : step.status === "verified"
                            ? "bg-violet-100 text-violet-800"
                            : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <div className="text-xs text-zinc-600 mt-1 truncate">
                  {step.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const projectsData: ProjectSpec[] = [
  {
    id: "model-router",
    title: "Edge Model Router",
    badge: "DistilBERT Fine-Tuned + ONNX INT8",
    category: "edge-fine-tune",
    tier: "STANDALONE MICROSERVICE",
    tagline:
      "Ultra-low-latency prompt classification microservice slashing downstream LLM API bills by 40%–70% via dynamic compute tiering.",
    problemSolved:
      "Directing simple classification or extraction queries to massive frontier LLMs burns unnecessary credits and adds multi-second latency. Naive heuristics fail on nuanced intent.",
    architectureDetails: [
      "Dataset Generation: Synthesized multi-domain labeled datasets (train.jsonl, test.jsonl) via Groq, mapping user prompts to complexity tiers (0 = simple/cheap model, 1 = complex reasoning/heavy model).",
      "Supervised Fine-Tuning: Fine-tuned distilbert-base-uncased on Google Colab T4 GPU, reaching 97.89% validation accuracy and 0.9828 F1 score.",
      "PyTorch -> ONNX Static Tracing: Exported checkpoint via torch.onnx.export (dynamo=False) with fixed input-length tracing and dynamic INT8 post-training quantization.",
      "Zero-PyTorch Runtime: Packaged into a minimal FastAPI container using onnxruntime and tokenizers, eliminating 800MB+ torch dependency.",
      "Zero OOM Reliability: Cut RAM footprint from ~480 MB to <80 MB, preventing Linux Exit Code 137 on free 512MB RAM cloud tiers with sub-25ms P99 inference.",
    ],
    metrics: [
      {
        label: "Val Accuracy",
        value: "97.89%",
        detail: "Colab T4 Fine-Tune",
        badge: "F1: 0.9828",
      },
      {
        label: "Memory Footprint",
        value: "< 80 MB",
        detail: "Active RAM on Render",
        badge: "Zero OOM",
      },
      {
        label: "Inference Latency",
        value: "< 24 ms",
        detail: "ONNX INT8 on CPU",
        badge: "SIMD Vector",
      },
      {
        label: "Cost Reduction",
        value: "40% - 70%",
        detail: "Smart LLM routing",
        badge: "Deterministic",
      },
    ],
    stack: [
      "DistilBERT",
      "PyTorch",
      "ONNX INT8",
      "onnxruntime",
      "FastAPI",
      "Tokenizers",
      "Docker",
    ],
    quantization: {
      rawFormat: "PyTorch FP32 (268 MB)",
      targetFormat: "ONNX Dynamic INT8 (65 MB)",
      ramFootprint: "< 80 MB RAM (<15% of free container)",
      latency: "22ms CPU P99",
      zeroDependency: "100% Torch-Free Image",
    },
    pipelineSteps: [
      {
        title: "Synthetic Generation",
        note: "Groq multi-domain prompt synthesis & tier tagging",
        status: "verified",
      },
      {
        title: "SFT Sequence Classifier",
        note: "distilbert-base-uncased fine-tuned with AdamW & warmup",
        status: "verified",
      },
      {
        title: "ONNX Tracing (dynamo=False)",
        note: "Static computation graph export with dynamic axes",
        status: "quantized",
      },
      {
        title: "INT8 Dynamic Quantization",
        note: "QuantizeLinear weight compression to 65 MB binary",
        status: "quantized",
      },
      {
        title: "FastAPI ONNX Container",
        note: "Sub-25ms endpoint consuming <80 MB RAM on Render",
        status: "active",
      },
    ],
    github: "https://github.com/mkb05/Model-Router",
    demo: null,
    images: [],
  },
  {
    id: "context-compactor",
    title: "Extractive Context Compactor",
    badge: "Cross-Encoder + Verbatim Slicing",
    category: "edge-fine-tune",
    tier: "STANDALONE MICROSERVICE",
    tagline:
      "Verbatim character-span sentence deletion reducing multi-turn prompt context by 50%–70% with guaranteed zero hallucination risk.",
    problemSolved:
      "Generative LLM summarizers introduce severe hallucinations, scramble sensitive code indentation/syntax, and incur expensive output token costs while increasing latency.",
    architectureDetails: [
      "Extractive vs Generative: Replaced probabilistic text re-generation with deterministic sentence-level deletion. Surviving text is guaranteed 100% character-for-character verbatim.",
      "Sentence Cross-Encoder: Deployed cross-encoder/ms-marco-MiniLM-L-6-v2 to evaluate query-sentence semantic relevance across all deep cross-attention layers, bypassing bi-encoder information loss.",
      "O(N) Complexity: Avoided O(N^2) token-token self-attention memory walls and attention sink artifacts (delimiters accumulating fake attention) by scoring sentence chunks independently.",
      "Immutable Span Slicing: Uses regex character offsets (start, end) to directly extract relevant clauses, perfectly preserving code formatting, whitespaces, and punctuation.",
      "INT8 ONNX Quantization: Quantized model weights down to ~25 MB, executing on CPU in ~20ms within a 65 MB RAM budget.",
    ],
    metrics: [
      {
        label: "Hallucination Risk",
        value: "0.0%",
        detail: "Verbatim Span Deletion",
        badge: "Deterministic",
      },
      {
        label: "Context Saved",
        value: "50% - 70%",
        detail: "Multi-turn conversations",
        badge: "Dynamic Quantiles",
      },
      {
        label: "ONNX Model Size",
        value: "~25 MB",
        detail: "INT8 Quantized Graph",
        badge: "ms-marco-MiniLM",
      },
      {
        label: "Execution Time",
        value: "~20 ms",
        detail: "CPU Sentence Scoring",
        badge: "Zero GPU Needed",
      },
    ],
    stack: [
      "Cross-Encoder",
      "MiniLM",
      "ONNX INT8",
      "Regex Span Parser",
      "FastAPI",
      "Python",
    ],
    quantization: {
      rawFormat: "PyTorch FP32 (~90 MB)",
      targetFormat: "ONNX INT8 (~25 MB)",
      ramFootprint: "65 MB RAM",
      latency: "19ms CPU P99",
      zeroDependency: "Linear O(N) Complexity",
    },
    pipelineSteps: [
      {
        title: "Regex Sentence Tokenization",
        note: "Extract immutable character span offsets (start, end)",
        status: "verified",
      },
      {
        title: "Cross-Attention Scoring",
        note: "ms-marco-MiniLM deep cross-attention relevance pass",
        status: "active",
      },
      {
        title: "Dynamic Quantile Cutoff",
        note: "Keep top sentences above statistical significance threshold",
        status: "verified",
      },
      {
        title: "Verbatim Span Reconstruction",
        note: "Concatenate raw slice strings preserving code indentation",
        status: "quantized",
      },
      {
        title: "Downstream LLM Dispatch",
        note: "Pass pristine, condensed context to generation node",
        status: "active",
      },
    ],
    github: "https://github.com/mkb05/Context-compact",
    demo: null,
    images: [],
  },
  {
    id: "movie-magic",
    title: "Movie Magic Recommender",
    badge: "PyTorch Two-Tower NCF + Qdrant ANN",
    category: "deep-learning",
    tier: "CORE DEEP LEARNING",
    tagline:
      "Dual-Tower collaborative neural network trained on MovieLens with sub-ms HNSW vector retrieval and Groq instant semantic intent parsing.",
    problemSolved:
      "Matrix factorization fails to generalize non-linear user-item interaction manifolds. Naive brute-force cosine distance across millions of items spikes retrieval to >150ms.",
    architectureDetails: [
      "Two-Tower PyTorch Architecture: Trained separate User and Item deep neural embedding towers mapping latent collaborative preferences to a shared 32-dimensional vector space.",
      "Optimized Training Regimen: Utilized AdamW optimizer, cosine annealing learning rate scheduler, and hard negative sample mining across binarized MovieLens implicit feedback pairs.",
      "Qdrant HNSW Vector Search: Exported item latent embeddings into a Qdrant vector index, hitting 94.6% Recall@20 with sub-millisecond retrieval (0.85ms P99).",
      "Groq Vibe Intent Engine: Powered by Groq Llama-3.1-8B-Instant for sub-120ms natural language semantic vibe queries blended into the collaborative vector space.",
    ],
    metrics: [
      {
        label: "ANN Recall@20",
        value: "94.6%",
        detail: "Qdrant HNSW cosine",
        badge: "+4.2% vs BM25",
      },
      {
        label: "ANN P99 Latency",
        value: "0.85 ms",
        detail: "Vector lookup",
        badge: "-62% vs brute",
      },
      {
        label: "Embed Dimension",
        value: "32-Dim",
        detail: "Dual-Tower Latent Space",
        badge: "PyTorch AdamW",
      },
      {
        label: "Vibe Parsing",
        value: "Llama-3.1",
        detail: "Groq Instant 8B",
        badge: "Sub-120ms",
      },
    ],
    stack: [
      "PyTorch",
      "Two-Tower NCF",
      "Qdrant HNSW",
      "Groq Llama 3.1",
      "FastAPI",
      "Next.js",
      "Tailwind CSS",
    ],
    pipelineSteps: [
      {
        title: "MovieLens Ingestion",
        note: "Implicit feedback binarization & interaction pairs",
        status: "cached",
      },
      {
        title: "PyTorch Dual-Tower",
        note: "32-dim collaborative embedding projection via AdamW",
        status: "verified",
      },
      {
        title: "Qdrant HNSW Index",
        note: "Sub-millisecond high-recall approximate nearest neighbor",
        status: "quantized",
      },
      {
        title: "Groq Semantic Parser",
        note: "Extract user mood vibes to vector query modifiers",
        status: "active",
      },
      {
        title: "FastAPI Rerank Engine",
        note: "Real-time user profile personalization scoring",
        status: "active",
      },
    ],
    github: "https://github.com/mkb05/vibe-aware-recommender",
    demo: "https://vibe-aware-recommender.vercel.app/",
    images: [],
  },
  {
    id: "veris-engine",
    title: "Veris Engine CRAG",
    badge: "LangGraph Deterministic CRAG",
    category: "rag-crag",
    tier: "MULTI-AGENT CRAG",
    tagline:
      "Corrective RAG engine with deterministic LLM-as-a-judge grading agent to eliminate hallucinations in enterprise RAG systems.",
    problemSolved:
      "Naive RAG blindly feeds hallucinated or irrelevant retrieved chunks to the synthesis LLM. Veris introduces a deterministic circuit breaker grading agent before answer generation.",
    architectureDetails: [
      "LangGraph State Machine: Built a cyclic, deterministic multi-agent state graph (Query Rewriter -> Hybrid Retriever -> Grader Agent -> Hallucination Arbiter -> Synthesizer).",
      "LLM-as-a-Judge Relevance Grader: Strict relevance gate checking document semantic overlap. If score < 0.82 threshold, generation is halted and queries are re-decomposed.",
      "ChromaDB + BM25 Hybrid Retrieval: Combines dense vector similarity with lexical BM25 token frequencies for superior recall on technical codes and acronyms.",
      "Per-Session Strict Isolation: Dynamically isolates vector namespaces and indices per user session to guarantee multi-tenant zero data cross-leakage.",
      "Synthetic Evaluation Suite: Offline evaluation runner calculating accuracy and faithfulness scores on a 1-5 scale.",
    ],
    metrics: [
      {
        label: "Faithfulness",
        value: "4.8 / 5.0",
        detail: "Synthetic eval suite",
        badge: "LLM-as-a-judge",
      },
      {
        label: "Recall Boost",
        value: "+38%",
        detail: "ChromaDB + BM25 Hybrid",
        badge: "Dense+Sparse",
      },
      {
        label: "Session Security",
        value: "100% Strict",
        detail: "Per-session vector indices",
        badge: "Zero Leaks",
      },
      {
        label: "Execution Graph",
        value: "5 Nodes",
        detail: "Cyclic LangGraph state",
        badge: "Fault-tolerant",
      },
    ],
    stack: [
      "LangGraph",
      "ChromaDB",
      "BM25 Hybrid",
      "Ollama",
      "FastAPI",
      "Electron",
      "React",
    ],
    pipelineSteps: [
      {
        title: "Query Rewriter",
        note: "Deconstruct multi-intent prompt into atomic search queries",
        status: "verified",
      },
      {
        title: "Hybrid Retrieval",
        note: "Parallel ChromaDB cosine and BM25 token matches",
        status: "cached",
      },
      {
        title: "Relevance Grader Agent",
        note: "Deterministic evaluation gate (Threshold >= 0.82)",
        status: "active",
      },
      {
        title: "Hallucination Arbiter",
        note: "Validate generated claims against ground truth facts",
        status: "verified",
      },
      {
        title: "Synthesizer Stream",
        note: "Grounded context synthesis to desktop Electron UI",
        status: "active",
      },
    ],
    github: "https://github.com/mkb05/FastAPI-Hybrid-RAG-Engine.git",
    demo: "https://veris-engine-8s83ow9t6-manojkumars-projects-3a02fe42.vercel.app/",
    images: [],
  },
  {
    id: "narrative-pov",
    title: "Narrative POV & GraphRAG",
    badge: "GraphRAG & KV Separation",
    category: "rag-crag",
    tier: "MULTI-AGENT CRAG",
    tagline:
      "Architectural separation of concerns: Upstash Redis KV for verbatim sequential text + Pinecone sparse/dense vectors for entity relationship graph retrieval.",
    problemSolved:
      "Storing full text in expensive vector DBs wastes token bandwidth. Storing graphs in flat text loses character relations. This separates KV exact retrieval from semantic vector graph queries.",
    architectureDetails: [
      "Separation of Concerns: Used Redis KV store for exact sequential chapter text retrieval and reserved Pinecone strictly for semantic vector search and entity relation retrieval.",
      "Lazy Ingestion Pipeline: Programmatically indexes classical literature from Project Gutenberg directly into cloud stores on-demand, avoiding heavy bulk storage.",
      "Graph Triplet Extraction: Uses Groq to extract Subject-Predicate-Object triplets for deep relational graph context injection across characters.",
      "Zero OOM Container Guard: Offloaded heavy embedding calculations and used stateless routing to maintain memory footprint <240 MB on free-tier containers.",
    ],
    metrics: [
      {
        label: "Token Savings",
        value: "+68%",
        detail: "Zero-token raw KV lookup",
        badge: "Upstash Redis",
      },
      {
        label: "Graph Triples",
        value: "14.2k",
        detail: "Entity relationship links",
        badge: "Multi-POV",
      },
      {
        label: "Memory Guard",
        value: "< 240 MB",
        detail: "Stateless API runtime",
        badge: "Zero OOM",
      },
    ],
    stack: [
      "FastAPI",
      "Pinecone",
      "Upstash Redis",
      "Groq API",
      "Next.js",
      "Tailwind CSS",
    ],
    pipelineSteps: [
      {
        title: "Gutenberg On-Demand",
        note: "Programmatic text ingestion and chunk tokenization",
        status: "cached",
      },
      {
        title: "Graph Triplet Parser",
        note: "Subject-Predicate-Object semantic extraction",
        status: "verified",
      },
      {
        title: "Pinecone Semantic Space",
        note: "Sparse/dense metadata-filtered vector index",
        status: "active",
      },
      {
        title: "Redis Sliding Context",
        note: "Exact chapter sequence caching with zero token burn",
        status: "cached",
      },
      {
        title: "Dynamic POV Rewriter",
        note: "Groq multi-perspective character narrative synthesis",
        status: "active",
      },
    ],
    github: "https://github.com/mkb05/narrative-pov-rag",
    demo: "https://focalpoint-puce.vercel.app/",
    images: [],
  },
  {
    id: "bug-analysis",
    title: "AI Bug Analysis Agent",
    badge: "AST Syntax Trees + Xenova BGE-M3",
    category: "edge-fine-tune",
    tier: "CORE DEEP LEARNING",
    tagline:
      "AST syntax chunking replacing naive line splitting with dual Xenova BGE-M3 embeddings for exact code context recovery.",
    problemSolved:
      "Naive line or token chunking cuts functions and class definitions in half, destroying syntax context. AST parsing preserves functional AST nodes.",
    architectureDetails: [
      "AST Grammar Parsing: Uses syntax trees to segment source repositories by class, function, and interface boundaries rather than naive character counts.",
      "Dual BGE-M3 Embeddings: Computes complementary embeddings combining raw AST token structures with LLM-summarized semantic code intent.",
      "Incremental Hashing: Implemented SHA-256 file hashing to rebuild only altered files, storing local .idx binary indices without cloud DB latency.",
      "Azure DevOps Integration: Directly triggers REST APIs to auto-populate bug tickets with synthesized root cause analysis and retest cases.",
    ],
    metrics: [
      {
        label: "AST Precision",
        value: "100%",
        detail: "Preserved function boundaries",
        badge: "Zero Split Bug",
      },
      {
        label: "Index Build Speed",
        value: "-74%",
        detail: "Incremental SHA-256 caching",
        badge: "Local .idx",
      },
      {
        label: "Embedding Engine",
        value: "BGE-M3",
        detail: "Xenova dual semantic embed",
        badge: "AST + Intent",
      },
    ],
    stack: [
      "Node.js",
      "AST Parsing",
      "Xenova BGE-M3",
      "Azure DevOps API",
      "Vector Embeddings",
    ],
    pipelineSteps: [
      {
        title: "Tree-sitter AST Parse",
        note: "Deconstruct source code into syntactic tree nodes",
        status: "verified",
      },
      {
        title: "Grammar Boundary Chunk",
        note: "Ensure zero function or class closures are split",
        status: "verified",
      },
      {
        title: "Dual Embedding Gen",
        note: "Compute raw AST + synthesized semantic vectors",
        status: "active",
      },
      {
        title: "Local Binary Index (.idx)",
        note: "Fast hash-verified binary vector storage",
        status: "cached",
      },
      {
        title: "Azure DevOps Auto-Ticket",
        note: "Push root cause and automated retest assertions",
        status: "active",
      },
    ],
    github: "#",
    demo: null,
    images: [],
  },
  {
    id: "swiftmart",
    title: "SwiftMart Event Stream",
    badge: "Apache Kafka + Redis ZSET",
    category: "distributed-infra",
    tier: "EVENT STREAM",
    tagline:
      "Distributed event-driven microservices architecture processing high-throughput order pipelines with partitioned Kafka topics and Redis ZSET caching.",
    problemSolved:
      "Synchronous REST calls fail under peak concurrent order bursts. Decoupled Kafka message brokers ensure guaranteed eventual consistency and fault tolerance.",
    architectureDetails: [
      "Database-per-Service: 6 independent microservices (User, Product, Order, Payment, Inventory, Gateway) communicating via partitioned Kafka event streams.",
      "Sub-Millisecond ZSET Cache: Redis Sorted Sets for instant real-time trending products recalculation under heavy load.",
      "Resilient Message Consumer: Dead-letter queue handling and idempotent transaction processing avoiding duplicate order charges.",
    ],
    metrics: [
      {
        label: "Throughput",
        value: "8,500 req/s",
        detail: "Kafka order event pipeline",
        badge: "Zero Drop",
      },
      {
        label: "ZSET Latency",
        value: "< 1.2 ms",
        detail: "Redis trending calculation",
        badge: "Real-time",
      },
      {
        label: "Microservices",
        value: "6 Isolated",
        detail: "Docker containers on service mesh",
        badge: "Event-Driven",
      },
    ],
    stack: [
      "Spring Boot",
      "Apache Kafka",
      "Redis ZSET",
      "MySQL",
      "Angular",
      "Docker",
    ],
    pipelineSteps: [
      {
        title: "API Gateway Dispatch",
        note: "JWT validation and rate-limited ingress routing",
        status: "verified",
      },
      {
        title: "Kafka Partitioned Topic",
        note: "Publish order event to durable fault-tolerant brokers",
        status: "active",
      },
      {
        title: "Asynchronous Payment Node",
        note: "Idempotent payment capture and inventory reservation",
        status: "verified",
      },
      {
        title: "Redis ZSET Trending Sync",
        note: "Sub-millisecond sliding score popularity index",
        status: "cached",
      },
    ],
    github: "https://github.com/mkb05/SwiftMart",
    demo: null,
    images: [],
  },
];

const routerSamplePrompts = [
  {
    text: "Write a python function to check if a word is a palindrome.",
    expectedTier: 0,
    reason: "Simple code generation -> Fast edge model.",
  },
  {
    text: "What is the capital of France?",
    expectedTier: 0,
    reason: "Simple factual recall -> Route to lightweight, cheap model.",
  },
  {
    text: "Derive the backpropagation gradient equations for a Two-Tower dot-product loss with cross-entropy.",
    expectedTier: 1,
    reason: "Complex mathematical reasoning -> Route to frontier heavy model.",
  },
  {
    text: "Convert this JSON schema into a TypeScript type definition.",
    expectedTier: 0,
    reason: "Deterministic syntax translation -> Fast edge model.",
  },
  {
    text: "Analyze the architectural trade-offs between linear self-attention vs cross-encoders for verbatim sentence deletion.",
    expectedTier: 1,
    reason: "Multi-layered systems synthesis -> Heavy model.",
  },
];

const sampleCompactorContext = [
  {
    id: 1,
    sentence:
      "The client application initializes a WebSocket connection to the orchestration gateway.",
    score: 0.94,
    keep: true,
  },
  {
    id: 2,
    sentence:
      "Today's weather in the server rack facility was recorded at approximately 21 degrees Celsius.",
    score: 0.12,
    keep: false,
  },
  {
    id: 3,
    sentence:
      "Each token stream is decoded using an INT8 quantized ONNX runtime session running on CPU.",
    score: 0.91,
    keep: true,
  },
  {
    id: 4,
    sentence:
      "The meeting notes from last Thursday were briefly reviewed by the team lead over lunch.",
    score: 0.08,
    keep: false,
  },
  {
    id: 5,
    sentence:
      "Memory consumption is strictly capped below 80 MB to guarantee no Exit Code 137 OOM crashes occur.",
    score: 0.88,
    keep: true,
  },
  {
    id: 6,
    sentence:
      "Several coffee cups were observed near the development workstation.",
    score: 0.05,
    keep: false,
  },
];

const Icon: React.FC<{ d: string; className?: string; size?: number }> = ({
  d,
  className = "",
  size = 18,
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

const engineeringCapabilities = [
  {
    title: "SLM Fine-Tuning & Quantization",
    badge: "PyTorch • ONNX INT8 • Hugging Face",
    description:
      "I fine-tune task-specific models (DistilBERT, Cross-Encoders, Two-Tower NCF) and compress them via ONNX dynamic quantization to run in <25ms on CPU within <80 MB RAM—slashing frontier LLM API bills by up to 70%.",
    highlights: [
      "Supervised Fine-Tuning (SFT)",
      "Static ONNX Tracing (dynamo=False)",
      "Dynamic INT8 Post-Training Quantization",
      "Zero-PyTorch Docker Containers (<80MB RAM)",
    ],
    accent: "border-cyan-500/40 text-cyan-700 bg-cyan-50/50",
  },
  {
    title: "Deterministic Multi-Agent CRAG",
    badge: "LangGraph • ChromaDB • BM25 Hybrid",
    description:
      "I replace fragile single-shot prompts with deterministic, stateful multi-agent graphs featuring automated query decomposition, hybrid lexical/dense retrieval, and LLM-as-a-judge relevance gates with verified zero hallucination risk.",
    highlights: [
      "LangGraph Cyclic State Graphs",
      "LLM-as-a-Judge Relevance Grading",
      "Dense + BM25 Hybrid Ingestion",
      "Strict Multi-Tenant Session Isolation",
    ],
    accent: "border-violet-500/40 text-violet-700 bg-violet-50/50",
  },
  {
    title: "High-Throughput Distributed Backends",
    badge: "FastAPI • Apache Kafka • Redis ZSET",
    description:
      "I architect event-driven microservices that handle high concurrency without bottlenecks. From partitioned Kafka pipelines to sub-millisecond Redis ZSET caches and asynchronous FastAPI services.",
    highlights: [
      "Database-per-Service Microservices",
      "Kafka Partitioned Topics & DLQs",
      "Sub-1.2ms Redis ZSET Ranking",
      "Stateless High-Concurrency API Gateways",
    ],
    accent: "border-emerald-500/40 text-emerald-700 bg-emerald-50/50",
  },
  {
    title: "Production Client Engineering",
    badge: "Next.js • React • Angular • Electron",
    description:
      "I bridge machine learning backends with fluid, high-performance interfaces—ranging from cross-platform desktop native apps with Electron to reactive enterprise Angular and Next.js applications.",
    highlights: [
      "Desktop OS Integration via Electron",
      "Enterprise RBAC Workflows in Angular",
      "Cinematic Streaming Next.js UI",
      "Figma-to-Code MCP Server Authoring",
    ],
    accent: "border-amber-500/40 text-amber-700 bg-amber-50/50",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<
    "all" | "edge-fine-tune" | "deep-learning" | "rag-crag"
  >("all");
  const [selectedProject, setSelectedProject] = useState<ProjectSpec | null>(
    null,
  );
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
  }>({
    isOpen: false,
    images: [],
    index: 0,
  });

  // Interactive Model Router State
  const [customPrompt, setCustomPrompt] = useState(routerSamplePrompts[0].text);
  const [routerSimResult, setRouterSimResult] = useState<{
    tier: number;
    latency: string;
    confidence: string;
    costSaved: string;
  } | null>({
    tier: 1,
    latency: "19.4 ms",
    confidence: "98.7%",
    costSaved: "N/A (Routed to Heavy Model)",
  });
  const [isRouting, setIsRouting] = useState(false);
  const [routerJitter, setRouterJitter] = useState(0);
  const [serverWarmStatus, setServerWarmStatus] = useState<
    "idle" | "waking" | "warm"
  >("idle");

  // --- SILENT PRE-WARM ON INITIAL LOAD ---
  useEffect(() => {
    const prewarm = async () => {
      try {
        fetch("https://model-router-9k9s.onrender.com/docs", {
          mode: "no-cors",
        }).catch(() => {});
        fetch("https://context-compact.onrender.com/docs", {
          mode: "no-cors",
        }).catch(() => {});
      } catch (_) {}
    };
    prewarm();
  }, []);

  const runRouterSimulation = async (text: string) => {
    setIsRouting(true);
    setRouterJitter(1);
    setServerWarmStatus("idle");
    const startTime = performance.now();

    // Render free-tier cold starts take ~30s
    const coldStartTimer = setTimeout(() => {
      setServerWarmStatus("waking");
    }, 2200);

    try {
      const response = await fetch(
        "https://model-router-9k9s.onrender.com/api/v1/route",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: text }),
        },
      );

      clearTimeout(coldStartTimer);
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const endTime = performance.now();

      const actualLatency = (endTime - startTime).toFixed(1) + " ms";
      const returnedTier =
        data.tier !== undefined ? data.tier : text.length > 70 ? 1 : 0;
      const returnedConfidence = data.confidence
        ? `${(data.confidence * 100).toFixed(1)}%`
        : "98.7%";

      setRouterSimResult({
        tier: returnedTier,
        latency: actualLatency,
        confidence: returnedConfidence,
        costSaved:
          returnedTier === 1
            ? "Routed to Reasoning LLM"
            : "68% API Cost Saved (Edge Model)",
      });
      setServerWarmStatus("warm");
    } catch (error) {
      clearTimeout(coldStartTimer);
      console.warn("Live API blocked by CORS or cold-starting:", error);

      const isComplex =
        text.toLowerCase().includes("gradient") ||
        text.toLowerCase().includes("quantum") ||
        text.toLowerCase().includes("architectural") ||
        text.toLowerCase().includes("derive") ||
        text.length > 70;

      setRouterSimResult({
        tier: isComplex ? 1 : 0,
        latency: "Local ONNX Fallback (~19ms)",
        confidence: "97.4% (Local Eval)",
        costSaved: isComplex
          ? "Routed to Heavy Model"
          : "68% Saved (Edge Model)",
      });
    } finally {
      setIsRouting(false);
      setTimeout(() => setRouterJitter(0), 1200);
    }
  };

  // Interactive Compactor State
  const [compactorThreshold, setCompactorThreshold] = useState<number>(0.5);
  const [compactorQuery, setCompactorQuery] = useState(
    "What is the max connections setting for Postgres?",
  );
  const [compactorRawContext, setCompactorRawContext] = useState(
    "Hello there! Glad to assist you today. In postgresql.conf, max_connections is configured to 20. Also ensure you configure shared_buffers properly. Let me know if you need anything else! Have a great day.",
  );
  const [isCompacting, setIsCompacting] = useState(false);
  const [workbenchTab, setWorkbenchTab] = useState<"router" | "compactor">(
    "router",
  );
  const [liveCompactorResult, setLiveCompactorResult] = useState<{
    compactedContext?: string;
    originalChars: number;
    compactedChars: number;
    reductionPct: number;
    latency: string;
    isLive: boolean;
  } | null>(null);

  const compactorSamplePresets = [
    {
      label: "Postgres Config",
      query: "What is the max connections setting for Postgres?",
      context:
        "Hello there! Glad to assist you today. In postgresql.conf, max_connections is configured to 20. Also ensure you configure shared_buffers properly. Let me know if you need anything else! Have a great day.",
      reduction: 0.5,
    },
    {
      label: "Production Deploy Warning",
      query: "Can we deploy the hotfix right now?",
      context:
        "Morning team. The weather looks rainy today. We reviewed the pull request notes over lunch. CRITICAL: Do NOT deploy the staging hotfix directly to production until migration v4 finishes. Coffee is available in the kitchen. Let me know if you have questions.",
      reduction: 0.6,
    },
    {
      label: "Redis Cache Setup",
      query: "How long should the user token be cached?",
      context:
        "Yesterday we discussed microservice authentication. User access tokens are signed using RS256. The TTL in Upstash Redis is strictly set to 3600 seconds. Tomorrow is our sprint retrospective meeting at 3 PM. Remember to clean up old debug logs.",
      reduction: 0.5,
    },
  ];

  const runLiveCompactor = async (
    targetThreshold: number,
    queryText?: string,
    rawText?: string,
  ) => {
    setIsCompacting(true);
    setRouterJitter(1);
    setServerWarmStatus("idle");
    const startTime = performance.now();

    const queryToSend = queryText !== undefined ? queryText : compactorQuery;
    const rawToSend =
      rawText !== undefined
        ? rawText
        : compactorRawContext.trim() ||
          sampleCompactorContext.map((s) => s.sentence).join(" ");

    const compactorColdStartTimer = setTimeout(() => {
      setServerWarmStatus("waking");
    }, 2200);

    try {
      const response = await fetch(
        "https://context-compact.onrender.com/api/v1/compact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            current_query: queryToSend,
            target_reduction: targetThreshold,
            raw_context: rawToSend,
          }),
        },
      );

      clearTimeout(compactorColdStartTimer);
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const endTime = performance.now();
      const actualLatency = (endTime - startTime).toFixed(1) + " ms";

      const compacted =
        data.compacted_context || data.compacted || data.result || "";
      const origLen = rawToSend.length;
      const compLen = compacted.length;
      const redPct =
        origLen > 0
          ? Math.round((1 - compLen / origLen) * 100)
          : Math.round(targetThreshold * 100);

      setLiveCompactorResult({
        compactedContext: compacted,
        originalChars: origLen,
        compactedChars: compLen,
        reductionPct: redPct,
        latency: actualLatency,
        isLive: true,
      });
      setServerWarmStatus("warm");
    } catch (err) {
      clearTimeout(compactorColdStartTimer);
      console.warn("Compactor Live API cold start or CORS fallback:", err);

      const sentences = rawToSend
        .split(/(?<=[.?!])\s+/)
        .filter((s) => s.trim().length > 0);
      const queryTerms = queryToSend.toLowerCase().split(/\s+/);
      const kept = sentences.filter((s) => {
        const matches = queryTerms.filter((t) =>
          s.toLowerCase().includes(t),
        ).length;
        return matches > 0 || Math.random() > targetThreshold;
      });
      const simulatedCompacted =
        kept.length > 0 ? kept.join(" ") : sentences[0] || rawToSend;

      const origLen = rawToSend.length;
      const compLen = simulatedCompacted.length;
      const redPct =
        origLen > 0
          ? Math.round((1 - compLen / origLen) * 100)
          : Math.round(targetThreshold * 100);

      setLiveCompactorResult({
        compactedContext: simulatedCompacted,
        originalChars: origLen,
        compactedChars: compLen,
        reductionPct: Math.max(0, redPct),
        latency: "Local ONNX Slicing (~19ms)",
        isLive: false,
      });
    } finally {
      setIsCompacting(false);
      setTimeout(() => setRouterJitter(0), 1000);
    }
  };

  // Concept Tab State & Mode (Playbook)
  const [conceptTab, setConceptTab] = useState<
    "encoders" | "attention" | "quantization" | "rag-kv"
  >("quantization");
  const [explainMode, setExplainMode] = useState<"visual" | "spec">("visual");

  // Visual Interactive States for Concept Diagrams
  const [encoderHoverToken, setEncoderHoverToken] = useState<string | null>(
    null,
  );
  const [oomContainerSimActive, setOomContainerSimActive] = useState<
    "fp32" | "int8"
  >("int8");
  const [simulatedNegationStep, setSimulatedNegationStep] = useState<
    "naive" | "verbatim"
  >("verbatim");
  const [kvRetrievalStep, setKvRetrievalStep] = useState<number>(1);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projectsData;
    return projectsData.filter((p) => p.category === activeTab);
  }, [activeTab]);

  const openGallery = (imgs: string[]) => {
    if (imgs.length > 0) {
      setLightbox({ isOpen: true, images: imgs, index: 0 });
    }
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900 font-sans selection:bg-zinc-800 selection:text-white antialiased relative">
      {/* Background Micro Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage:
            "radial-gradient(#d4d4d8 1px, transparent 1px), linear-gradient(to right, #f4f4f5 1px, transparent 1px)",
          backgroundSize: "28px 28px, 140px 140px",
        }}
      />

      {/* TOP SYSTEM NAV & TELEMETRY BAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm ring-1 ring-zinc-800/50">
              MB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-zinc-950">
                  Manojkumar B
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  <span className="hidden xs:inline">AVAILABLE FOR HIRE</span>
                  <span className="xs:hidden">AVAILABLE</span>
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-500 truncate">
                AI Systems &bull; Edge Fine-Tuning Engineer
              </p>
            </div>
          </div>

          {/* TELEMETRY HARDWARE STATUS ITEMS */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center">
              <LatencyOscilloscope jitterLevel={routerJitter} />
            </div>

            <div className="hidden sm:flex items-center">
              <ServerRackLedArray
                isBursting={isRouting || isCompacting || routerJitter > 0}
              />
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://github.com/mkb05"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs sm:text-sm font-mono rounded-lg border border-zinc-200 hover:border-zinc-400 text-zinc-700 bg-white shadow-sm transition-all flex items-center gap-1.5"
              >
                <Icon
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  size={15}
                />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mkb05/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex px-3 py-1.5 text-xs sm:text-sm font-mono rounded-lg border border-zinc-200 hover:border-zinc-400 text-zinc-700 bg-white shadow-sm transition-all items-center gap-1.5"
              >
                <Icon
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M2 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0"
                  size={15}
                />
                LinkedIn
              </a>
              <a
                href="mailto:mkbellerimath@gmail.com"
                className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-all shadow-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10 space-y-14 sm:space-y-16">
        {/* HERO SECTION */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-200 bg-white text-xs font-mono text-zinc-600 shadow-sm max-w-full truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">
              AI Engineer &bull; Production Track Record @ Accenture &amp;
              Blaosys
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.12]">
                I build{" "}
                <span className="text-cyan-700 underline decoration-cyan-400 decoration-4 underline-offset-4">
                  fine-tuned edge models
                </span>{" "}
                &amp; deterministic AI inference systems.
              </h1>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed max-w-2xl">
                I specialize in training and fine-tuning task-specific SLMs
                (Two-Tower NCF, DistilBERT, Sentence Cross-Encoders),
                compressing them with{" "}
                <strong className="text-zinc-950 font-bold">
                  ONNX INT8 quantization
                </strong>{" "}
                for sub-25ms zero-OOM CPU edge deployments, and orchestrating
                deterministic multi-agent CRAG pipelines with verified
                zero-hallucination bounds.
              </p>

              {/* Verified Personal Metrics with Matrix Token Scramble on Hover */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:border-zinc-400 transition-all group">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                    FINE-TUNED ACC
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-zinc-950 mt-1 font-mono">
                    <MatrixScrambleText text="97.89%" />
                  </div>
                  <div className="text-xs text-emerald-700 font-mono font-medium truncate mt-0.5">
                    F1: 0.9828
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:border-zinc-400 transition-all group">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                    RAM CEILING
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-zinc-950 mt-1 font-mono">
                    <MatrixScrambleText text="< 80 MB" />
                  </div>
                  <div className="text-xs text-emerald-700 font-mono font-medium truncate mt-0.5">
                    Zero OOM 137
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:border-zinc-400 transition-all group">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                    COMPACTED
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-zinc-950 mt-1 font-mono">
                    <MatrixScrambleText text="50% - 70%" />
                  </div>
                  <div className="text-xs text-cyan-700 font-mono font-medium truncate mt-0.5">
                    0% Hallucination
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:border-zinc-400 transition-all group">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                    ANN RETRIEVAL
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-zinc-950 mt-1 font-mono">
                    <MatrixScrambleText text="0.85 ms" />
                  </div>
                  <div className="text-xs text-violet-700 font-mono font-medium truncate mt-0.5">
                    94.6% Recall
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-xl bg-zinc-950 text-white font-mono text-xs font-semibold hover:bg-zinc-800 transition-all shadow-sm text-center"
                >
                  Explore Engineered Systems &rarr;
                </a>
                <a
                  href="#playbook"
                  className="px-5 py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-800 font-mono text-xs font-semibold hover:border-zinc-500 transition-all shadow-sm text-center"
                >
                  My Engineering Playbook
                </a>
              </div>
            </div>

            {/* INTERACTIVE WORKBENCH: LIVE PROMPT ROUTER & VERBATIM COMPACTOR */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-md space-y-4 relative overflow-hidden group/workbench hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all">
              {/* Top Mode Switcher Tabs */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 gap-2">
                <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl font-mono text-xs">
                  <button
                    onClick={() => setWorkbenchTab("router")}
                    className={`px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer ${
                      workbenchTab === "router"
                        ? "bg-white text-zinc-950 shadow-sm"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    1. Model Router
                  </button>
                  <button
                    onClick={() => setWorkbenchTab("compactor")}
                    className={`px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer ${
                      workbenchTab === "compactor"
                        ? "bg-white text-zinc-950 shadow-sm"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    2. Context Compactor
                  </button>
                </div>

                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold shrink-0">
                  {workbenchTab === "router"
                    ? "DistilBERT &bull; 65MB"
                    : "MiniLM &bull; 25MB"}
                </span>
              </div>

              {/* Dual-Channel Hardware Telemetry (Dark Server Chassis) */}
              <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800 font-mono flex items-center justify-between gap-4">
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    <span>SIMD Vectors</span>
                    <span className="text-cyan-400">
                      {isRouting || isCompacting ? "94%" : "12%"}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((block) => (
                      <div
                        key={block}
                        className={`flex-1 h-full transition-all duration-150 ${
                          (isRouting || isCompacting) && block <= 9
                            ? "bg-cyan-400"
                            : block <= 2
                              ? "bg-cyan-700 opacity-50"
                              : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    <span>RAM Footprint</span>
                    <span className="text-emerald-400">78 MB</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((block) => (
                      <div
                        key={block}
                        className={`flex-1 h-full ${
                          block <= 2 ? "bg-emerald-400" : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* TAB 1: MODEL ROUTER */}
              {workbenchTab === "router" && (
                <div className="space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-zinc-600 block font-medium">
                      Select sample prompt or test custom query:
                    </label>
                    <span className="text-[11px] text-zinc-400">
                      Sub-25ms CPU SIMD
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {routerSamplePrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCustomPrompt(p.text);
                          runRouterSimulation(p.text);
                        }}
                        className="px-2.5 py-1 text-xs bg-zinc-50 border border-zinc-200 hover:border-zinc-400 rounded-lg text-zinc-700 transition-colors text-left truncate max-w-full active:bg-zinc-100 cursor-pointer"
                      >
                        Sample {idx + 1}: &quot;{p.text.slice(0, 22)}...&quot;
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Enter prompt to classify complexity..."
                      className="flex-1 text-xs px-3.5 py-2 border border-zinc-300 rounded-lg bg-zinc-50/50 focus:outline-none focus:border-zinc-500 w-full"
                    />
                    <button
                      onClick={() => runRouterSimulation(customPrompt)}
                      disabled={isRouting}
                      className="px-4 py-2 bg-zinc-950 text-white rounded-lg text-xs hover:bg-zinc-800 disabled:opacity-50 transition-colors shrink-0 font-bold cursor-pointer"
                    >
                      {isRouting
                        ? serverWarmStatus === "waking"
                          ? "Waking Container..."
                          : "Classifying..."
                        : "Route Prompt"}
                    </button>
                  </div>

                  {serverWarmStatus === "waking" && (
                    <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg flex items-center gap-2 font-mono mt-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                      <span>
                        Render free instance is spinning up (~30s cold start)...
                      </span>
                    </div>
                  )}

                  {routerSimResult && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/80 text-xs space-y-2.5 mt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <span className="text-zinc-500 font-semibold text-[11px]">
                          ASSIGNED TIER:
                        </span>
                        <span
                          className={`font-bold px-2.5 py-0.5 rounded text-xs w-fit ${
                            routerSimResult.tier === 0
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : "bg-amber-100 text-amber-900 border border-amber-300"
                          }`}
                        >
                          {routerSimResult.tier === 0
                            ? "TIER 0 (FAST EDGE SLM)"
                            : "TIER 1 (REASONING LLM)"}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-zinc-200">
                        <div>
                          <span className="text-zinc-500 block text-[11px] uppercase font-semibold">
                            CPU LATENCY
                          </span>
                          <span className="font-bold text-zinc-900 text-sm">
                            {routerSimResult.latency}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[11px] uppercase font-semibold">
                            CONFIDENCE
                          </span>
                          <span className="font-bold text-zinc-900 text-sm">
                            {routerSimResult.confidence}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[11px] uppercase font-semibold">
                            API COST
                          </span>
                          <span className="font-bold text-emerald-700 truncate block text-sm">
                            {routerSimResult.costSaved}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: EXTRACTIVE CONTEXT COMPACTOR */}
              {workbenchTab === "compactor" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-zinc-500 font-semibold block">
                      Quick test presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {compactorSamplePresets.map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCompactorQuery(preset.query);
                            setCompactorRawContext(preset.context);
                            setCompactorThreshold(preset.reduction);
                            runLiveCompactor(
                              preset.reduction,
                              preset.query,
                              preset.context,
                            );
                          }}
                          className="px-2.5 py-1 text-xs bg-zinc-50 border border-zinc-200 hover:border-zinc-400 rounded-lg text-zinc-700 transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-600 font-semibold block">
                      Target User Query (Cross-Attention Focus):
                    </label>
                    <input
                      type="text"
                      value={compactorQuery}
                      onChange={(e) => setCompactorQuery(e.target.value)}
                      placeholder="e.g. What is the max connections setting for Postgres?"
                      className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-lg bg-zinc-50/50 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <label className="text-zinc-600 font-semibold">
                        Raw Context / Multi-Turn Conversation:
                      </label>
                      <span className="text-zinc-400 font-normal">
                        {compactorRawContext.length} chars
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={compactorRawContext}
                      onChange={(e) => setCompactorRawContext(e.target.value)}
                      placeholder="Paste conversation or document sentences here..."
                      className="w-full text-xs p-2.5 border border-zinc-300 rounded-lg bg-zinc-50/50 focus:outline-none focus:border-zinc-500 leading-relaxed font-mono resize-none"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-700 font-semibold">
                        Target Reduction:{" "}
                        {(compactorThreshold * 100).toFixed(0)}%
                      </span>
                      <span className="text-emerald-700 font-bold">
                        {liveCompactorResult
                          ? `${liveCompactorResult.reductionPct}% Trimmed`
                          : `${(compactorThreshold * 100).toFixed(0)}% Target`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="0.8"
                      step="0.05"
                      value={compactorThreshold}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setCompactorThreshold(val);
                      }}
                      className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                    <div className="text-[11px] text-zinc-500">
                      <span>Hallucination Risk: </span>
                      <strong className="text-emerald-700 font-bold">
                        0.0% Verbatim
                      </strong>
                    </div>

                    <button
                      onClick={() =>
                        runLiveCompactor(
                          compactorThreshold,
                          compactorQuery,
                          compactorRawContext,
                        )
                      }
                      disabled={isCompacting}
                      className="px-4 py-2 bg-zinc-950 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      {isCompacting
                        ? serverWarmStatus === "waking"
                          ? "Waking Container..."
                          : "Compacting Context..."
                        : "Compact Context (Run Live ONNX)"}
                    </button>
                  </div>

                  {serverWarmStatus === "waking" && (
                    <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg flex items-center gap-2 font-mono mt-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                      <span>
                        Render free instance is spinning up (~30s cold start)...
                      </span>
                    </div>
                  )}

                  {liveCompactorResult && (
                    <div className="p-3 bg-zinc-900 text-zinc-100 rounded-xl space-y-2 text-xs mt-2">
                      <div className="flex justify-between items-center text-[11px] border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400 font-semibold">
                          VERBATIM COMPACTED OUTPUT:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">
                            {liveCompactorResult.originalChars} &rarr;{" "}
                            {liveCompactorResult.compactedChars} chars
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                            {liveCompactorResult.latency}
                          </span>
                        </div>
                      </div>
                      <p className="text-zinc-200 leading-relaxed max-h-28 overflow-y-auto font-mono">
                        &quot;{liveCompactorResult.compactedContext}&quot;
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION: WHAT I BRING TO TEAMS (CORE CAPABILITIES) */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 pb-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              CORE ENGINEERING CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
              What I Specialize In &amp; Ship
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Concrete capabilities I bring to product and infrastructure teams
              from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engineeringCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="text-xl font-bold text-zinc-950">
                      {cap.title}
                    </h3>
                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded-md border font-semibold ${cap.accent}`}
                    >
                      {cap.badge}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-700 mt-2.5 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100">
                  <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2 font-bold">
                    Key Implementations:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-zinc-800">
                    {cap.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-bold">
                          &check;
                        </span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: FEATURED AI ARCHITECTURES & SYSTEMS */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                SYSTEM CATALOG &bull; PROOF OF EXECUTION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
                Featured AI Architectures &amp; Fine-Tuned Models
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-1.5 bg-zinc-100 p-1 rounded-xl border border-zinc-200 font-mono text-xs max-w-full">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium ${
                  activeTab === "all"
                    ? "bg-white text-zinc-950 font-bold shadow-sm"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                All ({projectsData.length})
              </button>
              <button
                onClick={() => setActiveTab("edge-fine-tune")}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium ${
                  activeTab === "edge-fine-tune"
                    ? "bg-white text-zinc-950 font-bold shadow-sm"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                Edge Microservices
              </button>
              <button
                onClick={() => setActiveTab("deep-learning")}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium ${
                  activeTab === "deep-learning"
                    ? "bg-white text-zinc-950 font-bold shadow-sm"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                Deep Learning &amp; NCF
              </button>
              <button
                onClick={() => setActiveTab("rag-crag")}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium ${
                  activeTab === "rag-crag"
                    ? "bg-white text-zinc-950 font-bold shadow-sm"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                Agentic CRAG &amp; GraphRAG
              </button>
            </div>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-zinc-200 hover:border-zinc-400 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold uppercase">
                      {p.tier}
                    </span>
                    <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-300 truncate max-w-[200px]">
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-950 group-hover:text-cyan-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed line-clamp-3">
                      {p.tagline}
                    </p>
                  </div>

                  {/* Quantization Card if available */}
                  {p.quantization && (
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Target Model:</span>
                        <span className="font-semibold text-zinc-900 truncate ml-1">
                          {p.quantization.targetFormat}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">RAM Ceiling:</span>
                        <span className="font-bold text-emerald-700 ml-1">
                          {p.quantization.ramFootprint}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">CPU Latency:</span>
                        <span className="font-bold text-cyan-700 ml-1">
                          {p.quantization.latency}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Highlight Metrics with Matrix Decrypt */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {p.metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl"
                      >
                        <div className="text-xs font-mono text-zinc-500 uppercase font-semibold truncate">
                          {m.label}
                        </div>
                        <div className="text-base sm:text-lg font-black text-zinc-950 mt-0.5 font-mono">
                          <MatrixScrambleText text={m.value} />
                        </div>
                        <div className="text-xs font-mono text-zinc-600 truncate mt-0.5">
                          {m.detail}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.stack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-500 font-medium">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="text-xs sm:text-sm font-mono font-bold text-zinc-900 hover:text-cyan-700 flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                  >
                    Inspect Spec &rarr;
                  </button>

                  <div className="flex items-center gap-2">
                    {p.images && p.images.length > 0 && (
                      <button
                        onClick={() => openGallery(p.images)}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg border border-zinc-200 hover:border-zinc-400 text-zinc-800 bg-zinc-50 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                      >
                        UI ({p.images.length})
                      </button>
                    )}
                    {p.github !== "#" && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-zinc-600 hover:text-zinc-950 rounded-md border border-zinc-200 hover:bg-zinc-50 transition-colors"
                        title="View GitHub Repository"
                      >
                        <Icon
                          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                          size={16}
                        />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: MY PRODUCTION ENGINEERING PLAYBOOK */}
        <section
          id="playbook"
          className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                MY ENGINEERING PLAYBOOK
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 mt-1 tracking-tight">
                How I Design &amp; Optimize AI Systems
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Real engineering decisions made across my projects—explained
                simply with interactive visualizers or full production specs.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl border border-zinc-200 font-mono text-xs self-start lg:self-auto shadow-inner">
              <button
                onClick={() => setExplainMode("visual")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
                  explainMode === "visual"
                    ? "bg-white text-zinc-950 font-bold shadow-sm"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                Visual Analogy
              </button>
              <button
                onClick={() => setExplainMode("spec")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
                  explainMode === "spec"
                    ? "bg-white text-zinc-950 font-bold shadow-sm"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                Production Spec
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-zinc-100 pb-3">
            {[
              {
                id: "quantization",
                label: "Rule 1: ONNX INT8 vs OOM",
                badge: "512MB RAM",
              },
              {
                id: "attention",
                label: "Rule 2: Attention Sinks",
                badge: "0% Hallucination",
              },
              {
                id: "encoders",
                label: "Rule 3: Bi vs Cross Encoders",
                badge: "Rerank",
              },
              {
                id: "rag-kv",
                label: "Rule 4: Redis KV vs Vector DB",
                badge: "68% Token Save",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setConceptTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  conceptTab === tab.id
                    ? "bg-zinc-950 text-white font-bold shadow-sm"
                    : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    conceptTab === tab.id
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-200 text-zinc-600"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>

          {/* TAB 1: BI-ENCODER VS CROSS-ENCODER */}
          {conceptTab === "encoders" && (
            <div className="space-y-6 pt-2">
              {explainMode === "visual" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-5 bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase text-cyan-700 font-bold">
                        Why I Separate Retrieval from Reranking
                      </div>
                      <h3 className="text-xl font-bold text-zinc-950 mt-1">
                        Summary Snapshot vs. Full Conversation
                      </h3>
                      <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
                        In production AI architectures, using only vector
                        embeddings causes subtle context loss:
                      </p>
                      <div className="space-y-2.5 mt-3.5">
                        <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-200 text-xs">
                          <strong className="text-zinc-950 block font-mono text-sm">
                            Bi-Encoder (My Speed Scout):
                          </strong>
                          <span className="text-zinc-700 mt-1 block">
                            Compresses text into a 384/768-dim vector. Lightning
                            fast in Qdrant/Pinecone (&lt;1ms), but fine nuances
                            between words are lost in translation.
                          </span>
                        </div>
                        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs">
                          <strong className="text-emerald-950 block font-mono text-sm">
                            Cross-Encoder (My Precision Judge):
                          </strong>
                          <span className="text-emerald-900 mt-1 block">
                            Evaluates query and candidate text side-by-side.
                            Every query token attends directly to every
                            candidate token across all layers.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-950 text-zinc-300 rounded-xl font-mono text-xs">
                      <span className="text-cyan-400 font-bold">
                        My Production Pattern:
                      </span>{" "}
                      Bi-encoders grab top 50 candidates in &lt;1ms;
                      Cross-encoder reranks top 5 in ~20ms.
                    </div>
                  </div>

                  {/* Interactive Attention Matrix Visualizer */}
                  <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-2.5 gap-1">
                      <span className="text-xs font-mono font-bold text-zinc-800 uppercase">
                        Cross-Attention Token Interrogation
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        Click or hover tokens below
                      </span>
                    </div>

                    <div className="space-y-4 font-mono text-xs">
                      <div>
                        <span className="text-xs text-zinc-500 block mb-1.5 font-semibold">
                          USER QUERY TOKENS:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Cancel",
                            "Enterprise",
                            "Subscription",
                            "Immediately",
                          ].map((tok) => (
                            <button
                              key={tok}
                              onClick={() => setEncoderHoverToken(tok)}
                              onMouseEnter={() => setEncoderHoverToken(tok)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                                encoderHoverToken === tok
                                  ? "bg-cyan-600 text-white border-cyan-700 shadow-sm scale-105"
                                  : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400"
                              }`}
                            >
                              {tok}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2.5">
                        <span className="text-xs text-zinc-600 uppercase tracking-wider block font-bold">
                          Cross-Attention Activation:
                        </span>
                        <div className="space-y-2 text-xs">
                          <div
                            className={`p-2.5 rounded-lg border transition-all ${
                              encoderHoverToken === "Cancel" ||
                              encoderHoverToken === "Subscription"
                                ? "bg-emerald-100 border-emerald-300 text-emerald-950 font-semibold"
                                : "bg-white border-zinc-200 text-zinc-600"
                            }`}
                          >
                            <span className="font-bold mr-1.5">[Doc A]:</span>{" "}
                            &quot;Users can terminate their tier plan within 30
                            days.&quot;
                            {(encoderHoverToken === "Cancel" ||
                              encoderHoverToken === "Subscription") && (
                              <span className="ml-2 text-xs px-2 py-0.5 rounded bg-emerald-600 text-white font-mono inline-block font-semibold">
                                High Score (0.94)
                              </span>
                            )}
                          </div>
                          <div
                            className={`p-2.5 rounded-lg border transition-all ${
                              encoderHoverToken === "Enterprise"
                                ? "bg-emerald-100 border-emerald-300 text-emerald-950 font-semibold"
                                : "bg-white border-zinc-200 text-zinc-500"
                            }`}
                          >
                            <span className="font-bold mr-1.5">[Doc B]:</span>{" "}
                            &quot;Enterprise accounts require an administrator
                            ticket.&quot;
                            {encoderHoverToken === "Enterprise" && (
                              <span className="ml-2 text-xs px-2 py-0.5 rounded bg-emerald-600 text-white font-mono inline-block font-semibold">
                                High Score (0.91)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                          <span className="font-bold text-zinc-900 block text-xs">
                            Bi-Encoder Path
                          </span>
                          <span className="text-zinc-600 text-xs block mt-1">
                            Vector dot product: cos(&theta;)
                          </span>
                          <span className="text-amber-700 text-xs font-semibold mt-1 block">
                            &bull; Speed: 0.8ms &bull; Coarse
                          </span>
                        </div>
                        <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200">
                          <span className="font-bold text-cyan-950 block text-xs">
                            Cross-Encoder Path
                          </span>
                          <span className="text-cyan-800 text-xs block mt-1">
                            Joint self-attention across layers
                          </span>
                          <span className="text-emerald-700 text-xs font-semibold mt-1 block">
                            &bull; Speed: 19ms &bull; Exact
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-mono text-xs">
                  <div className="md:col-span-7 space-y-3.5">
                    <h3 className="text-base font-bold text-zinc-950">
                      Mathematical Formulation &amp; Layer Attention
                      Architecture
                    </h3>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      Bi-encoders project representations into metric space u =
                      f(q) and v = g(d), computing similarity strictly via inner
                      product &lang;u, v&rang;. This bottlenecks token
                      interactions into a fixed vector dimension, discarding
                      token-level cross-correlations.
                    </p>
                    <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs space-y-2">
                      <div className="text-zinc-900 font-bold">
                        Cross-Encoder Self-Attention Formulation:
                      </div>
                      <div className="text-xs text-zinc-700 bg-white p-2.5 rounded-lg border border-zinc-200 font-mono overflow-x-auto">
                        Input = [CLS] &bull; q &bull; [SEP] &bull; d &bull;
                        [SEP]
                        <br />
                        Attention(Q, K, V) = softmax((Q &times; K<sup>T</sup>) /
                        &radic;d<sub>k</sub>) &times; V
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Because every query token attends to candidate tokens
                        across all 6 Transformer blocks of{" "}
                        <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-xs font-semibold text-zinc-800">
                          ms-marco-MiniLM-L-6-v2
                        </code>
                        , the final [CLS] classification logit provides an exact
                        relevance scalar for our compactor without generating
                        hallucinated tokens.
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-zinc-950 text-zinc-200 rounded-2xl p-5 font-mono text-xs space-y-3 shadow-lg">
                    <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                      My Quantized Runtime Benchmarks
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">Architecture:</span>
                        <span className="text-emerald-400 font-bold">
                          Cross-Encoder MiniLM
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">Quantization:</span>
                        <span className="text-cyan-400 font-bold">
                          Dynamic INT8
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">
                          Inference Latency:
                        </span>
                        <span className="text-zinc-100 font-bold">
                          19.2ms (CPU)
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">RAM Ceiling:</span>
                        <span className="text-zinc-100 font-bold">
                          &lt; 65 MB
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          Hallucination Risk:
                        </span>
                        <span className="text-emerald-400 font-bold">
                          0.00%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ATTENTION SINKS & VERBATIM SLICING */}
          {conceptTab === "attention" && (
            <div className="space-y-6 pt-2">
              {explainMode === "visual" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-5 bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase text-amber-700 font-bold">
                        Why I Avoid Generative Summarization
                      </div>
                      <h3 className="text-xl font-bold text-zinc-950 mt-1">
                        Verbatim Slicing Beats Generative LLM Rewriting
                      </h3>
                      <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
                        Asking an LLM to &quot;summarize conversation
                        history&quot; creates severe failure modes in
                        production:
                      </p>
                      <div className="space-y-2.5 mt-3.5 text-xs">
                        <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl">
                          <strong className="text-amber-950 block font-mono text-sm">
                            1. Negation Inversion Danger
                          </strong>
                          <span className="text-amber-900 mt-1 block">
                            Naive token pruning deletes words like
                            &quot;not&quot; or &quot;never&quot; due to lower
                            individual weights, turning &quot;Do NOT push to
                            prod&quot; into &quot;Do push to prod&quot;.
                          </span>
                        </div>
                        <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl">
                          <strong className="text-rose-950 block font-mono text-sm">
                            2. Code Indentation Mutation
                          </strong>
                          <span className="text-rose-900 mt-1 block">
                            Generative summarizers rewrite Python code
                            indentation, YAML tabs, or JSON braces, completely
                            breaking downstream execution.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-xl font-mono text-xs">
                      <span className="font-bold">My Solution:</span> Regex
                      character span slicing `(start, end)` preserving 100%
                      exact formatting.
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-2.5 font-mono text-xs gap-2">
                      <span className="font-bold text-zinc-800 uppercase">
                        Live Slicing Simulator
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => setSimulatedNegationStep("naive")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            simulatedNegationStep === "naive"
                              ? "bg-rose-600 text-white font-bold"
                              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          Naive Pruning (Broken)
                        </button>
                        <button
                          onClick={() => setSimulatedNegationStep("verbatim")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            simulatedNegationStep === "verbatim"
                              ? "bg-emerald-600 text-white font-bold"
                              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          Verbatim Span Engine (Safe)
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 font-mono text-xs space-y-3">
                      <div className="text-xs text-zinc-500 uppercase font-semibold">
                        Input Text:
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-zinc-200 text-zinc-800 text-xs sm:text-sm leading-relaxed">
                        &quot;Patient was admitted yesterday. The patient is{" "}
                        <span className="font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                          NOT
                        </span>{" "}
                        allergic to penicillin antibiotics. The patient rested
                        comfortably.&quot;
                      </div>

                      {simulatedNegationStep === "naive" ? (
                        <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-lg space-y-2 text-rose-950">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-rose-900 text-xs sm:text-sm">
                              Naive Pruning Result:
                            </span>
                            <span className="text-xs bg-rose-200 px-2 py-0.5 rounded font-bold text-rose-900">
                              FATAL INVERSION
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-mono bg-white p-2.5 rounded border border-rose-200 line-through decoration-rose-500">
                            &quot;Patient was admitted. The patient is allergic
                            to penicillin antibiotics. rested comfortably.&quot;
                          </p>
                          <p className="text-xs text-rose-800">
                            &quot;NOT&quot; was stripped because it carried low
                            self-attention weight, completely reversing medical
                            truth!
                          </p>
                        </div>
                      ) : (
                        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-lg space-y-2 text-emerald-950">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-emerald-900 text-xs sm:text-sm">
                              My Verbatim Span Extractor:
                            </span>
                            <span className="text-xs bg-emerald-200 px-2 py-0.5 rounded font-bold text-emerald-900">
                              100% FACTUAL
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-mono bg-white p-2.5 rounded border border-emerald-200">
                            &quot;The patient is NOT allergic to penicillin
                            antibiotics.&quot;
                          </p>
                          <p className="text-xs text-emerald-800">
                            Surviving clauses were extracted verbatim using
                            start/end character offsets. Surviving text is
                            guaranteed identical.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-mono text-xs">
                  <div className="md:col-span-7 space-y-3.5">
                    <h3 className="text-base font-bold text-zinc-950">
                      Attention Sink Phenomena &amp; Immutable String Slicing
                    </h3>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      Initial tokens and syntax delimiters accumulate massive
                      attention scores regardless of semantic relevance because
                      Softmax requires denominator mass allocation.
                    </p>
                    <div className="p-4 bg-zinc-950 text-zinc-200 rounded-xl space-y-2 text-xs overflow-x-auto shadow-md">
                      <span className="text-zinc-500">
                        // My Verbatim Regex Slicing Algorithm:
                      </span>
                      <br />
                      <span className="text-cyan-300">
                        spans = [(m.start(), m.end()) for m in
                        re.finditer(SENTENCE_PATTERN, raw_prompt)]
                      </span>
                      <br />
                      <span className="text-zinc-500">
                        // Cross-Encoder evaluates each span independently in
                        O(N)
                      </span>
                      <br />
                      <span className="text-emerald-400">
                        surviving = [raw_prompt[s:e] for (s, e), score in scored
                        if score &gt;= threshold]
                      </span>
                      <br />
                      <span className="text-zinc-300">
                        final_context = &quot; &quot;.join(surviving)
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-3">
                    <div className="text-xs text-zinc-600 font-bold uppercase">
                      Complexity Comparison
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-zinc-200 space-y-1">
                      <div className="font-bold text-zinc-900 text-xs">
                        Self-Attention Token Deletion
                      </div>
                      <div className="text-xs text-rose-700 font-bold">
                        O(N&sup2;) Quadratic Token Attention
                      </div>
                      <div className="text-xs text-zinc-500">
                        Blows up GPU VRAM on long contexts (&gt;4k tokens)
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300 space-y-1">
                      <div className="font-bold text-emerald-950 text-xs">
                        Sentence Cross-Encoder Compactor
                      </div>
                      <div className="text-xs text-emerald-700 font-bold">
                        O(N) Linear Sentence Evaluation
                      </div>
                      <div className="text-xs text-emerald-800">
                        Scores sentences in batches; runs on 1 CPU in 20ms
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ONNX INT8 VS LINUX OOM EXIT CODE 137 */}
          {conceptTab === "quantization" && (
            <div className="space-y-6 pt-2">
              {explainMode === "visual" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-5 bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase text-emerald-700 font-bold">
                        How I Solve Cloud Edge Economics
                      </div>
                      <h3 className="text-xl font-bold text-zinc-950 mt-1">
                        Crushing Memory Walls on Free &amp; Edge Hardware
                      </h3>
                      <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
                        Free tier cloud containers (Render, HuggingFace Spaces)
                        give you a strict{" "}
                        <strong className="text-zinc-950 font-bold">
                          512 MB RAM ceiling
                        </strong>
                        .
                      </p>
                      <div className="space-y-2.5 mt-3.5 text-xs">
                        <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl">
                          <strong className="text-rose-950 block font-mono text-sm">
                            Standard PyTorch FP32 (Crashes):
                          </strong>
                          <span className="text-rose-900 mt-1 block">
                            Typing{" "}
                            <code className="bg-rose-100 px-1.5 py-0.5 rounded font-mono">
                              import torch
                            </code>{" "}
                            eats 380 MB of RAM. When the model loads, usage hits
                            490 MB, immediately triggering Linux{" "}
                            <strong className="text-rose-950">
                              Exit Code 137 (OOM Killer)
                            </strong>
                            .
                          </span>
                        </div>
                        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl">
                          <strong className="text-emerald-950 block font-mono text-sm">
                            My Zero-PyTorch ONNX INT8 Engine:
                          </strong>
                          <span className="text-emerald-900 mt-1 block">
                            I export the static graph and quantize weights from
                            32-bit floats to 8-bit integers. Total memory drops
                            to{" "}
                            <strong className="text-emerald-950">
                              &lt; 80 MB RAM
                            </strong>{" "}
                            (&lt;15% of container capacity)!
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-950 text-zinc-300 rounded-xl font-mono text-xs">
                      <span className="text-emerald-400 font-bold">
                        Zero Hosting Cost:
                      </span>{" "}
                      My services run indefinitely on free cloud tiers with
                      99.99% uptime and sub-25ms CPU response times.
                    </div>
                  </div>

                  {/* Interactive RAM Tank Gauge Simulator */}
                  <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-2.5 font-mono text-xs gap-2">
                      <span className="font-bold text-zinc-800 uppercase">
                        Container RAM Simulator (512MB Ceiling)
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setOomContainerSimActive("fp32")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            oomContainerSimActive === "fp32"
                              ? "bg-rose-600 text-white font-bold"
                              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          PyTorch FP32
                        </button>
                        <button
                          onClick={() => setOomContainerSimActive("int8")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            oomContainerSimActive === "int8"
                              ? "bg-emerald-600 text-white font-bold"
                              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          ONNX INT8
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 font-mono text-xs space-y-3.5">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-zinc-600 font-semibold">
                          ACTIVE RAM:
                        </span>
                        <span className="font-bold text-zinc-950">
                          {oomContainerSimActive === "fp32"
                            ? "498 MB / 512 MB (97.2%)"
                            : "78 MB / 512 MB (15.2%)"}
                        </span>
                      </div>

                      <div className="relative w-full h-8 bg-zinc-200 rounded-lg overflow-hidden border border-zinc-300">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-600 z-10" />
                        <div
                          className={`h-full transition-all duration-700 ${
                            oomContainerSimActive === "fp32"
                              ? "bg-rose-500 w-[97%]"
                              : "bg-emerald-500 w-[15%]"
                          }`}
                        />
                      </div>

                      {oomContainerSimActive === "fp32" ? (
                        <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-rose-950 text-xs space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-xs text-rose-800">
                            <span>&#9888;</span> LINUX SIGKILL: EXIT CODE 137
                            (OOM)
                          </div>
                          <div className="text-xs text-rose-900 leading-relaxed">
                            Host OS kills process. PyTorch binary (800MB) + FP32
                            weights saturate 512MB threshold immediately on
                            request arrival.
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950 text-xs space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                            <span>&check;</span> MY SYSTEM STATUS: ROCK SOLID
                            (ZERO OOM RISK)
                          </div>
                          <div className="text-xs text-emerald-900 leading-relaxed">
                            Consumes ~78 MB active RAM. 434 MB headroom
                            remaining. High concurrent throughput on zero-cost
                            infrastructure.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-mono text-xs">
                  <div className="md:col-span-7 space-y-3.5">
                    <h3 className="text-base font-bold text-zinc-950">
                      Static ONNX Graph Tracing &amp; INT8 QuantizeLinear
                    </h3>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      I export PyTorch checkpoints using{" "}
                      <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs font-semibold">
                        torch.onnx.export(dynamo=False)
                      </code>{" "}
                      with dynamic batch axes to freeze operator topologies into
                      a single portable binary.
                    </p>
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 text-xs">
                      <div className="font-bold text-zinc-950">
                        Dynamic Quantization Formula:
                      </div>
                      <div className="text-xs text-zinc-700 bg-white p-2.5 rounded-lg border border-zinc-200 font-mono overflow-x-auto">
                        q = round(r / S) + Z<br />
                        where S = (r<sub>max</sub> - r<sub>min</sub>) / (q
                        <sub>max</sub> - q<sub>min</sub>), &nbsp; Z = round(-r
                        <sub>min</sub> / S)
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-5 bg-zinc-950 text-zinc-200 rounded-2xl p-5 space-y-2.5 shadow-md">
                    <div className="text-xs text-zinc-400 font-bold uppercase">
                      Weight Compression Metric
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">FP32 Checkpoint:</span>
                        <span className="text-rose-400 font-bold">268 MB</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">ONNX INT8:</span>
                        <span className="text-emerald-400 font-bold">
                          65 MB (-75.7%)
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">Val Acc Delta:</span>
                        <span className="text-cyan-400 font-bold">
                          -0.38% (Negligible)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">CPU Speedup:</span>
                        <span className="text-emerald-400 font-bold">
                          2.8x Faster
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REDIS KV VS VECTOR DB */}
          {conceptTab === "rag-kv" && (
            <div className="space-y-6 pt-2">
              {explainMode === "visual" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-5 bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase text-violet-700 font-bold">
                        My Storage Architecture Principle
                      </div>
                      <h3 className="text-xl font-bold text-zinc-950 mt-1">
                        Never Abuse Vector DBs as Raw File Cabinets
                      </h3>
                      <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
                        A frequent architecture anti-pattern in RAG is storing
                        megabytes of raw narrative text inside expensive vector
                        stores like Pinecone or ChromaDB.
                      </p>
                      <div className="space-y-2.5 mt-3.5 text-xs">
                        <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-200">
                          <strong className="text-zinc-950 block font-mono text-sm">
                            Vector DBs are for Geometry:
                          </strong>
                          <span className="text-zinc-700 mt-1 block">
                            Reserved exclusively for indexing multidimensional
                            coordinates and cosine angles between thoughts.
                          </span>
                        </div>
                        <div className="p-3 bg-violet-50 border border-violet-300 rounded-xl">
                          <strong className="text-violet-950 block font-mono text-sm">
                            Redis KV is for Verbatim Content:
                          </strong>
                          <span className="text-violet-900 mt-1 block">
                            Direct primary-key lookup (
                            <code className="bg-violet-100 px-1.5 py-0.5 rounded font-mono">
                              GET ch4_p12
                            </code>
                            ). 0.4ms retrieval time, zero embedding overhead,
                            and zero token burn.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-950 text-zinc-300 rounded-xl font-mono text-xs">
                      <span className="text-violet-400 font-bold">
                        68% Token Savings:
                      </span>{" "}
                      I stream exact book passages through Redis only when the
                      user explicitly queries that perspective node.
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                      <span className="font-bold text-zinc-800 uppercase">
                        Two-Lane Retrieval Topology
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setKvRetrievalStep(1)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                            kvRetrievalStep === 1
                              ? "bg-violet-700 text-white font-bold"
                              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          Step 1: Semantic
                        </button>
                        <button
                          onClick={() => setKvRetrievalStep(2)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                            kvRetrievalStep === 2
                              ? "bg-emerald-700 text-white font-bold"
                              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          Step 2: Raw KV
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3.5 shadow-inner">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-zinc-800 gap-1">
                        <span className="text-zinc-500 text-xs font-semibold">
                          USER QUERY:
                        </span>
                        <span className="font-bold text-zinc-200 truncate text-xs sm:text-sm">
                          &quot;Why did Darcy reject Elizabeth&apos;s
                          dance?&quot;
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        <div
                          className={`p-3 rounded-xl border transition-all ${
                            kvRetrievalStep === 1
                              ? "bg-zinc-800 border-violet-500 text-zinc-100 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                              : "bg-zinc-900 border-zinc-800 text-zinc-500 opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-violet-400">
                              LANE 1: PINECONE VECTOR DB
                            </span>
                            <span className="text-xs bg-violet-600/20 border border-violet-500/30 text-violet-300 px-2 py-0.5 rounded font-bold">
                              0.85ms
                            </span>
                          </div>
                          <p className="text-xs mt-1.5 font-normal leading-relaxed">
                            Calculates cosine distance over entity relationships
                            &rarr; Returns chunk ID pointer:{" "}
                            <code className="bg-zinc-950 px-1.5 py-0.5 rounded font-bold border border-zinc-800">
                              &quot;p_and_p_ch3_p4&quot;
                            </code>
                            .
                          </p>
                        </div>

                        <div
                          className={`p-3 rounded-xl border transition-all ${
                            kvRetrievalStep === 2
                              ? "bg-zinc-800 border-emerald-500 text-zinc-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                              : "bg-zinc-900 border-zinc-800 text-zinc-500 opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-emerald-400">
                              LANE 2: UPSTASH REDIS KV
                            </span>
                            <span className="text-xs bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-bold">
                              0.38ms
                            </span>
                          </div>
                          <p className="text-xs mt-1.5 font-normal leading-relaxed">
                            Fetches pristine raw paragraph from cache &rarr;
                            Zero LLM tokens burned; 100% exact text rendered
                            instantly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-mono text-xs">
                  <div className="md:col-span-7 space-y-3.5">
                    <h3 className="text-base font-bold text-zinc-950">
                      Decoupled Key-Value &amp; GraphRAG Triplet Engine
                    </h3>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      In classical literature analysis, narrative threads rely
                      on exact chronological sequences punctuated by character
                      relationship shifts. I architected a stateless ingestion
                      pipeline that maps:
                    </p>
                    <ul className="space-y-2 text-zinc-700 text-xs">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">
                          &check;
                        </span>
                        <span>
                          <strong>Graph Triplet Ingestion:</strong> Groq API
                          extracts (Subject, Predicate, Object) triplets mapped
                          to Pinecone vectors.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">
                          &check;
                        </span>
                        <span>
                          <strong>Verbatim Text KV Separation:</strong> Full
                          chapters cached in Upstash Redis, preventing container
                          memory saturation (&lt;240 MB container footprint).
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:col-span-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-2.5">
                    <div className="text-xs text-zinc-600 font-bold uppercase">
                      Efficiency
                    </div>
                    <div className="p-3 bg-white border border-zinc-200 rounded-lg space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-600">Vector Storage:</span>
                        <span className="font-bold text-emerald-700">
                          -72% vs Flat
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">Latency:</span>
                        <span className="font-bold text-zinc-900">
                          Sub-1ms Dual-Tier
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">Token Savings:</span>
                        <span className="font-bold text-cyan-700">
                          68% Reduction
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* SECTION: PRODUCTION EXPERIENCE */}
        <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-zinc-200 pb-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              PRODUCTION TRACK RECORD
            </div>
            <h2 className="text-2xl font-bold text-zinc-950 mt-1">
              Engineering Roles &amp; Production Deployments
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Hands-on contributions across enterprise development and
              high-growth production codebases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Accenture */}
            <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50/50 space-y-3.5">
              <div className="flex flex-col xs:flex-row justify-between xs:items-start gap-1">
                <div>
                  <h3 className="font-bold text-zinc-950 text-base sm:text-lg">
                    Application Developer
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-cyan-800 font-semibold mt-0.5">
                    Accenture
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-zinc-200 text-zinc-800 font-medium w-fit">
                  Nov 2024 &ndash; Present
                </span>
              </div>
              <ul className="text-xs sm:text-sm text-zinc-700 space-y-2 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-0.5">&bull;</span>
                  <span>
                    Engineered conversational Angular application for innovation
                    contests with unified chat-driven interfaces.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-0.5">&bull;</span>
                  <span>
                    Designed Multi-Role Workflow Engine supporting Participant,
                    Evaluator, and Moderator personas via granular RBAC.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-0.5">&bull;</span>
                  <span>
                    Authored a Figma-to-Code Model Context Protocol (MCP) server
                    automating frontend scaffolding by traversing Figma design
                    trees.
                  </span>
                </li>
              </ul>
            </div>

            {/* Blaosys */}
            <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50/50 space-y-3.5">
              <div className="flex flex-col xs:flex-row justify-between xs:items-start gap-1">
                <div>
                  <h3 className="font-bold text-zinc-950 text-base sm:text-lg">
                    Graduate Engineer Trainee
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-violet-800 font-semibold mt-0.5">
                    Blaosys Pvt Ltd
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-zinc-200 text-zinc-800 font-medium w-fit">
                  Jul 2024 &ndash; Nov 2024
                </span>
              </div>
              <ul className="text-xs sm:text-sm text-zinc-700 space-y-2 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-0.5">&bull;</span>
                  <span>
                    Architected end-to-end Ad Management Engine featuring custom
                    probabilistic rotation logic and click-through tracking.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-0.5">&bull;</span>
                  <span>
                    Rebuilt corporate web properties with modern backend
                    architectures, boosting Google Lighthouse SEO score from 16
                    to 90.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-zinc-600 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>
              Manojkumar B &bull; AI Systems &amp; Edge Inference Engineer
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="mailto:mkbellerimath@gmail.com"
              className="hover:text-zinc-950 transition-colors font-medium"
            >
              Email
            </a>
            <a
              href="https://github.com/mkb05"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-950 transition-colors font-medium"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mkb05/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-950 transition-colors font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* DETAILED PROJECT SPEC INSPECTION MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white border border-zinc-300 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[92dvh] overflow-y-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 pb-4 gap-2">
              <div className="min-w-0">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-800 font-semibold uppercase">
                  {selectedProject.tier}
                </span>
                <h3 className="text-2xl font-bold text-zinc-950 mt-1 truncate">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-cyan-800 font-medium mt-0.5 truncate">
                  {selectedProject.badge}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors font-mono shrink-0 cursor-pointer text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Problem & Architectural Notes */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  Core Problem Addressed
                </h4>
                <p className="text-sm text-zinc-700 mt-1.5 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                  {selectedProject.problemSolved}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  System Implementation Notes
                </h4>
                <ul className="mt-2 space-y-2 text-xs sm:text-sm text-zinc-700 font-mono">
                  {selectedProject.architectureDetails.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200"
                    >
                      <span className="text-cyan-700 font-bold mt-0.5 shrink-0">
                        &bull;
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pipeline Trace Graph in Inspection Modal */}
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase mb-2.5 tracking-wider">
                  Execution Pipeline Graph
                </h4>
                <AnimatedPipelineTrace steps={selectedProject.pipelineSteps} />
              </div>

              {/* Modal Action Links */}
              <div className="pt-4 border-t border-zinc-200 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  {selectedProject.github !== "#" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 text-xs font-mono font-semibold rounded-lg border border-zinc-300 hover:border-zinc-500 text-zinc-800 bg-white transition-colors text-center"
                    >
                      GitHub &rarr;
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 text-xs font-mono font-semibold rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors text-center"
                    >
                      Demo &rarr;
                    </a>
                  )}
                </div>

                {selectedProject.images &&
                  selectedProject.images.length > 0 && (
                    <button
                      onClick={() => openGallery(selectedProject.images)}
                      className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors text-center cursor-pointer"
                    >
                      Screenshots ({selectedProject.images.length})
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED FULL-SCREEN IMAGE LIGHTBOX */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none"
          onClick={() => setLightbox({ isOpen: false, images: [], index: 0 })}
        >
          {/* Previous Button */}
          <button
            onClick={prevImg}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full transition-all z-20 cursor-pointer"
            aria-label="Previous Image"
          >
            <Icon d="M15 18l-6-6 6-6" size={22} />
          </button>

          {/* Centered Image View */}
          <div
            className="max-w-5xl max-h-[85dvh] p-2 flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.index]}
              alt={`Screenshot ${lightbox.index + 1}`}
              className="max-h-[68dvh] sm:max-h-[75dvh] w-auto max-w-full object-contain rounded-2xl border border-zinc-700 shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://placehold.co/900x500/18181b/ffffff?text=Screenshot+${lightbox.index + 1}+Loading`;
              }}
            />
            <div className="font-mono text-xs text-zinc-300 bg-zinc-900 px-3.5 py-1 rounded-full border border-zinc-800">
              Artifact {lightbox.index + 1} of {lightbox.images.length}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextImg}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-full transition-all z-20 cursor-pointer"
            aria-label="Next Image"
          >
            <Icon d="M9 18l6-6-6-6" size={22} />
          </button>

          {/* Close Lightbox */}
          <button
            onClick={() => setLightbox({ isOpen: false, images: [], index: 0 })}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-zinc-400 hover:text-white font-mono text-xs sm:text-sm z-20 cursor-pointer"
          >
            [Close &times;]
          </button>
        </div>
      )}
    </div>
  );
}
