import React from "react";
import { blocked, Board } from "../Logic";

const useStyles = () => ({
  cell: {
    border: "1px solid black",
  } as React.CSSProperties,
  blocked: {
    border: "1px dashed red",
  } as React.CSSProperties,
});

export type BoardComponentProps = {
  board: Board;
};

export const BoardComponent = ({ board }: BoardComponentProps): JSX.Element => {
  const styles = useStyles();
  return (
    <>
      {Array(board.Width * board.Height)
        .fill(null)
        .map((_, index) => {
          const x = index % board.Width;
          const y = Math.floor(index / board.Height);
          return (
            <div
              style={blocked(x, y, board) ? styles.blocked : styles.cell}
              key={index}
            ></div>
          );
        })}
    </>
  );
};
