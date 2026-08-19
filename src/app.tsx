import { useState, useEffect, useRef } from "react";
import SketchPortfolio from "./SketchPortfolio";
import Portfolio from "./portfolio";

// --- ORCHESTRATOR COMPONENT ---
export default function App() {
  const [theme, setTheme] = useState<"sketch" | "neural">("neural");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeStyles = {
    sketch: {
      button: "bg-white text-slate-800 border-slate-300 hover:bg-slate-100",
      menu: "bg-white border-slate-200 text-slate-800",
      item: "hover:bg-slate-100",
    },
    neural: {
      button:
        "bg-slate-900 text-cyan-400 border-cyan-800 hover:bg-slate-800 shadow-[0_0_15px_rgba(6,182,212,0.1)]",
      menu: "bg-slate-900 border-cyan-900 text-cyan-400",
      item: "hover:bg-slate-800 hover:text-white",
    },
  };

  const currentStyle = themeStyles[theme];

  return (
    <div className="relative min-h-screen transition-colors duration-500">
      {/* THEME TOGGLE DROPDOWN - TOP LEFT */}
      <div className="fixed top-4 left-4 z-[9999]" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2.5 rounded-lg border transition-all ${currentStyle.button}`}
          aria-label="Toggle Theme"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={`absolute left-0 mt-2 w-48 rounded-xl border p-1 shadow-xl animate-in fade-in slide-in-from-top-2 ${currentStyle.menu}`}
          >
            <button
              onClick={() => {
                setTheme("sketch");
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg font-mono text-sm ${currentStyle.item}`}
            >
              SKETCH_OS
            </button>
            <button
              onClick={() => {
                setTheme("neural");
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg font-mono text-sm ${currentStyle.item}`}
            >
              NEURAL_OS
            </button>
          </div>
        )}
      </div>

      {/* RENDER DYNAMIC COMPONENT */}
      {theme === "sketch" ? <SketchPortfolio /> : <Portfolio />}
    </div>
  );
}
