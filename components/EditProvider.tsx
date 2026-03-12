"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

interface EditCtx {
  editing: boolean;
  setEditing: (v: boolean) => void;
  getText: (key: string, fallback: string) => string;
  setText: (key: string, value: string) => void;
  getImage: (key: string, fallback: string) => string;
  setImage: (key: string, value: string) => void;
  getJson: <T>(key: string, fallback: T) => T;
  setJson: <T>(key: string, value: T) => void;
  resetAll: () => void;
}

const Ctx = createContext<EditCtx | null>(null);

const TEXT_STORAGE_KEY = "enzo-portfolio-texts";
const JSON_STORAGE_KEY = "enzo-portfolio-json";
const IMG_DB_NAME = "enzo-portfolio-images";
const IMG_STORE_NAME = "images";

export function useEdit() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEdit must be inside EditProvider");
  return ctx;
}

function getInitialEditing() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("edit") === "1";
}



// --- IndexedDB helpers for large image data ---

function openImageDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IMG_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IMG_STORE_NAME)) {
        db.createObjectStore(IMG_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function loadAllImages(): Promise<Record<string, string>> {
  try {
    const db = await openImageDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IMG_STORE_NAME, "readonly");
      const store = tx.objectStore(IMG_STORE_NAME);
      const req = store.getAll();
      const keyReq = store.getAllKeys();
      tx.oncomplete = () => {
        const result: Record<string, string> = {};
        const keys = keyReq.result;
        const values = req.result;
        for (let i = 0; i < keys.length; i++) {
          result[String(keys[i])] = values[i];
        }
        resolve(result);
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    return {};
  }
}

async function saveImage(key: string, value: string): Promise<void> {
  try {
    const db = await openImageDB();
    const tx = db.transaction(IMG_STORE_NAME, "readwrite");
    tx.objectStore(IMG_STORE_NAME).put(value, key);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* ignore */
  }
}

async function clearAllImages(): Promise<void> {
  try {
    const db = await openImageDB();
    const tx = db.transaction(IMG_STORE_NAME, "readwrite");
    tx.objectStore(IMG_STORE_NAME).clear();
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* ignore */
  }
}

// --- Migrate old localStorage images to IndexedDB ---

async function migrateOldStorage(): Promise<void> {
  try {
    const oldKey = "enzo-portfolio-edits";
    const raw = localStorage.getItem(oldKey);
    if (!raw) return;
    const data = JSON.parse(raw);
    const imageKeys = Object.keys(data).filter((k) => k.startsWith("i:"));
    if (imageKeys.length > 0) {
      for (const key of imageKeys) {
        await saveImage(key, data[key]);
      }
    }
    // Keep text entries in new key
    const texts: Record<string, string> = {};
    for (const [k, v] of Object.entries(data)) {
      if (k.startsWith("t:")) {
        texts[k] = v as string;
      }
    }
    if (Object.keys(texts).length > 0) {
      localStorage.setItem(TEXT_STORAGE_KEY, JSON.stringify(texts));
    }
    // Remove old key
    localStorage.removeItem(oldKey);
  } catch {
    /* ignore */
  }
}

export default function EditProvider({ 
  children,
  initialTexts = {},
  initialImages = {}
}: { 
  children: ReactNode;
  initialTexts?: Record<string, string>;
  initialImages?: Record<string, string>;
}) {
  const [editing, setEditing] = useState(getInitialEditing);
  const [textStore, setTextStore] = useState<Record<string, string>>(initialTexts);
  const [jsonStore, setJsonStore] = useState<Record<string, any>>(initialTexts);
  const [imageStore, setImageStore] = useState<Record<string, string>>(initialImages);
  const imageStoreRef = useRef(imageStore);
  imageStoreRef.current = imageStore;

  // Load images from IndexedDB, handle old migration, and merge LocalStorage texts/json
  useEffect(() => {
    // 1. Merge LocalStorage texts/json (if any unsaved edits exist)
    try {
      const rawText = localStorage.getItem(TEXT_STORAGE_KEY);
      if (rawText) {
        const localTexts = JSON.parse(rawText);
        if (Object.keys(localTexts).length > 0) {
          setTextStore(prev => ({ ...prev, ...localTexts }));
        }
      }
      const rawJson = localStorage.getItem(JSON_STORAGE_KEY);
      if (rawJson) {
        const localJson = JSON.parse(rawJson);
        if (Object.keys(localJson).length > 0) {
          setJsonStore(prev => ({ ...prev, ...localJson }));
        }
      }
    } catch (e) {
      /* ignore */
    }

    migrateOldStorage().then(() => {
      loadAllImages().then((imgs) => {
        if (Object.keys(imgs).length > 0) {
          // IndexedDB takes precedence (unsaved local edits)
          setImageStore(prev => ({...prev, ...imgs}));
        }
      });
    });
  }, []);

  // Persist texts and jsons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TEXT_STORAGE_KEY, JSON.stringify(textStore));
    } catch {
      /* ignore */
    }
  }, [textStore]);

  useEffect(() => {
    try {
      localStorage.setItem(JSON_STORAGE_KEY, JSON.stringify(jsonStore));
    } catch {
      /* ignore */
    }
  }, [jsonStore]);

  const getText = useCallback(
    (key: string, fallback: string) => textStore[`t:${key}`] ?? fallback,
    [textStore]
  );

  const setText = useCallback((key: string, value: string) => {
    setTextStore((prev) => ({ ...prev, [`t:${key}`]: value }));
  }, []);

  const getImage = useCallback(
    (key: string, fallback: string) => imageStore[`i:${key}`] ?? fallback,
    [imageStore]
  );

  const setImage = useCallback((key: string, value: string) => {
    const storeKey = `i:${key}`;
    setImageStore((prev) => ({ ...prev, [storeKey]: value }));
    // Save to IndexedDB (async, fire-and-forget)
    saveImage(storeKey, value);
  }, []);

  const getJson = useCallback(
    <T,>(key: string, fallback: T): T => (jsonStore[`j:${key}`] as T) ?? fallback,
    [jsonStore]
  );

  const setJson = useCallback(<T,>(key: string, value: T) => {
    setJsonStore((prev) => ({ ...prev, [`j:${key}`]: value }));
  }, []);

  const resetAll = useCallback(() => {
    setTextStore({});
    setImageStore({});
    setJsonStore({});
    try {
      localStorage.removeItem(TEXT_STORAGE_KEY);
      localStorage.removeItem(JSON_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    clearAllImages();
  }, []);

  const saveToProject = useCallback(async () => {
    try {
      // Get all images
      const imagesToSave = await loadAllImages();
      
      const payload = {
        texts: { ...textStore, ...jsonStore },
        images: imagesToSave,
      };

      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Success! The content has been saved to your project files.");
        // We can optionally reset after a successful save, or just let them keep editing
      } else {
        alert("Failed to save: " + (data.error || "Unknown error"));
      }
    } catch (e: any) {
      alert("Error saving: " + e.message);
    }
  }, [textStore]);

  return (
    <Ctx.Provider
      value={{ editing, setEditing, getText, setText, getImage, setImage, getJson, setJson, resetAll }}
    >
      {children}

      {/* Floating edit bar */}
      {editing && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-full bg-amber-400 shadow-xl shadow-amber-400/30">
          <div className="w-2 h-2 rounded-full bg-[#050a14] animate-pulse" />
          <span className="text-[#050a14] text-sm font-semibold">Edit Mode</span>
          <button
            onClick={resetAll}
            className="px-3 py-1 text-xs font-medium bg-[#050a14]/20 text-[#050a14] rounded-full hover:bg-[#050a14]/30 transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={saveToProject}
            className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Save to Project
          </button>
          <button
            onClick={() => setEditing(false)}
            className="px-3 py-1 text-xs font-medium bg-[#050a14] text-amber-400 rounded-full hover:bg-[#050a14]/80 transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </Ctx.Provider>
  );
}
