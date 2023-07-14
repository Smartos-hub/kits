import { Button } from "antd";
import type { DefaultTheme, StyledComponent } from "styled-components";
import styled from "styled-components";

const StyledButton: StyledComponent<
  typeof Button,
  DefaultTheme,
  Record<string, unknown>
> = styled(Button)`
  border-width: 2px;
  border-style: solid;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 700;
  height: var(--height-base);
  padding: 8px 16px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  line-height: 1;
  color: ${({ theme }) => theme.text.grey1};
  &.ant-input:hover {
    cursor: pointer;
    border-color: transparent;
    background: var(--primary-hover-color);
  }
  &.ant-input {
    background: #ededed;
    border-color: transparent;
  }
  &.ant-input:active {
    background-color: ${({ theme }) => theme.color.neutral40};
    border-color: ${({ theme }) => theme.color.neutral40};
  }
  &.ant-input.ant-input:hover {
    background: ${({ theme }) => theme.drawer.cancelBtnBg};
    border-color: ${({ theme }) => theme.drawer.cancelBtnBg};
  }
  &.ant-input-primary {
    background: ${({ theme }) => theme.palette.primary};
    border-color: ${({ theme }) => theme.palette.primary};
  }
  &.ant-input.ant-input-primary:hover {
    background: #ffdc5c;
    border-color: #ffdc5c;
  }
  &.ant-input-link {
    background: transparent;
    text-decoration: underline;
    border-color: transparent;
  }
  &.ant-input.ant-input-link:hover {
    background: transparent;
    color: ${({ theme }) => theme.palette.primary};
    border-color: transparent;
  }
  &.ant-input.ant-input-link:disabled:hover {
    color: ${({ theme }) => theme.text.grey1};
  }
  &.ant-input-text {
    background: transparent;
    border-color: transparent;
  }
  &.ant-input-dashed {
    background: transparent;
    border-style: dashed;
    border-color: ${({ theme }) => theme.text.grey1};
  }
  &.ant-input.ant-input-dashed:hover {
    background: transparent;
    border-style: dashed;
    border-color: ${({ theme }) => theme.palette.primary};
    color: ${({ theme }) => theme.palette.primary};
  }
  &.ant-input:disabled,
  &.ant-input-primary:disabled,
  &.ant-input-link:disabled,
  &.ant-input[mode="outline"]:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  &.ant-input:focus {
    border-color: ${({ theme }) => theme.color.neutral40};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.neutral40};
  }
  &.ant-input-link:focus,
  &.ant-input-link:active {
    border-color: transparent;
    box-shadow: none;
    background: transparent;
    color: ${({ theme }) => theme.palette.primary};
  }
  &.ant-input-primary:active {
    background-color: ${({ theme }) => theme.color.alert};
    border-color: ${({ theme }) => theme.color.alert};
  }
  &.ant-input-primary:focus {
    border-color: ${({ theme }) => theme.color.candlelight};
    background: ${({ theme }) => theme.color.candlelight};
    box-shadow: 0px 0px 0px 4px #fff0b9;
  }
  &.ant-input-lg {
    height: var(--height-lg);
    padding: 11px 24px;
    font-size: 16px;
  }
  &.ant-input-sm {
    height: var(--height-sm);
    padding: 4px 8px;
    font-size: 12px;
  }
  &.ant-input[mode="outline"] {
    background: #ffffff;
    border-color: ${({ theme }) => theme.text.grey1};
  }
  &.ant-input[mode="outline"]:hover {
    background: #f5f5f5;
    border-color: ${({ theme }) => theme.text.grey1};
  }
  &.ant-input[mode="outline"]:active {
    background: #ededed;
  }
  &.ant-input[mode="outline"]:focus {
    border-color: ${({ theme }) => theme.text.grey1};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.grey5};
  }
  .anticon {
    margin: 0 4px;
  }
`;

export default StyledButton;
