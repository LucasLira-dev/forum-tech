import { Menu } from "@/components/Menu/menu";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  const isAdm = session?.user?.role === "admin";

  return (
    <>
      <Menu
      isAdmin={isAdm}
      />
      {children}
    </>
  );
}
