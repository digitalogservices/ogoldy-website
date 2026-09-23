import type { Metadata } from "next";
import { RelocationPage } from "../components/relocation-page";
import { relocationBySlug } from "../data/relocation-pages";
const data = relocationBySlug("office-relocation-services")!;
export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  alternates: { canonical: "/office-relocation-services" },
  openGraph: { title: data.title, description: data.description },
  twitter: {
    card: "summary_large_image",
    title: data.title,
    description: data.description,
  },
};
export default function Page() {
  return <RelocationPage data={data} />;
}
