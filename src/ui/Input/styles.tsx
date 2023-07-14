import { Input } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.border.whiteLilac} !important;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.palette.primary} !important;
    box-shadow: none;
  }

  &-group-addon .ant-select-open .ant-select-selection,
  &-group-addon .ant-select-focused .ant-select-selection {
    color: var(--primary-color);
  }

  &-affix-wrapper:hover,
  &-affix-wrapper:not(&-affix-wrapper-disabled):hover {
    border-color: var(--primary-hover-color);
  }

  &-affix-wrapper:hover &:not(&-disabled) {
    border-color: var(--primary-hover-color);
  }

  &-affix-wrapper:focus,
  &-affix-wrapper-focused {
    border-color: var(--primary-hover-color);
    box-shadow: 0 0 0 2px var(--primary-shadow-color);
  }

  &-search &:hover,
  &-search &:focus {
    border-color: var(--primary-hover-color);
  }

  &-search &:hover + &-group-addon &-search-button:not(.ant-btn-primary),
  &-search &:focus + &-group-addon &-search-button:not(.ant-btn-primary) {
    border-color: var(--primary-hover-color);
  }
`;

export default StyledInput;
