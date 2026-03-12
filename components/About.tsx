"use client";

import { motion } from "framer-motion";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";

const timeline = [
  { year: "2007", label: "Born in Brazil", desc: "Grew up immersed in Brazilian culture, curiosity, and family values." },
  { year: "2019", label: "Moved to Illinois", desc: "Arrived in the middle of 6th grade without speaking English — a true leap of faith." },
  { year: "2020", label: "First Season on the Field", desc: "Joined the football program, learning a new sport alongside a new language." },
  { year: "2022", label: "Found His Craft", desc: "Discovered a passion for hands-on technical work: electronics, woodworking, and mechanics." },
  { year: "2024", label: "Junior Year", desc: "Honors courses, varsity sports, AP Computer Science — building the foundation for engineering school." },
  { year: "2027", label: "Next Chapter", desc: "Targeting top engineering programs across the U.S." },
];

const stats = [
  { value: "3.6", label: "GPA" },
  { value: "4+", label: "Sports Seasons" },
  { value: "7+", label: "Technical Electives" },
];

export default function About() {
  return (
    <section id="about" className="bg-[#050a14] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-400/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-amber-400/80 text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Who I Am
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-5">My Story</h2>
          <div className="heading-bar" />
        </motion.div>

        {/* Bio block - stacked on mobile, side by side on desktop */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16 mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md flex-shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] glow">
              <EditableImage
                id="about-portrait"
                fallbackSrc="/images/DSC_4768.JPG"
                alt="Enzo De Paulo"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/50 to-transparent" />
              <div className="absolute inset-3 border border-white/10 rounded-xl pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 text-center min-w-0"
          >
            <EditableText
              id="about-p1"
              fallback="I moved from Brazil to Illinois in the middle of 6th grade — no English, no friends, no playbook. But I had something more important: patience and a belief that every obstacle is an opportunity in disguise."
              as="p"
              className="text-slate-400 text-[15px] leading-[1.8]"
            />
            <EditableText
              id="about-p2"
              fallback="I learned English not in a classroom, but on a football field, in a workshop, and through every interaction that pushed me beyond my comfort zone. That experience taught me how to adapt quickly, stay calm under pressure, and never stop learning."
              as="p"
              className="text-slate-400 text-[15px] leading-[1.8]"
            />
            <EditableText
              id="about-p3"
              fallback="Today, I combine the discipline of an athlete with the curiosity of a maker. Whether I'm memorizing a playbook, building a project in the shop, or diving into Computer Science — I bring the same focus: do the work, improve every day, and embrace the process."
              as="p"
              className="text-slate-400 text-[15px] leading-[1.8]"
            />

            <div className="grid grid-cols-3 gap-3 mt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card-accent text-center p-4 min-w-0"
                  style={{ overflow: "hidden", wordBreak: "break-word" }}
                >
                  <EditableText
                    id={`stat-${stat.label}`}
                    fallback={stat.value}
                    as="div"
                    className="text-xl font-bold text-amber-400"
                  />
                  <div className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline - vertical centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h3 className="text-xl font-semibold text-white/90">My Journey</h3>
        </motion.div>

        <div className="relative max-w-xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/30 via-amber-400/10 to-transparent" />

          <div className="flex flex-col gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex items-start gap-5 pl-14"
              >
                {/* Dot */}
                <div className="absolute left-6 top-5 w-2.5 h-2.5 bg-amber-400 rounded-full -translate-x-1/2 ring-[3px] ring-amber-400/10 z-10" />

                {/* Card */}
                <div
                  className="glass-card p-5 w-full min-w-0 text-center"
                  style={{ overflow: "hidden", wordBreak: "break-word" }}
                >
                  <EditableText
                    id={`timeline-year-${i}`}
                    fallback={item.year}
                    as="span"
                    className="text-amber-400/80 font-mono text-xs"
                  />
                  <EditableText
                    id={`timeline-label-${i}`}
                    fallback={item.label}
                    as="h4"
                    className="text-white/90 font-semibold text-sm mt-1"
                  />
                  <EditableText
                    id={`timeline-desc-${i}`}
                    fallback={item.desc}
                    as="p"
                    className="text-slate-500 text-[13px] mt-1 leading-relaxed"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
