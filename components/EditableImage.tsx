"use client";

import { useRef } from "react";
import Image from "next/image";
import { useEdit } from "./EditProvider";

interface Props {
  id: string;
  fallbackSrc: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onRemove?: () => void;
}

export default function EditableImage({
  id,
  fallbackSrc,
  alt,
  fill = true,
  className = "",
  priority,
  sizes,
  onRemove,
}: Props) {
  const { editing, getImage, setImage } = useEdit();
  const inputRef = useRef<HTMLInputElement>(null);
  const src = getImage(id, fallbackSrc);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(id, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const isDataUrl = src.startsWith("data:");

  return (
    <div className="relative w-full h-full">
      {isDataUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          className={`${className} ${fill ? "absolute inset-0 w-full h-full" : ""}`}
          style={fill ? { objectFit: "cover" } : undefined}
          suppressHydrationWarning
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={className}
          priority={priority}
          sizes={sizes}
          suppressHydrationWarning
        />
      )}

      {editing && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="absolute top-2 right-2 z-20 flex gap-1.5">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-2.5 py-1.5 text-[11px] font-semibold bg-amber-400 text-[#050a14] rounded-lg shadow-lg hover:bg-amber-300 transition-colors flex items-center gap-1"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Change
            </button>
            {onRemove && (
              <button
                onClick={onRemove}
                className="px-2 py-1.5 text-[11px] font-semibold bg-red-500/90 text-white rounded-lg shadow-lg hover:bg-red-400 transition-colors"
                title="Remove photo"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
