import { render } from "@testing-library/react";
import { Spiner } from "./Spiner";

describe("Spiner component", () => {
    it("should render svg and circle elements successfully", () => {
        const { container } = render(<Spiner />);
        expect(container.querySelector("svg")).toBeInTheDocument();
        expect(container.querySelector("circle")).toBeInTheDocument();
    });

    it("should have correct geometric attributes and viewBox", () => {
        const { container } = render(<Spiner />);
        const spiner = container.querySelector("svg");
        const circle = container.querySelector("circle");

        expect(container.querySelector("circle")).toBeInTheDocument();
        expect(spiner).toHaveAttribute("viewBox", "25 25 50 50");
        expect(circle).toHaveAttribute("r", "20");
        expect(circle).toHaveAttribute("cy", "50");
        expect(circle).toHaveAttribute("cx", "50");
    });

    it("should apply correct CSS module class", () => {
        const { container } = render(<Spiner />);
        const spiner = container.querySelector("svg");
        expect(container.querySelector("svg")).toBeInTheDocument();
        expect(spiner).toHaveClass("spiner");
    });
});
