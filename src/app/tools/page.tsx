import type { Metadata } from "next";
import { DonatorOnlyPage } from "@/components/site/DonatorOnlyPage";

export const metadata: Metadata = {
  title: "Hacking Tools & Utilities - Injectors, Dumpers, Debuggers",
  description:
    "Collection of essential tools for game hacking and reverse engineering. DLL injectors, memory dumpers, process utilities, and debugging tools.",
};

export default function ToolsPage() {
  return (
    <DonatorOnlyPage
      title="Tools"
      description="64 utilities that run in your browser: JSON, YAML and XML formatters, Base64 and URL encoders, case converters, line tools and more."
    />
  );
}
