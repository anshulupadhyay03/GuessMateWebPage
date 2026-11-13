import React, { useEffect, useMemo } from 'react';
import { FileText } from 'lucide-react';
import { PRIVACY_POLICY_TEXT } from '../data/privacyPolicy';

interface PrivacyPolicyPageProps {
  onBackHome?: () => void;
}

interface ParsedBlock {
  type: 'heading' | 'subheading' | 'paragraph' | 'bullets' | 'ordered' | 'meta';
  id?: string;
  text?: string;
  items?: string[];
  label?: string;
  value?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function renderInlineLinks(text: string): React.ReactNode {
  const tokenRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
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
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function parsePolicyDocument(rawText: string): {
  title: string;
  effectiveDate: string | null;
  lastUpdated: string | null;
  blocks: ParsedBlock[];
} {
  const normalized = rawText.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const lines = normalized.split('\n').map((l) => l.trim());

  let title = 'SIFT MATES – PRIVACY POLICY';
  let effectiveDate: string | null = null;
  let lastUpdated: string | null = null;

  const blocks: ParsedBlock[] = [];
  let currentBullets: string[] = [];
  let currentOrdered: string[] = [];
  let inOrderedSubsection = false;

  const flushLists = () => {
    if (currentBullets.length > 0) {
      blocks.push({ type: 'bullets', items: currentBullets });
      currentBullets = [];
    }
    if (currentOrdered.length > 0) {
      blocks.push({ type: 'ordered', items: currentOrdered });
      currentOrdered = [];
    }
  };

  lines.forEach((line, index) => {
    if (!line) {
      flushLists();
      return;
    }

    if (index === 0 && line.toUpperCase().includes('PRIVACY POLICY')) {
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

    // Bullet item
    if (line.startsWith('* ')) {
      if (currentOrdered.length > 0) {
        blocks.push({ type: 'ordered', items: currentOrdered });
        currentOrdered = [];
      }
      currentBullets.push(line.slice(2).trim());
      return;
    }

    // Roman numeral subheadings e.g. "I. Facebook Account:" or "II. Direct Deletion Request:"
    if (/^(I|II|III|IV|V|VI)\.\s+/.test(line)) {
      flushLists();
      inOrderedSubsection = true;
      blocks.push({ type: 'subheading', id: slugify(line), text: line });
      return;
    }

    // Ordered list step inside subsection or numbered sentence ending with punctuation / URL
    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch && (inOrderedSubsection || line.endsWith('.') || line.includes('http'))) {
      if (currentBullets.length > 0) {
        blocks.push({ type: 'bullets', items: currentBullets });
        currentBullets = [];
      }
      currentOrdered.push(orderedMatch[1].trim());
      return;
    }

    flushLists();

    // Subsection heading e.g. "2.1. Information Received Through Facebook"
    if (/^\d+\.\d+\.\s+/.test(line)) {
      inOrderedSubsection = false;
      const id = slugify(line);
      blocks.push({ type: 'subheading', id, text: line });
      return;
    }

    // Top-level heading e.g. "Introduction" or "1. General Information"
    if (line === 'Introduction' || /^\d+\.\s+/.test(line)) {
      inOrderedSubsection = false;
      const id = slugify(line);
      blocks.push({ type: 'heading', id, text: line });
      return;
    }

    inOrderedSubsection = false;

    // Metadata key-value lines inside sections
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

  flushLists();

  return { title, effectiveDate, lastUpdated, blocks };
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const parsed = useMemo(() => {
    return parsePolicyDocument(PRIVACY_POLICY_TEXT);
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-[#001D31]/75 backdrop-blur-sm min-h-[75vh] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="rounded-2xl bg-[#00253e]/95 border border-[#003A5D] shadow-2xl overflow-hidden">
          {/* Document Header */}
          <header className="px-6 sm:px-10 py-8 bg-[#001D31]/80 border-b border-[#003A5D] space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#003A5D] border border-[#CA4D4E]/40 text-[11px] font-mono font-semibold text-[#E8E61A]">
              <FileText className="w-3.5 h-3.5" />
              <span>Legal &amp; Privacy</span>
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
                      {block.value ? renderInlineLinks(block.value) : null}
                    </span>
                  </div>
                );
              }

              if (block.type === 'bullets' && block.items) {
                return (
                  <ul key={idx} className="space-y-2 pl-5 list-disc marker:text-[#CA4D4E]">
                    {block.items.map((item, bIdx) => (
                      <li key={bIdx} className="text-slate-200 leading-relaxed">
                        {renderInlineLinks(item)}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'ordered' && block.items) {
                return (
                  <ol key={idx} className="space-y-2 pl-5 list-decimal marker:text-[#E8E61A] marker:font-semibold">
                    {block.items.map((item, oIdx) => (
                      <li key={oIdx} className="text-slate-200 leading-relaxed">
                        {renderInlineLinks(item)}
                      </li>
                    ))}
                  </ol>
                );
              }

              return (
                <p key={idx} className="text-slate-200 leading-relaxed">
                  {block.text ? renderInlineLinks(block.text) : null}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
};
