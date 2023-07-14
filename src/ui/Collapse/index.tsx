import type { CollapseProps } from "antd";
import React from "react";
import StyledCollapse from "./styles";

type CollapseUIProps = CollapseProps;

export function CollapseUI({ ...props }: CollapseUIProps) {
  return <StyledCollapse {...props} />;
}
