import { isObject } from "./typeGards";
import { replaceTags } from "./validation";

function convertCamelCaseToSnakeCase(key: string): string {
  return key.replace(/[A-Z]/gm, value => `_${value.toLowerCase()}`);
}

function convertSnakeCaseToCamelCase(key: string): string {
  return key.replace(/(_\w)/gm, val => `${val[1].toUpperCase()}`);
}

export function convertDataForRequest(data: PlainObject): PlainObject {
  if (!isObject(data)) {
    throw new Error("На вход нужно подать обьект");
  }
  return Object.entries(data)
    .reduce((acc, [key, value]) =>
      ({...acc, [convertCamelCaseToSnakeCase(key)]: replaceTags(value)}),
    {});
}

export function convertResponseToData<C extends PlainObject>(response: PlainObject): C {
  if (!isObject(response)) {
    throw new Error("На вход нужно подать обьект");
  }

  return Object.entries(response)
    .reduce((acc, [key, value]) => ({
      ...acc,
      [convertSnakeCaseToCamelCase(key)]: isObject(value) ? convertResponseToData(value) : replaceTags(value) }),
    {}) as C;
}

export function parseDate(value: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 ;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}.${month < 10 ? "0" + month : month}.${year} ${hours}:${minutes}`;
}
