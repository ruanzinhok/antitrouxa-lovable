import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const SLIDES = [
  { label: "A CONFISSÃO", line1: "Eu já fui",      line2: "o pior deles." },
  { label: "O MÉTODO",    line1: "Ensinei homens", line2: "a fabricar amor." },
  { label: "A VIRADA",   line1: "Mudei",           line2: "de lado." },
  { label: "AGORA",      line1: "O jogo está",     line2: "nas suas mãos." },
];

function NarrativeSlide({
  label,
  line1,
  line2,
  scrollYProgress,
  threshold,
}: {
  label: string;
  line1: string;
  line2: string;
  scrollYProgress: MotionValue<number>;
  threshold: number;
}) {
  const t = threshold;
  const d = 0.07;

  const dotScale = useTransform(
    scrollYProgress,
    [t, t + d * 0.55, t + d * 0.95, t + d * 1.4],
    [0.35, 1.65, 0.88, 1]
  );
  const dotBg = useTransform(
    scrollYProgress,
    [t, t + d * 0.55, t + d * 1.4],
    ["rgba(200,169,81,0)", "rgba(200,169,81,1)", "rgba(200,169,81,1)"]
  );

  const ringScale = useTransform(
    scrollYProgress,
    [t, t + d * 0.5, t + d * 1.4],
    [0.4, 2.8, 3.4]
  );
  const ringOpacity = useTransform(
    scrollYProgress,
    [t, t + d * 0.5, t + d * 1.4],
    [0.7, 0.3, 0]
  );

  const labelOp = useTransform(scrollYProgress, [t, t + d * 1.2], [0, 1]);
  const labelY = useTransform(scrollYProgress, [t, t + d * 1.2], [12, 0]);

  const l1Op = useTransform(scrollYProgress, [t + d * 0.4, t + d * 1.8], [0, 1]);
  const l1Y = useTransform(scrollYProgress, [t + d * 0.4, t + d * 1.8], [36, 0]);

  const l2Op = useTransform(scrollYProgress, [t + d * 0.9, t + d * 2.3], [0, 1]);
  const l2Y = useTransform(scrollYProgress, [t + d * 0.9, t + d * 2.3], [36, 0]);

  return (
    <div
      className="grid border-b border-[rgba(200,169,81,0.08)] last:border-0"
      style={{ gridTemplateColumns: "56px 1fr" }}
    >
      <div className="relative flex items-start justify-center pt-[42px] md:pt-[76px]">
        <motion.div
          aria-hidden="true"
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="absolute top-[42px] md:top-[76px] h-[10px] w-[10px] rounded-full border border-[#C8A951]"
        />
        <motion.div
          data-dot
          style={{ scale: dotScale, backgroundColor: dotBg }}
          className="h-[10px] w-[10px] rounded-full border border-[#C8A951]"
        />
      </div>

      <div className="py-10 md:py-[72px] pr-2">
        <motion.span
          style={{ opacity: labelOp, y: labelY }}
          className="mb-[14px] block font-ui text-[10px] font-bold tracking-[0.22em] uppercase text-[#C8A951]"
        >
          {label}
        </motion.span>

        <h2
          className="font-editorial leading-[1.05]"
          style={{ fontSize: "clamp(26px, 3.6vw, 52px)" }}
        >
          <motion.span
            style={{ opacity: l1Op, y: l1Y }}
            className="block font-bold text-[#C4BDB3]"
          >
            {line1}
          </motion.span>
          <motion.span
            style={{ opacity: l2Op, y: l2Y }}
            className="block font-bold text-[#C8A951]"
          >
            {line2}
          </motion.span>
        </h2>
      </div>
    </div>
  );
}

export function NarrativeSection({ kiwifyUrl }: { kiwifyUrl: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 40%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [thresholds, setThresholds] = useState([0.12, 0.34, 0.56, 0.78]);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerH = containerRef.current.offsetHeight;
      const containerTop =
        containerRef.current.getBoundingClientRect().top + window.scrollY;
      const dots = containerRef.current.querySelectorAll("[data-dot]");
      const measured = Array.from(dots).map((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const centerY = r.top + window.scrollY + r.height / 2 - containerTop;
        return Math.max(0, Math.min(0.95, centerY / containerH));
      });
      if (measured.length === SLIDES.length) setThresholds(measured);
    };

    const id = setTimeout(measure, 200);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-[120px]"
      style={{ background: "#1A0A0F" }}
      aria-label="A história do autor"
    >
      <div className="mx-auto max-w-[900px] px-6">
        <div ref={containerRef} className="relative">
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[2px]"
            style={{
              left: "27px",
              scaleY: lineScaleY,
              transformOrigin: "top",
              background:
                "linear-gradient(to bottom, transparent, #C8A951 6%, #C8A951 94%, transparent)",
            }}
          />

          {SLIDES.map((s, i) => (
            <NarrativeSlide
              key={i}
              {...s}
              scrollYProgress={scrollYProgress}
              threshold={thresholds[i]}
            />
          ))}

          <div className="grid" style={{ gridTemplateColumns: "56px 1fr" }}>
            <div />
            <div className="pb-2 pt-14">
              <a
                href={kiwifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex min-h-[52px] items-center overflow-hidden border border-[#C8A951] px-10 py-[18px] font-ui text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A951] transition-colors duration-200 hover:text-[#080808]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#C8A951] transition-transform duration-200 group-hover:scale-x-100" />
                <span className="relative z-10">
                  ABRIR O MANUAL — R$ 197,00 →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
