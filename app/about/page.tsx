'use client';
import Section from '../../components/Section';
import ScrollReveal from '../../components/ScrollReveal';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    { 
      title: 'Turkish Heritage', 
      text: 'Every recipe traces back to authentic Ottoman traditions. We source our spices from Turkey and honor centuries-old techniques in every preparation.'
    },
    { 
      title: 'Artisan Craft', 
      text: 'Slow-roasted meats for 6+ hours, hand-cut vegetables daily, and signature sauces made fresh. No shortcuts, just pure dedication.'
    },
    { 
      title: 'Late Night Soul', 
      text: 'Open until midnight because great food shouldn\'t have a curfew. We\'re here when you need us most.'
    }
  ];

  const story = [
    {
      title: 'Our Foundation',
      desc: 'Founded in Debrecen with a vision to bring authentic Turkish döner elevated to an art form.'
    },
    {
      title: 'Growing Community',
      desc: 'Built a loyal following of food lovers who appreciate quality and authenticity in every bite.'
    },
    {
      title: 'Today',
      desc: 'Proudly serving premium döner, dürüm, and curry wurst with unwavering passion and dedication.'
    }
  ];

  return (
    <main className="luxury-container py-24 space-y-32">
      {/* Hero Section */}
      <ScrollReveal>
        <Section index={0} className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl md:text-7xl mb-8 heading-glow"
          >
            Where <span className="gold-text">Tradition</span> Meets <span className="orange-text">Soul</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-luxuryGold/80 leading-relaxed max-w-3xl mx-auto"
          >
            Ottoman's Döner isn't just food—it's a celebration of Turkish culinary heritage wrapped in dark luxury aesthetics. We believe street food can be premium without losing its soul.
          </motion.p>
        </Section>
      </ScrollReveal>

      {/* Our Values */}
      <ScrollReveal delay={0.2}>
        <Section index={1}>
          <h2 className="font-serif text-4xl mb-12 text-center heading-glow">What We <span className="gold-text">Stand For</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-xl bg-luxuryMaroon/30 backdrop-blur border border-luxuryMaroon/40 hover:border-scorchedOrange/60 hover:shadow-xl hover:shadow-scorchedOrange/10 transition-all duration-300"
              >
                <h3 className="font-serif text-2xl mb-4 gold-text heading-glow">{value.title}</h3>
                <p className="text-luxuryGold/70 leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </ScrollReveal>

      {/* Our Journey */}
      <ScrollReveal delay={0.3}>
        <Section index={2} className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-16 text-center heading-glow">Our <span className="gold-text">Journey</span></h2>
          <div className="space-y-12">
            {story.map((milestone, i) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="p-6 rounded-xl bg-luxuryMaroon/20 backdrop-blur border border-luxuryMaroon/30"
              >
                <div>
                  <h3 className="font-serif text-2xl mb-3 gold-text">{milestone.title}</h3>
                  <p className="text-luxuryGold/70 leading-relaxed">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </ScrollReveal>

      {/* Philosophy */}
      <ScrollReveal delay={0.4}>
        <Section index={3} className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-8 heading-glow">Our <span className="gold-text">Philosophy</span></h2>
          <div className="space-y-6 text-lg text-luxuryGold/70 leading-relaxed">
            <p>
              Every plate should capture <span className="text-scorchedOrangeLight font-medium">contrast</span>: bright & smoky, crisp & tender, bold & subtle.
            </p>
            <p>
              We refine textures so each bite unfolds like a story. From the first crunch of fresh vegetables to the last savory note of slow-roasted meat.
            </p>
            <p className="text-xl text-luxuryGold/90 font-medium">
              Elevated comfort — accessible yet meticulously executed.
            </p>
          </div>
        </Section>
      </ScrollReveal>

      {/* Call to Action */}
      <ScrollReveal delay={0.5}>
        <Section index={4} className="text-center py-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/menu"
              className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-scorchedOrange to-scorchedOrangeLight text-white text-lg font-bold shadow-[0_0_30px_rgba(232,114,36,0.5)] hover:shadow-[0_0_40px_rgba(232,114,36,0.7)] transition-all duration-300"
            >
              Experience Our Menu
            </a>
          </motion.div>
        </Section>
      </ScrollReveal>
    </main>
  );
}
