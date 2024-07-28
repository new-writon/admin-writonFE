import { css } from "styled-components";

// =============== Text Size ===============

// Heading
const h1 = css`
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
`;

const h2 = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 130%;
`;

const h3 = css`
  font-size: 20px;
  font-weight: 700;
  line-height: 130%;
`;

const h4 = css`
  font-size: 18px;
  font-weight: 700;
  line-height: 130%;
`;

// Body
const b1 = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
`;

const b2 = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 160%;
`;

// Caption
const c1 = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;

const c2 = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
`;

// Label
const l1 = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
`;

const l2 = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;

const l3 = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 130%;
`;

const l4 = css`
  font-size: 10px;
  font-weight: 500;
  line-height: 130%;
`;

const font = {
  h1,
  h2,
  h3,
  h4,
  b1,
  b2,
  c1,
  c2,
  l1,
  l2,
  l3,
  l4,
};

// =============== Color ===============

const color = {
  brand: {
    0: "#F5F7FF",
    10: "#EFF1FF",
    20: "#CCD1FF",
    30: "#A8B1FF",
    40: "#8592FF",
    50: "#6272FF",
    60: "#5161ED",
    70: "#3846BB",
    80: "#283399",
    90: "#1A2477",
    100: "#0F1655",
  },
  purple: {
    0: "#F8F8FF",
    10: "#F0EFFF",
    20: "#CFCDFF",
    30: "#AEABFF",
    40: "#8E89FF",
    50: "#6A63F5",
    60: "#524DD4",
    70: "#3E39B2",
    80: "#2D2890",
    90: "#1E1A6E",
    100: "#120F4C",
  },
  gray: {
    10: "#FCFCFC",
    20: "#F8F8FA",
    30: "#EDEEF1",
    40: "#D2D5DB",
    50: "#B1B4BC",
    60: "#94989F",
    70: "#73777E",
    80: "#464C52",
    90: "#2C2F32",
    100: "#212121",
  },
  blue: {
    10: "#EDF5FF",
    20: "#D0E2FF",
    30: "#A6C8FF",
    40: "#78A9FF",
    50: "#4589FF",
    60: "#0F62FE",
    70: "#0043CE",
    80: "#002D9C",
    90: "#001D6C",
    100: "#001141",
  },
  green: {
    10: "#DEFBE6",
    20: "#A7F0BA",
    30: "#6FDC8C",
    40: "#42BE65",
    50: "#24A148",
    60: "#198038",
    70: "#0E6027",
    80: "#044317",
    90: "#022D0D",
    100: "#071908",
  },
  red: {
    60: "#DA1E28",
  },
  base: {
    white: "#FFFFFF",
    black: "#000000",
  },
};

// =============== Device Size ===============

const size = {
  mobile: "767px",
  tablet: "1023px",
  desktop: "1024px",
};

const device = {
  mobile: `screen and (max-width: ${size.mobile})`,
  tablet: `screen and (max-width: ${size.tablet})`,
  desktop: `screen and (min-width: ${size.desktop})`,
};

export const theme = {
  font,
  color,
  device,
};
