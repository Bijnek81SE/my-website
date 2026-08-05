import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import JsonLd from "@/components/seo/JsonLd";

describe("JsonLd", () => {
  it("renders each structured-data object as its own JSON-LD script", () => {
    const { container } = render(
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Organic Chemistry Hub",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Organic Chemistry Hub",
          },
        ]}
      />,
    );

    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    expect(scripts).toHaveLength(2);

    for (const script of scripts) {
      const value = JSON.parse(script.textContent ?? "{}") as Record<
        string,
        unknown
      >;
      expect(value["@context"]).toBe("https://schema.org");
    }
  });
});
