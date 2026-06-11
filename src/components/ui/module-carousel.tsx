import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

const MODULES = [
  {
    num: "01",
    act: "ATO I",
    title: "A Anatomia do Predador",
    body: "A estrutura psicológica do homem manipulador. Por que ele age assim? O que ele quer de você. O que o alimenta.",
  },
  {
    num: "02",
    act: "ATO I",
    title: "Perguntas que Você Nunca Teve Coragem de Fazer",
    body: "Por que ele age dessa forma? Por que ele conquista e some? Por que alguns te viciam? Quais armas ele usa contra você?",
  },
  {
    num: "03",
    act: "ATO I",
    title: "O Ciclo da Manipulação",
    body: "As 4 fases que todo relacionamento abusivo segue, sem exceção. E o motivo pelo qual ele sempre volta quando você começa a respirar.",
  },
  {
    num: "04",
    act: "ATO II",
    title: "A Armadilha da Conexão Falsa",
    body: "As 6 técnicas que ele usa pra fabricar intimidade em duas semanas. A chave da vulnerabilidade. O ouvinte salvador. Tudo nomeado, tudo desmontado.",
  },
  {
    num: "05",
    act: "ATO II",
    title: "A Fase da Ilusão",
    body: "As 6 promessas que ele constrói dentro da sua cabeça e nunca cumpre. Love bombing. Futuro de mentira. Fake namoro.",
  },
  {
    num: "06",
    act: "ATO II",
    title: "As Técnicas de Sedução",
    body: "Ancoragem. Negging. Push-pull. Cold reading. As armas do manual de PUA — você as reconhece no momento em que forem aplicadas.",
  },
  {
    num: "07",
    act: "ATO II",
    title: "O Sequestro Mental",
    body: "As 4 técnicas que o homem dentro da sua vida usa pra te manter ali sem que você perceba. Crédito emocional. Culpa fantasma.",
  },
  {
    num: "→",
    act: "ATO III",
    title: "Protocolo de Virada",
    body: "Um protocolo executável. Você aplica em qualquer homem e a verdade dele aparece. A partir de agora, você é responsável pelas suas escolhas.",
  },
];

function getVariant(dist: number) {
  const abs = Math.abs(dist);
  if (abs === 0) return { x: 0,         scale: 1,    opacity: 1,    rotateY: 0,           zIndex: 20, filter: "blur(0px)" };
  if (abs === 1) return { x: dist * 305, scale: 0.82, opacity: 0.48, rotateY: dist * -14,  zIndex: 10, filter: "blur(0.5px)" };
  if (abs === 2) return { x: dist * 305, scale: 0.67, opacity: 0.18, rotateY: dist * -20,  zIndex: 5,  filter: "blur(1.5px)" };
  return               { x: dist * 305, scale: 0.55, opacity: 0,    rotateY: 0,           zIndex: 0,  filter: "blur(3px)" };
}

export function ModuleCarousel() {
  const [active, setActive] = useState(0);
  const total = MODULES.length;

  const goTo = (i: number) => setActive(Math.max(0, Math.min(i, total - 1)));

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60)      goTo(active + 1);
    else if (info.offset.x > 60)  goTo(active - 1);
  };

  return (
    <div className="relative select-none">

      {/* Track */}
      <div
        className="relative mx-auto h-[420px] md:h-[440px]"
        style={{ perspective: 1400, overflow: "hidden" }}
      >
        {/* Side fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[15%] bg-gradient-to-r from-[#080808] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[15%] bg-gradient-to-l from-[#080808] to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          {MODULES.map((mod, i) => {
            const dist  = i - active;
            const isActive = dist === 0;

            return (
              <motion.div
                key={i}
                animate={getVariant(dist)}
                transition={{ type: "spring", stiffness: 310, damping: 30 }}
                style={{
                  position: "absolute",
                  width: 272,
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
                <div
                  className={`flex h-[400px] md:h-[420px] flex-col p-7 transition-colors duration-300 ${
                    isActive
                      ? "border border-[#C8A951] bg-[#0D0B08]"
                      : "border border-[#1E1A14] bg-[#090807]"
                  }`}
                >
                  {/* Act */}
                  <span className="mb-5 block font-ui text-[9px] font-bold tracking-[0.24em] uppercase text-[#C8A951]">
                    {mod.act}
                  </span>

                  {/* Big number */}
                  <div
                    className="font-editorial font-bold leading-none text-[#C8A951]"
                    style={{
                      fontSize: 72,
                      opacity: isActive ? 0.16 : 0.07,
                      lineHeight: 1,
                      marginBottom: 20,
                    }}
                  >
                    {mod.num}
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 font-editorial text-[20px] font-bold leading-[1.25] text-[#C4BDB3]">
                    {mod.title}
                  </h3>

                  {/* Divider */}
                  <div className={`mb-5 h-px w-8 ${isActive ? "bg-[#C8A951]" : "bg-[#2A2520]"}`} />

                  {/* Body */}
                  <p className="mt-auto font-ui text-[13px] font-light leading-[1.78] text-[#8A8070]">
                    {mod.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-7 flex flex-col items-center gap-5">

        {/* Arrows + dots */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="flex h-11 w-11 items-center justify-center border border-[rgba(200,169,81,0.35)] text-[#C8A951] transition-colors hover:bg-[#C8A951] hover:text-[#080808] disabled:cursor-not-allowed disabled:opacity-20"
          >
            ←
          </button>

          <div className="flex items-center gap-[8px]">
            {MODULES.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                animate={{
                  width:      i === active ? 22 : 6,
                  background: i === active ? "#C8A951" : "#2A2520",
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

        {/* Counter */}
        <p className="font-ui text-[11px] tracking-[0.12em] text-[#8A8070]">
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
