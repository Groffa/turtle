// import React from "react";
import { useCallback } from "react";
import { makeCSS, mergeCSS } from "../Css";
import { block, blocked, Board, unblock } from "../Logic";

const useStyles = () =>
  makeCSS({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "75vh",
    },
    row: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
    },
    cell: {
      border: "1px solid black",
      flex: "0 0 100px",
    },
    blocked: {
      border: "1px dashed red",
      backgroundColor: "rgb(255, 100, 100)",
    },
  });

export type DebugBoardComponentProps = {
  board: Board;
  setBoard: (value: React.SetStateAction<Board>) => void;
};

export const DebugBoardComponent = ({
  board,
  setBoard,
}: DebugBoardComponentProps): JSX.Element => {
  const styles = useStyles();

  const toggleBlock = useCallback(
    (x: number, y: number) => {
      const isBlocked = blocked(x, y, board);
      console.log(x, y, isBlocked);
      if (isBlocked) {
        setBoard(unblock(x, y, board));
      } else {
        setBoard(block(x, y, board));
      }
    },
    [setBoard, board]
  );

  const render = () => {
    let result: JSX.Element[] = [];
    for (let y = 0; y < board.Height; ++y) {
      result.push(
        <div style={styles.row} key={y}>
          {Array(board.Width)
            .fill(null)
            .map((_, x) => (
              <div
                style={mergeCSS(
                  styles.cell,
                  blocked(x, y, board) && styles.blocked
                )}
                onClick={() => toggleBlock(x, y)}
                data-position={x + ", " + y}
                key={x + "," + y}
              />
            ))}
        </div>
      );
    }
    return result;
  };

  return <div style={styles.root}>{render()}</div>;
};
