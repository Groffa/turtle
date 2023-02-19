import { useState } from "react";
import { BoardComponent } from "./components/Board";
import { Board, createBoard } from "./Logic";

function App() {
  const [board, setBoard] = useState<Board>(createBoard(3, 3));

  const adjust = (key: "Width" | "Height", delta: number) => {
    const newBoard = { ...board, [key]: board[key] + delta };
    setBoard(newBoard);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "8px" }}>
        <pre>
          {board.Width} x {board.Height}
        </pre>
        <button onClick={() => adjust("Width", 1)}>W+</button>
        <button onClick={() => adjust("Width", -1)}>W-</button>
        <button onClick={() => adjust("Height", 1)}>H+</button>
        <button onClick={() => adjust("Height", -1)}>H-</button>
      </div>
      <BoardComponent board={board} setBoard={setBoard} />
    </>
  );
}

export default App;
