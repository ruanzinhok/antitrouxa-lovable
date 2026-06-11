import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.4, 0, 0.2, 1] as const;

const LINE1 = "Todo homem é previsível".split(" ");
const LINE2 = "quando se enxerga o padrão.".split(" ");

const ITEMS = [
  "Você entende por que ele some e reaparece.",
  "Você lê as mudanças no decorrer do relacionamento.",
  "Você acaba com os joguinhos antes de se envolver.",
  "Você assume o controle em qualquer relação.",
];

export function PatternSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="py-16 md:py-[120px]" aria-labelledby="p-title">
      <div ref={ref} className="mx-auto max-w-[1200px] px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-[14px] block font-ui text-[10px] font-bold tracking-[0.22em] uppercase text-[#C8A951]"
        >
          O PADRÃO
        </motion.span>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
          className="mb-7 h-px w-9 origin-left bg-[#C8A951]"
        />

        <h2
          id="p-title"
          className="mb-7 md:mb-11 font-editorial text-[clamp(32px,3.8vw,54px)] font-bold leading-[1.12] tracking-[-0.01em] text-[#C4BDB3]"
        >
          <span className="block">
            {LINE1.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden leading-[1.25]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.52, ease: EASE, delay: 0.18 + i * 0.055 }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block">
            {LINE2.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden leading-[1.25]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.52,
                    ease: EASE,
                    delay: 0.18 + (LINE1.length + i) * 0.055,
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </span>
        </h2>

        <ul role="list" className="grid gap-[22px]">
          {ITEMS.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 + i * 0.1 }}
              className="flex items-start gap-[18px] font-ui text-[16px] font-light leading-[1.65] text-[#8A8070]"
            >
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.28, ease: EASE, delay: 0.48 + i * 0.1 }}
                className="mt-[5px] shrink-0 text-[11px] text-[#C8A951]"
              >
                ✦
              </motion.span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
