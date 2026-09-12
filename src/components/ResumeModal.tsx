import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Layers } from 'lucide-react';
import { personal, experience } from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'pdf' | 'text'>('pdf');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape & trap focus
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-5xl h-[92vh] max-h-[900px] flex flex-col rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-2xl z-10"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10 bg-[#141414]">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C8FF00]" />
                <h2
                  id="resume-modal-title"
                  className="text-sm sm:text-base font-bold tracking-wider text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  ASBIN T S <span className="text-[#C8FF00] font-mono text-xs font-normal">// RESUME</span>
                </h2>
              </div>

              {/* View Switcher & Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Switcher */}
                <div className="flex items-center p-0.5 rounded-md bg-white/5 border border-white/10">
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      viewMode === 'pdf' ? 'bg-[#C8FF00] text-black font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <FileText size={13} />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                  <button
                    onClick={() => setViewMode('text')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      viewMode === 'text' ? 'bg-[#C8FF00] text-black font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Layers size={13} />
                    <span className="hidden sm:inline">Overview</span>
                  </button>
                </div>

                {/* Open in New Tab */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  aria-label="Open PDF in new tab"
                >
                  <ExternalLink size={13} />
                  <span className="hidden md:inline">Open Tab</span>
                </a>

                {/* Download Button */}
                <a
                  href="/resume.pdf"
                  download="Asbin_TS_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold text-black bg-[#C8FF00] hover:bg-[#d5ff24] transition-colors"
                  aria-label="Download Resume PDF"
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Close Button */}
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF00]"
                  aria-label="Close resume modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden relative bg-[#070707]">
              {viewMode === 'pdf' ? (
                <iframe
                  src="/resume.pdf#toolbar=0&view=FitH"
                  title="Asbin T S Resume PDF Viewer"
                  className="w-full h-full border-0 bg-neutral-900"
                />
              ) : (
                <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
                  {/* Summary */}
                  <div className="border border-white/10 rounded-lg p-5 bg-[#111]">
                    <h3 className="text-lg font-bold text-white font-sans mb-2">Asbin T S</h3>
                    <p className="text-xs font-mono text-[#C8FF00] mb-3">
                      +91 7603872359 | {personal.email} | asbinportfolio.netlify.app
                    </p>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Software Developer with expertise in Java, Spring Boot, React, and MySQL. Passionate about building robust systems, clean architecture, and responsive user interfaces.
                    </p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-[#C8FF00] uppercase mb-3">
                      Technical Skills
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-3.5 rounded border border-white/5 bg-[#111]">
                        <span className="text-xs font-mono text-neutral-400 block mb-1">Programming Languages:</span>
                        <span className="text-white font-medium">Java, JavaScript, TypeScript, Python</span>
                      </div>
                      <div className="p-3.5 rounded border border-white/5 bg-[#111]">
                        <span className="text-xs font-mono text-neutral-400 block mb-1">Frontend Development:</span>
                        <span className="text-white font-medium">React, HTML5, CSS3, Tailwind CSS</span>
                      </div>
                      <div className="p-3.5 rounded border border-white/5 bg-[#111]">
                        <span className="text-xs font-mono text-neutral-400 block mb-1">Databases & Backend:</span>
                        <span className="text-white font-medium">MySQL, Spring Boot, Firebase, JDBC</span>
                      </div>
                      <div className="p-3.5 rounded border border-white/5 bg-[#111]">
                        <span className="text-xs font-mono text-neutral-400 block mb-1">Core Competencies:</span>
                        <span className="text-white font-medium">OOP, Data Structures, Problem Solving, Clean Code</span>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-[#C8FF00] uppercase mb-3">
                      Experience & Internships
                    </h4>
                    <div className="space-y-4">
                      {experience.map((item) => (
                        <div key={item.id} className="p-4 rounded border border-white/5 bg-[#111]">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <span className="font-bold text-white text-base font-sans">{item.role}</span>
                            <span className="text-xs font-mono text-neutral-400">{item.period}</span>
                          </div>
                          <span className="text-xs font-mono text-[#C8FF00] block mb-2">{item.company}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-[#C8FF00] uppercase mb-3">
                      Education
                    </h4>
                    <div className="p-4 rounded border border-white/5 bg-[#111] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-bold text-white">DMI College of Engineering</p>
                          <p className="text-xs text-neutral-400">B.Tech in Information Technology — CGPA: 7.5</p>
                        </div>
                        <span className="text-xs font-mono text-[#C8FF00]">2022 – 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
