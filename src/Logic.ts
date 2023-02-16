export type Board = {
    Rows: number;
    Columns: number;
}

export const createBoard = (Columns: number, Rows: number): Board => ({
    Rows, Columns
})

export const enum Heading {
    North = 0,
    East = 1,
    South = 2,
    West = 3
}

const HeadingDeltas: Record<Heading, [number, number]> = {
    [Heading.North]: [0, -1],
    [Heading.East]: [1, 0],
    [Heading.South]: [0, 1],
    [Heading.West]: [0, -1]
}

export type Turtle = {
    Row: number;
    Column: number;
    Heading: Heading;
}

export const clamp = (min: number, value: number, max: number): number => Math.min(Math.max(min, value), max);

export const advance = (turtle: Turtle, board: Board): Turtle => {    
    const delta = HeadingDeltas[turtle.Heading];
    return {
        ...turtle,
        Column: clamp(0, turtle.Column + delta[0], board.Columns - 1),
        Row: clamp(0, turtle.Row + delta[1], board.Rows - 1)
    }
}

export const rotateRight = (turtle: Turtle): Turtle => ({
    ...turtle,
    Heading: ((turtle.Heading + 1) % 4) as Heading
})

export const rotateLeft = (turtle: Turtle): Turtle => ({
    ...turtle,
    Heading: turtle.Heading === Heading.North ? Heading.West : (turtle.Heading - 1) as Heading
})

export const turnAround = (turtle: Turtle): Turtle => rotateRight(rotateRight(turtle))

const defaultBoardColumns = 10
const defaultBoardRows = 12;
export const defaultEmptyBoard = () => createBoard(defaultBoardColumns, defaultBoardRows);
export const defaultTurtle = (): Turtle => ({
    Heading: Heading.North,
    Column: defaultBoardColumns / 2,
    Row: defaultBoardRows - 1
})
