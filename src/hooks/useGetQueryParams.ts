import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import type { QueryParams } from "./usePagination";
import { Scalars } from "../interface/utils";
import { getQueryParamsFromUrl } from "../utils/tools";

export const useGetQueryParams = () => {
  const { location } = useHistory();

  const [queryParams, setQueryParams] = useState<Partial<QueryParams>>({});
  const [hasFilter, setHasFilter] = useState(false);

  const getQueryParams = (): QueryParams => {
    const queryParam = getQueryParamsFromUrl(location.search) as unknown;

    const { filters, outsideFilter, extraFilters, headerFilter } =
      queryParam as Scalars["JSON"];

    setHasFilter(!!(filters || headerFilter || outsideFilter || extraFilters));

    return queryParam as QueryParams;
  };

  const setFilterByUrl = () => {
    const queryParam = getQueryParams();

    setQueryParams({
      headerFilter: queryParam?.headerFilter,
      pagination: queryParam?.pagination,
      tableOrder: queryParam?.tableOrder,
    });
  };

  useEffect(() => {
    setFilterByUrl();
  }, [location?.search]);

  return {
    hasFilter,
    queryParams,
  };
};
