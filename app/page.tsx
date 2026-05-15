import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Security from "@/components/Security";
import ROI from "@/components/ROI";
import CtaFooter from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Security />
        <ROI />
      </main>
      <CtaFooter />
    </>
  );
}
