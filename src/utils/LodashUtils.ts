import { get, isArray, isNil } from "lodash";

const safeGetString = (
  json: unknown,
  path: string,
  defaultValue: string
): string => {
  const value = get(json, path);
  if (typeof value === "string") {
    return value;
  }
  return defaultValue;
};

const safeGetNumber = (
  json: unknown,
  path: string,
  defaultValue: number
): number => {
  const value = get(json, path);
  if (typeof value === "number") {
    return value;
  }
  return defaultValue;
};

const safeGet = (json: unknown, path: string, defaultValue: any): any => {
  const value = get(json, path);
  if (isNil(value)) {
    return defaultValue;
  }
  return value;
};

const safeGetArray = (
  json: unknown,
  path: string,
  defaultValue: any[]
): any => {
  const value = get(json, path);
  if (isArray(value)) {
    return value;
  }
  return defaultValue;
};

export default {
  safeGetString,
  safeGetNumber,
  safeGet,
  safeGetArray,
};
