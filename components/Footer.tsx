"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EditableText from "./EditableText";
import { useEdit } from "./EditProvider";

const EDIT_CODE = "enzo2027";

export default function Footer() {
  const { editing, setEditing } = useEdit();
  const [showPrompt, setShowPrompt] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUnlock = () => {
    if (code === EDIT_CODE) {
      setEditing(true);
      setShowPrompt(false);
      setCode("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <footer className="relative py-16 px-6 bg-[#050a14] border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={scrollToTop}
              className="text-2xl font-semibold tracking-tight mb-3 hover:opacity-80 transition-opacity"
            >
              <span className="text-amber-400">Enzo</span>
              <span className="text-white/90 ml-1">De Paulo</span>
            </button>

            <EditableText
              id="footer-tagline"
              fallback="Athlete · Maker · Engineer-in-the-Making"
              as="p"
              className="text-slate-500 text-sm mb-1"
            />
            <p className="text-slate-600 text-xs mb-8">
              Class of 2027 &middot; Libertyville High-school - Illinois
            </p>

            <div className="w-12 h-px bg-white/[0.06] mx-auto mb-8" />

            <div className="flex items-center gap-3">
              <p className="text-slate-600 text-xs">
                &copy; {new Date().getFullYear()} Enzo De Paulo
              </p>

              {/* Discreet edit gear icon */}
              {!editing && (
                <button
                  onClick={() => setShowPrompt(true)}
                  className="text-slate-700 hover:text-slate-500 transition-colors"
                  aria-label="Admin"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Code verification modal */}
      {showPrompt && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => {
            setShowPrompt(false);
            setCode("");
            setError(false);
          }}
        >
          <div
            className="glass-card p-6 w-full max-w-xs mx-4"
            style={{ background: "rgba(5,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/80 text-sm font-medium mb-4 text-center">
              Enter access code
            </p>
            <input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUnlock();
              }}
              placeholder="Code"
              autoFocus
              className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors text-center tracking-widest"
            />
            {error && (
              <p className="text-red-400/80 text-xs mt-2 text-center">
                Incorrect code
              </p>
            )}
            <button
              onClick={handleUnlock}
              className="w-full mt-3 px-4 py-2 bg-amber-400 text-[#050a14] text-sm font-semibold rounded-lg hover:bg-amber-300 transition-colors"
            >
              Unlock
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
