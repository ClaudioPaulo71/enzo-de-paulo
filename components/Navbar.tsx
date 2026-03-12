"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const links = [
  { href: "#about", label: "About" },
  { href: "#athletics", label: "Athletics" },
  { href: "#academic", label: "Academic" },
  { href: "#calendar", label: "Agenda" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Track active section
      const sections = links.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050a14]/80 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLink("#hero");
          }}
          className="text-lg font-semibold tracking-tight group"
        >
          <span className="text-amber-400 transition-colors group-hover:text-amber-300">
            Enzo
          </span>
          <span className="text-white/90 ml-1">De Paulo</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = activeSection === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLink(l.href);
                }}
                className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg ${
                  isActive
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <div className="w-px h-5 bg-white/10 mx-2" />
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              handleLink("#gallery");
            }}
            className="px-4 py-1.5 text-[13px] font-medium text-amber-400 border border-amber-400/30 rounded-full hover:bg-amber-400/10 transition-all duration-200"
          >
            Portfolio
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#050a14]/95 backdrop-blur-xl border-t border-white/[0.04]"
          >
            <nav className="flex flex-col px-6 py-5 gap-1">
              {links.map((l, i) => {
                const isActive = activeSection === l.href.slice(1);
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLink(l.href);
                    }}
                    className={`text-[15px] font-medium transition-colors py-3 px-3 rounded-lg ${
                      isActive
                        ? "text-amber-400 bg-amber-400/10"
                        : "text-slate-300 hover:text-amber-400 hover:bg-white/[0.04]"
                    }`}
                  >
                    {l.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
