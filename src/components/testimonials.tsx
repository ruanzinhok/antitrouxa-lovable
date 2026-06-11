import { useState, useEffect, useRef, useCallback } from "react";

const BASE = "https://www.antitrouxa.com/__l5e/assets-v1/";
const SLIDES = [
  BASE + "b008076f-090a-491b-824e-5dcac00dd4a0/IMG_3736.jpg",
  BASE + "37ee3974-8d0d-4154-a33f-6a4d017ef88d/IMG_3737.jpg",
  BASE + "8c8bfcec-bbb8-403b-b184-9dd417f3a220/IMG_3741.jpg",
  BASE + "0a6bd223-d550-4c07-b0eb-1a7c8615566c/IMG_3742.jpg",
  BASE + "cc23bf96-2182-42cc-97ec-601533d23c55/IMG_3747.jpg",
  BASE + "8ac9c63c-4b25-492e-a1f0-61cd8f6da4ee/IMG_3748.jpg",
  BASE + "d777fcb4-643d-485a-be18-1160f4bde43a/IMG_3756.jpg",
  BASE + "a3757aab-c343-45b3-9c83-5ac7aebeef40/IMG_3755.jpg",
  BASE + "c3850601-3e89-41e7-95c6-4d7998b64161/IMG_3758.jpg",
  BASE + "eb4c787c-6fa9-4b00-ad72-d8d74dd0edf6/IMG_3759.jpg",
  BASE + "3530de79-0fac-48af-8928-dc5948fe2d3f/IMG_3761.jpg",
  BASE + "cbf09134-471f-4843-94b8-3a446a42c630/IMG_3753.jpg",
  BASE + "2aa7e242-2c18-484b-b1dd-37a63724f2a3/IMG_3754.jpg",
  BASE + "05c31c28-f8fc-42a0-bedf-24b07bf50cb3/IMG_3764.jpg",
  BASE + "49164c81-14cf-4c22-8d28-7978107df893/IMG_3765.jpg",
  BASE + "0cbf3a03-31af-432e-8ff2-59248a7da3c5/IMG_3766.jpg",
  BASE + "b4746cde-abea-4a8f-982a-36b5917d172c/IMG_3767.jpg",
  BASE + "6ef3ac11-eb26-428a-9818-1a360a99244f/IMG_3768.jpg",
  BASE + "32113ef8-064c-4604-9f63-cf26c2b587cd/IMG_3769.jpg",
  BASE + "c7c12caf-4ab4-4658-b7f1-f4b3347b2960/IMG_3745.jpg",
  BASE + "599f8848-aeb7-4919-933f-abdaed7dfad5/IMG_3746.jpg",
];

export function Testimonials() {
  const [cur, setCur] = useState(0);
  const [vis, setVis] = useState(3);
  const autoRef = useRef<ReturnType<typeof setInterval>>();
  const txStart = useRef(0);
  const txDelta = useRef(0);

  useEffect(() => {
    const update = () =>
      setVis(
        window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIdx = Math.max(0, SLIDES.length - vis);

  const goTo = useCallback(
    (i: number) => setCur(Math.max(0, Math.min(i, maxIdx))),
    [maxIdx]
  );

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(
      () => setCur((c) => (c >= maxIdx ? 0 : c + 1)),
      4000
    );
  }, [maxIdx]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [startAuto]);

  const pct = vis > 0 ? cur * (100 / vis) : 0;
  const dots = Array.from({ length: maxIdx + 1 });

  return (
    <>
      <div className="overflow-hidden -mx-6" aria-label="Depoimentos de clientes">
        <div
          className="flex"
          style={{
            transform: `translateX(-${pct}%)`,
            transition: "transform 350ms cubic-bezier(0.4,0,0.2,1)",
          }}
          onTouchStart={(e) => {
            txStart.current = e.touches[0].clientX;
            clearInterval(autoRef.current);
          }}
          onTouchMove={(e) => {
            txDelta.current = e.touches[0].clientX - txStart.current;
          }}
          onTouchEnd={() => {
            if (Math.abs(txDelta.current) > 50)
              txDelta.current < 0 ? goTo(cur + 1) : goTo(cur - 1);
            txDelta.current = 0;
            startAuto();
          }}
        >
          {SLIDES.map((src, i) => (
            <div
              key={i}
              style={{ flex: `0 0 calc(100% / ${vis})` }}
              className="px-[10px]"
            >
              <img
                src={src}
                alt={`Depoimento ${i + 1}`}
                loading="lazy"
                className="w-full h-auto border border-[rgba(200,169,81,0.12)]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-9 flex items-center justify-center gap-5">
        <button
          onClick={() => {
            goTo(cur - 1);
            startAuto();
          }}
          aria-label="Depoimento anterior"
          className="flex h-11 w-11 items-center justify-center border border-[rgba(200,169,81,0.35)] text-[#C8A951] transition-colors hover:bg-[#C8A951] hover:text-[#080808]"
        >
          ←
        </button>

        <div className="flex gap-[7px]" role="tablist" aria-label="Navegar depoimentos">
          {dots.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-label={`Depoimento ${i + 1}`}
              onClick={() => {
                goTo(i);
                startAuto();
              }}
              className="h-[6px] w-[6px] rounded-full border-none transition-all duration-150"
              style={{
                background: i === cur ? "#C8A951" : "#2A2520",
                transform: i === cur ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => {
            goTo(cur + 1);
            startAuto();
          }}
          aria-label="Próximo depoimento"
          className="flex h-11 w-11 items-center justify-center border border-[rgba(200,169,81,0.35)] text-[#C8A951] transition-colors hover:bg-[#C8A951] hover:text-[#080808]"
        >
          →
        </button>
      </div>
    </>
  );
}
