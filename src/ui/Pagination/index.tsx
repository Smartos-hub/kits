import type { PaginationProps } from "antd";
import { useTranslation } from "react-i18next";
import React from "react";
import { formatPlural } from "../../utils/strings";
import StyledPagination from "./styles";

type PaginationUIProps = PaginationProps;

export function PaginationUI({ ...props }: PaginationUIProps) {
  const { t } = useTranslation();

  return (
    <StyledPagination
      locale={{
        ["jump_to"]: t("common.goto"),
        page: ""
      }}
      showTotal={(total, range) =>
        `${range[0]}-${range[1]}/${total} ${formatPlural(
          t("common.result"),
          total
        ).toLowerCase()}`
      }
      size="small"
      {...props}
    />
  );
}
