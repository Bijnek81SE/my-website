import type { JsonLdValue } from "@/lib/seo";

type JsonLdProps = {
  data: JsonLdValue | readonly JsonLdValue[];
};

function serializeJsonLd(data: JsonLdValue | readonly JsonLdValue[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
