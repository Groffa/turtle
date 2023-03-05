import { useCallback, useEffect, useState } from "react";
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

function App() {
  const { state: initialWorldState, solution } = Example1();
  const [worldState, setWorldState] = useState<State>(initialWorldState);
  const [commands, setCommands] = useState("");
  const [commandArray, setCommandArray] = useState<string[]>([]);
  const [lastCommandIndex, setLastCommandIndex] = useState(0);
  const styles = useStyles();

  const parse = useCallback(
    (value: string) => {
      if (value !== commands) {
        setLastCommandIndex(0);
      }
      setCommands(value);
      setCommandArray(
        value
          .replaceAll("\n", " ")
          .split(" ")
          .filter((s) => s.trim() !== "")
      );
    },
    [commands]
  );

  useEffect(() => {
    if (solution) {
      parse(solution);
    }
  }, [solution, parse]);

  const onCommandsChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    parse(e.target.value);

  const resetWorldState = () => {
    setWorldState(initialWorldState);
    setLastCommandIndex(0);
  };

  const stepRun = () => {
    const instruction = nextInstructionInQueue() as Instruction;
    setWorldState((prev) => execute(prev, instruction));
    setLastCommandIndex((prev) => {
      return Math.min(prev + 1, commandArray.length - 1);
    });
  };

  const nextInstructionInQueue = () =>
    commandArray.at(lastCommandIndex)?.toLowerCase();

  return (
    <>
      <main style={styles.main}>
        <WorldStateComponent state={worldState} />
        <div style={styles.rightPane}>
          <textarea
            style={styles.commands}
            value={commands}
            onChange={onCommandsChanged}
          />
          <div style={styles.stepRun}>
            <button onClick={stepRun}>
              {`⏯️ Step run ${nextInstructionInQueue()} (${
                lastCommandIndex + 1
              } / ${commandArray.length})`}
            </button>
            <button onClick={resetWorldState}>Reset</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
