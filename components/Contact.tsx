"use client";

import { motion } from "framer-motion";
import EditableText from "./EditableText";

const EMAIL = "enzopaulo0709@gmail.com";
const PHONE = "224-818-8210";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#050a14] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400/80 text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-5">Contact</h2>
          <div className="heading-bar" />
          <EditableText
            id="contact-subtitle"
            fallback="Interested in connecting? Feel free to reach out through any of the channels below."
            as="p"
            className="text-slate-400 text-[15px] mt-6 max-w-lg mx-auto"
          />
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {/* Email */}
          <motion.a
            href={`mailto:${EMAIL}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card p-6 text-center group hover:border-amber-400/20 transition-colors min-w-0"
            style={{ overflow: "hidden", wordBreak: "break-word" }}
          >
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
            </div>
            <h3 className="text-white/90 font-semibold text-sm mb-2">Email</h3>
            <p className="text-amber-400/80 text-xs">Send me an email</p>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/1${PHONE.replace(/-/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="glass-card p-6 text-center group hover:border-green-400/20 transition-colors min-w-0"
            style={{ overflow: "hidden", wordBreak: "break-word" }}
          >
            <div className="w-12 h-12 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-400/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3 className="text-white/90 font-semibold text-sm mb-2">WhatsApp</h3>
            <p className="text-green-400/80 text-xs">Message me</p>
          </motion.a>

          {/* SMS */}
          <motion.a
            href={`sms:+1${PHONE.replace(/-/g, "")}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="glass-card p-6 text-center group hover:border-blue-400/20 transition-colors min-w-0"
            style={{ overflow: "hidden", wordBreak: "break-word" }}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-400/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <h3 className="text-white/90 font-semibold text-sm mb-2">SMS</h3>
            <p className="text-blue-400/80 text-xs">Send a text</p>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
