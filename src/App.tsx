import { useState } from "react";
import { BoardComponent } from "./components/Board";
import { Board, createBoard } from "./Logic";

function App() {
  const [board] = useState<Board>(createBoard(3, 3));

  return <BoardComponent board={board} />;
}

export default App;
