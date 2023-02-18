import {
  advance,
  block,
  blocked,
  Board,
  clamp,
  createBoard,
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
  });
});
