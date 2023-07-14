import { Avatar } from "antd";
import type { DefaultTheme, StyledComponent } from "styled-components";
import styled from "styled-components";

const StyledAvatar: StyledComponent<
  typeof Avatar,
  DefaultTheme,
  Record<string, unknown>
> = styled(Avatar)``;

export default StyledAvatar;
