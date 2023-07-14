import dayjs from "dayjs";
import { Maybe } from "../interface/utils";

export const formatDate = (text?: Maybe<Date>) =>
  text ? dayjs(String(text)).format("DD/MM/YYYY") : null;

export const formatDateOnSubmit = (value: Date) =>
  dayjs(value).startOf("date").toDate();

export const formatTimeOnSubmit = (value: Date) =>
  dayjs(value).startOf("minutes").toDate();
