import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Layers, 
  Briefcase, 
  User, 
  Mail, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  Code2, 
  Volume2, 
  VolumeX,
  Sparkles
} from 'lucide-react';
import { personal } from '../data/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPlayClick?: () => void;
  onPlaySuccess?: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'Social' | 'System';
  label: string;
  description: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  soundEnabled,
  onToggleSound,
  onPlayClick,
  onPlaySuccess,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    onClose();
    onPlayClick?.();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    onPlaySuccess?.();
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = [
    {
      id: 'work',
      category: 'Navigation',
      label: 'View Featured Work',
      description: 'Explore Pawfectly Pet Shop & College Management System',
      icon: <Layers size={16} className="text-[#C8FF00]" />,
      shortcut: 'G W',
      action: () => scrollToSection('project'),
    },
    {
      id: 'project-petshop',
      category: 'Actions',
      label: 'Open Pawfectly // KSS Pet Shop Live',
      description: 'kss-petshop-official.vercel.app',
      icon: <ExternalLink size={16} className="text-[#C8FF00]" />,
      action: () => {
        onClose();
        window.open('https://kss-petshop-official.vercel.app/', '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'project-college',
      category: 'Actions',
      label: 'Open College Management System Live',
      description: 'college-management-lovat.vercel.app',
      icon: <ExternalLink size={16} className="text-[#C8FF00]" />,
      action: () => {
        onClose();
        window.open('https://college-management-lovat.vercel.app/', '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'experience',
      category: 'Navigation',
      label: 'Experience & Career',
      description: 'Kalpanaaa, Tap Academy, Exlife Solutions',
      icon: <Briefcase size={16} className="text-[#C8FF00]" />,
      shortcut: 'G E',
      action: () => scrollToSection('experience'),
    },
    {
      id: 'about',
      category: 'Navigation',
      label: 'About Asbin',
      description: 'Background, developer mindset, career progression',
      icon: <User size={16} className="text-[#C8FF00]" />,
      shortcut: 'G A',
      action: () => scrollToSection('about'),
    },
    {
      id: 'contact',
      category: 'Navigation',
      label: 'Contact & Hire',
      description: 'Get in touch for software engineering roles',
      icon: <Mail size={16} className="text-[#C8FF00]" />,
      shortcut: 'G C',
      action: () => scrollToSection('contact'),
    },
    {
      id: 'resume-view',
      category: 'Actions',
      label: 'Open Interactive Resume',
      description: 'Preview full resume PDF & quick breakdown',
      icon: <FileText size={16} className="text-[#C8FF00]" />,
      shortcut: 'R',
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'resume-download',
      category: 'Actions',
      label: 'Download Resume PDF',
      description: 'Save Asbin_TS_Resume.pdf locally',
      icon: <Download size={16} className="text-[#C8FF00]" />,
      action: () => {
        onClose();
        onPlaySuccess?.();
        const a = document.createElement('a');
        a.href = '/resume.pdf';
        a.download = 'Asbin_TS_Resume.pdf';
        a.click();
      },
    },
    {
      id: 'copy-email',
      category: 'Actions',
      label: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
      description: personal.email,
      icon: copiedEmail ? <Check size={16} className="text-[#C8FF00]" /> : <Copy size={16} className="text-[#C8FF00]" />,
      action: copyEmail,
    },
    {
      id: 'sound-toggle',
      category: 'System',
      label: soundEnabled ? 'Mute Sound FX' : 'Enable Cyber Sound FX',
      description: soundEnabled ? 'Disable synthesized UI clicks' : 'Enable synthesized audio feedback',
      icon: soundEnabled ? <VolumeX size={16} className="text-[#C8FF00]" /> : <Volume2 size={16} className="text-[#C8FF00]" />,
      action: () => {
        onToggleSound();
        if (!soundEnabled) onPlaySuccess?.();
      },
    },
    {
      id: 'github',
      category: 'Social',
      label: 'GitHub Profile',
      description: 'github.com/asbin72',
      icon: <Code2 size={16} className="text-[#C8FF00]" />,
      action: () => {
        onClose();
        window.open(personal.github, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'linkedin',
      category: 'Social',
      label: 'LinkedIn Profile',
      description: 'linkedin.com/in/asbin-t-s',
      icon: <ExternalLink size={16} className="text-[#C8FF00]" />,
      action: () => {
        onClose();
        window.open(personal.linkedin, '_blank', 'noopener,noreferrer');
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const text = `${cmd.label} ${cmd.description} ${cmd.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
        onPlayClick?.();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
        onPlayClick?.();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose, onPlayClick]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-[12vh] p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Palette container */}
          <motion.div
            className="relative w-full max-w-xl rounded-xl border border-white/10 bg-[#0c0c0c] shadow-2xl overflow-hidden z-10 flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#141414]">
              <Search size={18} className="text-[#C8FF00] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, section, or action..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 font-mono focus:outline-none"
              />
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
                <span>ESC</span>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center">
                  <Sparkles size={24} className="mx-auto text-neutral-600 mb-2" />
                  <p className="text-xs font-mono text-neutral-400">No commands matching "{query}"</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all ${
                          isSelected ? 'bg-[#C8FF00]/10 border border-[#C8FF00]/30' : 'border border-transparent hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-1.5 rounded ${isSelected ? 'bg-[#C8FF00]/20' : 'bg-white/5'}`}>
                            {cmd.icon}
                          </div>
                          <div className="min-w-0">
                            <div className={`text-xs font-medium font-sans truncate ${isSelected ? 'text-[#C8FF00]' : 'text-white'}`}>
                              {cmd.label}
                            </div>
                            <div className="text-[11px] text-neutral-400 font-mono truncate">
                              {cmd.description}
                            </div>
                          </div>
                        </div>

                        {cmd.shortcut && (
                          <span className="text-[10px] font-mono text-neutral-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {cmd.shortcut}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#080808] border-t border-white/5 text-[10px] font-mono text-neutral-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span className="text-[#C8FF00]/70">ASBIN.TS // SYSTEM PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
