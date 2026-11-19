import { ArchiveClient } from "@/components/site/ArchiveClient";
import { Footer } from "@/components/site/Footer";
import { toArchiveProjects } from "@/lib/archive";
import { CATEGORY_GROUPS, PROJECT_META, getProjectCards } from "@/lib/data";

export default function Home() {
  const cards = toArchiveProjects(getProjectCards());

  return (
    <main>
      <ArchiveClient
        projects={cards}
        groups={CATEGORY_GROUPS}
        total={PROJECT_META.total}
        announcement={PROJECT_META.announcement}
      >
        <Footer />
      </ArchiveClient>
    </main>
  );
}
