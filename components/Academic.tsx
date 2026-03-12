"use client";

import { motion } from "framer-motion";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";

const coursework = [
  {
    area: "Sciences",
    courses: ["Biology", "Earth Science", "Chemistry", "Physics (upcoming)"],
  },
  {
    area: "Mathematics",
    courses: ["Algebra 1", "Geometry", "Algebra 2", "Statistics & Pre-Calculus (upcoming)"],
  },
  {
    area: "History & Social Studies",
    courses: ["Honors Geography", "Honors U.S. History", "Government & Personal Finance (upcoming)"],
  },
  {
    area: "English & Humanities",
    courses: ["English 3", "English 4 Honors", "American Literature", "Philosophy Through Film & Classic Literature (upcoming)"],
  },
];

const courseworkPhotos = [
  "/images/2020-09-25(7).jpg",
  "/images/2020-09-25(8).jpg",
  "/images/2020-09-25(9).jpg",
  "/images/2020-09-25(10).jpg",
];

const electivePhotos = [
  "/images/2020-09-25(11).jpg",
  "/images/2020-09-25(12).jpg",
  "/images/2020-09-25(13).jpg",
  "/images/2020-09-25(14).jpg",
];

const technicalElectives = [
  { name: "Electronics", icon: "⚡", desc: "Circuit design, soldering, and hands-on electrical systems." },
  { name: "Mechanics", icon: "🔧", desc: "Engine fundamentals, tools, and mechanical problem-solving." },
  { name: "Woodworking", icon: "🪵", desc: "Precision cutting, joinery, and building functional structures." },
  { name: "Culinary Arts", icon: "🍳", desc: "Discipline, measurement, and creativity in the kitchen." },
  { name: "Photography Darkroom", icon: "📷", desc: "Analog photography, chemical developing, and visual composition." },
  { name: "Sports Marketing", icon: "📊", desc: "Business strategy, branding, and marketing in the sports industry." },
  { name: "AP Computer Science", icon: "💻", desc: "Algorithms, data structures, and object-oriented programming. Upcoming." },
  { name: "Weight Room / PE", icon: "🏋️", desc: "Consistent strength training integrated with athletic program." },
];

export default function Academic() {
  return (
    <section id="academic" className="bg-[#050a14] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-amber-400/[0.015] rounded-full blur-[120px] pointer-events-none" />

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
            In the Classroom &amp; the Workshop
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-5">
            Academic &amp; Technical
          </h2>
          <div className="heading-bar" />
        </motion.div>

        {/* GPA + intro - stacked center on mobile, side by side on lg */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16 mb-28">
          {/* Image first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] glow w-full max-w-md flex-shrink-0 order-1 lg:order-2"
          >
            <EditableImage
              id="acad-portrait"
              fallbackSrc="/images/DSC_4851.JPG"
              alt="Enzo academic"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/50 to-transparent" />
            <div className="absolute inset-3 border border-white/10 rounded-xl pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center w-full lg:w-1/2 min-w-0 order-2 lg:order-1"
          >
            <div className="space-y-5 mb-8">
              <EditableText
                id="acad-p1"
                fallback="My academic profile reflects a deliberate focus on STEM, technical skills, and the kind of hands-on learning that bridges theory and practice."
                as="p"
                className="text-slate-400 text-[15px] leading-[1.8]"
              />
              <EditableText
                id="acad-p2"
                fallback="I don't just study engineering concepts — I apply them. From wiring circuits in Electronics class to diagnosing engines in Mechanics, every technical elective has deepened my understanding of how things work and how to make them better."
                as="p"
                className="text-slate-400 text-[15px] leading-[1.8]"
              />
              <EditableText
                id="acad-p3"
                fallback="Taking honors courses as a non-native English speaker required double the effort and taught me that persistence always outperforms natural talent."
                as="p"
                className="text-slate-400 text-[15px] leading-[1.8]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div
                className="glass-card-accent text-center p-4 min-w-0"
                style={{ overflow: "hidden", wordBreak: "break-word" }}
              >
                <EditableText
                  id="acad-gpa"
                  fallback="3.6"
                  as="div"
                  className="text-2xl font-bold text-amber-400"
                />
                <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">GPA</div>
              </div>
              <div
                className="glass-card text-center p-4 min-w-0"
                style={{ overflow: "hidden", wordBreak: "break-word" }}
              >
                <EditableText
                  id="acad-honors"
                  fallback="Honors"
                  as="div"
                  className="text-2xl font-bold text-white/80"
                />
                <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Multiple</div>
              </div>
              <div
                className="glass-card text-center p-4 min-w-0"
                style={{ overflow: "hidden", wordBreak: "break-word" }}
              >
                <EditableText
                  id="acad-ap"
                  fallback="AP"
                  as="div"
                  className="text-2xl font-bold text-white/80"
                />
                <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">CS Next Year</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core coursework */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-white/90 text-center mb-10"
        >
          Core Coursework
        </motion.h3>

        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {coursework.map((area, i) => (
            <motion.div
              key={area.area}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-6 text-center min-w-0"
              style={{ overflow: "hidden", wordBreak: "break-word" }}
            >
              <h4 className="text-white/80 font-semibold text-sm mb-4">
                {area.area}
              </h4>
              <ul className="space-y-2.5 inline-block text-left">
                {area.courses.map((course) => (
                  <li key={course} className="flex items-start gap-2.5 text-[13px] text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0 mt-[7px]" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Core Coursework Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-28"
        >
          {courseworkPhotos.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
              <EditableImage
                id={`acad-cw-photo-${i}`}
                fallbackSrc={src}
                alt={`Coursework photo ${i + 1}`}
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Technical electives */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-white/90 text-center mb-10"
        >
          Technical Electives
        </motion.h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {technicalElectives.map((el, i) => (
            <motion.div
              key={el.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card p-5 group text-center min-w-0"
              style={{ overflow: "hidden", wordBreak: "break-word" }}
            >
              <div className="text-2xl mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                {el.icon}
              </div>
              <EditableText
                id={`tech-name-${i}`}
                fallback={el.name}
                as="h4"
                className="text-white/80 font-semibold text-sm mb-2"
              />
              <EditableText
                id={`tech-desc-${i}`}
                fallback={el.desc}
                as="p"
                className="text-slate-500 text-[12px] leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        {/* Technical Electives Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {electivePhotos.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
              <EditableImage
                id={`acad-te-photo-${i}`}
                fallbackSrc={src}
                alt={`Elective photo ${i + 1}`}
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
