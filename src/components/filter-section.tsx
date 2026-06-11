import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.4, 0, 0.2, 1] as const;

const FOR_YOU = [
  "Saiu de um relacionamento e se sente perdida sem saber o porquê de tudo.",
  "Quer entender a cabeça dos homens para se blindar de homens tóxicos.",
  "Já se manteve dentro de um relacionamento ruim, mesmo sabendo que era para sair.",
  "Atrai sempre o mesmo tipo de homem, que não te valoriza, que brinca com você.",
  "Quer aprender a ler um homem, facilmente.",
];

const NOT_FOR_YOU = [
  "Você quer um curso sobre auto-valorização e palavras bonitas.",
  "Você acredita que todos os homens são iguais e que tem azar no amor.",
  "Você quer continuar acreditando que não existe um padrão comportamental por trás de todo relacionamento.",
  "Você ainda espera o homem perfeito cair do céu.",
];

export function FilterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section
      className="py-16 md:py-[120px]"
      style={{ background: "#1A0A0F" }}
      aria-labelledby="f-title"
    >
      <div ref={ref} className="mx-auto max-w-[1200px] px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-[14px] block font-ui text-[10px] font-bold tracking-[0.22em] uppercase text-[#C8A951]"
        >
          FILTRO
        </motion.span>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
          className="mb-7 h-px w-9 origin-left bg-[#C8A951]"
        />

        <h2
          id="f-title"
          className="mb-8 md:mb-[52px] font-editorial text-[clamp(32px,3.8vw,52px)] font-bold leading-[1.1] text-[#C4BDB3]"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
            >
              Este manual não
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.28 }}
            >
              é pra toda mulher.
            </motion.span>
          </span>
        </h2>

        <div className="grid gap-9 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.4 }}
          >
            <h3 className="mb-[22px] border-b border-[#2A2520] pb-[14px] font-ui text-[10px] font-bold tracking-[0.2em] uppercase text-[#C8A951]">
              ✓ É pra você se:
            </h3>
            <ul role="list" className="grid gap-[14px]">
              {FOR_YOU.map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.5 + i * 0.07 }}
                  className="relative pl-[22px] font-ui text-[14px] font-light leading-[1.6] text-[#8A8070] before:absolute before:left-0 before:font-bold before:text-[#C8A951] before:content-['✓']"
                >
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.4 }}
          >
            <h3 className="mb-[22px] border-b border-[#2A2520] pb-[14px] font-ui text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A8070]">
              ✗ NÃO é pra você se:
            </h3>
            <ul role="list" className="grid gap-[14px]">
              {NOT_FOR_YOU.map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.5 + i * 0.07 }}
                  className="relative pl-[22px] font-ui text-[14px] font-light leading-[1.6] text-[#8A8070] before:absolute before:left-0 before:text-[#4a3030] before:content-['✗']"
                >
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
