import { ConnectSection } from "@/components/homeComponents/ConnectSection/connectSection";
import { CtaSection } from "@/components/homeComponents/CtaSection/ctaSection";
import { FeaturedDiscussions } from "@/components/homeComponents/FeaturedDiscussions/featuredDiscussions";
import { WhyChooseUs } from "@/components/homeComponents/WhyChooseUs/whyChooseUs";
import { Menu } from "@/components/Menu/menu";

export default function Home() {
  return (
      <>
        <Menu />
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
          <div className="pt-19">
            <ConnectSection />
          </div>
          <FeaturedDiscussions />
          <WhyChooseUs />
          <CtaSection />
        </main>
      </>
  );
}
       