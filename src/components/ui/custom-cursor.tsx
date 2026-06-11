import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springCfg = { damping: 26, stiffness: 280, mass: 0.5 };
  const ringX = useSpring(mouseX, springCfg);
  const ringY = useSpring(mouseY, springCfg);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHover(!!el.closest("a, button, [role='button']"));
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      <motion.div
        style={{ left: ringX, top: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:           isHover ? 72 : 32,
          height:          isHover ? 72 : 32,
          opacity:         isVisible ? 1 : 0,
          backgroundColor: isHover ? "rgba(200,169,81,0.10)" : "transparent",
          borderColor:     isHover ? "rgba(200,169,81,0.55)" : "rgba(200,169,81,0.65)",
        }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border"
      />

      <motion.div
        style={{ left: mouseX, top: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:   isHover ? 3 : 6,
          height:  isHover ? 3 : 6,
          opacity: isVisible ? (isHover ? 0.5 : 1) : 0,
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-[#C8A951]"
      />
    </>
  );
}
