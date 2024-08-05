interface FlexBox {
  children: React.ReactNode;
  col?: boolean;
  gap?: number;
  justify?: string;
  align?: string;
  padding?: string;
  fullWidth?: boolean;
  isFlex1?: boolean;
  isFlexWrap?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const FlexBox = ({
  children,
  col,
  gap,
  justify,
  align,
  padding,
  fullWidth,
  style,
  isFlex1,
  isFlexWrap,
  onClick,
}: FlexBox) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: col ? "column" : "row",
        gap: `${gap}px` || "0px",
        justifyContent: justify || "flex-start",
        alignItems: align || "flex-start",
        padding: padding || "0",
        width: fullWidth ? "100%" : "auto",
        flex: isFlex1 ? 1 : "none",
        flexWrap: isFlexWrap ? "wrap" : "nowrap",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FlexBox;
