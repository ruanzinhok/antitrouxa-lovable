import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { HeroContent } from "@/components/ui/hero-content";
import { Navbar } from "@/components/navbar";
import { FloatingBar } from "@/components/floating-bar";
import { Reveal } from "@/components/reveal";
import { AccordionGroup } from "@/components/accordion-group";
import { Testimonials } from "@/components/testimonials";
import { NarrativeSection } from "@/components/narrative-section";
import { AuthorImages } from "@/components/author-images";
import { PatternSection } from "@/components/pattern-section";
import { FilterSection } from "@/components/filter-section";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ModuleCarousel } from "@/components/ui/module-carousel";

const KIWIFY_URL =
  "https://pay.kiwify.com.br/N4LKQ9J?utm_source=organic&utm_campaign&utm_medium&utm_content&utm_term";

const WINE = "#1A0A0F";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-[14px] block font-ui text-[10px] font-bold tracking-[0.22em] uppercase text-[#C8A951]">
      {children}
    </span>
  );
}

function Divider({ center }: { center?: boolean }) {
  return (
    <div
      className={`mb-7 h-px w-9 bg-[#C8A951]${center ? " mx-auto" : ""}`}
    />
  );
}

function Btn({
  href,
  solid,
  children,
}: {
  href: string;
  solid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex min-h-[52px] items-center overflow-hidden border border-[#C8A951] px-10 py-[18px] font-ui text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 ${
        solid
          ? "bg-[#C8A951] text-[#080808]"
          : "text-[#C8A951] hover:text-[#080808]"
      }`}
    >
      <span
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${
          solid ? "bg-[#9A7A2F]" : "bg-[#C8A951]"
        }`}
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-[14px] font-ui text-[11px] uppercase tracking-[0.08em] text-[#8A8070]">
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={`font-editorial text-[clamp(32px,3.8vw,52px)] font-bold leading-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <FloatingBar kiwifyUrl={KIWIFY_URL} />
      <Navbar kiwifyUrl={KIWIFY_URL} />

      <main className="bg-[#080808]">
        {/* ── HERO ── */}
        <section id="inicio">
          <SmoothScrollHero
            scrollHeight={1500}
            videoSrc="/wine-hero.mp4"
            desktopImage="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop"
            mobileImage="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop"
            initialClipPercentage={20}
            finalClipPercentage={80}
          >
            <HeroContent scrollHeight={1500} kiwifyUrl={KIWIFY_URL} />
          </SmoothScrollHero>
        </section>

        {/* ── VÍDEO ── */}
        <section
          className="py-16 md:py-[120px] text-center"
          style={{ background: WINE }}
          aria-labelledby="v-title"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <Label>ANTES DE TUDO</Label>
            </Reveal>
            <Reveal delay={100}>
              <Divider center />
            </Reveal>
            <Reveal delay={100}>
              <h2
                id="v-title"
                className="font-editorial text-[clamp(32px,3.8vw,54px)] font-bold mb-[10px] text-[#C4BDB3]"
              >
                Assista a confissão.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-11 font-ui text-[15px] font-light text-[#8A8070]">
                Tainan explica, com as próprias palavras, por que escreveu este
                manual.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div
                className="relative mx-auto mb-3 max-w-[540px]"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/rc7r6OCvPrk"
                  title="Tainan Vanzelli — Manual Anti-Trouxa"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border border-[#2A2520]"
                />
              </div>
            </Reveal>
            <Reveal delay={300}>
              <p className="mb-9 font-ui text-[10px] uppercase tracking-[0.1em] text-[#8A8070]">
                ▶ Clique no vídeo para assistir
              </p>
              <div className="flex flex-col items-center gap-[14px]">
                <Btn href={KIWIFY_URL}>QUERO O MANUAL — R$ 197,00 →</Btn>
                <Trust>Acesso imediato · Garantia de 7 dias · Kiwify</Trust>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── NARRATIVA ── */}
        <NarrativeSection kiwifyUrl={KIWIFY_URL} />

        {/* ── O PADRÃO ── */}
        <PatternSection />

        {/* ── AUTOR ── */}
        <section
          id="sobre"
          className="py-16 md:py-[120px] overflow-hidden"
          style={{ background: WINE }}
          aria-labelledby="a-title"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-10 md:gap-[72px] items-center md:grid-cols-2">
              <AuthorImages />
              <div>
                <Reveal>
                  <Label>QUEM ESTÁ TE DANDO AULA</Label>
                </Reveal>
                <Reveal delay={100}>
                  <Divider />
                </Reveal>
                <Reveal delay={100}>
                  <h2
                    id="a-title"
                    className="font-editorial text-[clamp(32px,3.8vw,52px)] font-bold mb-[10px] text-[#C4BDB3]"
                  >
                    A confissão.
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  <p className="mb-7 font-ui text-[14px] font-light tracking-[0.04em] text-[#C8A951]">
                    Eu já fui o pior deles. Mudei de lado.
                  </p>
                  <div className="space-y-[18px] font-ui text-[15px] font-light leading-[1.82] text-[#8A8070]">
                    <p>
                      Não estou usando essa frase pra parecer interessante.
                      <br />
                      Estou usando porque é verdade.
                    </p>
                    <p>
                      Eu ensinei homens. Como abordar uma mulher em três frases.
                      Como criar conexão em um jantar. Como identificar a
                      fragilidade dela num story e saber a hora certa de
                      interagir. Como espelhar linguagem corporal pra parecer
                      alma gêmea em quarenta minutos. Como fabricar
                      coincidência. Como construir intimidade no primeiro
                      encontro.
                    </p>
                    <p>
                      Eu fui bom no jogo.{" "}
                      <strong className="text-[#F0EDE6] font-normal">
                        Bom o suficiente para ganhar dinheiro ensinando outros
                        homens.
                      </strong>
                    </p>
                    <p>
                      Hoje eu levo minha experiência para os negócios. E agora,
                      para este assunto. As técnicas que eles usam — agora nas
                      suas mãos. Sim. Você vai aprender a usar.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTEÚDO / ACORDEÃO ── */}
        <section
          id="manual"
          className="py-16 md:py-[120px]"
          aria-labelledby="c-title"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <Label>O CONTEÚDO</Label>
            </Reveal>
            <Reveal delay={100}>
              <Divider />
            </Reveal>
            <Reveal delay={100}>
              <SectionHeading
                className="mb-8 md:mb-[52px] text-[#C4BDB3]"
                id="c-title"
              >
                O que está dentro.
              </SectionHeading>
            </Reveal>

            <Reveal delay={200}>
              <ModuleCarousel />
            </Reveal>

            <Reveal className="mt-8 md:mt-[52px]">
              <Btn href={KIWIFY_URL}>ABRIR O MANUAL — R$ 197,00</Btn>
            </Reveal>
          </div>
        </section>

        {/* ── FILTRO ── */}
        <FilterSection />

        {/* ── DEPOIMENTOS ── */}
        <section
          id="depoimentos"
          className="py-16 md:py-[120px]"
          aria-labelledby="d-title"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <Label>AS PRIMEIRAS</Label>
            </Reveal>
            <Reveal delay={100}>
              <Divider />
            </Reveal>
            <Reveal delay={100}>
              <SectionHeading
                className="mb-[10px] text-[#C4BDB3]"
                id="d-title"
              >
                De quem já abriu.
              </SectionHeading>
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-11 font-ui text-[14px] font-light text-[#8A8070]">
                O que dizem as mulheres que leram antes de você.
              </p>
            </Reveal>
            <Testimonials />
          </div>
        </section>

        {/* ── BÔNUS ── */}
        <section
          id="bonus"
          className="py-16 md:py-[120px]"
          style={{ background: WINE }}
          aria-labelledby="b-title"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <Label>ALÉM DO MANUAL</Label>
            </Reveal>
            <Reveal delay={100}>
              <Divider />
            </Reveal>
            <Reveal delay={100}>
              <SectionHeading className="mb-2 text-[#C4BDB3]" id="b-title">
                O que mais entra junto.
              </SectionHeading>
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-8 md:mb-[52px] font-ui text-[14px] font-light text-[#8A8070]">
                Três bônus que sozinhos justificam a compra.
              </p>
            </Reveal>
            <div className="grid gap-[22px] md:grid-cols-3">
              {[
                {
                  num: "I",
                  tag: "INCLUSO",
                  name: "A IA Anti-Trouxa",
                  desc: "Cola conversas reais. Ela identifica em segundos quais técnicas de manipulação ele está usando. Em tempo real, sem você precisar adivinhar.",
                  orig: "R$ 477,00",
                },
                {
                  num: "II",
                  tag: "INCLUSO",
                  name: "Como operar a IA na prática",
                  desc: "Trinta minutos comigo demonstrando com casos reais. O que colar, como interpretar o diagnóstico, o que fazer com cada resposta.",
                  orig: "R$ 97,00",
                },
                {
                  num: "III",
                  tag: "INCLUSO",
                  name: "Esse relacionamento tem futuro?",
                  desc: "O que você está vivendo merece os próximos meses da sua vida ou você já deveria ter saído?",
                  orig: "R$ 67,00",
                },
              ].map((b, i) => (
                <Reveal key={i} delay={(i + 1) * 100}>
                  <div className="border border-[rgba(200,169,81,0.28)] p-6 md:p-9 transition-colors hover:border-[#C8A951]">
                    <div
                      aria-hidden="true"
                      className="mb-5 font-display text-[56px] font-light leading-none text-[rgba(200,169,81,0.12)]"
                    >
                      {b.num}
                    </div>
                    <span className="mb-4 inline-block border border-[rgba(200,169,81,0.28)] px-[9px] py-[3px] font-ui text-[9px] font-bold tracking-[0.2em] uppercase text-[#C8A951]">
                      {b.tag}
                    </span>
                    <h3 className="mb-[14px] font-editorial text-[20px] font-bold text-[#C4BDB3]">
                      {b.name}
                    </h3>
                    <p className="mb-5 font-ui text-[14px] font-light leading-[1.72] text-[#8A8070]">
                      {b.desc}
                    </p>
                    <p className="font-ui text-[12px] text-[#8A8070]">
                      <s className="opacity-60">{b.orig}</s> →{" "}
                      <strong className="text-[13px] text-[#C8A951]">
                        INCLUSO
                      </strong>
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PREÇO ── */}
        <section className="py-16 md:py-[120px]" aria-labelledby="pr-title">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <Label>ACESSO TOTAL</Label>
            </Reveal>
            <Reveal delay={100}>
              <Divider />
            </Reveal>
            <Reveal delay={100}>
              <SectionHeading className="mb-2 text-[#C4BDB3]" id="pr-title">
                O que você leva.
              </SectionHeading>
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-11 font-ui text-[14px] font-light text-[#8A8070]">
                Tudo dentro de um único acesso.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div
                role="table"
                aria-label="Resumo de valor"
                className="mb-9 border border-[rgba(200,169,81,0.14)]"
              >
                {[
                  {
                    name: "Manual Anti-Trouxa",
                    desc: "10 aulas em vídeo",
                    orig: "R$ 477,00",
                  },
                  {
                    name: "IA Anti-Trouxa",
                    desc: "Análise em tempo real",
                    orig: "R$ 297,00",
                  },
                  {
                    name: "Aula exclusiva de IA",
                    desc: "Como operar na prática",
                    orig: "R$ 97,00",
                  },
                  {
                    name: "E-book",
                    desc: "Esse relacionamento tem futuro?",
                    orig: "R$ 67,00",
                  },
                ].map((r, i) => (
                  <div
                    key={i}
                    role="row"
                    className="grid items-center border-b border-[#2A2520] px-7 py-[18px] font-ui text-[14px] gap-5 grid-cols-[1fr_1fr_auto] max-sm:grid-cols-1 max-sm:gap-[2px] max-sm:px-[18px] max-sm:py-[14px]"
                  >
                    <span role="cell" className="font-medium text-[#F0EDE6]">
                      {r.name}
                    </span>
                    <span
                      role="cell"
                      className="font-light text-[13px] text-[#8A8070]"
                    >
                      {r.desc}
                    </span>
                    <span
                      role="cell"
                      className="text-right text-[13px] text-[#8A8070] line-through max-sm:text-left"
                    >
                      {r.orig}
                    </span>
                  </div>
                ))}
                <div
                  role="row"
                  className="grid items-center border-b border-[#2A2520] bg-[rgba(200,169,81,0.04)] px-7 py-[18px] font-ui text-[14px] gap-5 grid-cols-[1fr_1fr_auto] max-sm:grid-cols-1 max-sm:gap-[2px]"
                >
                  <span
                    role="cell"
                    className="font-light text-[13px] text-[#8A8070]"
                  >
                    Total separado:
                  </span>
                  <span role="cell" />
                  <span
                    role="cell"
                    className="text-right text-[13px] text-[#8A8070] line-through max-sm:text-left"
                  >
                    R$ 938,00
                  </span>
                </div>
                <div
                  role="row"
                  className="flex items-center justify-between bg-[rgba(200,169,81,0.07)] px-7 py-7 max-sm:flex-col max-sm:items-start max-sm:gap-3"
                >
                  <div role="cell">
                    <div className="mb-1 font-ui text-[10px] uppercase tracking-[0.16em] text-[#8A8070]">
                      HOJE, TUDO POR:
                    </div>
                    <div className="font-display text-[52px] font-light text-[#C8A951] max-sm:text-[38px]">
                      R$ 197,00
                    </div>
                  </div>
                  <span
                    role="cell"
                    className="font-ui text-[12px] font-semibold tracking-[0.06em] text-[#C8A951]"
                  >
                    ACESSO TOTAL
                  </span>
                </div>
              </div>

              <div className="mb-9 flex flex-wrap gap-9 max-sm:flex-col max-sm:gap-[14px]">
                {[
                  ["🔒", "100% Seguro"],
                  ["✓", "Garantia 7 Dias"],
                  ["⚡", "Acesso Imediato"],
                  ["💳", "Visa · Mastercard · Pix · Boleto"],
                ].map(([icon, label], i) => (
                  <div
                    key={i}
                    className="flex items-center gap-[10px] font-ui text-[12px] text-[#8A8070]"
                  >
                    <div
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center border border-[rgba(200,169,81,0.28)] text-[13px]"
                    >
                      {icon}
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-[14px]">
                <Btn href={KIWIFY_URL} solid>
                  ABRIR O MANUAL — R$ 197,00
                </Btn>
                <Trust>Acesso imediato · Kiwify · Garantia de 7 dias</Trust>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── ÚLTIMA CHAMADA ── */}
        <section
          className="py-16 md:py-[120px] text-center"
          style={{ background: WINE }}
          aria-labelledby="lc-title"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <Label>ÚLTIMA CHAMADA</Label>
            </Reveal>
            <Reveal delay={100}>
              <Divider center />
            </Reveal>
            <Reveal delay={100}>
              <h2
                id="lc-title"
                className="font-editorial mx-auto mb-[14px] max-w-[920px] text-[clamp(24px,2.6vw,36px)] font-bold leading-[1.25] text-[#C4BDB3]"
              >
                Você vai continuar sem saber o jogo que está sendo{" "}
                <span className="text-[#C8A951]">jogado contra você?</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-editorial mb-11 text-[clamp(26px,3.2vw,46px)] font-bold text-[#C8A951]">
                Ou vai virar o tabuleiro?
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col items-center gap-[14px]">
                <Btn href={KIWIFY_URL} solid>
                  ABRIR O MANUAL — R$ 197,00
                </Btn>
                <Trust>Acesso imediato · Kiwify · Garantia de 7 dias</Trust>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-[120px]" aria-labelledby="fq-title">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <Label>DÚVIDAS</Label>
            </Reveal>
            <Reveal delay={100}>
              <Divider />
            </Reveal>
            <Reveal delay={100}>
              <SectionHeading
                className="mb-8 md:mb-[52px] text-[#C4BDB3]"
                id="fq-title"
              >
                Perguntas frequentes.
              </SectionHeading>
            </Reveal>
            <Reveal delay={200}>
              <AccordionGroup
                items={[
                  {
                    num: "?",
                    title: "É um curso em vídeo ou um material escrito?",
                    body: "Os dois formatos, uma função só. São 10 videoaulas diretas, organizadas em 3 atos — cada uma explica táticas que ele usa e como desarmá-la. Junto, você recebe um ebook para avaliar se o seu relacionamento tem futuro, e uma IA que analisa suas conversas e aponta onde está a manipulação, frase por frase. Chama manual porque funciona como um: você não assiste passivamente. Você consulta, identifica e aplica.",
                  },
                  {
                    num: "?",
                    title: "Como recebo o acesso?",
                    body: "Imediatamente após a confirmação do pagamento, você recebe um e-mail com o link de acesso. O processo é automático — em menos de 5 minutos você já está dentro.",
                  },
                  {
                    num: "?",
                    title: "A garantia de 7 dias funciona como?",
                    body: "Simples: se em 7 dias você não achar que valeu a pena, peça o reembolso. Sem justificativas, sem burocracia. 100% do valor de volta. A garantia é real e irrestrita.",
                  },
                  {
                    num: "?",
                    title:
                      "A IA Anti-Trouxa funciona no WhatsApp e Instagram?",
                    body: "Sim. Você copia a conversa que quer analisar, cola na IA e ela identifica padrões de manipulação em tempo real. Funciona com qualquer texto — WhatsApp, Instagram, e-mail, o que for.",
                  },
                  {
                    num: "?",
                    title:
                      "Funciona para quem já está em um relacionamento?",
                    body: "Sim. O manual funciona para quem está solteira e quer aprender antes de se envolver, para quem está em um relacionamento e sente que algo está errado, e para quem acabou de sair e quer entender o que aconteceu.",
                  },
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-[#2A2520] bg-[#040404] py-11 text-center">
          <div className="mx-auto max-w-[1200px] px-6">
            <p className="mb-[14px] font-ui text-[12px] font-light tracking-[0.04em] text-[#8A8070]">
              Copyright © 2026 Tainan Vanzelli · A Ovelha Negra. Todos os
              direitos reservados.
            </p>
            <nav
              className="flex flex-wrap justify-center gap-7"
              aria-label="Links do rodapé"
            >
              {["Termos de Uso", "Política de Privacidade", "Contato"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="font-ui text-[10px] uppercase tracking-[0.12em] text-[#8A8070] transition-colors hover:text-[#C8A951] focus-visible:text-[#C8A951] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C8A951]"
                  >
                    {l}
                  </a>
                )
              )}
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
