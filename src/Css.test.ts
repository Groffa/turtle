import { makeCSS, mergeCSS } from "./Css";

describe("css", () => {
  it("creates a style", () => {
    expect(makeCSS({ root: { color: "red" } })).toEqual({
      root: {
        color: "red",
      },
    });
  });

  it("merges two styles", () => {
    const root = makeCSS({
      red: {
        color: "red",
        backgroundColor: "red",
      },
      blue: {
        color: "blue",
      },
    });
    const merged = mergeCSS(root.red, root.blue);
    expect(merged).toEqual({
      color: "blue",
      backgroundColor: "red",
    });
  });

  it("tries to merge with undefined style", () => {
    const root = makeCSS({
      red: {
        color: "red",
      },
    });
    const mergedButNotReally = mergeCSS(root.red, undefined);
    expect(mergedButNotReally).toEqual({
      color: "red",
    });
  });
});
