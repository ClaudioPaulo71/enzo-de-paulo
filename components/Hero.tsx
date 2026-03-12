"use client";

import { motion } from "framer-motion";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ padding: 0 }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <EditableImage
          id="hero-bg"
          fallbackSrc="/images/DSC_4724.JPG"
          alt="Enzo De Paulo"
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/40 via-[#050a14]/60 to-[#050a14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a14]/30 via-transparent to-[#050a14]/30" />
      </div>

      <div className="absolute inset-0 z-[1] dot-grid opacity-40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <EditableText
              id="hero-badge"
              fallback="Class of 2027 · Libertyville High-school - Illinois"
              as="span"
              className="text-amber-400/90 text-xs font-medium tracking-wide"
            />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6">
            <EditableText
              id="hero-name-1"
              fallback="Enzo"
              as="span"
              className="text-gradient block"
            />
            <EditableText
              id="hero-name-2"
              fallback="De Paulo"
              as="span"
              className="text-gradient block"
            />
          </h1>

          <EditableText
            id="hero-subtitle"
            fallback="From Brazil to Illinois — driven by curiosity, shaped by discipline, and ready to build what's next."
            as="p"
            className="text-base md:text-lg text-slate-400 font-light max-w-lg mx-auto leading-relaxed text-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() => scrollTo("about")}
            className="group px-6 py-2.5 bg-amber-400 text-[#050a14] font-semibold rounded-full hover:bg-amber-300 transition-all duration-300 text-sm tracking-wide inline-flex items-center justify-center gap-2"
          >
            My Story
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo("gallery")}
            className="px-6 py-2.5 border border-white/10 text-slate-300 font-medium rounded-full hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 text-sm tracking-wide"
          >
            View Gallery
          </button>
        </motion.div>

      </div>
    </section>
  );
}
