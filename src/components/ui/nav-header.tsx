import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY: number, duration = 900) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const NAV_ITEMS = [
  { label: "INÍCIO",       href: "#inicio" },
  { label: "SOBRE MIM",    href: "#sobre" },
  { label: "O MANUAL",    href: "#manual" },
  { label: "DEPOIMENTOS", href: "#depoimentos" },
  { label: "BÔNUS",       href: "#bonus" },
];

type Position = { left: number; width: number; opacity: number };

function NavTab({
  children,
  href,
  setPosition,
  isHovered,
}: {
  children: React.ReactNode;
  href: string;
  setPosition: (p: Position) => void;
  isHovered: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block"
    >
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector(href) as HTMLElement | null;
          if (!target) return;
          const targetY =
            target.getBoundingClientRect().top + window.scrollY - 80;
          smoothScrollTo(targetY);
        }}
        className={[
          "block px-4 py-[7px] font-ui text-[9px] font-bold tracking-[0.18em] uppercase transition-colors duration-150 cursor-pointer",
          isHovered
            ? "text-[#080808]"
            : "text-[#F0EDE6]/60 hover:text-[#F0EDE6]/80",
        ].join(" ")}
      >
        {children}
      </a>
    </li>
  );
}

function NavCursor({ position }: { position: Position }) {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 h-[30px] rounded-full bg-[#C8A951]"
      style={{ pointerEvents: "none" }}
    />
  );
}

export function SlidingNav() {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const handleEnter = (href: string, p: Position) => {
    setPosition(p);
    setHoveredHref(href);
  };

  const handleLeave = () => {
    setPosition((pv) => ({ ...pv, opacity: 0 }));
    setHoveredHref(null);
  };

  return (
    <ul
      role="navigation"
      aria-label="Menu principal"
      className="relative hidden lg:flex items-center rounded-full border border-[rgba(200,169,81,0.25)] p-[3px]"
      onMouseLeave={handleLeave}
    >
      {NAV_ITEMS.map((item) => (
        <NavTab
          key={item.href}
          href={item.href}
          setPosition={(p) => handleEnter(item.href, p)}
          isHovered={hoveredHref === item.href}
        >
          {item.label}
        </NavTab>
      ))}
      <NavCursor position={position} />
    </ul>
  );
}
