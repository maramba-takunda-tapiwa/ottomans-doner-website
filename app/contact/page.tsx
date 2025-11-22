import OpeningHours from '../../components/OpeningHours';
import Section from '../../components/Section';

export const metadata = { title: "Contact – Ottoman's Döner" };

export default function ContactPage() {
  return (
    <main className="luxury-container py-24 space-y-16">
      <Section index={0} className="max-w-2xl">
        <h1 className="font-serif text-5xl mb-6 heading-glow">Contact <span className="gold-text">Us</span></h1>
        <p className="text-luxuryGold/70 leading-relaxed">Reach out or visit us in Debrecen. We serve late; your cravings are welcome.</p>
      </Section>
      <Section index={1} className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-xl bg-luxuryMaroon/30 backdrop-blur border border-luxuryMaroon/40">
            <h2 className="font-serif text-2xl mb-4 gold-text heading-glow">Location</h2>
            <p className="text-sm text-luxuryGold/70">Péterfia u. 2, 4026<br/>Debrecen, Hungary</p>
            <p className="text-sm mt-4">Phone: 06 30 222 8755</p>
          </div>
          <div className="rounded-xl overflow-hidden aspect-video border border-luxuryMaroon/40">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.143706253014!2d21.622!3d47.5316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47470dc499999999%3A0x123456789abcdef!2sDebrecen!5e0!3m2!1sen!2shu!4v0000000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-luxuryMaroon/30 backdrop-blur border border-luxuryMaroon/40">
            <h2 className="font-serif text-2xl mb-4 gold-text heading-glow">Opening Hours</h2>
            <OpeningHours />
          </div>
          <div className="p-6 rounded-xl bg-luxuryMaroon/30 backdrop-blur border border-luxuryMaroon/40">
            <h2 className="font-serif text-2xl mb-4 gold-text heading-glow">Message</h2>
            <p className="text-xs text-luxuryGold/70 leading-relaxed">Online contact form coming soon. For now reach us by phone or visit in person.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
