import type { Metadata } from "next";
import { CommunityOffsets } from "@/components/site/CommunityOffsets";
import { getCommunityOffsets } from "@/lib/data";

export const metadata: Metadata = {
  title: "Community offsets",
  description: "Upload and browse community-contributed game offsets (JSON, C++, C#).",
};

export default function CommunityOffsetsPage() {
  return (
    <main className="page-offset flex min-h-screen flex-col px-4 pb-10 md:px-8 md:pb-14">
      <CommunityOffsets offsets={getCommunityOffsets()} />
    </main>
  );
}
