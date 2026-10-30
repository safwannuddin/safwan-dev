import Hero from "@/components/hero/Hero";
import Marquee from "@/components/sections/Marquee";
import Statement from "@/components/sections/Statement";
import WorkJourney from "@/components/sections/WorkJourney";
import StackCards from "@/components/sections/StackCards";
import BigContact from "@/components/sections/BigContact";
import Section from "@/components/Section";
import PaperFrame from "@/components/PaperFrame";
import Certificates from "@/components/Certificates";
import NotebookList from "@/components/NotebookList";
import { papers } from "@/content/papers";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <WorkJourney />

      <Section
        id="research"
        index="02"
        label="Research"
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
            How I got <em>here</em>.
          </>
        }
        intro="From a computer science degree to founding, research and an MSc in London. Keep scrolling, the cards stack."
      >
        <StackCards />
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
        intro="Awards first, then the courses and hackathons behind them. Swipe the gallery and open any certificate."
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

      <BigContact />
    </>
  );
}
