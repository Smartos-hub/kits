import { Collapse } from "antd";
import type { DefaultTheme, StyledComponent } from "styled-components";
import styled from "styled-components";

export const StyledCollapse: StyledComponent<
  typeof Collapse,
  DefaultTheme,
  Record<string, unknown>
> = styled(Collapse)`
  border: none !important;
  .booking-antd-collapse {
    &-item {
      background-color: #fff !important;
      border: none !important;
    }
    &-content-active {
      border: 1px solid var(--color-grey-6) !important;
      border-radius: 0.5rem;
      max-height: 36rem;
      overflow-y: auto;
    }
  }
`;

export default StyledCollapse;
