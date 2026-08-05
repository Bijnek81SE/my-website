import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReferenceExplorer } from "@/components/references";
import { functionalGroups } from "@/content/references";
describe("ReferenceExplorer", () => { it("filters entries by query", async () => { const user=userEvent.setup(); render(<ReferenceExplorer entries={functionalGroups} title="Functional-group library"/>); await user.type(screen.getByPlaceholderText(/Search names/i), "alkene"); expect(screen.getByRole("heading", {name:"Alkene"})).toBeInTheDocument(); expect(screen.queryByRole("heading", {name:"Amine"})).not.toBeInTheDocument(); }); });
