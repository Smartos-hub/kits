import type { Rule } from "antd/lib/form";
import i18next from "i18next";
import isNumber from "lodash-es/isNumber";

interface ValidateOptions {
  compareValue: number;
  compareLabel?: string;
  isEqual?: boolean;
  dependencyValues?: (string | number | null)[];
}

export const validateNumberShouldLargerThanZero = (): Rule => ({
  validator(_, value) {
    if (!isNumber(value) || value > 0) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(i18next.t("input.field.validateMsg.cantSmallerOrEqual0"))
    );
  },
});

export const validateNumberShouldLargerThan = ({
  compareValue,
  compareLabel,
  isEqual,
  dependencyValues,
}: ValidateOptions): Rule => ({
  validator(_, value) {
    if (
      !(
        Array.isArray(dependencyValues) &&
        dependencyValues.every((value) => !!value)
      ) ||
      !isNumber(value) ||
      value > compareValue ||
      (isEqual && value === compareValue)
    ) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        i18next.t(
          isEqual
            ? "input.field.validateMsg.cantSmallerOrEqual"
            : "input.field.validateMsg.cantSmaller",
          { name: compareLabel ?? compareValue }
        )
      )
    );
  },
});

export const validateNumberShouldSmallerThan = ({
  compareValue,
  compareLabel,
  isEqual,
  dependencyValues,
}: ValidateOptions): Rule => ({
  validator(_, value) {
    if (
      (Array.isArray(dependencyValues) &&
        !dependencyValues.every((value) => !!value)) ||
      !isNumber(value) ||
      value < compareValue ||
      (isEqual && value === compareValue)
    ) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        i18next.t(
          isEqual
            ? "input.field.validateMsg.cantGreater"
            : "input.field.validateMsg.cantGreaterOrEqual",
          { name: compareLabel ?? compareValue }
        )
      )
    );
  },
});
