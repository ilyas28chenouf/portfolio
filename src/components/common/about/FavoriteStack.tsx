"use client";

import { titles, tech_stack } from "@/data/about2";
import AboutContent from "./AboutContent";
import Image from "next/image";
import useScrollStaggerAnimation from "@/hooks/useScrollStaggerAnimation";
import { useLanguage } from "@/context/LanguageContext";

const FavoriteStack = () => {
  const { t } = useLanguage();

  const containerRef = useScrollStaggerAnimation<HTMLDivElement>({
    selector: ".tool",
    fromVars: { opacity: 0, y: 100 },
    toVars: {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out",
    },
  });

  return (
    <AboutContent
      titleChild={
        <>
          {t(titles.my2)} <br /> {t(titles.tech_stack)}
        </>
      }
    >
      <div ref={containerRef} className="mt-6 space-y-8">
        {tech_stack.map((group) => (
          <div key={group.title.en}>
            <h3 className="mb-4 text-lg font-semibold uppercase tracking-wide text-primary">
              {t(group.title)}
            </h3>

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
              {group.items.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  title={tool.name}
                  className="tool group relative flex aspect-square items-center justify-center rounded-full border border-primary transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={48}
                    height={48}
                    className="duration-300"
                  />

                  <span className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {tool.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AboutContent>
  );
};

export default FavoriteStack;