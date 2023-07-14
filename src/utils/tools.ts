import get from "lodash-es/get";
import { forEach, reduce } from "lodash-es";
import { parse, stringify } from "query-string";
import { Maybe, Scalars, TCommonObj } from "../interface/utils";
import { LIMIT_TRUNCATE_TEXT } from "../constants";
import i18next from "i18next";

export function convertDataToSelectOptions<T>(
  data: T[],
  valueProp: string,
  labelProp: string
) {
  return data?.map((item) => ({
    label: get(item, labelProp),
    value: get(item, valueProp),
  }));
}

export const getQueryParamsFromUrl = (searchStr: string) => {
  const parsed = parse(searchStr);

  forEach(parsed, (value, key) => {
    if (typeof value === "string") {
      try {
        parsed[key] = JSON.parse(value);
      } catch (error) {
        // console.log(error, 'error')
      }
    }
  });

  if (typeof parsed?.q === "number") {
    parsed.q = String(parsed.q);
  }

  return parsed;
};

export function isEmpty(value?: string | number | object): boolean {
  if (
    typeof value === "undefined" ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  }
  return false;
}

export const getValidDataOfObj = ({
  data: obj,
  isCreateEdit = false,
  isTrimStr = true,
}: {
  data: TCommonObj;
  isCreateEdit?: boolean;
  isTrimStr?: boolean;
}): Scalars["JSON"] => {
  const validData = reduce(
    obj,
    (result, value, key) => {
      if (Array.isArray(value)) {
        if (isCreateEdit) return { ...result, [key]: value };
        return value.length > 0 ? { ...result, [key]: value } : result;
      }
      if (typeof value === "object" && !isEmpty(value)) {
        const formatChildValue = getValidDataOfObj({
          data: value,
          isCreateEdit,
          isTrimStr,
        });
        return !isEmpty(formatChildValue)
          ? { ...result, [key]: formatChildValue }
          : result;
      }

      if (value || value === false || value === 0) {
        if (typeof value === "string") {
          const trimValue = isTrimStr ? value.trim() : value;
          if (trimValue) return { ...result, [key]: trimValue };
          if (isCreateEdit) {
            return { ...result, [key]: null };
          }
          return result;
        }

        return { ...result, [key]: value };
      }

      if (isCreateEdit && (value === "" || value === null)) {
        return { ...result, [key]: null };
      }

      return result;
    },
    {}
  );
  return validData;
};

export const convertObjToSearchStr = (params: TCommonObj) => {
  let obj = {};

  Object.entries(getValidDataOfObj({ data: params })).forEach((data) => {
    const [key, value] = data;
    if (typeof value === "string") {
      obj = {
        ...obj,
        [key]: value,
      };
    } else {
      obj = {
        ...obj,
        [key]: JSON.stringify(value),
      };
    }
  });

  return stringify(obj);
};

export const formatDataI18n = (
  displayName?: Maybe<TCommonObj>,
  name?: Maybe<string>
) => displayName?.[i18next.language] || displayName || name;

export const trimObj = (obj: Record<string, unknown>) =>
  JSON.parse(JSON.stringify(obj).replace(/"\s+|\s+"/g, '"'));

export const truncateText = (text: string, limit = LIMIT_TRUNCATE_TEXT) => {
  if (text?.length < limit) return text;
  return `${text?.substring(0, limit)}...`;
};

export function omitCustom<T>(object: T, keys: (keyof T)[]) {
  const objectAfter = {} as unknown as T;

  for (const p in object) {
    if (!keys.includes(p.valueOf() as keyof T)) {
      objectAfter[p] = object[p];
    }
  }

  return objectAfter as Omit<T, keyof typeof keys>;
}

export const isNumber = (value?: Maybe<number>) => typeof value === "number";

export function flattenObject(obj: Scalars["JSON"], key: string) {
  const result: Scalars["JSON"] = {};

  function traverse(obj: Scalars["JSON"], key: string) {
    if (typeof obj !== "object") {
      result[key] = obj;
    } else {
      for (const k in obj) {
        traverse(obj[k], key ? `${key}.${k}` : k);
      }
    }
  }

  traverse(obj, key);
  return result;
}
