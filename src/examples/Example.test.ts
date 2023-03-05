import { execute, Instruction } from "../Execute";
import { Example1 } from "./Example1";

describe("Examples", () => {
  it.each([Example1()])(
    "solution ends up at goal",
    ({ state, solution, goal }) => {
      if (solution && goal) {
        const instructions = solution.split(" ");
        const { turtle } = instructions.reduce(
          (lastState, instr) => execute(lastState, instr as Instruction),
          state
        );
        expect(turtle.X).toBe(goal.X);
        expect(turtle.Y).toBe(goal.Y);
      }
    }
  );
});
