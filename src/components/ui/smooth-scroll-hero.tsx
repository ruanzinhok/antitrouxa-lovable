import * as React from "react";
import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

function SeamlessVideo({
  src,
  fadeSeconds = 1.8,
}: {
  src: string;
  fadeSeconds?: number;
}) {
  const ref0 = useRef<HTMLVideoElement>(null);
  const ref1 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let active = 0;
    let transitioning = false;
    let raf: number;

    const vids = [ref0.current!, ref1.current!];
    vids[1].style.opacity = "0";

    function frame() {
      const cur = vids[active];
      const nxt = vids[1 - active];

      if (cur.readyState >= 2 && cur.duration && isFinite(cur.duration)) {
        const remaining = cur.duration - cur.currentTime;

        if (!transitioning && remaining < fadeSeconds) {
          transitioning = true;
          nxt.currentTime = 0;
          nxt.play().catch(() => {});
        }

        if (transitioning) {
          const p = 1 - Math.max(0, remaining) / fadeSeconds;
          cur.style.opacity = String(Math.max(0, 1 - p));
          nxt.style.opacity = String(Math.min(1, p));
        }

        if (cur.ended || (transitioning && remaining <= 0)) {
          cur.style.opacity = "0";
          nxt.style.opacity = "1";
          cur.pause();
          active = 1 - active;
          transitioning = false;
        }
      }

      raf = requestAnimationFrame(frame);
    }

    vids[0].play().catch(() => {});
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [src, fadeSeconds]);

  return (
    <>
      <video
        ref={ref0}
        src={src}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={ref1}
        src={src}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
    </>
  );
}

interface SmoothScrollHeroProps {
  scrollHeight?: number;
  desktopImage?: string;
  mobileImage?: string;
  videoSrc?: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
  children?: React.ReactNode;
}

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage = "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop",
  mobileImage = "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
  videoSrc,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
}) => {
  const { scrollY } = useScroll();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0]
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100]
  );
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const bgScale     = useTransform(scrollY, [0, scrollHeight + 500], [1.35, 1]);
  const imageBgSize = useTransform(scrollY, [0, scrollHeight + 500], ["170%", "100%"]);

  return (
    <div
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
        style={{ clipPath, willChange: "clip-path" }}
      >
        {videoSrc ? (
          <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
            <SeamlessVideo src={videoSrc} fadeSeconds={1.8} />
            <div className="absolute inset-0 bg-black/55" />
          </motion.div>
        ) : (
          <>
            <motion.div
              className="absolute inset-0 md:hidden"
              style={{
                backgroundImage: `url(${mobileImage})`,
                backgroundSize: imageBgSize,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <motion.div
              className="absolute inset-0 hidden md:block"
              style={{
                backgroundImage: `url(${desktopImage})`,
                backgroundSize: imageBgSize,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </>
        )}
      </motion.div>

      {children && (
        <motion.div
          className="pointer-events-none sticky top-0 -mt-[100vh] flex h-screen w-full items-center justify-center overflow-hidden"
          style={{ clipPath, willChange: "clip-path" }}
        >
          <div className="pointer-events-auto">{children}</div>
        </motion.div>
      )}
    </div>
  );
};

export default SmoothScrollHero;
