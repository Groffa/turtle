import { CSSProperties } from "react";

export type CSSCollection = {
  [key: string]: CSSProperties;
};

export const makeCSS = (root: CSSCollection): CSSCollection => root;

export const mergeCSS = (
  style1: CSSProperties,
  ...rest: (undefined | false | CSSProperties)[]
) => {
  let finalStyle = { ...style1 };
  for (const style of rest) {
    if (style) {
      finalStyle = { ...finalStyle, ...style };
    }
  }
  return finalStyle;
};
