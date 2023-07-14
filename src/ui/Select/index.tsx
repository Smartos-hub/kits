import type { SelectProps } from "antd";
import React from "react";
import StyledSelect from "./styles";

export function SelectUI(props: SelectProps) {
  return (
    <StyledSelect
      suffixIcon={
        <svg
          fill="none"
          height="20"
          viewBox="0 0 21 20"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6663 13.9995C10.0829 13.9995 9.49961 13.7745 9.05794 13.3329L3.62461 7.89954C3.38294 7.65788 3.38294 7.25788 3.62461 7.01621C3.86628 6.77454 4.26628 6.77454 4.50794 7.01621L9.94128 12.4495C10.3413 12.8495 10.9913 12.8495 11.3913 12.4495L16.8246 7.01621C17.0663 6.77454 17.4663 6.77454 17.7079 7.01621C17.9496 7.25788 17.9496 7.65788 17.7079 7.89954L12.2746 13.3329C11.8329 13.7745 11.2496 13.9995 10.6663 13.9995Z"
            fill="#8E9193"
          />
        </svg>
      }
      {...props}
    />
  );
}
