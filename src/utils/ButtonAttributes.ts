import { theme } from "../styles/theme";

const fontColor = {
  abled: {
    dark: theme.color.base.white,
    light: theme.color.brand[50],
    empty: theme.color.brand[50],
    none: theme.color.brand[50],
  },
  disabled: theme.color.gray[50],
};

const bgColor = {
  abled: {
    dark: theme.color.brand[50],
    light: theme.color.brand[10],
    empty: "transparent",
    none: "transparent",
  },
  disabled: {
    dark: theme.color.gray[30],
    light: theme.color.gray[30],
    empty: "transparent",
    none: "transparent",
  },
};

const iconSize = {
  lg: "20px",
  md: "18px",
  sm: "16px",
};

const padding = {
  lg: "12px 24px",
  md: "8px 20px",
  sm: "6px 14px",
};

export { fontColor, bgColor, iconSize, padding };
