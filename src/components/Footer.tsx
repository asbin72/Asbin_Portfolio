import { Mail } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function Footer() {
  const year = 2026;

  return (
    <footer
      style={{
        backgroundColor: '#070707',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '40px 0',
      }}
      aria-label="Site footer"
    >
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          {/* Left: Brand */}
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#F5F5F5',
              }}
            >
              ASBIN
              <span style={{ color: '#C8FF00' }}>.TS</span>
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#929292',
              }}
            >
              Software Developer
            </span>
          </div>

          {/* Center: Links */}
          <nav
            className="flex items-center gap-6"
            aria-label="Footer navigation"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#929292',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#929292')}
              aria-label="GitHub profile"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GITHUB
            </a>

            {/* LinkedIn - placeholder since URL not provided */}
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.2)',
                cursor: 'default',
              }}
              title="LinkedIn URL not provided"
            >
              LINKEDIN
            </span>

            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#929292',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#929292')}
              aria-label="Send email"
            >
              <Mail size={14} />
              EMAIL
            </a>
          </nav>

          {/* Right: Copyright */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.2)',
              textAlign: 'right',
            }}
          >
            © {year} ASBIN T S
            <br />
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
