import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

const PHOTO =
  "https://www.antitrouxa.com/__l5e/assets-v1/6f21f1a0-8b7e-480d-8a28-bb545245a0d4/tainan-hero.png";

const MODULES = [
  {
    num: "01",
    act: "ATO I",
    title: "A Anatomia\ndo Predador",
    body: "A estrutura psicológica do homem manipulador.",
    // Natural + gold warmth
    imgFilter: "brightness(1.05) contrast(1.08) saturate(1.1)",
    overlay: "linear-gradient(160deg, rgba(200,169,81,0.22) 0%, rgba(0,0,0,0) 60%)",
    accent: "#C8A951",
  },
  {
    num: "02",
    act: "ATO I",
    title: "Perguntas que Você\nNunca Teve Coragem",
    body: "Por que ele conquista e some? Por que alguns te viciam?",
    // Steel blue — distrust, coldness
    imgFilter: "sepia(0.55) hue-rotate(195deg) brightness(0.88) contrast(1.1)",
    overlay: "linear-gradient(160deg, rgba(20,60,180,0.28) 0%, rgba(0,0,0,0) 60%)",
    accent: "#7EB5E0",
  },
  {
    num: "03",
    act: "ATO I",
    title: "O Ciclo da\nManipulação",
    body: "As 4 fases que todo relacionamento abusivo segue.",
    // Dramatic dark — shadow, cycles
    imgFilter: "contrast(1.45) brightness(0.68) saturate(0.8)",
    overlay: "linear-gradient(160deg, rgba(80,10,10,0.35) 0%, rgba(0,0,0,0) 60%)",
    accent: "#E05555",
  },
  {
    num: "04",
    act: "ATO II",
    title: "A Armadilha da\nConexão Falsa",
    body: "As 6 técnicas que ele usa pra fabricar intimidade.",
    // Deep crimson — danger, trap
    imgFilter: "sepia(0.7) hue-rotate(318deg) saturate(1.6) brightness(0.82)",
    overlay: "linear-gradient(160deg, rgba(160,20,20,0.3) 0%, rgba(0,0,0,0) 60%)",
    accent: "#E07070",
  },
  {
    num: "05",
    act: "ATO II",
    title: "A Fase\nda Ilusão",
    body: "As 6 promessas que ele constrói e nunca cumpre.",
    // Violet — illusion, dreams
    imgFilter: "sepia(0.75) hue-rotate(258deg) saturate(1.4) brightness(0.84)",
    overlay: "linear-gradient(160deg, rgba(90,10,160,0.28) 0%, rgba(0,0,0,0) 60%)",
    accent: "#B07FE0",
  },
  {
    num: "06",
    act: "ATO II",
    title: "As Técnicas\nde Sedução",
    body: "Ancoragem. Negging. Push-pull. Você as reconhece.",
    // Teal — cold seduction
    imgFilter: "sepia(0.55) hue-rotate(170deg) saturate(1.3) brightness(0.88)",
    overlay: "linear-gradient(160deg, rgba(0,110,120,0.28) 0%, rgba(0,0,0,0) 60%)",
    accent: "#5EC8C0",
  },
  {
    num: "07",
    act: "ATO II",
    title: "O Sequestro\nMental",
    body: "As 4 técnicas pra te manter ali sem você perceber.",
    // Dark green — predatory, entrapment
    imgFilter: "saturate(0.25) brightness(0.65) contrast(1.3)",
    overlay: "linear-gradient(160deg, rgba(0,60,20,0.40) 0%, rgba(0,0,0,0) 60%)",
    accent: "#70C080",
  },
  {
    num: "→",
    act: "ATO III",
    title: "Protocolo\nde Virada",
    body: "Você aplica em qualquer homem e a verdade dele aparece.",
    // Full sepia gold — victory, turning the game
    imgFilter: "sepia(1) contrast(1.15) brightness(1.05)",
    overlay: "linear-gradient(160deg, rgba(200,169,81,0.38) 0%, rgba(0,0,0,0) 60%)",
    accent: "#C8A951",
  },
];

function getVariant(dist: number) {
  const abs = Math.abs(dist);
  if (abs === 0) return { x: 0,         scale: 1,    opacity: 1,    rotateY: 0,           zIndex: 20, filter: "blur(0px)" };
  if (abs === 1) return { x: dist * 290, scale: 0.83, opacity: 0.52, rotateY: dist * -14,  zIndex: 10, filter: "blur(0.5px)" };
  if (abs === 2) return { x: dist * 290, scale: 0.68, opacity: 0.2,  rotateY: dist * -20,  zIndex: 5,  filter: "blur(1.5px)" };
  return               { x: dist * 290, scale: 0.55, opacity: 0,    rotateY: 0,           zIndex: 0,  filter: "blur(3px)" };
}

export function ModuleCarousel() {
  const [active, setActive] = useState(0);
  const total = MODULES.length;

  const goTo = (i: number) => setActive(Math.max(0, Math.min(i, total - 1)));

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60)     goTo(active + 1);
    else if (info.offset.x > 60) goTo(active - 1);
  };

  const mod = MODULES[active];

  return (
    <div className="relative select-none">

      {/* Track */}
      <div
        className="relative mx-auto h-[460px] md:h-[500px]"
        style={{ perspective: 1400, overflow: "hidden" }}
      >
        {/* Side fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[12%] bg-gradient-to-r from-[#080808] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[12%] bg-gradient-to-l from-[#080808] to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          {MODULES.map((m, i) => {
            const dist = i - active;
            const isActive = dist === 0;

            return (
              <motion.div
                key={i}
                animate={getVariant(dist)}
                transition={{ type: "spring", stiffness: 310, damping: 30 }}
                style={{
                  position: "absolute",
                  width: 260,
                  height: isActive ? 440 : 420,
                  transformStyle: "preserve-3d",
                  cursor: isActive ? "grab" : "pointer",
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: "grabbing" }}
                onClick={() => !isActive && goTo(i)}
              >
                {/* Card */}
                <div className="relative h-full w-full overflow-hidden">

                  {/* Photo */}
                  <img
                    src={PHOTO}
                    alt="Tainan Vanzelli"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    style={{ filter: m.imgFilter }}
                    draggable={false}
                  />

                  {/* Color overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: m.overlay }}
                  />

                  {/* Bottom gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />

                  {/* Active border glow */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        boxShadow: `inset 0 0 0 1.5px ${m.accent}`,
                      }}
                    />
                  )}

                  {/* Top badge */}
                  <div className="absolute left-0 right-0 top-5 flex justify-center">
                    <span
                      className="border px-3 py-[5px] font-ui text-[9px] font-bold tracking-[0.22em] uppercase"
                      style={{
                        borderColor: `${m.accent}55`,
                        background: `${m.accent}18`,
                        color: m.accent,
                      }}
                    >
                      {m.act}
                    </span>
                  </div>

                  {/* Big number watermark */}
                  <div
                    className="absolute left-4 top-14 font-editorial font-bold leading-none text-white"
                    style={{ fontSize: 80, opacity: 0.07 }}
                  >
                    {m.num}
                  </div>

                  {/* Bottom text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className="mb-2 font-editorial text-[21px] font-bold leading-[1.2] text-white"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {m.title}
                    </h3>
                    <div
                      className="mb-3 h-px w-7"
                      style={{ background: m.accent }}
                    />
                    {isActive && (
                      <p className="font-ui text-[12px] font-light leading-[1.65] text-white/55">
                        {m.body}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-7 flex flex-col items-center gap-5">
        <div className="flex items-center gap-6">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="flex h-11 w-11 items-center justify-center border border-[rgba(200,169,81,0.35)] text-[#C8A951] transition-colors hover:bg-[#C8A951] hover:text-[#080808] disabled:cursor-not-allowed disabled:opacity-20"
          >
            ←
          </button>

          <div className="flex items-center gap-[7px]">
            {MODULES.map((m, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                animate={{
                  width:      i === active ? 22 : 6,
                  background: i === active ? m.accent : "#2A2520",
                }}
                transition={{ duration: 0.25 }}
                className="h-[6px] rounded-full border-none"
              />
            ))}
          </div>

          <button
            onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            className="flex h-11 w-11 items-center justify-center border border-[rgba(200,169,81,0.35)] text-[#C8A951] transition-colors hover:bg-[#C8A951] hover:text-[#080808] disabled:cursor-not-allowed disabled:opacity-20"
          >
            →
          </button>
        </div>

        {/* Counter with accent color */}
        <p
          className="font-ui text-[11px] tracking-[0.14em]"
          style={{ color: mod.accent }}
        >
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
