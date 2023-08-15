import { useEffect, useState } from "react";
import { WorldStateComponent } from "./components/WorldState";
import { makeCSS } from "./Css";
import { Example1 } from "./examples/Example1";
import { execute, Instruction, State } from "./Execute";

const useStyles = () =>
  makeCSS({
    header: {
      display: "flex",
      gap: "8px",
    },
    main: {
      padding: "30px",
      display: "flex",
    },
    rightPane: {
      display: "flex",
      flexDirection: "column",
      flex: "100%",
      gap: "16px",
    },
    commands: {
      flex: "100%",
      border: "none",
      backgroundColor: "#444",
      color: "#f88",
      padding: "10px",
      fontFamily: "monospace",
      fontSize: "2rem",
      outline: "none",
    },
    stepRun: {
      display: "flex",
      gap: "5px",
    },
  });

const { state: initialWorldState, goal, solution } = Example1();

function App() {
  const styles = useStyles();
  const [worldState, setWorldState] = useState<State>(initialWorldState);
  const [commands, setCommands] = useState(solution);
  const [commandArray, setCommandArray] = useState<string[]>([]);
  const [lastCommandIndex, setLastCommandIndex] = useState(0);
  const [nextInstructionInQueue, setNextInstructionInQueue] = useState("");
  const [reachedGoal, setReachedGoal] = useState(false);

  useEffect(() => {
    setNextInstructionInQueue(commandArray?.at(lastCommandIndex) ?? "");
  }, [commandArray, lastCommandIndex]);

  useEffect(() => {
    setCommandArray(sanitize(commands) ?? []);
  }, [commands]);

  useEffect(() => {
    setReachedGoal(
      worldState.turtle.X === goal?.X && worldState.turtle.Y === goal.Y
    );
  }, [worldState]);

  const onCommandsChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommands(e.target.value);
  };

  const onResetWorldState = () => {
    setWorldState(initialWorldState);
    setLastCommandIndex(0);
  };

  const onStepRun = () => {
    const instruction = commandArray[lastCommandIndex] as Instruction;
    setWorldState((prev) => execute(prev, instruction));
    setLastCommandIndex((prev) => {
      return Math.min(prev + 1, commandArray.length - 1);
    });
  };

  return (
    <>
      <main style={styles.main}>
        <WorldStateComponent state={worldState} goal={goal} />
        <div style={styles.rightPane}>
          <textarea
            style={styles.commands}
            value={commands}
            onChange={onCommandsChanged}
          />
          <div style={styles.stepRun}>
            <button onClick={onStepRun}>
              {`Step run ${nextInstructionInQueue} (${lastCommandIndex + 1} / ${
                commandArray.length
              })`}
            </button>
            <button onClick={onResetWorldState}>Reset</button>
            {reachedGoal && <b>🏁 GOAL REACHED!</b>}
          </div>
        </div>
      </main>
    </>
  );
}

const sanitize = (commandBuffer?: string) =>
  commandBuffer
    ?.replaceAll("\n", " ")
    .split(" ")
    .filter((s) => s.trim() !== "");

export default App;
