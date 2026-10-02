import { HomeContent } from "@/components/HomeContent";
import { IntroGate } from "@/components/IntroGate";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ intro?: string }>;
}) {
  const params = await searchParams;
  const skipIntro = params.intro === "skip";

  return (
    <IntroGate seen={skipIntro}>
      <HomeContent />
    </IntroGate>
  );
}
