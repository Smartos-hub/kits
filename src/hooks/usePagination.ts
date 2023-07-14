import { Form } from "antd";
import { omitBy } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import type { QueryFilterDtoFE } from "../interface/utils";
import { formattedFilter } from "../utils/formatFilters";
import {
  convertObjToSearchStr,
  getQueryParamsFromUrl,
  trimObj,
  isEmpty,
  omitCustom,
  flattenObject,
} from "../utils/tools";
import { QUERY_PARAMS_DEFAULT } from "../constants";

const defaultPagination = {
  limit: QUERY_PARAMS_DEFAULT.limit,
  page: QUERY_PARAMS_DEFAULT.page,
};

const defaultQueryParamFilters = {
  headerFilter: {},
  rangeFilter: {},
};

interface Pagination {
  limit: number;
  page: number;
}

export interface QueryParams {
  tableOrder?: string;
  headerFilter: QueryFilterDtoFE;
  pagination: Pagination;
}

interface Props extends Partial<QueryParams> {
  isSyncFilterByDefaultToUrl?: boolean;
}

export const usePagination = ({
  tableOrder,
  headerFilter,
  pagination,
  isSyncFilterByDefaultToUrl = true,
}: Props) => {
  const { location } = useHistory();
  const { replace } = useHistory();

  const [queryParams, setQueryParams] = useState<Partial<QueryParams>>({});

  const [headFormFilter] = Form.useForm();

  const replaceUrl = (newQueryParams: Partial<QueryParams>) => {
    let search: string;

    if (Object.keys(newQueryParams).length === 0) {
      search = convertObjToSearchStr({});
    } else {
      search = convertObjToSearchStr({
        ...newQueryParams,
      });
    }

    replace({
      search,
    });
  };

  const onChangeQueryParams = useCallback(
    ({
      newFilter = defaultQueryParamFilters,
      isSyncToUrl = true,
    }: {
      newFilter?: Partial<QueryParams>;
      isSyncToUrl?: boolean;
    }) => {
      setQueryParams((prev) => {
        const newQueryParams = {
          ...prev,
          ...newFilter,
        };

        const isDefaultPagination =
          newQueryParams?.pagination?.limit === defaultPagination.limit &&
          newQueryParams?.pagination?.page === defaultPagination.page;

        const isDefaultTableOrder =
          newQueryParams.tableOrder === tableOrder ||
          !tableOrder ||
          !newQueryParams.tableOrder;

        const syncToUrl =
          !isDefaultPagination ||
          !isDefaultTableOrder ||
          !isEmpty(omitBy(newQueryParams.headerFilter?.filters, isEmpty)) ||
          !isEmpty(omitBy(newQueryParams.headerFilter?.outsideFilter, isEmpty));

        if (isSyncToUrl) {
          if (syncToUrl) {
            replaceUrl(omitBy(newQueryParams, isEmpty));
          } else {
            replaceUrl({});
          }
        }

        return newQueryParams;
      });
    },
    []
  );

  const onResetHeaderFilter = useCallback(() => {
    headFormFilter.resetFields();

    onChangeQueryParams({});
  }, []);

  const getQueryParams = (): QueryParams => {
    const queryParam = getQueryParamsFromUrl(
      location.search
    ) as unknown as QueryParams;

    return queryParam;
  };

  const onHeaderFilterChange = useCallback((values: QueryFilterDtoFE) => {
    const { outsideFilter, extraFilters, ...filters } = trimObj({
      ...values,
    }) as QueryFilterDtoFE;

    onChangeQueryParams({
      newFilter: {
        headerFilter: {
          extraFilters,
          filters: {
            ...(filters as QueryFilterDtoFE["filters"]),
          },
          outsideFilter,
        },
        pagination: defaultPagination,
      },
    });
  }, []);

  const onChangeTableOrder = useCallback((tableOrder: string) => {
    onChangeQueryParams({
      newFilter: {
        tableOrder,
      },
    });
  }, []);

  const onChangePagination = useCallback((page: number, pageSize: number) => {
    onChangeQueryParams({
      newFilter: {
        pagination: { limit: pageSize, page },
      },
    });
  }, []);

  const setFilterByUrl = useCallback(() => {
    const queryParam = getQueryParams();

    setQueryParams({
      headerFilter: queryParam.headerFilter || {},
      pagination: queryParam.pagination || defaultPagination,
      tableOrder: queryParam.tableOrder,
    });

    const { outsideFilter, extraFilters, filters } =
      queryParam.headerFilter || {};

    headFormFilter.setFieldsValue({
      ...filters,
      extraFilters,
      outsideFilter,
    });
  }, []);

  const setFilterByDefault = (isSyncToUrl: boolean) => {
    const newFilter = {
      headerFilter: headerFilter || {},
      pagination: pagination || defaultPagination,
      tableOrder,
    };

    onChangeQueryParams({
      isSyncToUrl,
      newFilter,
    });

    const { outsideFilter, extraFilters, filters } = headerFilter || {};

    headFormFilter.setFieldsValue({
      ...filters,
      extraFilters,
      outsideFilter,
    });
  };

  useEffect(() => {
    if (location.search === "") {
      setFilterByDefault(isSyncFilterByDefaultToUrl);
    } else {
      setFilterByUrl();
    }
  }, []);

  const getExtraFilters = useMemo(() => {
    const formattedExtraFilters = omitBy(
      {
        ...queryParams?.headerFilter?.extraFilters,
      },
      isEmpty
    );

    if (
      formattedExtraFilters &&
      Object.keys(formattedExtraFilters)?.length > 0
    ) {
      return {
        extraFilters: {
          ...formattedExtraFilters,
        },
      };
    }
    return {};
  }, [queryParams?.headerFilter]);

  const getFilters = useMemo(() => {
    if (queryParams?.headerFilter?.filters) {
      return {
        filters: formattedFilter({
          ...queryParams?.headerFilter?.filters,
        }),
      };
    }
    return {};
  }, [queryParams?.headerFilter]);

  const getOutsideFilters = useMemo(() => {
    const formattedOutsideFilters = omitBy(
      {
        ...queryParams?.headerFilter?.outsideFilter,
      },
      isEmpty
    );

    return formattedOutsideFilters;
  }, [queryParams?.headerFilter?.outsideFilter]);

  const getOrderBy = useMemo(() => {
    if (queryParams?.tableOrder) {
      return {
        orderBy: queryParams?.tableOrder,
      };
    }
    return {};
  }, [queryParams?.tableOrder]);

  const haveFilter = useMemo(() => {
    const filter = omitCustom(queryParams, ["tableOrder", "pagination"]);

    const flattenFilter = flattenObject(filter, "queryParams");

    const omitFilter = omitBy(flattenFilter, (item) => !item);

    return !!Object.keys(omitFilter).length;
  }, [queryParams]);

  const onSyncUrlToFilters = () => {
    const queryParam = getQueryParams();

    const { outsideFilter, extraFilters, filters } =
      queryParam?.headerFilter || {};

    headFormFilter.resetFields();

    headFormFilter.setFieldsValue({
      ...filters,
      extraFilters,
      outsideFilter,
    });
  };

  const memoQueryParams = useMemo(
    () =>
      omitBy(
        {
          ...getExtraFilters,
          ...getFilters,
          ...getOrderBy,
          ...getOutsideFilters,
          ...queryParams?.pagination,
        },
        isEmpty
      ),
    [
      getExtraFilters,
      getFilters,
      getOrderBy,
      getOutsideFilters,
      queryParams?.pagination,
    ]
  );

  return {
    haveFilter,
    headFormFilter,
    onChangePagination,
    onChangeTableOrder,
    onHeaderFilterChange,
    onResetHeaderFilter,
    onSyncUrlToFilters,
    outsideFilter: getOutsideFilters,
    pagination: queryParams?.pagination || defaultPagination,
    queryParams: memoQueryParams as QueryFilterDtoFE,
    tableOrder: queryParams?.tableOrder || "",
  };
};
