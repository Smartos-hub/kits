import { Table } from "antd";
import type { DefaultTheme, StyledComponent } from "styled-components";
import styled from "styled-components";
import type TableInterface from "antd/es/table/Table";

export const StyledTable: StyledComponent<
  typeof TableInterface,
  DefaultTheme,
  Record<string, unknown>
> = styled(Table)`
  .booking-antd-row:first-child,
  .booking-antd-row:last-child {
    background: var(--color-grey-4);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  .booking-antd-table-row {
    .booking-antd-table-cell {
      .booking-antd-row:first-child,
      .booking-antd-row:last-child {
        background: none;
      }
    }
  }
  .booking-antd-table-filter-dropdown .booking-antd-dropdown-menu {
    border: none;
  }
`;
