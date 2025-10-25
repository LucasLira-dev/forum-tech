import { ConnectSection } from "@/components/homeComponents/ConnectSection/connectSection";
import { CtaSection } from "@/components/homeComponents/CtaSection/ctaSection";
import { FeaturedDiscussions } from "@/components/homeComponents/FeaturedDiscussions/featuredDiscussions";
import { WhyChooseUs } from "@/components/homeComponents/WhyChooseUs/whyChooseUs";
import { Menu } from "@/components/Menu/menu";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isAdm = session?.user?.role === "admin";

  return (
      <Providers>
        <Menu
        isAdmin={isAdm}
         />
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
          <div className="pt-19">
            <ConnectSection />
          </div>
          <FeaturedDiscussions />
          <WhyChooseUs />
          <CtaSection />
        </main>
      </Providers>
  );
}
       