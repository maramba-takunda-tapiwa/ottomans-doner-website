export const metadata = { title: "Admin – Ottoman's Döner" };

export default function AdminPage() {
  return (
    <main className="luxury-container py-24 max-w-3xl">
      <h1 className="font-serif text-5xl mb-8 heading-glow">Admin <span className="gold-text">Panel</span></h1>
      <div className="p-8 rounded-xl bg-luxuryMaroon/30 backdrop-blur border border-luxuryMaroon/40">
        <p className="text-luxuryGold/70 leading-relaxed mb-6">Placeholder interface for future secured management panel. Intended features: menu editing, opening hours overrides, promotional banners, image asset updates.</p>
        <div className="grid gap-4 md:grid-cols-3 text-xs">
          {['Login', 'Menu Editor', 'Hours Control', 'Orders', 'Promotions', 'Users'].map(label => (
            <div key={label} className="p-4 rounded-lg bg-luxuryBlack/40 border border-luxuryMaroon/40 text-center">{label}</div>
          ))}
        </div>
        <p className="text-xs mt-6 opacity-60">Authentication & role-based access forthcoming.</p>
      </div>
    </main>
  );
}
