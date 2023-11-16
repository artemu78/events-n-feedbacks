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

export function EnrichCollection<
  RecipientEntity extends {},
  DonorEntity extends {},
>(
  collectionRecipient: Record<string, RecipientEntity>,
  collectionDonor: Record<string, DonorEntity>,
  foreignKey: keyof RecipientEntity,
  newKey: keyof RecipientEntity,
) {
  const mergedCollection: Record<string, RecipientEntity> = {};
  for (const id in collectionRecipient) {
    const Recipient = collectionRecipient[id];
    const DonorId = Recipient?.[foreignKey] as string;
    const donor = collectionDonor[DonorId] as DonorEntity;
    mergedCollection[id] = { ...Recipient, [newKey]: donor };
  }

  return mergedCollection;
}
