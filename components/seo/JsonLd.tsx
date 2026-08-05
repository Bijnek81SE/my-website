import { Fragment } from "react";
import type { JsonLdValue } from "@/lib/seo";

type JsonLdProps = {
  data: JsonLdValue | readonly JsonLdValue[];
};

function serializeJsonLd(data: JsonLdValue): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  const entries = Array.isArray(data) ? data : [data];

  return (
    <>
      {entries.map((entry, index) => (
        <Fragment key={`${String(entry["@type"] ?? "json-ld")}-${index}`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(entry) }}
          />
        </Fragment>
      ))}
    </>
  );
}
