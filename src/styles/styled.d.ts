import "styled-components";

interface Font {
  h1: RuleSet<object>;
  h2: RuleSet<object>;
  h3: RuleSet<object>;
  h4: RuleSet<object>;
  b1: RuleSet<object>;
  b2: RuleSet<object>;
  c1: RuleSet<object>;
  c2: RuleSet<object>;
  l1: RuleSet<object>;
  l2: RuleSet<object>;
  l3: RuleSet<object>;
  l4: RuleSet<object>;
  [key: string]: RuleSet<object>;
}

interface Color {
  brand: {
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    100: string;
  };
  purple: {
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    100: string;
  };
  gray: {
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    100: string;
  };
  blue: {
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    100: string;
  };
  green: {
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    100: string;
  };
  red: {
    60: string;
  };
  base: {
    white: string;
    black: string;
  };
}

interface Device {
  mobile: string;
  tablet: string;
  desktop: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    color: Color;
    font: Font;
    device: Device;
  }
}
