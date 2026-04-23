import { useState } from "react";

function StarRating({ rating }) {
  const stars = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= stars ? "text-amber-400" : "text-slate-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-400 ml-1">({rating?.toFixed(1)})</span>
    </div>
  );
}

export default function CardItem({ product }) {
  const [expanded, setExpanded] = useState(false);

  const shortDesc =
    product.description?.length > 100
      ? product.description.slice(0, 100) + "..."
      : product.description;

  const categoryLabel = product.category
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <article
      className="
        group relative flex flex-col bg-white/5 border border-white/10
        rounded-2xl overflow-hidden
        transition-all duration-400 ease-in-out
        hover:bg-white/10 hover:border-violet-500/40
        hover:shadow-2xl hover:shadow-violet-900/30
        hover:-translate-y-1 hover:scale-[1.02]
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-gradient-to-br from-slate-800 to-slate-900">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x300/1e1b4b/a5b4fc?text=${encodeURIComponent(product.title?.slice(0, 12) || "Product")}`;
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-violet-600/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-violet-400/30">
          {categoryLabel}
        </span>

        {/* Price badge */}
        {product.price && (
          <span className="absolute top-3 right-3 bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors duration-300">
          {product.title}
        </h3>

        {product.rating && <StarRating rating={product.rating} />}

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed transition-all duration-300">
          {expanded ? product.description : shortDesc}
        </p>

        {/* Show More / Less */}
        {product.description?.length > 100 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="
              mt-auto self-start flex items-center gap-1.5
              text-violet-400 hover:text-violet-300
              text-xs font-semibold tracking-wide
              transition-all duration-200
              group/btn
            "
          >
            <span>{expanded ? "Show Less" : "Show More"}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}
