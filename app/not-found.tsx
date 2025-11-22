export default function NotFound() {
  return (
    <div className="luxury-container py-32 text-center space-y-6">
      <h1 className="font-serif text-5xl heading-glow">404</h1>
      <p className="text-luxuryGold/70">The page you seek has been carved too thin or never roasted.</p>
      <a href="/" className="px-6 py-3 rounded-full bg-scorchedOrange text-white text-sm hover:bg-scorchedOrangeLight transition">Return Home</a>
    </div>
  );
}