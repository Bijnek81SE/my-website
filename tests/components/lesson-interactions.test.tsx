import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import AnswerReveal from "@/components/Lesson/AnswerReveal";
import InteractivePractice from "@/components/Lesson/InteractivePractice";

describe("lesson interactions", () => {
  it("reveals and hides an answer accessibly", async () => {
    const user = userEvent.setup();
    render(<AnswerReveal>Carbon normally forms four bonds.</AnswerReveal>);
    const button = screen.getByRole("button", { name: "Show answer" });
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Carbon normally/)).toBeVisible();
  });

  it("checks practice answers and reports feedback", async () => {
    const user = userEvent.setup();
    render(<InteractivePractice questions={[{
      id: "q1",
      prompt: "How many bonds does neutral carbon usually form?",
      type: "short-answer",
      answer: ["4", "four"],
      explanation: "Neutral carbon normally forms four bonds.",
    }]} />);
    await user.type(screen.getByPlaceholderText("Type your answer"), "four");
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(screen.getByRole("status")).toHaveTextContent("Correct");
  });
});
