import { motion } from 'framer-motion';
import CursorRobot from './CursorRobot';

export default function About() {
  return (
    <section
      id="expertise"
      aria-label="About"
      className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-24 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
      >
        <div>
          <p className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-amber-brand">
            Philosophy
          </p>

          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.04em] text-chalk">
            Code &amp; Craft
          </h2>

          <p className="mt-6 max-w-[52ch] font-sans text-[15px] leading-[1.75] text-chalk-dim">
            I treat software as a craft: clear structure, readable systems, and interfaces that
            stay out of the way. From APIs to UIs, the goal is reliable delivery without
            unnecessary complexity.
          </p>
          <p className="mt-4 max-w-[52ch] font-sans text-[15px] leading-[1.75] text-chalk-dim">
            I'm currently pursuing an M.Sc in Computer Science &amp; Engineering, extending my
            full-stack work toward applied machine learning — models that move from experiment
            to deployment alongside a real web stack.
          </p>
        </div>

        <CursorRobot />
      </motion.div>
    </section>
  );
}
