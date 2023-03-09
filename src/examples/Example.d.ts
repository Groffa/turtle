import { Instruction, State } from "../Execute";
import { Position } from "../Logic";

export type Example = {
  state: State;
  solution?: string;
  goal?: Position;
};
