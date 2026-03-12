"use client";

import { motion } from "framer-motion";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";

const footballPhotos = [
  "/images/DSC_8014.JPG",
  "/images/DSC_8046.JPG",
  "/images/DSC_8109.JPG",
  "/images/DSC_8136.JPG",
];

const bowlingPhotos = [
  "/images/2020-09-25(21).jpg",
  "/images/2020-09-25(22).jpg",
  "/images/2020-09-25(23).jpg",
  "/images/2020-09-25(24).jpg",
];

const lessons = [
  { title: "Discipline", desc: "Consistent practice, film study, and conditioning build character on and off the field." },
  { title: "Teamwork", desc: "Football taught me that individual talent only matters when it lifts the whole team." },
  { title: "Playbook Mastery", desc: "Memorizing complex plays as a second-language learner sharpened my focus and memory." },
  { title: "Resilience", desc: "Getting knocked down — and getting back up — is a skill I practice every season." },
];

export default function Athletics() {
  return (
    <section id="athletics" className="relative overflow-hidden" style={{ background: "#070d1a" }}>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

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
            On the Field
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-5">Athletics</h2>
          <div className="heading-bar" />
        </motion.div>

        {/* Football section - stacked center on mobile, side by side on lg */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center w-full lg:w-1/2 min-w-0"
          >
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-lg">
                🏈
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-white/90">American Football</h3>
                <p className="text-amber-400/70 text-xs font-mono">Freshman → Present &middot; #21 / #43</p>
              </div>
            </div>
            <div className="space-y-4">
              <EditableText
                id="ath-football-p1"
                fallback="I joined the football program my freshman year — a sport entirely new to me, in a country entirely new to me. Learning the game alongside the language was one of the most challenging and rewarding experiences of my life."
                as="p"
                className="text-slate-400 text-[15px] leading-[1.8]"
              />
              <EditableText
                id="ath-football-p2"
                fallback="Football demands more than physical strength. It demands mental clarity, precise communication, and trust in your teammates. Every practice, every game, and every weight room session has shaped who I am."
                as="p"
                className="text-slate-400 text-[15px] leading-[1.8]"
              />
              <EditableText
                id="ath-football-p3"
                fallback="Playing through varsity has developed my ability to lead by example, execute under pressure, and stay committed to a process even when results aren't immediate."
                as="p"
                className="text-slate-400 text-[15px] leading-[1.8]"
              />
            </div>
          </motion.div>

          {/* Photo grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-2 w-full max-w-md lg:w-1/2"
          >
            {footballPhotos.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <EditableImage
                  id={`ath-football-photo-${i}`}
                  fallbackSrc={src}
                  alt={`Football photo ${i + 1}`}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bowling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 mb-20 text-center"
          style={{ overflow: "hidden", wordBreak: "break-word" }}
        >
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg">
              🎳
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white/90">Bowling</h3>
              <p className="text-slate-500 text-xs font-mono">2 Seasons</p>
            </div>
          </div>
          <EditableText
            id="ath-bowling"
            fallback="Bowling taught me the power of individual consistency within a team context. Every frame is a fresh start — composure, technique, and mental focus matter above all. It's a sport where ego doesn't win; precision and patience do."
            as="p"
            className="text-slate-400 text-[15px] leading-[1.8] mb-5"
          />

          {/* Bowling photos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {bowlingPhotos.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <EditableImage
                  id={`ath-bowling-photo-${i}`}
                  fallbackSrc={src}
                  alt={`Bowling photo ${i + 1}`}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lessons grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h3 className="text-xl font-semibold text-white/90">What Sports Taught Me</h3>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {lessons.map((lesson, i) => (
            <motion.div
              key={lesson.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 group text-center min-w-0"
              style={{ overflow: "hidden", wordBreak: "break-word" }}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4 mx-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <EditableText
                id={`lesson-title-${i}`}
                fallback={lesson.title}
                as="h4"
                className="text-white/90 font-semibold text-sm mb-2"
              />
              <EditableText
                id={`lesson-desc-${i}`}
                fallback={lesson.desc}
                as="p"
                className="text-slate-500 text-[13px] leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        {/* Action gallery strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid grid-cols-3 md:grid-cols-6 gap-1.5 rounded-2xl overflow-hidden"
        >
          {[
            "/images/2020-09-25(1).jpg",
            "/images/2020-09-25(2).jpg",
            "/images/2020-09-25(3).jpg",
            "/images/2020-09-25(4).jpg",
            "/images/2020-09-25(5).jpg",
            "/images/2020-09-25(6).jpg",
          ].map((src, i) => (
            <div key={i} className="relative aspect-square group overflow-hidden rounded-lg">
              <EditableImage
                id={`ath-action-${i}`}
                fallbackSrc={src}
                alt={`Action ${i + 1}`}
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/10 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
