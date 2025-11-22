import { MENU } from '../../lib/menu';
import MenuCategory from '../../components/MenuCategory';
import Section from '../../components/Section';
import ScrollReveal from '../../components/ScrollReveal';

export const metadata = { title: "Menu – Ottoman's Döner" };

export default function MenuPage() {
  return (
    <main className="luxury-container py-24 space-y-16">
      <ScrollReveal>
        <header className="max-w-2xl">
        <h1 className="font-serif text-5xl mb-6 heading-glow"><span className="gold-text">Our</span> Menu</h1>
        <p className="text-luxuryGold/70 leading-relaxed">Crafted selection blending Turkish tradition and elevated street gastronomy. Placeholder pricing & items ready for refinement.</p>
        </header>
      </ScrollReveal>
      {MENU.map((cat, i) => (
        <ScrollReveal key={cat.key} delay={i * 0.1}>
          <Section index={i}>
            <MenuCategory category={cat} />
          </Section>
        </ScrollReveal>
      ))}
    </main>
  );
}
