export function flattenJson<ObjectType extends object>(
  jsonObject: Record<string, ObjectType>,
): Array<ObjectType & { id: string }> {
  const flattenedArray: Array<ObjectType & { id: string }> = [];

  for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      const flattenedObject = { id: key, ...jsonObject[key] };
      flattenedArray.push(flattenedObject);
    }
  }

  return flattenedArray;
}
