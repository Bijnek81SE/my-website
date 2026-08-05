import {
  createLearningResourceJsonLd,
  type LearningResourceInput,
} from "@/lib/seo";
import JsonLd from "./JsonLd";

export default function LearningResourceJsonLd(
  props: LearningResourceInput,
) {
  return <JsonLd data={createLearningResourceJsonLd(props)} />;
}
