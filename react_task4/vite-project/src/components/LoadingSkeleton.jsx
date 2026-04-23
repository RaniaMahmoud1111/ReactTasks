export default function LoadingSkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Image skeleton */}
          <div className="h-52 bg-white/10" />

          {/* Content skeleton */}
          <div className="p-5 flex flex-col gap-3">
            {/* Title */}
            <div className="h-4 bg-white/10 rounded-full w-4/5" />
            <div className="h-4 bg-white/10 rounded-full w-3/5" />

            {/* Stars */}
            <div className="h-3 bg-white/10 rounded-full w-1/3" />

            {/* Description */}
            <div className="h-3 bg-white/10 rounded-full w-full" />
            <div className="h-3 bg-white/10 rounded-full w-5/6" />
            <div className="h-3 bg-white/10 rounded-full w-4/6" />

            {/* Button */}
            <div className="h-5 bg-white/10 rounded-full w-24 mt-2" />
          </div>
        </div>
      ))}
    </section>
  );
}
