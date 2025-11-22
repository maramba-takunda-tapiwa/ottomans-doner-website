export default function LoadingMenu() {
  return (
    <div className="luxury-container py-24 space-y-8" aria-busy="true" aria-live="polite">
      <div className="h-12 w-64 bg-luxuryMaroon/30 rounded animate-pulse" />
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl bg-luxuryMaroon/30 border border-luxuryMaroon/40 animate-pulse space-y-4">
            <div className="h-6 w-40 bg-luxuryBlack/40 rounded" />
            <div className="h-4 w-full bg-luxuryBlack/40 rounded" />
            <div className="h-4 w-5/6 bg-luxuryBlack/40 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}