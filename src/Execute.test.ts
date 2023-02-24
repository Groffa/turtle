import { defaultEmptyState, execute, Instruction, State } from "./Execute";
import { createBoard, createTurtle, Heading } from "./Logic";

const perform = (firstState: State, instructions: Instruction[]): State =>
  instructions.reduce(
    (state, instruction) => execute(state, instruction),
    firstState
  );

describe("Execute", () => {
  const board = createBoard(3, 3);
  const turtle = createTurtle(Heading.East, 0, 0);
  const initialState = defaultEmptyState(turtle, board);

  it("constructs a state of turtle in 2,0", () => {
    const finalState = perform(initialState, [
      Instruction.Forward,
      Instruction.Forward,
    ]);
    expect(finalState).toEqual<State>({
      ...finalState,
      turtle: {
        ...turtle,
        X: 2,
        Y: 0,
      },
    });
  });

  it("walks around the board counter-clockwise", () => {
    const finalState = perform(initialState, [
      Instruction.TurnRight,
      Instruction.Forward,
      Instruction.Forward,
      Instruction.TurnLeft,
      Instruction.Forward,
      Instruction.Forward,
      Instruction.TurnLeft,
      Instruction.Forward,
      Instruction.Forward,
      Instruction.TurnLeft,
      Instruction.Forward,
      Instruction.Forward,
    ]);
    expect(finalState).toEqual<State>({
      ...initialState,
      iteration: finalState.iteration,
      turtle: {
        ...turtle,
        Heading: Heading.West,
      },
    });
  });
});
