import { advance, Board, rotateLeft, rotateRight, Turtle } from "./Logic";

export type State = {
  iteration: number;
  turtle: Turtle;
  board: Board;
};

export const enum Instruction {
  Forward = "f",
  TurnRight = "r",
  TurnLeft = "l",
}

export const execute = (state: State, instruction: Instruction): State => {
  const { turtle, board } = state;
  let newTurtle: Turtle = { ...turtle };
  let newBoard: Board = { ...board };

  if (instruction === Instruction.Forward) {
    newTurtle = advance(turtle, board);
  } else if (instruction === Instruction.TurnLeft) {
    newTurtle = rotateLeft(turtle);
  } else if (instruction === Instruction.TurnRight) {
    newTurtle = rotateRight(turtle);
  } else {
    throw Error("Not implemented: " + instruction);
  }
  return {
    turtle: { ...newTurtle },
    board: { ...newBoard },
    iteration: state.iteration + 1,
  };
};

export const defaultEmptyState = (turtle: Turtle, board: Board): State => ({
  iteration: 0,
  turtle: { ...turtle },
  board: { ...board },
});
