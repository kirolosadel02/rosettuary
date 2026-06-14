import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/logo.png";
import courtyardAsset from "@/assets/render-courtyard.png";
import marinaAsset from "@/assets/render-marina.png";
import facadeAsset from "@/assets/render-facade.png";
import nileImg from "@/assets/nile-side.jpg";
import medImg from "@/assets/med-side.jpg";
import matConcrete from "@/assets/mat-concrete.jpg";
import matTimber from "@/assets/mat-timber.jpg";
import matStone from "@/assets/mat-stone.jpg";
import matWater from "@/assets/mat-water.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosettuary — Addiction Rehabilitation Center" },
      { name: "description", content: "An architectural sanctuary in Rashid, Egypt — where the Nile meets the Mediterranean." },
      { property: "og:title", content: "Rosettuary — Addiction Rehabilitation Center" },
      { property: "og:description", content: "Healing begins where the waters meet. Graduation project 2026, British University in Egypt." },
      { property: "og:image", content: facadeAsset },
    ],
  }),
  component: Index,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, as: As = "div", className = "" }: { children: React.ReactNode; delay?: number; as?: any; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <As ref={ref} className={`ros-reveal ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </As>
  );
}

function GoldLine({ className = "" }: { className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`ros-line h-px bg-[var(--gold)] ${className}`} />;
}

function ZoomImage({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const ref = useReveal<HTMLImageElement>();
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={`ros-zoom ${className}`}
    />
  );
}

function HeroSequence() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const frames = [courtyardAsset, facadeAsset, marinaAsset];
  // Each frame holds for 1/N of the scroll, crossfading
  const opacityFor = (i: number) => {
    const seg = 1 / frames.length;
    const center = seg * i + seg / 2;
    const dist = Math.abs(progress - center);
    return Math.max(0, 1 - dist / seg);
  };

  return (
    <section ref={sectionRef} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--ink)]">
        {frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{
              opacity: opacityFor(i),
              transform: `scale(${1.04 + progress * 0.06})`,
              transition: "opacity 700ms ease, transform 1.6s ease-out",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[var(--soft)]">
          <div className="label-caps mb-6 text-[var(--gold)]">Rashid · Egypt · 2026</div>
          <h1 className="serif-thin text-[clamp(3.5rem,12vw,11rem)] leading-[0.95]" style={{ fontWeight: 200, letterSpacing: "0.08em" }}>
            ROSETTUARY
          </h1>
          <div className="mt-4 label-caps text-[var(--gold)]">Addiction Rehabilitation Center</div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3 text-[var(--soft)]/80">
          <div className="label-caps text-[0.6rem] opacity-70">Designed by Eng. Philopateer Amir</div>
          <div className="h-12 w-px bg-[var(--gold)]" />
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-[var(--gold)]"><path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1" /></svg>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-[var(--cream)] text-[var(--ink)]">
      {/* 1. HERO */}
      <HeroSequence />

      {/* 2. IDENTITY */}
      <section className="bg-[var(--cream)] py-28 md:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <img src={logoAsset} alt="Rosettuary logo" className="mx-auto w-full max-w-md" />
          </Reveal>
          <Reveal delay={200}>
            <div className="label-caps mt-10 text-[var(--gold)]">
              Healing Minds · Restoring Hope · Building New Beginnings
            </div>
          </Reveal>
          <GoldLine className="mx-auto mt-10 w-32" />
          <Reveal delay={400}>
            <p className="serif-thin mx-auto mt-10 max-w-2xl text-xl leading-[1.9] text-[var(--ink)]/80 md:text-2xl">
              Rosettuary stands at the threshold of two ancient waters — where the Nile releases into
              the Mediterranean. A sanctuary designed not just to treat, but to transform.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. LOCATION */}
      <section className="bg-[var(--forest)] py-24 text-[var(--soft)] md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-0">
            <div className="text-center md:pr-12 md:text-left">
              <Reveal>
                <div className="label-caps mb-6 text-[var(--gold)]">Nile Side</div>
                <div className="overflow-hidden">
                  <ZoomImage src={nileImg} alt="The Nile side" className="h-80 w-full object-cover" />
                </div>
                <p className="serif-thin mt-8 text-2xl italic text-[var(--soft)]/85 md:text-3xl">
                  Stillness. Inward. Reflection.
                </p>
              </Reveal>
            </div>
            <div className="hidden md:block">
              <div className="mx-8 h-full w-px bg-[var(--gold)]/60" />
            </div>
            <div className="text-center md:pl-12 md:text-left">
              <Reveal delay={200}>
                <div className="label-caps mb-6 text-[var(--gold)]">Mediterranean Side</div>
                <div className="overflow-hidden">
                  <ZoomImage src={medImg} alt="The Mediterranean side" className="h-80 w-full object-cover" />
                </div>
                <p className="serif-thin mt-8 text-2xl italic text-[var(--soft)]/85 md:text-3xl">
                  Openness. Horizon. Release.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE BUILDING */}
      <section className="relative h-[100vh] w-full overflow-hidden bg-black">
        <ZoomImage src={courtyardAsset} alt="The building" className="absolute inset-0 h-full w-full object-cover opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute bottom-10 left-8 md:bottom-16 md:left-16">
          <div className="label-caps text-[var(--gold)]">Rashid, Egypt — 2026</div>
        </div>
      </section>

      {/* 5. PROGRAM */}
      <section className="bg-[var(--cream)] py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="label-caps text-center text-[var(--gold)]">The Program</div>
          </Reveal>
          <GoldLine className="mx-auto mt-6 w-24" />
          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: "❋", title: "Meditation Garden", line: "Where breath finds its rhythm" },
              { icon: "≈", title: "Sensory Paths", line: "The skin remembers what the mind forgets" },
              { icon: "♪", title: "Music Therapy Hall", line: "Sound as the oldest medicine" },
              { icon: "✦", title: "Craft Workshops", line: "The hand heals the heart" },
              { icon: "∽", title: "Water Terraces", line: "Two rivers hold you" },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl text-[var(--gold)]">{p.icon}</div>
                  <h3 className="serif-thin mt-6 text-xl text-[var(--forest)]" style={{ fontWeight: 400 }}>
                    {p.title}
                  </h3>
                  <div className="mt-3 h-px w-8 bg-[var(--gold)]/60" />
                  <p className="serif-thin mt-4 text-base italic leading-relaxed text-[var(--ink)]/70">
                    {p.line}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NILE FACADE */}
      <section className="relative h-[100vh] w-full overflow-hidden bg-black">
        <ZoomImage src={facadeAsset} alt="Nile facade" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24">
          <Reveal>
            <h2 className="serif-thin text-[clamp(2.5rem,7vw,5.5rem)] text-[var(--soft)]" style={{ fontWeight: 200, letterSpacing: "0.06em" }}>
              NILE FACADE
            </h2>
            <GoldLine className="mt-6 w-24" />
            <p className="label-caps mt-6 text-[var(--gold)]">The quiet side · Where patients arrive</p>
          </Reveal>
        </div>
      </section>

      {/* 7. MEDITERRANEAN FACADE */}
      <section className="relative h-[100vh] w-full overflow-hidden bg-black">
        <ZoomImage src={marinaAsset} alt="Mediterranean facade" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-end justify-center px-8 text-right md:px-24">
          <Reveal>
            <h2 className="serif-thin text-[clamp(2.5rem,7vw,5.5rem)] text-[var(--soft)]" style={{ fontWeight: 200, letterSpacing: "0.06em" }}>
              MEDITERRANEAN FACADE
            </h2>
            <GoldLine className="ml-auto mt-6 w-24" />
            <p className="label-caps mt-6 text-[var(--gold)]">The open side · Where patients begin again</p>
          </Reveal>
        </div>
      </section>

      {/* 8. HEALING JOURNEY */}
      <section className="bg-[var(--forest)] py-28 text-[var(--soft)] md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="label-caps text-center text-[var(--gold)]">The Healing Journey</div>
          </Reveal>
          <GoldLine className="mx-auto mt-6 w-24" />

          <div className="relative mt-20">
            <div className="absolute left-0 right-0 top-6 hidden md:block">
              <GoldLine className="w-full" />
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-6">
              {[
                { icon: "◐", name: "Arrival", line: "Crossing the threshold." },
                { icon: "❍", name: "Stillness", line: "Listening inward by the river." },
                { icon: "✿", name: "Tending", line: "Hands return to the earth." },
                { icon: "≈", name: "Movement", line: "Walking toward the sea." },
                { icon: "✦", name: "Return", line: "Stepping back into light." },
              ].map((s, i) => (
                <Reveal key={s.name} delay={i * 160}>
                  <div className="flex flex-col items-center text-center">
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)] bg-[var(--forest)] text-lg text-[var(--gold)]">
                      {s.icon}
                    </div>
                    <div className="label-caps mt-6 text-[var(--gold)]">{`0${i + 1}`}</div>
                    <h3 className="serif-thin mt-2 text-2xl text-[var(--soft)]" style={{ fontWeight: 300 }}>{s.name}</h3>
                    <p className="serif-thin mt-3 text-sm italic text-[var(--soft)]/70">{s.line}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. MATERIALS */}
      <section className="bg-[var(--cream)] py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="label-caps text-center text-[var(--gold)]">Materials</div>
          </Reveal>
          <GoldLine className="mx-auto mt-6 w-24" />
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { src: matConcrete, label: "Raw Concrete" },
              { src: matTimber, label: "Aged Timber" },
              { src: matStone, label: "Mediterranean Stone" },
              { src: matWater, label: "Water" },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 120}>
                <div>
                  <div className="overflow-hidden">
                    <ZoomImage src={m.src} alt={m.label} className="aspect-[4/5] w-full object-cover" />
                  </div>
                  <div className="label-caps mt-4 text-[var(--gold)]">{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CLOSING */}
      <section className="relative h-[100vh] w-full overflow-hidden bg-black">
        <ZoomImage src={marinaAsset} alt="Aerial of Rosettuary" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[var(--soft)]">
          <Reveal>
            <h2 className="serif-thin mx-auto max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.15]" style={{ fontWeight: 200 }}>
              Healing begins where the waters meet.
            </h2>
          </Reveal>
          <GoldLine className="mt-10 w-24" />
          <Reveal delay={300}>
            <div className="mt-10 space-y-3 text-[var(--gold)]">
              <div className="label-caps">Rosettuary — Rashid, Egypt</div>
              <div className="label-caps">Graduation Project 2026</div>
              <div className="label-caps">Philopateer Amir & Sama Elguindy</div>
              <div className="label-caps">British University in Egypt</div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
