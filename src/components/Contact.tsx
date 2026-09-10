import { motion } from 'framer-motion';

const socials = [
  { label: 'GitHub', href: 'https://github.com/rahmanmostafijur' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mostafijemon00' },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-amber-brand">
          Contact
        </p>
        <h1 className="max-w-[16ch] font-display text-[clamp(2.25rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em] text-chalk">
          Let's build something <span className="text-amber-brand">great</span>
        </h1>
      </motion.div>

      <motion.a
        href="mailto:mustafiz.emon194@gmail.com"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 inline-block border-b border-white/20 pb-2 font-display text-[clamp(1.15rem,2.8vw,1.9rem)] font-bold tracking-[-0.02em] text-chalk transition-colors duration-300 hover:border-amber-brand hover:text-amber-brand"
      >
        mustafiz.emon194@gmail.com
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div className="rounded-2xl border border-white/8 bg-ink-700/60 p-6">
          <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-chalk-faint">
            Social
          </p>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 font-sans text-[15px] text-chalk transition-colors duration-300 hover:text-amber-brand"
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        <div className="rounded-2xl border border-white/8 bg-ink-700/60 p-6">
          <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-chalk-faint">
            Availability
          </p>
          <p className="font-sans text-[15px] text-chalk-dim">
            Open to freelance &amp; collaborations
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-ink-700/60 p-6">
          <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-chalk-faint">
            Location
          </p>
          <p className="font-sans text-[15px] text-chalk-dim">Dhaka, Bangladesh</p>
        </div>
      </motion.div>
    </section>
  );
}
