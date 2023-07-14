import type { SelectProps } from "antd";
import { Select } from "antd";
import styled from "styled-components";

const StyledSelect = styled(Select<SelectProps>)`
  .booking-antd-select-arrow {
    margin-top: -10px;
  }
`;

export default StyledSelect;
