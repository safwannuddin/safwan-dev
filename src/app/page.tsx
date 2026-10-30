import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkList from "@/components/WorkList";

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
    </>
  );
}
