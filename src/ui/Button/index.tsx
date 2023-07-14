import React from "react";
import type { ButtonProps } from "antd";
import StyledButton from "./styles";

interface ButtonUIProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  mode?: "outline" | "default";
}

export function ButtonUI({
  size = "middle",
  icon,
  suffixIcon,
  children,
  mode = "default",
  className = "",
  ...props
}: ButtonUIProps & ButtonProps) {
  return (
    <StyledButton
      className={`twd-flex twd-items-center twd-gap-1 ${className}`}
      icon={icon}
      prefixCls="ant-input"
      {...props}
      mode={mode}
      size={size}
    >
      {children}
      {suffixIcon}
    </StyledButton>
  );
}
