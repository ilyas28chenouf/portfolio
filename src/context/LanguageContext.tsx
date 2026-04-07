"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "ru";

type TranslationValue<T> = Record<Language, T>;
type Translatable = string | readonly string[];

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: <T extends Translatable>(value: TranslationValue<T> | T) => T;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ru") {
      setLang(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lang", lang);
    }
  }, [lang, mounted]);

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "ru" : "en"));
  };

  const t = <T extends Translatable>(value: TranslationValue<T> | T): T => {
    if (typeof value === "string" || Array.isArray(value)) return value;
    return value[lang] ?? value.en;
  };

  const contextValue = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}