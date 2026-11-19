import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Safety & Scanning" };

export default function SafetyPage() {
  return <LegalPage slug="safety" />;
}
