import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroContentProps {
  scrollHeight?: number;
  kiwifyUrl: string;
}

export function HeroContent({
  scrollHeight = 1500,
  kiwifyUrl,
}: HeroContentProps) {
  const { scrollY } = useScroll();

  const labelOpacity  = useTransform(scrollY, [0, 220],  [0, 1]);
  const labelY        = useTransform(scrollY, [0, 220],  [24, 0]);
  const dividerOpacity = useTransform(scrollY, [60, 280],  [0, 1]);
  const dividerScaleX  = useTransform(scrollY, [60, 280],  [0, 1]);
  const h1aOpacity = useTransform(scrollY, [120, 420], [0, 1]);
  const h1aY       = useTransform(scrollY, [120, 420], [40, 0]);
  const h1bOpacity = useTransform(scrollY, [220, 520], [0, 1]);
  const h1bY       = useTransform(scrollY, [220, 520], [40, 0]);
  const subOpacity = useTransform(scrollY, [420, 680], [0, 1]);
  const subY       = useTransform(scrollY, [420, 680], [24, 0]);
  const ctaOpacity = useTransform(scrollY, [540, 760], [0, 1]);
  const ctaY       = useTransform(scrollY, [540, 760], [20, 0]);
  const trustOpacity = useTransform(scrollY, [600, 800], [0, 1]);
  const chevronOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <div className="flex flex-col items-center px-6 text-center">
      <motion.span
        style={{ opacity: labelOpacity, y: labelY }}
        className="mb-4 block font-ui text-[10px] font-bold tracking-[0.22em] uppercase text-[#C8A951]"
      >
        A VIRADA
      </motion.span>

      <motion.div
        style={{ opacity: dividerOpacity, scaleX: dividerScaleX, originX: 0.5 }}
        className="mb-7 h-px w-9 bg-[#C8A951]"
      />

      <h1 className="mb-6 leading-[1.15]">
        <motion.span
          style={{ opacity: h1aOpacity, y: h1aY, letterSpacing: "0.25em" }}
          className="block font-hero text-[clamp(36px,5.5vw,76px)] font-normal uppercase text-white"
        >
          Revide
        </motion.span>
        <motion.span
          style={{ opacity: h1bOpacity, y: h1bY, letterSpacing: "0.25em" }}
          className="block font-hero text-[clamp(36px,5.5vw,76px)] font-normal uppercase text-[#C8A951]"
        >
          o jogo dele.
        </motion.span>
      </h1>

      <motion.p
        style={{
          opacity: subOpacity,
          y: subY,
          textShadow: "0 1px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7)",
        }}
        className="font-ui mb-10 max-w-xs text-[15px] font-light leading-relaxed text-white/80 sm:max-w-sm"
      >
        O manual prático para mulheres identificarem padrões de manipulação
        masculina antes de se envolverem, se prenderem ou caírem no mesmo tipo
        de homem de novo.
      </motion.p>

      <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
        <a
          href={kiwifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex min-h-[52px] items-center overflow-hidden border border-[#C8A951] px-10 py-4 font-ui text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A951] transition-colors duration-200 hover:text-[#080808]"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-[#C8A951] transition-transform duration-200 group-hover:scale-x-100" />
          <span className="relative z-10">ABRIR O MANUAL</span>
        </a>
      </motion.div>

      <motion.p
        style={{ opacity: trustOpacity }}
        className="font-ui mt-4 text-[10px] uppercase tracking-widest text-[#8A8070]"
      >
        Acesso imediato · Kiwify · 7 dias de garantia
      </motion.p>

      <motion.div style={{ opacity: chevronOpacity }} className="mt-10">
        <ChevronDown
          className="animate-bounce text-[#C8A951]/60"
          size={20}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
