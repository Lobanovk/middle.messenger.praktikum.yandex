import { isObject } from "./typeGards";

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
      ({...acc, [convertCamelCaseToSnakeCase(key)]: value}),
    {});
}

export function convertResponseToData<C extends PlainObject>(response: PlainObject): C {
  if (!isObject(response)) {
    throw new Error("На вход нужно подать обьект");
  }

  return Object.entries(response)
    .reduce((acc, [key, value]) => ({ ...acc, [convertSnakeCaseToCamelCase(key)]: value }),
      {}) as C;
}
