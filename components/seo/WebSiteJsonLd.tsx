import {
  createOrganizationJsonLd,
  createWebSiteJsonLd,
} from "@/lib/seo";
import JsonLd from "./JsonLd";

export default function WebSiteJsonLd() {
  return <JsonLd data={[createWebSiteJsonLd(), createOrganizationJsonLd()]} />;
}
