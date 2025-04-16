import { FlexBox } from ".";
import React from "react";
import { L2, L3 } from "./Text";
import { theme } from "../../styles/theme";

interface Chip {
  children: React.ReactNode;
  color: "blue" | "red" | "green";
  size: "sm" | "lg";
}

const Chip = ({ children, color, size }: Chip) => {
  const fontColor = {
    blue: theme.color.brand[50],
    red: theme.color.red[60],
    green: theme.color.green[60],
  };

  const bgColor = {
    blue: theme.color.brand[10],
    red: theme.color.red[10],
    green: theme.color.green[10],
  };

  return (
    <FlexBox
      align="center"
      gap={4}
      padding="4px 8px"
      style={{ backgroundColor: bgColor[color], borderRadius: "4px" }}
    >
      {size == "lg" ? (
        <L2 weight="sb" color={fontColor[color]} as="span">
          {children}
        </L2>
      ) : (
        <L3 weight="sb" color={fontColor[color]} as="span">
          {children}
        </L3>
      )}
    </FlexBox>
  );
};

export default Chip;
