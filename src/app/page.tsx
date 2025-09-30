import { ConnectSection } from "@/components/ConnectSection/connectSection";
import { CtaSection } from "@/components/CtaSection/ctaSection";
import { FeaturedDiscussions } from "@/components/FeaturedDiscussions/featuredDiscussions";
import { Menu } from "@/components/Menu/menu";
import { WhyChooseUs } from "@/components/WhyChooseUs/whyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        <Menu />
        <div className="pt-19">
           <ConnectSection />
        </div>
        <FeaturedDiscussions />
        <WhyChooseUs />
        <CtaSection />
    </main>
  );
}
       