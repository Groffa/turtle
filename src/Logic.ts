export type Position = {
  X: number;
  Y: number;
};

export type Board = {
  Width: number;
  Height: number;
  Blocked: Position[];
};

export const enum Heading {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

export type Turtle = Position & {
  Heading: Heading;
};

export const createBoard = (Width: number, Height: number): Board => ({
  Width,
  Height,
  Blocked: [],
});

const HeadingDeltas: Record<Heading, [number, number]> = {
  [Heading.North]: [0, -1],
  [Heading.East]: [1, 0],
  [Heading.South]: [0, 1],
  [Heading.West]: [0, -1],
};

export const clamp = (min: number, value: number, max: number): number =>
  Math.min(Math.max(min, value), max);

export const block = (X: number, Y: number, board: Board): Board => ({
  ...board,
  Blocked: [...board.Blocked, { X, Y }],
});

export const unblock = (X: number, Y: number, board: Board): Board => ({
  ...board,
  Blocked: board.Blocked.filter((p) => !(p.X === X && p.Y === Y)),
});

export const blocked = (X: number, Y: number, board: Board): boolean =>
  !!board.Blocked.find((p) => p.X === X && p.Y === Y);

export const advance = (turtle: Turtle, board: Board): Turtle => {
  const delta = HeadingDeltas[turtle.Heading];
  const newTurtle = {
    ...turtle,
    X: clamp(0, turtle.X + delta[0], board.Width - 1),
    Y: clamp(0, turtle.Y + delta[1], board.Height - 1),
  };
  if (blocked(newTurtle.X, newTurtle.Y, board)) {
    return turtle;
  } else {
    return newTurtle;
  }
};

export const rotateRight = (turtle: Turtle): Turtle => ({
  ...turtle,
  Heading: ((turtle.Heading + 1) % 4) as Heading,
});

export const rotateLeft = (turtle: Turtle): Turtle => ({
  ...turtle,
  Heading:
    turtle.Heading === Heading.North
      ? Heading.West
      : ((turtle.Heading - 1) as Heading),
});

export const turnAround = (turtle: Turtle): Turtle =>
  rotateRight(rotateRight(turtle));

const defaultBoardWidth = 10;
const defaultBoardHeight = 12;
export const defaultEmptyBoard = () =>
  createBoard(defaultBoardWidth, defaultBoardHeight);
export const defaultTurtle = (): Turtle => ({
  Heading: Heading.North,
  X: defaultBoardWidth / 2,
  Y: defaultBoardHeight - 1,
});
