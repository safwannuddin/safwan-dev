import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkList from "@/components/WorkList";
import PaperFrame from "@/components/PaperFrame";
import StoryCurve from "@/components/StoryCurve";
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
        title={
          <>
            Things I have <em>built</em> and published.
          </>
        }
        intro="A founder project, two research systems, and what I am building next. Every label says honestly where the project stands."
      >
        <WorkList />
      </Section>

      <Section
        id="research"
        index="02"
        label="Research"
        tone="band"
        title={
          <>
            What goes wrong when <em>agents act</em> for us.
          </>
        }
        intro="Two papers on arXiv: the interfaces AI agents generate, and the money they spend."
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
        title={
          <>
            Every step lowered the <em>loss</em>.
          </>
        }
        intro="My path so far, plotted the way I would plot a model learning: each role a checkpoint, each checkpoint a little less I did not know."
      >
        <StoryCurve />
        <Timeline />
      </Section>

      <Section
        id="certificates"
        index="04"
        label="Certificates"
        tone="ink"
        title={
          <>
            Recognition and <em>certificates</em>.
          </>
        }
        intro="Awards first, then the courses and hackathons behind them. Swipe the gallery and select any certificate to see it in full."
      >
        <Certificates />
      </Section>

      <Section
        id="notebook"
        index="05"
        label="Notebook"
        title={
          <>
            Learning in public, from <em>first principles</em>.
          </>
        }
        intro="Small interactive explainers of what I study on the MSc. Change a number, see what happens."
      >
        <NotebookList />
      </Section>

      <Section
        id="contact"
        index="06"
        label="Contact"
        title={
          <>
            Write to <em>me</em>.
          </>
        }
        intro={`I am looking for ${person.lookingFor}. If you are hiring, or want to talk about agent security, email is fastest.`}
      >
        <Contact />
      </Section>
    </>
  );
}
