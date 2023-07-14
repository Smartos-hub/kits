import type {
  DocumentNode,
  TypedDocumentNode,
  FetchPolicy
} from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { debounce } from "lodash-es";
import type {
  Maybe,
  InputMaybe,
  SearchConfigParams,
  MetaPaginationInterface,
  QueryFilterDto
} from "../interface/utils";

export interface FormatDataResponse {
  meta?: Maybe<MetaPaginationInterface>;
  items?: Maybe<unknown>[] | null;
}

interface Props<TData, TVariables> {
  query: DocumentNode | TypedDocumentNode<TData, TVariables>;
  itemsPerPage?: number;
  formatData: (e: TData) => FormatDataResponse | null | undefined;
  variables?: TVariables & {
    queryParams?: QueryFilterDto;
    searchConfigParams?: InputMaybe<SearchConfigParams>;
    checkHavingPackages?: boolean;
  };
  fetchPolicy?: FetchPolicy;
  skip?: boolean;
}

const BROWSER_OFFSET = 10;

export const useInfiniteLoadQuery = <TData, TVariables, T>({
  query,
  itemsPerPage = 10,
  variables,
  formatData,
  skip,
  fetchPolicy = "cache-first"
}: Props<TData, TVariables>) => {
  const [data, setData] = useState<unknown[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: itemsPerPage,
    total: itemsPerPage,
    totalPage: 1
  });
  const [totalItems, setTotalItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const { error, refetch } = useQuery<TData>(query, {
    fetchPolicy,
    onCompleted(data) {
      setLoading(false);
      const formatedData = formatData(data);
      if (formatedData?.meta?.currentPage === 1) {
        setData(formatedData?.items || []);
        setTotalItems(formatedData?.meta?.totalItems || 0);
        setPageNumber(2);
        setPagination({
          pageNumber: formatedData?.meta?.currentPage || 1,
          pageSize: formatedData?.meta?.itemsPerPage || 10,
          total: formatedData?.meta?.totalItems || 10,
          totalPage: formatedData?.meta?.totalPages || 1
        });
      }
    },
    onError: () => {
      setLoading(false);
    },
    skip,
    variables: {
      queryParams: {
        limit: itemsPerPage,
        page: 1,
        ...variables?.queryParams
      },
      ...(variables?.searchConfigParams && {
        searchConfigParams: variables?.searchConfigParams
      }),
      ...(variables?.checkHavingPackages && {
        checkHavingPackages: true
      })
    }
  });

  const loadMore = (event: React.UIEvent) => {
    if (pagination.pageNumber >= pagination.totalPage) return;
    const target = event.target as HTMLDivElement;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight <=
        target.scrollHeight + BROWSER_OFFSET &&
      target.scrollTop + target.offsetHeight >=
        target.scrollHeight - BROWSER_OFFSET
    ) {
      setLoading(true);
      refetch({
        queryParams: {
          ...variables?.queryParams,
          limit: itemsPerPage,
          page: pageNumber
        }
      })
        .then(data => {
          const formatedData = formatData(data.data);
          setPageNumber(currentPage => currentPage + 1);
          setTotalItems(formatedData?.meta?.totalItems || 0);
          setData(oldData => [...oldData, ...(formatedData?.items || [])]);
          setPagination({
            pageNumber: formatedData?.meta?.currentPage || 1,
            pageSize: formatedData?.meta?.itemsPerPage || 10,
            total: formatedData?.meta?.totalItems || 10,
            totalPage: formatedData?.meta?.totalPages || 1
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onSearch = debounce((value: string) => {
    setLoading(true);
    refetch({
      queryParams: {
        ...variables?.queryParams,
        limit: itemsPerPage,
        page: 1,
        q: value.trim()
      }
    })
      .then(data => {
        const formatedData = formatData(data.data);
        setPageNumber(2);
        setTotalItems(formatedData?.meta?.totalItems || 0);
        setData(formatedData?.items ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 600);

  return {
    data: data as T[],
    error,
    hasMore: pagination.pageNumber < pagination.totalPage,
    loadMore,
    loading,
    onSearch,
    pageNumber,
    refetch,
    setData,
    setPageNumber,
    setPagination,
    totalItems
  };
};
