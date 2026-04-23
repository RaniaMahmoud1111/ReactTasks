import { useState, useMemo } from "react";
import { ProductsProvider, useProducts } from "./context/ProductsContext";
import CategoryFilter from "./components/CategoryFilter";
import CardList from "./components/CardList";
import LoadingSkeleton from "./components/LoadingSkeleton";

function AppContent() {
  const { products, loading, error, usingFallback } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))].sort();
    return ["all", ...cats];
  }, [products]);

  // Filter products
  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1040] to-[#0d0d1f] text-white">
      {/* ── Header ── */}
      <header className="relative overflow-hidden border-b border-white/10">
        {/* Glow blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-700/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-10 w-64 h-64 bg-indigo-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-violet-300 tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Live from DummyJSON API
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
            Product Explorer
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Discover curated products across categories. Filter, explore, and expand details instantly.
          </p>

          {/* Search */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-md">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full pl-11 pr-5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 transition-all duration-200 backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-6">
        {/* Fallback notice */}
        {usingFallback && (
          <div className="mt-6 flex items-center gap-3 bg-amber-900/30 border border-amber-600/40 rounded-xl px-5 py-3 text-amber-300 text-sm">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>
              <strong>Offline mode:</strong> Showing mock data — API fetch failed ({error})
            </span>
          </div>
        )}

        {/* Category Filter */}
        {!loading && (
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={(cat) => {
              setActiveCategory(cat);
              setSearchQuery("");
            }}
          />
        )}

        {/* Stats bar */}
        {!loading && (
          <div className="flex items-center justify-between mb-6 text-sm text-slate-500 border-b border-white/5 pb-4">
            <span>
              Showing{" "}
              <span className="text-violet-400 font-semibold">{filtered.length}</span>{" "}
              of{" "}
              <span className="text-slate-400 font-semibold">{products.length}</span>{" "}
              products
            </span>
            <span>
              {activeCategory === "all"
                ? "All Categories"
                : activeCategory
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </div>
        )}

        {/* Content */}
        {loading ? <LoadingSkeleton /> : <CardList products={filtered} />}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-8 text-center text-slate-600 text-sm">
        <p>
          Data sourced from{" "}
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            DummyJSON
          </a>{" "}
          · Built with React & Tailwind CSS v4
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProductsProvider>
      <AppContent />
    </ProductsProvider>
  );
}
