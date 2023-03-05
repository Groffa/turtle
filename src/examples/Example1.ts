import { defaultEmptyState } from "../Execute";
import { block, createBoard, createTurtle, Heading } from "../Logic";
import { Example } from "./Example";

/*
  0   1   2   3   4
_____________________
|   |   |   | X |   |  0
|---+---+---+---+---|
|   | X |   |   |   |  1
|---+---+---+---+---|
|   |   | X | X |   |  2
|---+---+---+---+---|
| X |   | X |   |   |  3
|---+---+---+---+---|
| > |   | X |   | X |  4
|-------------------|

*/
export const Example1 = (): Example => {
  const turtle = createTurtle(Heading.East, 0, 4);
  const board = [
    [3, 0],
    [1, 1],
    [2, 2],
    [3, 2],
    [0, 3],
    [2, 3],
    [2, 4],
    [4, 4],
  ].reduce((lastBoard, [x, y]) => block(x, y, lastBoard), createBoard(5, 5));
  return {
    state: defaultEmptyState(turtle, board),
    solution: "f l f f l f r f f r f f r f l f f r f f r f l f",
    goal: {
      X: 3,
      Y: 4,
    },
  };
};
