import { useEffect, useState } from "react";

export function FloatingBar({ kiwifyUrl }: { kiwifyUrl: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="complementary"
      aria-label="Oferta"
      style={{ transition: "transform 220ms cubic-bezier(0.4,0,0.2,1)" }}
      className={[
        "fixed left-0 right-0 top-0 z-[200] bg-[#C8A951]",
        visible ? "translate-y-0" : "-translate-y-full",
      ].join(" ")}
    >
      <a
        href={kiwifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir o Manual Anti-Trouxa por R$ 197"
        className="flex min-h-[44px] items-center justify-center px-6 py-[11px] font-ui text-[10px] font-bold tracking-[0.2em] uppercase text-[#080808]"
      >
        ⚡ ABRIR O MANUAL — R$ 197,00
      </a>
    </div>
  );
}
