import { nationalities } from "../constants";
import { Maybe } from "../interface/utils";
import { formatDataI18n } from "./tools";

export const formatterInputNumberInt = <Type>(value: Type): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replaceAll(",", "");

export const formatterInputNumber = (
  num: number | string | null | undefined
): string => {
  if (!num || isNaN(Number(num))) return String(num);

  return `${num
    .toString()
    .replace(/^[+-]?\d+/, (init) =>
      init.replace(new RegExp(`(\\d)(?=(\\d{${3}})+$)`, "g"), "$1,")
    )}`;
};

export const parserInputNumber = (value: string | undefined): string =>
  value ? value.replace(/\$\s?|(,*)/g, "") : "";

export const formatCountry = (data?: Maybe<string>) => {
  const nationality = nationalities.find((item) => item.name === data);
  return formatDataI18n(nationality?.displayName, data);
};
