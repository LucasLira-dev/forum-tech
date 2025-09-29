import { ConnectSection } from "@/components/ConnectSection/connectSection";
import { Menu } from "@/components/Menu/menu";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Menu />
        <div className="pt-19">
           <ConnectSection />
        </div>
    </main>
  );
}
       