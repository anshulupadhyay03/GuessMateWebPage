import React, { useState } from 'react';
import { CATEGORIES_DATA, PUZZLE_ITEMS_BY_CATEGORY } from '../data/categories';
import { Search, Layers, HelpCircle } from 'lucide-react';

export const CategoryLibraryExplorer: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState(CATEGORIES_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = CATEGORIES_DATA.find(c => c.id === selectedCatId) || CATEGORIES_DATA[0];
  const activeItems = PUZZLE_ITEMS_BY_CATEGORY[selectedCatId] || [];

  return (
    <section id="categories" className="py-20 bg-[#001D31] border-t border-[#003A5D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#003A5D] border border-[#CA4D4E]/40 text-xs font-semibold text-[#E8E61A]">
            <Layers className="w-3.5 h-3.5 text-[#E8E61A]" />
            <span>Dataset Repository</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Entity Domains
          </h2>
          <p className="text-base text-slate-200">
            Select from hundreds of structured category datasets. Both opponents operate on identical candidate pools for symmetric competition.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="mt-12 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCatId === cat.id
                  ? 'bg-[#CA4D4E] text-white border-[#CA4D4E] shadow-md'
                  : 'bg-[#00253e] text-slate-300 hover:text-white border-[#003A5D] hover:border-[#CA4D4E]/40'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Feature Card */}
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-[#00253e] border border-[#003A5D] space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#003A5D]">
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl font-bold text-white">{activeCategory.name}</h3>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold bg-[#001D31] text-[#E8E61A] border border-[#003A5D]">
                  {activeCategory.itemCount}+ Entities
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{activeCategory.description}</p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#001D31] border border-[#003A5D] rounded-xl text-xs text-white focus:outline-none focus:border-[#CA4D4E]"
              />
            </div>
          </div>

          {/* Candidate Grid */}
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-3">
              Sample Candidate Pool ({activeCategory.name}):
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {activeItems
                .filter(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#001D31] border border-[#003A5D] text-xs font-semibold text-slate-100 text-center font-mono hover:border-[#CA4D4E]/40 transition-all"
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>

          {/* Strategic Questions Tips */}
          <div className="pt-4 border-t border-[#003A5D]">
            <p className="text-[11px] font-semibold text-[#E8E61A] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#E8E61A]" />
              <span>Optimal Strategic Inquiry Lines for {activeCategory.name}:</span>
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {activeCategory.popularQuestions.map((q, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#001D31] border border-[#003A5D] text-slate-200 font-medium"
                >
                  "{q}"
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
