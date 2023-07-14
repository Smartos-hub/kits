import React from 'react';
import type { InputProps } from 'antd';
import StyledInput from './styles';

type InputUIProps = InputProps;

export function InputUI({ ...props }: InputUIProps & InputProps) {
  return <StyledInput {...props} />;
}
