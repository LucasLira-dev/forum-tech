import { FindTopics } from "@/components/topicsComponents/FindTopics/findTopics";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Topics() {
    return(
    <>
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col pt-19">
        <section
        className="p-6 sm:p-8 md:px-30 space-y-3 ">
            <div
            className="flex flex-col md:justify-between md:flex-row md:items-center gap-4">
                <h1
                className="text-3xl font-bold">
                    Tópicos
                </h1>
                <Link href="/topics/create"
                className="flex gap-2 items-center bg-[var(--primary)] text-[var(--secondary)] rounded-md px-4 py-2 w-fit hover:brightness-110 transition font-bold cursor-pointer">
                    <FaPlus className="inline mr-2" />
                    Novo Tópico
                </Link>
            </div>
            <FindTopics />
          </section>
        </main>
      </>
    )
}