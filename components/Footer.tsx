import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-luxuryMaroon/40 bg-luxuryBlack/95">
      <div className="luxury-container py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <h3 className="font-serif text-lg gold-text mb-3 heading-glow">Ottoman's Döner</h3>
          <p className="text-luxuryGold/70 leading-relaxed">Debrecen's destination for premium Döner, artisanal fries & iconic curry wurst. Dark luxury meets classic Turkish heritage.</p>
        </div>
        <div>
          <h4 className="uppercase tracking-wider text-xs gold-text mb-3">Navigate</h4>
          <ul className="space-y-2">
            {['/','/menu','/about','/contact','/admin'].map(href => (
              <li key={href}><Link href={href} className="hover:text-luxuryGold transition-colors">{href === '/' ? 'Home' : href.replace('/','').replace('-', ' ')}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="uppercase tracking-wider text-xs gold-text mb-3">Contact</h4>
          <p>Address: Péterfia u. 2, 4026 Debrecen</p>
          <p>Phone: 06 30 222 8755</p>
          <p className="mt-3 text-luxuryGold/70">Open late for night cravings.</p>
        </div>
      </div>
      <div className="text-center py-4 text-xs border-t border-luxuryMaroon/40">© {new Date().getFullYear()} Ottoman's Döner. All rights reserved.</div>
    </footer>
  );
}
export default Footer;
