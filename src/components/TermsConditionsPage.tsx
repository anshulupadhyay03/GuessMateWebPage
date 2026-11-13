import React, { useEffect, useMemo, useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { TERMS_CONDITIONS_FALLBACK_TEXT } from '../data/termsConditions';

interface TermsConditionsPageProps {
  onNavigatePrivacy?: () => void;
}

interface ParsedBlock {
  type: 'heading' | 'subheading' | 'paragraph' | 'bullets' | 'ordered' | 'meta';
  id?: string;
  text?: string;
  items?: string[];
  label?: string;
  value?: string;
}

const TERMS_DOC_URL = '/assets/aistudio/SIFT_MATES___TERMS___CONDITIONS_62d02b12';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function renderInlineLinks(text: string, onNavigatePrivacy?: () => void): React.ReactNode {
  const tokenRegex =
    /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|Privacy Policy)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E8E61A] hover:underline break-all"
        >
          {part}
        </a>
      );
    }
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a
          key={idx}
          href={`mailto:${part}`}
          className="text-[#E8E61A] hover:underline"
        >
          {part}
        </a>
      );
    }
    if (part === 'Privacy Policy' && onNavigatePrivacy) {
      return (
        <a
          key={idx}
          href="/privacy-policy"
          onClick={(e) => {
            e.preventDefault();
            onNavigatePrivacy();
          }}
          className="text-[#E8E61A] hover:underline font-medium"
        >
          Privacy Policy
        </a>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function parseTermsDocument(rawText: string): {
  title: string;
  effectiveDate: string | null;
  lastUpdated: string | null;
  blocks: ParsedBlock[];
} {
  const normalized = rawText.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const lines = normalized.split('\n').map((l) => l.trim());

  let title = 'SIFT MATES – TERMS & CONDITIONS';
  let effectiveDate: string | null = null;
  let lastUpdated: string | null = null;

  const blocks: ParsedBlock[] = [];
  let currentBullets: string[] = [];

  const flushBullets = () => {
    if (currentBullets.length > 0) {
      blocks.push({ type: 'bullets', items: currentBullets });
      currentBullets = [];
    }
  };

  lines.forEach((line, index) => {
    if (!line) {
      flushBullets();
      return;
    }

    if (index === 0 && line.toUpperCase().includes('TERMS')) {
      title = line;
      return;
    }

    if (line.startsWith('Effective Date:')) {
      effectiveDate = line.replace('Effective Date:', '').trim();
      return;
    }

    if (line.startsWith('Last Updated:')) {
      lastUpdated = line.replace('Last Updated:', '').trim();
      return;
    }

    if (line.startsWith('* ')) {
      currentBullets.push(line.slice(2).trim());
      return;
    }

    flushBullets();

    if (/^\d+\.\d+\.\s+/.test(line)) {
      const id = slugify(line);
      blocks.push({ type: 'subheading', id, text: line });
      return;
    }

    if (line === 'Introduction' || /^\d+\.\s+/.test(line)) {
      const id = slugify(line);
      blocks.push({ type: 'heading', id, text: line });
      return;
    }

    const metaMatch = line.match(
      /^(Company\/Developer Name|Developer\/Company|Contact Email|Email|Website):\s*(.+)$/
    );
    if (metaMatch) {
      blocks.push({
        type: 'meta',
        label: metaMatch[1],
        value: metaMatch[2],
      });
      return;
    }

    blocks.push({ type: 'paragraph', text: line });
  });

  flushBullets();

  return { title, effectiveDate, lastUpdated, blocks };
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({
  onNavigatePrivacy,
}) => {
  const [rawContent, setRawContent] = useState<string>(TERMS_CONDITIONS_FALLBACK_TEXT);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadTerms() {
      try {
        const res = await fetch(TERMS_DOC_URL);
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && !contentType.includes('text/html')) {
          const text = await res.text();
          if (!cancelled && text.trim().length > 0 && !text.trim().startsWith('<!')) {
            setRawContent(text);
          }
        }
      } catch {
        // Use bundled fallback text
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTerms();
    return () => {
      cancelled = true;
    };
  }, []);

  const parsed = useMemo(() => {
    return parseTermsDocument(rawContent);
  }, [rawContent]);

  return (
    <section className="py-12 sm:py-16 bg-[#001D31]/75 backdrop-blur-sm min-h-[75vh] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="p-16 rounded-2xl bg-[#00253e]/90 border border-[#003A5D] flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#E8E61A] animate-spin" />
            <p className="text-sm text-slate-300 font-medium">Loading Terms &amp; Conditions...</p>
          </div>
        ) : (
          <article className="rounded-2xl bg-[#00253e]/95 border border-[#003A5D] shadow-2xl overflow-hidden">
            {/* Document Header */}
            <header className="px-6 sm:px-10 py-8 bg-[#001D31]/80 border-b border-[#003A5D] space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#003A5D] border border-[#CA4D4E]/40 text-[11px] font-mono font-semibold text-[#E8E61A]">
                <FileText className="w-3.5 h-3.5" />
                <span>Legal &amp; Terms</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {parsed.title}
              </h1>
              {(parsed.effectiveDate || parsed.lastUpdated) && (
                <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono text-slate-300">
                  {parsed.effectiveDate && (
                    <div className="px-3 py-1.5 rounded-lg bg-[#00253e] border border-[#003A5D]">
                      <span className="text-slate-400">Effective Date: </span>
                      <span className="text-[#E8E61A] font-semibold">{parsed.effectiveDate}</span>
                    </div>
                  )}
                  {parsed.lastUpdated && (
                    <div className="px-3 py-1.5 rounded-lg bg-[#00253e] border border-[#003A5D]">
                      <span className="text-slate-400">Last Updated: </span>
                      <span className="text-[#E8E61A] font-semibold">{parsed.lastUpdated}</span>
                    </div>
                  )}
                </div>
              )}
            </header>

            {/* Document Body */}
            <div className="px-6 sm:px-10 py-8 space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-200">
              {parsed.blocks.map((block, idx) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      id={block.id}
                      className="scroll-mt-24 pt-6 first:pt-0 pb-2 text-xl sm:text-2xl font-bold text-white border-b border-[#003A5D]/80"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === 'subheading') {
                  return (
                    <h3
                      key={idx}
                      id={block.id}
                      className="scroll-mt-24 pt-4 text-base sm:text-lg font-semibold text-[#E8E61A]"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === 'meta') {
                  return (
                    <div
                      key={idx}
                      className="px-4 py-2.5 rounded-xl bg-[#001D31]/80 border border-[#003A5D] flex flex-wrap items-center gap-2 text-xs sm:text-sm"
                    >
                      <span className="font-mono font-semibold text-slate-300">
                        {block.label}:
                      </span>
                      <span className="text-white font-medium">
                        {block.value ? renderInlineLinks(block.value, onNavigatePrivacy) : null}
                      </span>
                    </div>
                  );
                }

                if (block.type === 'bullets' && block.items) {
                  return (
                    <ul key={idx} className="space-y-2 pl-5 list-disc marker:text-[#CA4D4E]">
                      {block.items.map((item, bIdx) => (
                        <li key={bIdx} className="text-slate-200 leading-relaxed">
                          {renderInlineLinks(item, onNavigatePrivacy)}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={idx} className="text-slate-200 leading-relaxed">
                    {block.text ? renderInlineLinks(block.text, onNavigatePrivacy) : null}
                  </p>
                );
              })}
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
