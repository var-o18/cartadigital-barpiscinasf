import { getActiveCarta } from "@/lib/data";
import { Carta } from "@/components/Carta";

export default async function Home() {
  const data = await getActiveCarta();

  if (!data) {
    return (
      <main className="flex min-h-dvh items-center justify-center p-8 text-center text-muted">
        La carta no está disponible en este momento.
      </main>
    );
  }

  return <Carta data={data} />;
}
