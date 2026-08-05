import { createBreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";
import JsonLd from "./JsonLd";

type BreadcrumbJsonLdProps = {
  items: readonly BreadcrumbItem[];
};

export default function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return <JsonLd data={createBreadcrumbJsonLd(items)} />;
}
