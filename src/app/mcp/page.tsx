import type { Metadata } from "next";
import { DonatorOnlyPage } from "@/components/site/DonatorOnlyPage";

export const metadata: Metadata = {
  title: "paste-co.de MCP — Let Your AI Agent Search and Download Sources",
  description:
    "Connect Claude Code, Cursor or any MCP-capable agent to paste-co.de, so it can search, download and submit sources for you.",
};

export default function McpPage() {
  return (
    <DonatorOnlyPage
      title="Agent access (MCP)"
      description="Connect Claude Code, Cursor or any MCP-capable agent to paste-co.de, so it can search, download and submit sources for you."
    />
  );
}
