import { ApiError } from "../api/types";

export function isObject(value: unknown): value is PlainObject {
  return typeof value === "object"
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === "[object Object]";
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function apiHasError(response: any): response is ApiError {
  return response && response.reason;
}
