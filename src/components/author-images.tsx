import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const EASE = [0.4, 0, 0.2, 1] as const;

export function AuthorImages() {
  const ref = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShown(true);
        } else {
          const exitedBelow = entry.boundingClientRect.top > window.innerHeight;
          if (exitedBelow) setShown(false);
        }
      },
      { threshold: 0.08, rootMargin: "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = photoRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - left) / width - 0.5) * 10,
      y: -((e.clientY - top) / height - 0.5) * 10,
    });
  }
  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div ref={ref}>
      <motion.div
        ref={photoRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateY: tilt.x, rotateX: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden"
      >
        <motion.div
          animate={{ scaleX: shown ? 0 : 1 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
          className="absolute inset-0 z-10 bg-[#1A0A0F]"
          style={{ transformOrigin: "right" }}
        />
        <motion.img
          src="https://www.antitrouxa.com/__l5e/assets-v1/6f21f1a0-8b7e-480d-8a28-bb545245a0d4/tainan-hero.png"
          alt="Tainan Vanzelli"
          loading="lazy"
          animate={{ scale: shown ? 1 : 1.08 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
          className="w-full max-h-[680px] object-cover object-top"
        />
        <motion.div
          animate={{
            opacity: Math.abs(tilt.x) > 1 || Math.abs(tilt.y) > 1 ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute inset-0 border border-[#C8A951]/40"
        />
      </motion.div>

      <motion.div
        animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 40 }}
        transition={{ duration: 0.65, ease: EASE, delay: shown ? 0.55 : 0 }}
        className="relative mt-5 overflow-hidden"
      >
        <motion.div
          animate={{ scaleX: shown ? 0 : 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: shown ? 0.55 : 0 }}
          className="absolute inset-0 z-10 bg-[#1A0A0F]"
          style={{ transformOrigin: "right" }}
        />
        <img
          src="https://www.antitrouxa.com/__l5e/assets-v1/5bc6ce24-bff8-454e-b899-fff6768a9678/instagram-stats.png"
          alt="Estatísticas do Instagram: 274 mil seguidores"
          loading="lazy"
          className="w-full border border-[rgba(200,169,81,0.18)]"
        />
      </motion.div>
    </div>
  );
}
