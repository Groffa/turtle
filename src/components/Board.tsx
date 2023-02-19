// import React from "react";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { makeCSS, mergeCSS } from "../Css";
import { block, blocked, Board, unblock } from "../Logic";

const useStyles = () =>
  makeCSS({
    grid: {
      display: "grid",
      width: "100vw",
      height: "75vh",
    },
    cell: {
      border: "1px solid black",
    },
    blocked: {
      border: "1px dashed red",
      backgroundColor: "rgb(255, 100, 100)",
    },
  });

export type BoardComponentProps = {
  board: Board;
  setBoard: (value: React.SetStateAction<Board>) => void;
};

export const BoardComponent = ({
  board,
  setBoard,
}: BoardComponentProps): JSX.Element => {
  const styles = useStyles();
  const [gridStyle, setGridStyle] = useState<CSSProperties>(styles.grid);

  useEffect(() => {
    setGridStyle((prev) =>
      mergeCSS(prev, {
        gridTemplateColumns: Array(board.Width).fill("10rem").join(" "),
        gridTemplateRows: Array(board.Height).fill("10rem").join(" "),
      })
    );
  }, [board]);

  const toggleBlock = useCallback(
    (x: number, y: number) => {
      if (blocked(x, y, board)) {
        setBoard(unblock(x, y, board));
      } else {
        setBoard(block(x, y, board));
      }
    },
    [setBoard, board]
  );

  return (
    <div style={gridStyle}>
      {Array(board.Width * board.Height)
        .fill(null)
        .map((_, index) => {
          const x = index % board.Width;
          const y = Math.floor(index / board.Height);
          return (
            <div
              data-position={x + ", " + y}
              style={mergeCSS(
                styles.cell,
                blocked(x, y, board) && styles.blocked
              )}
              key={index}
              onClick={() => toggleBlock(x, y)}
            ></div>
          );
        })}
    </div>
  );
};
