import {
  advance,
  block,
  blocked,
  Board,
  clamp,
  createBoard,
  createTurtle,
  defaultEmptyBoard,
  defaultTurtle,
  Heading,
  rotateLeft,
  rotateRight,
  turnAround,
  Turtle,
  unblock,
} from "./Logic";

describe("Logic", () => {
  let board: Board;
  let turtle: Turtle;
  beforeEach(() => {
    board = defaultEmptyBoard();
    turtle = defaultTurtle();
  });

  describe("clamp", () => {
    it.each([
      [4, 0, 10, 4],
      [-1, 0, 10, 0],
      [11, 0, 10, 10],
      [0, 0, 10, 0],
      [10, 0, 10, 10],
    ])("clamps %i in range [%i, %i] to be %i", (value, min, max, expected) =>
      expect(clamp(min, value, max)).toBe(expected)
    );
  });

  describe("Board", () => {
    it("create board of desired size", () => {
      expect(createBoard(25, 39)).toEqual({
        Width: 25,
        Height: 39,
        Blocked: [],
      } as Board);
    });

    it("blocks 1,1", () => {
      const blockedBoard = block(1, 1, board);
      expect(blocked(1, 1, blockedBoard)).toBe(true);
    });

    it("blocks 1,1 and unblocks it makes it clear", () => {
      const notBlockedBoard = unblock(1, 1, block(1, 1, board));
      expect(blocked(1, 1, notBlockedBoard)).toBe(false);
    });

    it("[3x3] blocks 2,0 and 2,1 and unblocks 2,1 should make 2,0 still block", () => {
      const firstAndFinalState = block(2, 0, createBoard(3, 3));
      const secondState = block(2, 1, firstAndFinalState);
      expect(secondState).toEqual<Board>({
        Width: 3,
        Height: 3,
        Blocked: [
          {
            X: 2,
            Y: 0,
          },
          {
            X: 2,
            Y: 1,
          },
        ],
      });
      const secondStateReverted = unblock(2, 1, secondState);
      expect(secondStateReverted).toEqual<Board>(firstAndFinalState);
    });
  });

  describe("Turtle", () => {
    it("moves turtle one square up", () => {
      const newTurtle = advance(turtle, board);
      expect(newTurtle).toEqual({
        ...turtle,
        Y: turtle.Y - 1,
      } as Turtle);
    });

    it("rotates turtle to the right once", () => {
      expect(rotateRight(turtle)).toEqual({
        ...turtle,
        Heading: Heading.East,
      });
    });

    it("rotates turtle to the left once", () => {
      expect(rotateLeft(turtle)).toEqual({
        ...turtle,
        Heading: Heading.West,
      });
    });

    it.each([
      ["right", rotateRight],
      ["left", rotateLeft],
    ])("spins turtle around one full lap (going %s)", (s, fn) => {
      expect(fn(fn(fn(fn(turtle))))).toEqual({
        ...turtle,
      });
    });

    it("turns turtle around", () => {
      expect(turnAround(turtle)).toEqual({
        ...turtle,
        Heading: Heading.South,
      });
    });
  });

  describe("Turtle and Board", () => {
    it("can't move turtle beyond top row", () => {
      let movedTurtle: Turtle = { ...turtle };
      for (let i = 0; i < board.Height * 2; ++i) {
        movedTurtle = advance(movedTurtle, board);
      }
      expect(movedTurtle).toEqual({
        ...turtle,
        Y: 0,
      } as Turtle);
    });

    it("can't move past a blocked position", () => {
      // .X.
      const blockedBoard = block(1, 0, createBoard(3, 1));
      const leonardo: Turtle = { X: 0, Y: 0, Heading: Heading.East };
      expect(advance(advance(leonardo, blockedBoard), blockedBoard)).toEqual(
        leonardo
      );
    });

    it.each([
      ["north", Heading.North, 1, 0],
      ["east", Heading.East, 2, 1],
      ["south", Heading.South, 1, 2],
      ["west", Heading.West, 0, 1],
    ])("walks towards %s (%p) and ends up at %i, %i", (dir, heading, x, y) => {
      const chess = createBoard(3, 3);
      const donatello = createTurtle(heading, 1, 1);
      expect(advance(donatello, chess)).toEqual<Turtle>({
        ...donatello,
        X: x,
        Y: y,
      });
    });
  });
});
