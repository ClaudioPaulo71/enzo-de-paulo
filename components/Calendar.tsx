"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditableText from "./EditableText";
import { useEdit } from "./EditProvider";

interface Visit {
  id: string;
  university: string;
  date: string;
  logo: string;
  notes: string;
  visitUrl: string;
  scholarship: string;
  chance: string;
}

const defaultVisits: Visit[] = [
  {
    id: "v1",
    university: "Oklahoma State University",
    date: "",
    logo: "/images/logos/Oklahoma_State_University_system_logo.svg.png",
    notes: "Weekday tours Mon-Fri at 9 AM, Fridays also at 2 PM. Plan for half day.",
    visitUrl: "https://orange.okstate.edu/portal/campus-visits",
    scholarship: "$10,500/yr automatic merit scholarship",
    chance: "Guaranteed",
  },
  {
    id: "v2",
    university: "University of Arkansas",
    date: "",
    logo: "/images/logos/University_of_Arkansas_seal.svg.png",
    notes: "NRTA: 80% discount on out-of-state differential (~$15k/yr savings)",
    visitUrl: "https://applyundergrad.uark.edu/portal/visit",
    scholarship: "Non-Resident Tuition Award (~$15,000/yr)",
    chance: "High",
  },
  {
    id: "v3",
    university: "Kansas State University",
    date: "",
    logo: "/images/logos/Kansas_State_University_seal.svg.png",
    notes: "Engineering-specific visits available. Wildcat Nonresident Award.",
    visitUrl: "https://apply2.ksu.edu/portal/campus-visit?tab=eng-visits",
    scholarship: "60% out-of-state discount (~$10,600/yr)",
    chance: "Guaranteed",
  },
  {
    id: "v4",
    university: "Tennessee Tech University",
    date: "",
    logo: "/images/logos/Tennessee_Technological_University_seal.svg.png",
    notes: "VIP Campus Visit. Excellent regional reputation, very low cost of living.",
    visitUrl: "https://apply.tntech.edu/portal/vip-campus-visit",
    scholarship: "Presidential Scholars $4,000/yr",
    chance: "Guaranteed",
  },
  {
    id: "v5",
    university: "Auburn University",
    date: "",
    logo: "/images/logos/Auburn_University_seal.svg.png",
    notes: "Elite for Aerospace & Defense in the South. Competitive merit scholarships.",
    visitUrl: "https://apply.auburn.edu/portal/events?tab=dashboard",
    scholarship: "Competitive (need 29+ ACT for auto $7k)",
    chance: "Target",
  },
  {
    id: "v6",
    university: "Rose-Hulman Institute",
    date: "",
    logo: "/images/logos/Rose–Hulman_Institute_of_Technology_seal.svg.png",
    notes: "#1 undergrad engineering. Daily visits Mon-Fri include admissions session, tour & lunch.",
    visitUrl: "https://admissions.rose-hulman.edu/portal/CampusVisits2",
    scholarship: "Personalized merit aid (private institution)",
    chance: "Competitive",
  },
  {
    id: "v7",
    university: "Clemson University",
    date: "",
    logo: "/images/logos/Clemson_University_Seal.svg.png",
    notes: "Strong with BMW & East Coast industries. Avg ACT entry 28+.",
    visitUrl: "https://admissions.clemson.edu/portal/campusvisit",
    scholarship: "Difficult with ACT 25",
    chance: "Reach",
  },
  {
    id: "v8",
    university: "Purdue University",
    date: "",
    logo: "/images/logos/Purdue_University_seal.svg.png",
    notes: "Top engineering program. Very competitive for Computer Engineering (ACT 30+).",
    visitUrl: "https://admissions.purdue.edu/visit/prospective-student-experiences/?order=ASC&orderby=meta_value&paged=1&custom_post_type=visit_experiences&Activity=tour&Event=in-person&Schedule=partial-day&Student=transfer&visit-location=west-lafayette",
    scholarship: "Limited for out-of-state",
    chance: "Reach",
  },
  {
    id: "v9",
    university: "Texas A&M University",
    date: "",
    logo: "/images/logos/Texas_A&M_University_seal.svg.png",
    notes: "Aggie Network is legendary. NASA, Tesla, Dell recruit on campus. In-State Waiver possible with $4k+ merit.",
    visitUrl: "https://recruiter.tamu.edu/portal/campus_visit",
    scholarship: "In-State Waiver saves $27k+/yr with $4k merit",
    chance: "Target / Reach",
  },
];

function formatDate(dateStr: string): string {
  if (!dateStr) return "TBD";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntil(dateStr: string): number {
  if (!dateStr) return 999;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T12:00:00");
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function chanceColor(chance: string): string {
  // Keeping this function around in case they want it later, but we will remove it from the UI.
  if (chance.toLowerCase().includes("guaranteed")) return "text-green-400 bg-green-400/10 border-green-400/20";
  if (chance.toLowerCase().includes("high")) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (chance.toLowerCase().includes("target")) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
  if (chance.toLowerCase().includes("competitive")) return "text-orange-400 bg-orange-400/10 border-orange-400/20";
  if (chance.toLowerCase().includes("reach")) return "text-red-400 bg-red-400/10 border-red-400/20";
  return "text-slate-400 bg-slate-400/10 border-slate-400/20";
}

export default function Calendar() {
  const { editing, getJson, setJson } = useEdit();
  // Initialize from the global JSON store or fallback to default visits
  const storedVisits = getJson<Visit[]>("visits", defaultVisits);
  const [visits, setVisitsState] = useState<Visit[]>(Array.isArray(storedVisits) && storedVisits.length > 0 ? storedVisits : defaultVisits);

  const [showForm, setShowForm] = useState(false);
  const [newUni, setNewUni] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newLogo, setNewLogo] = useState("");

  // Helper to update both local state and global json store
  const setVisits = useCallback((update: Visit[] | ((prev: Visit[]) => Visit[])) => {
    setVisitsState((prev) => {
      const next = typeof update === "function" ? update(prev) : update;
      // Persist to the EditProvider so it can be saved to the project
      setJson("visits", next);
      return next;
    });
  }, [setJson]);

  const updateDate = useCallback((id: string, date: string) => {
    setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, date } : v)));
  }, []);

  const addVisit = useCallback(() => {
    if (!newUni || !newDate) return;
    const visit: Visit = {
      id: `v-${Date.now()}`,
      university: newUni,
      date: newDate,
      logo: newLogo || "",
      notes: newNotes,
      visitUrl: "",
      scholarship: "",
      chance: "Target",
    };
    setVisits((prev) => [...prev, visit]);
    setNewUni("");
    setNewDate("");
    setNewNotes("");
    setNewLogo("");
    setShowForm(false);
  }, [newUni, newDate, newNotes, newLogo]);

  const removeVisit = useCallback((id: string) => {
    setVisits((prev) => prev.filter((v) => v.id !== id));
  }, []);

  return (
    <section id="calendar" className="relative overflow-hidden" style={{ background: "#070d1a" }}>
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

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
            Planning Ahead
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-5">
            <EditableText
              id="cal-title"
              fallback="Agenda do Meu Futuro"
              as="span"
              className="text-4xl md:text-5xl font-bold text-gradient"
            />
          </h2>
          <div className="heading-bar" />
          <EditableText
            id="cal-subtitle"
            fallback="University visits scheduled — building the path to engineering school."
            as="p"
            className="text-slate-400 text-[15px] mt-6 max-w-lg mx-auto"
          />
        </motion.div>

        {/* University logos strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-16"
        >
          {visits.map((visit) => (
            <a
              key={visit.id + "-logo"}
              href={visit.visitUrl || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center p-2 group-hover:border-amber-400/30 transition-colors">
                {visit.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={visit.logo}
                    alt={visit.university}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.innerHTML = `<span class="text-xl font-bold text-white/30">${visit.university.charAt(0)}</span>`;
                    }}
                  />
                ) : (
                  <span className="text-xl font-bold text-white/30">{visit.university.charAt(0)}</span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 font-medium text-center max-w-[80px] leading-tight group-hover:text-amber-400/70 transition-colors">
                {visit.university.split(" ").slice(0, 2).join(" ")}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Visit cards */}
        <div className="space-y-4 mb-12">
          <AnimatePresence>
            {visits.map((visit, i) => {
              const days = daysUntil(visit.date);
              const isPast = visit.date && days < 0;
              const isScheduled = !!visit.date;
              return (
                <motion.div
                  key={visit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`glass-card p-5 min-w-0 ${isPast ? "opacity-50" : ""}`}
                  style={{ overflow: "hidden", wordBreak: "break-word" }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center p-1.5 flex-shrink-0">
                      {visit.logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={visit.logo}
                          alt=""
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.parentElement!.innerHTML = `<span class="text-lg font-bold text-white/30">${visit.university.charAt(0)}</span>`;
                          }}
                        />
                      ) : (
                        <span className="text-lg font-bold text-white/30">{visit.university.charAt(0)}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-white/90 font-semibold text-sm">{visit.university}</h4>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{visit.notes}</p>
                      {visit.scholarship && (
                        <p className="text-emerald-400/70 text-[11px] mt-1 font-medium">
                          {visit.scholarship}
                        </p>
                      )}
                    </div>

                    {/* Date + actions */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0 sm:min-w-[140px]">
                      {isScheduled ? (
                        <>
                          <span className="text-amber-400 text-xs font-mono font-semibold">
                            {formatDate(visit.date)}
                          </span>
                          <span className={`text-[10px] font-medium ${isPast ? "text-slate-600" : days <= 7 ? "text-amber-400" : "text-slate-500"}`}>
                            {isPast ? "Visited" : days === 0 ? "Today!" : `${days} days away`}
                          </span>
                        </>
                      ) : editing ? (
                        <input
                          type="date"
                          onChange={(e) => updateDate(visit.id, e.target.value)}
                          className="px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white outline-none focus:border-amber-400/40 transition-colors"
                        />
                      ) : (
                        <span className="text-slate-600 text-xs font-mono">Date TBD</span>
                      )}

                      <div className="flex gap-1.5">
                        {visit.visitUrl && (
                          <a
                            href={visit.visitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-[10px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-lg hover:bg-amber-400/20 transition-colors"
                          >
                            Schedule Visit
                          </a>
                        )}
                        {editing && (
                          <button
                            onClick={() => removeVisit(visit.id)}
                            className="px-2 py-1 text-[11px] font-semibold bg-red-500/90 text-white rounded-lg hover:bg-red-400 transition-colors"
                            title="Remove"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Add visit (edit mode) */}
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="px-5 py-2.5 text-sm font-semibold bg-amber-400 text-[#050a14] rounded-xl hover:bg-amber-300 transition-colors"
              >
                + Add University Visit
              </button>
            ) : (
              <div
                className="glass-card p-6 max-w-md mx-auto text-left"
                style={{ overflow: "hidden", wordBreak: "break-word" }}
              >
                <h4 className="text-white/80 font-semibold text-sm mb-4 text-center">New Visit</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newUni}
                    onChange={(e) => setNewUni(e.target.value)}
                    placeholder="University name"
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors"
                  />
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-sm text-white outline-none focus:border-amber-400/40 transition-colors"
                  />
                  <input
                    type="text"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Notes (e.g., campus tour)"
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors"
                  />
                  <input
                    type="text"
                    value={newLogo}
                    onChange={(e) => setNewLogo(e.target.value)}
                    placeholder="Logo URL (optional)"
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 outline-none focus:border-amber-400/40 transition-colors"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addVisit}
                      className="flex-1 px-4 py-2 bg-amber-400 text-[#050a14] text-sm font-semibold rounded-lg hover:bg-amber-300 transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 bg-white/[0.06] text-slate-400 text-sm rounded-lg hover:bg-white/[0.1] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
