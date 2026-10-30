import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { projects, getProject } from "@/content/projects";
import { papers } from "@/content/papers";
import { person } from "@/content/site";
import Diagram from "@/components/Diagram";
import Label from "@/components/Label";
import PaperFrame from "@/components/PaperFrame";
import { Txt, hasText, visible } from "@/lib/todo";
import s from "./page.module.css";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = `${p.idea} ${p.label.toLowerCase()} by ${person.name}, ${p.year}.`;
  return {
    title: p.title,
    description,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { title: `${p.title} · ${person.name}`, description, url: `/work/${p.slug}/`, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const paper = p.paperId ? papers.find((x) => x.id === p.paperId) : undefined;
  const stack = visible(p.stack);

  return (
    <article className={s.page}>
      <div className={s.inner}>
        <a href="/#work" className={s.back}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          All work
        </a>

        <header className={s.header}>
          <p className={s.kicker}>
            <Label value={p.label} />
            <span className="mono">{p.year}</span>
          </p>
          <h1 className={s.title} style={{ viewTransitionName: `work-${p.slug}` }}>
            {p.title}
          </h1>
          <p className={s.idea}>{p.idea}</p>
        </header>

        <dl className={s.facts}>
          <div>
            <dt className="mono">Role</dt>
            <dd>{p.role}</dd>
          </div>
          {stack.length ? (
            <div>
              <dt className="mono">Stack</dt>
              <dd>
                {stack.map((t, k) => (
                  <span key={t}>
                    <Txt value={t} />
                    {k < stack.length - 1 ? ", " : ""}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
          {p.links.length ? (
            <div>
              <dt className="mono">Links</dt>
              <dd className={s.factLinks}>
                {p.links.map((l) => (
                  <a key={l.href} className="link" href={l.href}>
                    {l.label}
                  </a>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>

        {p.image ? (
          <figure className={s.shot}>
            <Image
              src={p.image.src}
              alt={p.image.alt}
              width={p.image.width}
              height={p.image.height}
              sizes="(min-width: 1240px) 880px, 100vw"
              priority
            />
          </figure>
        ) : null}

        <div className={s.blocks}>
          <section className={s.block} aria-labelledby="problem">
            <h2 id="problem" className={`mono ${s.blockTitle}`}>The problem</h2>
            <div className={s.prose}>
              <p>
                <Txt value={p.problem} />
              </p>
            </div>
          </section>

          <section className={s.block} aria-labelledby="built">
            <h2 id="built" className={`mono ${s.blockTitle}`}>
              {p.label === "PLANNED" ? "What I plan to build" : "What I built"}
            </h2>
            <div className={s.prose}>
              <p>
                <Txt value={p.built} />
              </p>
            </div>
            <div className={s.wide}>
              <Diagram id={`d-${p.slug}`} nodes={p.diagram.nodes} caption={p.diagram.caption} />
            </div>
          </section>

          {p.results.length || hasText(p.resultsNote) ? (
            <section className={s.block} aria-labelledby="results">
              <h2 id="results" className={`mono ${s.blockTitle}`}>Results</h2>
              <div className={s.prose}>
                {p.results.length ? (
                  <dl className={s.results}>
                    {p.results.map((r) => (
                      <div key={r.label}>
                        <dd>{r.value}</dd>
                        <dt>{r.label}</dt>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {hasText(p.resultsNote) ? (
                  <p>
                    <Txt value={p.resultsNote} />
                  </p>
                ) : null}
              </div>
            </section>
          ) : null}

          {hasText(p.changes) ? (
            <section className={s.block} aria-labelledby="changes">
              <h2 id="changes" className={`mono ${s.blockTitle}`}>What I would change</h2>
              <div className={s.prose}>
                <p>
                  <Txt value={p.changes} />
                </p>
              </div>
            </section>
          ) : null}

          {paper ? (
            <section className={s.block} aria-labelledby="paper">
              <h2 id="paper" className={`mono ${s.blockTitle}`}>The paper</h2>
              <div>
                <PaperFrame paper={paper} showProjectLink={false} />
              </div>
            </section>
          ) : null}
        </div>

        <nav className={s.next} aria-label="Next project">
          <span className="mono">Next</span>
          <a href={`/work/${next.slug}/`}>
            <span className={s.nextTitle}>{next.title}</span>
            <span className={s.nextIdea}>{next.idea}</span>
          </a>
        </nav>
      </div>
    </article>
  );
}
