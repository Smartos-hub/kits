import type { ReactNode } from "react";

export enum QueryOperator {
  Eq = "eq",
  Gt = "gt",
  Gte = "gte",
  In = "in",
  IsNotNull = "isNotNull",
  IsNull = "isNull",
  Like = "like",
  Lt = "lt",
  Lte = "lte",
  Neq = "neq",
  Nin = "nin",
  UnaccentLike = "unaccentLike"
}

export type InputMaybe<T> = Maybe<T>;

export type Maybe<T> = T | null;

export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  JSON: any;
  JSONObject: any;
  TimeDate: any;
}

export type ObjFilterValue = {
  [key in QueryOperator]?: any;
};

export interface ObjFilter {
  [key: string]: ObjFilterValue;
}

export type QueryFilterDtoFE = Omit<QueryFilterDto, "filters"> & {
  outsideFilter?: Scalars["JSON"];
  extraFilters?: InputMaybe<FilterDto[]>;
  filters?: ObjFilter;
  [key: string]: Scalars["JSON"];
};

export interface TCommonObj {
  [key: string]: Scalars["JSON"];
}

export interface MetaPaginationInterface {
  __typename?: "MetaPaginationInterface";
  currentPage: Scalars["Float"];
  itemCount: Scalars["Float"];
  itemsPerPage: Scalars["Float"];
  totalItems: Scalars["Float"];
  totalPages: Scalars["Float"];
}

export enum Query_Operator {
  Eq = "eq",
  Gt = "gt",
  Gte = "gte",
  In = "in",
  IsNotNull = "isNotNull",
  IsNull = "isNull",
  Like = "like",
  Lt = "lt",
  Lte = "lte",
  Neq = "neq",
  Nin = "nin",
  UnaccentLike = "unaccentLike"
}

export enum Order_By_Operator {
  DESC = "DESC",
  ASC = "ASC"
}

export interface FilterDto {
  data?: Scalars["String"];
  field: Scalars["String"];
  operator: Query_Operator;
}

export interface QueryFilterDto {
  /**
   *
   * - Filter equal: filters:[{field: "name", operator: eq, data: "Enouvo"}]
   * - Filter not equal: filters:[{field: "name", operator: neq, data: "Enouvo"}]
   * - Filter less than: filters:[{field: "age", operator: lt, data: 40}]
   * - Filter greater than: filters:[{field: "age", operator: gt, data: 40}]
   * - Filter less than and equal: filters:[{field: "age", operator: lte, data: 40}]
   * - Filter greater than and equal: filters:[{field: "age", operator: gte, data: 40}]
   * - Filter field in many choice: filters:[{field: "name", operator: in, data: "Enouvo,Enosta"}]
   * - Filter field not in many choice: filters:[{field: "name", operator: nin, data: "Enouvo,Enosta"}]
   * - Filter field by text: filters:[{field: "name", operator: like, data: "Enouvo"}]
   */
  filters?: Maybe<FilterDto[]>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  limit?: Maybe<Scalars["Float"]>;
  /**
   *
   * - Order by fields and order reverse use prefix "ASC or DESC". Ex: orderBy: "createdAt:DESC"
   *
   */
  orderBy?: Maybe<Scalars["String"]>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  page?: Maybe<Scalars["Float"]>;
  /**
   *
   * - Query by text. Ex: q:"abcxyz"
   *
   */
  q?: Maybe<Scalars["String"]>;
}

export interface IUserInfo {
  item: Maybe<Scalars["JSON"]>;
  avatarProp?: string;
  nameProp?: string;
  phoneNumberProp?: string;
  customNote?: ReactNode;
  path?: string;
  size?: number;
}

export type SearchConfigParams = {
  /** Search by displayName & locale. Example: "sortByDisplayName":"ASC" */
  sortByDisplayName?: InputMaybe<Scalars["String"]>;
};
