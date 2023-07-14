import { FilterDto, ObjFilter, Query_Operator } from "../interface/utils";
import { isEmpty } from "./tools";

export function formattedFilter(inputObj: ObjFilter): FilterDto[] {
  const filters: FilterDto[] = [];

  for (const key in inputObj) {
    const fieldValue = inputObj[key];

    for (const operator in fieldValue) {
      const data = fieldValue[operator as Query_Operator];

      const isDataEmptyString = isEmpty(data);

      if (!data || isDataEmptyString) {
        continue;
      }

      filters.push({
        data: Array.isArray(data) ? data.join(",") : data,
        field: key,
        operator: operator as Query_Operator,
      });
    }
  }
  return filters;
}

export const getOrderByKey = (key: string, tableOrder: string) => {
  if (key && tableOrder?.split?.(":")?.[0] === key) {
    if (tableOrder.split(":")[1] === "ASC") {
      return "ascend";
    }
    return "descend";
  }
  return undefined;
};
