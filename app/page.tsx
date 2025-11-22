'use client';
import AnimatedHero from '../components/AnimatedHero';
import FeaturedItems from '../components/FeaturedItems';
import OpeningHours from '../components/OpeningHours';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <main>
      <AnimatedHero />
      <ScrollReveal>
        <FeaturedItems />
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <Section index={0} className="py-24 luxury-container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-serif text-3xl mb-6 heading-glow" dangerouslySetInnerHTML={{ __html: t('home.about.title').replace('Street', '<span class="gold-text">Street</span>') }} />
            <p className="text-luxuryGold/70 leading-relaxed max-w-prose mb-6">{t('home.about.desc1')}</p>
            <p className="text-luxuryGold/60 leading-relaxed max-w-prose">{t('home.about.desc2')}</p>
          </div>
          <div className="rounded-xl p-6 bg-luxuryMaroon/30 backdrop-blur">
            <h3 className="font-serif text-xl mb-4 gold-text">{t('home.hours.title')}</h3>
            <OpeningHours />
          </div>
        </div>
        </Section>
      </ScrollReveal>
    </main>
  );
}
