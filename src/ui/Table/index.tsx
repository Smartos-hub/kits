import React from 'react';
import type { TableProps } from 'antd';
import { StyledTable } from './styles';

interface TableUIProps<T> extends TableProps<T> {
  ['_']?: unknown;
}

export function TableUI<T>({ ...props }: TableUIProps<T>) {
  return <StyledTable {...props} />;
}
