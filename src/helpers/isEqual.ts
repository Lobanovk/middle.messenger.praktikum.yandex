import { isArray, isObject } from "./typeGards";

function isArrayOrObject(value: unknown): value is (PlainObject | []) {
  return isObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(lhs) && isArrayOrObject(rhs)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }
    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
