import { useEffect, useState } from "react";
import { makeCSS, mergeCSS } from "../Css";
import { State } from "../Execute";
import { Position, blocked } from "../Logic";

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
    turtleCell: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "monospace",
      fontSize: "38px",
      color: "#8f8",
    },
  });

type WorldStateComponentProps = {
  state: State;
  goal?: Position;
};

const victoryFlag = <>🏁</>;

export const WorldStateComponent = ({
  state,
  goal,
}: WorldStateComponentProps): JSX.Element => {
  const styles = useStyles();
  const { board, turtle } = state;

  const [turtleIcon, setTurtleIcon] = useState("");

  useEffect(() => {
    setTurtleIcon(["^", ">", "v", "<"][turtle.Heading]);
  }, [turtle]);

  const goalIsHere = (x: number, y: number) => {
    console.log(x, y, goal);
    return goal?.X === x && goal.Y === y;
  };

  const turtleIsHere = (x: number, y: number) =>
    y === turtle.Y && x === turtle.X;

  const render = () => {
    let result: JSX.Element[] = [];
    for (let y = 0; y < board.Height; ++y) {
      result.push(
        <div style={styles.row} key={y}>
          {Array(board.Width)
            .fill(null)
            .map((_, x) => (
              <div
                key={"" + y + x}
                style={mergeCSS(
                  styles.cell,
                  blocked(x, y, board) && styles.blocked,
                  turtleIsHere(x, y) && styles.turtleCell
                )}
              >
                {turtleIsHere(x, y) && turtleIcon}
                {goalIsHere(x, y) && victoryFlag}
              </div>
            ))}
        </div>
      );
    }
    return result;
  };

  return <div style={styles.root}>{render()}</div>;
};
