import type { Metadata } from "next";
import { RelocationPage } from "../components/relocation-page";
import { relocationBySlug } from "../data/relocation-pages";
const data = relocationBySlug("warehouse-relocation-asset-movement")!;
export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  keywords: data.keywords,
  alternates: { canonical: "/warehouse-relocation-asset-movement" },
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
