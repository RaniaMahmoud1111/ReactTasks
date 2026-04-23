export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <section className="w-full py-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide
                transition-all duration-300 ease-in-out cursor-pointer
                border border-transparent
                ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 scale-105"
                    : "bg-white/10 text-slate-300 border-white/20 hover:bg-white/20 hover:text-white hover:scale-105 hover:shadow-md"
                }
              `}
            >
              {cat === "all"
                ? "✦ All"
                : cat
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          );
        })}
      </div>
    </section>
  );
}
