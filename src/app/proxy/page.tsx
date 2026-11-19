import type { Metadata } from "next";
import { DonatorOnlyPage } from "@/components/site/DonatorOnlyPage";

export const metadata: Metadata = {
  title: "Web Proxy — Open Any Site with Ad and Redirect Blocking",
  description:
    "Open any site through paste-co.de with ads and redirects blocked, and without the site seeing your IP.",
};

export default function ProxyPage() {
  return (
    <DonatorOnlyPage
      title="Web proxy"
      description="Open any site through paste-co.de with ads and redirects blocked, and without the site seeing your IP."
    />
  );
}
