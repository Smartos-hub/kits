import React from "react";
import type { AvatarProps } from "antd";
import StyledAvatar from "./styles";

interface AvatarUIProps extends AvatarProps {
  name?: string | null;
}

export function AvatarUI({ name, ...props }: AvatarUIProps) {
  return <StyledAvatar {...props}>{name?.slice(0, 1)}</StyledAvatar>;
}
