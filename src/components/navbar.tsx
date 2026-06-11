import { useEffect, useState } from "react";
import { SlidingNav } from "@/components/ui/nav-header";

export function Navbar({ kiwifyUrl }: { kiwifyUrl: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [barShift, setBarShift] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setBarShift(y > 1600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      style={{
        transition:
          "top 220ms cubic-bezier(0.4,0,0.2,1), background 220ms, border-color 220ms, padding 220ms",
      }}
      className={[
        "fixed left-0 right-0 z-[199]",
        scrolled
          ? "bg-[rgba(8,8,8,0.96)] border-b border-[#2A2520] backdrop-blur-md py-3"
          : "border-b border-transparent py-5",
        barShift ? "top-11" : "top-0",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <a
          href="#inicio"
          aria-label="Anti-Trouxa — início"
          className="font-ui text-[13px] font-bold tracking-[0.32em] uppercase text-[#C8A951]"
        >
          ANTITROUXA
        </a>

        <SlidingNav />

        <a
          href={kiwifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative hidden sm:inline-flex min-h-[44px] items-center overflow-hidden border border-[#C8A951] px-[22px] py-3 font-ui text-[10px] font-bold tracking-[0.18em] uppercase text-[#C8A951] transition-colors duration-200 hover:text-[#080808]"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-[#C8A951] transition-transform duration-200 group-hover:scale-x-100" />
          <span className="relative z-10">ABRIR O MANUAL</span>
        </a>
      </div>
    </nav>
  );
}
