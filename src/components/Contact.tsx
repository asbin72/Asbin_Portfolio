import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send, Mail, MessageSquare, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { personal } from '../data/portfolio';
import { useInView, useReducedMotion } from '../hooks/usePortfolio';

interface ContactProps {
  onPlayClick?: () => void;
  onPlayHover?: () => void;
  onPlaySuccess?: () => void;
}

export default function Contact({ onPlayClick, onPlayHover, onPlaySuccess }: ContactProps) {
  const { ref, inView } = useInView(0.1);
  const reduced = useReducedMotion();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    onPlayClick?.();

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Inquiry from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success');
        onPlaySuccess?.();
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to deliver message directly.');
      }
    } catch (err: unknown) {
      console.warn('FormSubmit request fallback:', err);
      // Fallback: send via mailto if network or service error
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Network error. Click below to send via your email client.'
      );
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Asbin,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: '#070707' }}
      aria-labelledby="contact-title"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,255,0,0.04) 0%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={reduced ? {} : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-style inline-flex items-center gap-2 mb-6" style={{ color: '#929292' }}>
            <Sparkles size={12} className="text-[#C8FF00]" />
            LET'S WORK TOGETHER
          </span>

          <h2
            id="contact-title"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(36px, 7vw, 90px)',
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.0,
              marginBottom: '20px',
            }}
          >
            HAVE A PROJECT
            <br />
            <span style={{ color: '#C8FF00' }}>IN MIND?</span>
          </h2>

          <motion.p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(17px, 2.2vw, 24px)',
              color: '#929292',
              lineHeight: 1.4,
              marginBottom: '44px',
              fontWeight: 500,
            }}
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            LET'S BUILD SOMETHING WORTH SHIPPING.
          </motion.p>

          {/* Action button */}
          <motion.div
            className="flex justify-center mb-12"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Toggle Interactive Form */}
            <button
              onClick={() => {
                onPlayClick?.();
                setShowForm(!showForm);
                if (status === 'success') setStatus('idle');
              }}
              onMouseEnter={() => onPlayHover?.()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded bg-[#C8FF00] hover:bg-[#d5ff24] text-black text-xs font-mono font-bold tracking-wider transition-all focus:outline-none shadow-[0_0_20px_rgba(200,255,0,0.15)]"
              style={{ cursor: 'none' }}
            >
              <MessageSquare size={15} />
              {showForm ? 'CLOSE FORM' : 'SEND DIRECT MESSAGE'}
            </button>
          </motion.div>

          {/* Interactive message form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                className="max-w-xl mx-auto mb-12 rounded-2xl p-6 sm:p-8 bg-[#111111] border border-[#C8FF00]/30 shadow-2xl text-left relative overflow-hidden"
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#C8FF00]" />
                    <span className="font-mono text-xs text-white uppercase tracking-wider">Direct Message</span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400">Delivered directly to {personal.email}</span>
                </div>

                {status === 'success' ? (
                  <motion.div
                    className="py-10 text-center space-y-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00] flex items-center justify-center mx-auto text-[#C8FF00]">
                      <Check size={26} />
                    </div>
                    <h3 className="text-lg font-bold text-white font-sans">Message Sent Successfully!</h3>
                    <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been emailed directly to <span className="text-[#C8FF00]">{personal.email}</span>. I'll get back to you shortly!
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {status === 'error' && (
                      <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 flex items-start gap-2.5">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">{errorMessage}</p>
                          <button
                            type="button"
                            onClick={handleMailtoFallback}
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-500/20 text-white hover:bg-red-500/30 transition-colors"
                          >
                            <Mail size={12} /> Open in Email App
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1.5">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        disabled={status === 'submitting'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Smith"
                        className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/10 focus:border-[#C8FF00] text-sm text-white placeholder-neutral-600 font-mono focus:outline-none transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1.5">YOUR EMAIL</label>
                      <input
                        type="email"
                        required
                        disabled={status === 'submitting'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/10 focus:border-[#C8FF00] text-sm text-white placeholder-neutral-600 font-mono focus:outline-none transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1.5">MESSAGE</label>
                      <textarea
                        required
                        rows={4}
                        disabled={status === 'submitting'}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project, team, or opportunity..."
                        className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/10 focus:border-[#C8FF00] text-sm text-white placeholder-neutral-600 font-mono focus:outline-none transition-colors resize-none disabled:opacity-50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3 rounded bg-[#C8FF00] hover:bg-[#d5ff24] text-black font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                      style={{ cursor: status === 'submitting' ? 'wait' : 'none' }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          SENDING INQUIRY...
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          SEND INQUIRY
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
