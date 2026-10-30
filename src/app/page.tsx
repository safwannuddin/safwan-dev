import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkList from "@/components/WorkList";
import PaperFrame from "@/components/PaperFrame";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import NotebookList from "@/components/NotebookList";
import Contact from "@/components/Contact";
import { papers } from "@/content/papers";
import { person } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="work"
        index="01"
        label="Work"
        title="Selected work"
        intro="What I have built, what I have published, and what I am building next. Each label says honestly where the project stands."
      >
        <WorkList />
      </Section>

      <Section
        id="research"
        index="02"
        label="Research"
        title="Research on AI agent security"
        intro="Two papers on arXiv, both about what goes wrong when AI agents act on our behalf: the interfaces they generate, and the money they spend."
      >
        <div>
          {papers.map((p) => (
            <PaperFrame key={p.id} paper={p} />
          ))}
        </div>
      </Section>

      <Section
        id="experience"
        index="03"
        label="Experience"
        title="How I got here"
        intro="From a computer science degree to founding, research and an MSc in London. What I did at each step, and what it taught me."
      >
        <Timeline />
      </Section>

      <Section
        id="certificates"
        index="04"
        label="Certificates"
        title="Recognition and certificates"
        intro="Awards first, then the courses and hackathons behind them. Select any certificate to see it in full."
      >
        <Certificates />
      </Section>

      <Section
        id="notebook"
        index="05"
        label="Notebook"
        title="Notebook"
        intro={
          <>
            Small interactive explainers of what I learn from first principles. The first entries are being written
            now. <a className="link" href="/notebook/">Open the notebook</a>
          </>
        }
      >
        <NotebookList limit={1} />
      </Section>

      <Section
        id="contact"
        index="06"
        label="Contact"
        title="Get in touch"
        intro={`I am looking for ${person.lookingFor}. If you are hiring, or want to talk about agent security, email me.`}
      >
        <Contact />
      </Section>
    </>
  );
}
