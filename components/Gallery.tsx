"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import EditableImage from "./EditableImage";
import { useEdit } from "./EditProvider";

const allPhotos: { src: string; alt: string }[] = [
  { src: "/images/2020-09-25(1).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(2).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(3).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(4).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(5).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(6).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(7).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(8).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(9).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(10).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(11).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(12).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(13).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(14).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(15).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(16).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(17).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(18).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(19).jpg", alt: "Football game action" },
  { src: "/images/2020-09-25(20).jpg", alt: "Football game action" },
  { src: "/images/DSC_8014.JPG", alt: "Football photo" },
  { src: "/images/DSC_8046.JPG", alt: "Football photo" },
  { src: "/images/DSC_8109.JPG", alt: "Football photo" },
  { src: "/images/DSC_8136.JPG", alt: "Football photo" },
  { src: "/images/DSC_4724.JPG", alt: "Portrait" },
  { src: "/images/DSC_4768.JPG", alt: "Portrait" },
  { src: "/images/DSC_4774.JPG", alt: "Portrait" },
  { src: "/images/DSC_4775.JPG", alt: "Portrait" },
  { src: "/images/DSC_4851.JPG", alt: "Portrait" },
  { src: "/images/DSC_4864.JPG", alt: "Portrait" },
  { src: "/images/1C3A5711.JPG", alt: "Personal photo" },
  { src: "/images/1C3A6842.JPG", alt: "Personal photo" },
  { src: "/images/1C3A7767.JPG", alt: "Personal photo" },
  { src: "/images/IMG_0523.jpeg", alt: "Personal photo" },
  { src: "/images/IMG_0524.jpeg", alt: "Personal photo" },
  { src: "/images/IMG_0536.jpeg", alt: "Personal photo" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.47.02 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.51.08 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.51.31 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.51.43 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.51.53 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.52.03 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.52.16 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.52.26 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.52.32 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.52.39 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.53.16 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.53.22 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.53.33 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.53.46 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.54.08 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.54.24 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.54.32 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.54.49 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.55.13 PM.jpeg", alt: "Technical work" },
  { src: "/images/WhatsApp Image 2026-03-09 at 4.55.23 PM.jpeg", alt: "Technical work" },
  { src: "/images/1228162d-1cfc-4e9a-9171-2213a26f4f7a.jpg", alt: "Technical work" },
  { src: "/images/1fc4070a-857e-4c3b-9108-948d9bc6b1d6.jpg", alt: "Technical work" },
  { src: "/images/28bea9e0-d10a-4384-af77-4f7b9cb0099b.jpg", alt: "Technical work" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { editing, getImage } = useEdit();

  return (
    <section id="gallery" className="relative overflow-hidden" style={{ background: "#070d1a" }}>
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-amber-400/80 text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Moments &amp; Memories
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-5">Gallery</h2>
          <div className="heading-bar" />
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
          <AnimatePresence mode="popLayout">
            {allPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.2) }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => !editing && setLightbox(getImage(`gallery-${i}`, photo.src))}
              >
                <EditableImage
                  id={`gallery-${i}`}
                  fallbackSrc={photo.src}
                  alt={photo.alt}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[85vh]">
                {lightbox.startsWith("data:") ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={lightbox}
                    alt="Gallery photo"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={lightbox}
                    alt="Gallery photo"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white/60 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
