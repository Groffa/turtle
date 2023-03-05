import { makeCSS, mergeCSS } from "../Css";
import { State } from "../Execute";
import { blocked } from "../Logic";

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
};

export const WorldStateComponent = ({
  state,
}: WorldStateComponentProps): JSX.Element => {
  const styles = useStyles();
  const { board, turtle } = state;

  const renderTurtle = () => {
    return ["^", ">", "v", "<"][turtle.Heading];
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
                {turtleIsHere(x, y) && renderTurtle()}
              </div>
            ))}
        </div>
      );
    }
    return result;
  };

  return <div style={styles.root}>{render()}</div>;
};
