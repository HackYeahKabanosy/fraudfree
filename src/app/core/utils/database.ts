import { isValidObjectId } from 'mongoose';

export const documentToObject = <ObjectType>(document?: any) =>
  (document?.toObject({ virtuals: true }) as ObjectType) ?? null;

export const buildSetExpression = <Type>(obj: Type, parentPath?: string) => {
  let setExpression: Record<string, any> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      const path = (parentPath ? `${parentPath}.` : '') + key;
      if (
        !value ||
        typeof value !== 'object' ||
        Array.isArray(value) ||
        (value as any).toISOString ||
        isValidObjectId(value)
      )
        setExpression[path] = value;
      else {
        setExpression = {
          ...setExpression,
          ...buildSetExpression(value, path),
        };
      }
    }
  });
  return setExpression;
};
