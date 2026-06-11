import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export interface AccItem {
  num: string;
  title: string;
  body: string;
}

const EASE = [0.4, 0, 0.2, 1] as const;

export function AccordionGroup({ items }: { items: AccItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div role="list" ref={ref}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          role="listitem"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.09 }}
          className="border-b border-[#2A2520]"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center gap-[18px] bg-transparent py-[22px] text-left text-[#F0EDE6] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C8A951] focus-visible:outline-offset-2 group"
          >
            <motion.span
              animate={
                open === i
                  ? { scale: 1.15, color: "#E8C870" }
                  : { scale: 1, color: "#C8A951" }
              }
              transition={{ duration: 0.22, ease: EASE }}
              className="w-[34px] shrink-0 font-editorial text-[22px] font-bold text-[#C8A951] leading-none"
            >
              {item.num}
            </motion.span>
            <span className="flex-1 font-ui text-[14px] font-medium tracking-[0.01em] transition-colors duration-200 group-hover:text-[#F0EDE6]">
              {item.title}
            </span>
            <motion.span
              aria-hidden="true"
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="shrink-0 text-[18px] leading-none text-[#C8A951]"
            >
              +
            </motion.span>
          </button>
          <div
            className="overflow-hidden"
            style={{
              maxHeight: open === i ? "400px" : "0",
              transition: "max-height 350ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div
              className="pb-6 pl-[56px] font-ui text-[14px] font-light leading-[1.8] text-[#8A8070]"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
