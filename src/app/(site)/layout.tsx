import { Menu } from "@/components/Menu/menu";
import { Providers } from "../providers";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Menu />
      {children}
    </Providers>
  );
}
