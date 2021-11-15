import faker, { fake } from 'faker';

export interface GuestbookSignature {
  name: string;
  message?: string;
};

export interface GuestbookSignatureWithId extends GuestbookSignature {
  id: number;
}

const db: GuestbookSignatureWithId[] = [];

let idCounter = 0;

export const addDummyGuestbookSignatures = (n: number): GuestbookSignatureWithId[] => {
  const createdSignatures: GuestbookSignatureWithId[] = [];
  for (let count = 0; count < n; count++) {
    const createdSignature = addGuestbookSignature({
      name: faker.name.findName(), // random fake name
      message: faker.lorem.sentences(3) // random fake message
    });
    createdSignatures.push(createdSignature);
  };
  return createdSignatures;
}

export const addGuestbookSignature = (data: GuestbookSignature): GuestbookSignatureWithId => {
  const newEntry: GuestbookSignatureWithId = {
    id: ++idCounter,
    ...data,
  };
  db.push(newEntry);
  return newEntry;
};

export const deleteGuestbookSignatureById = (id: number): void => {
  const idxToDeleteAt = findIndexOfGuestbookSignatureById(id);
  // type guard against undefined
  if (typeof idxToDeleteAt === 'number') {
    db.splice(idxToDeleteAt, 1);
  };
}

const findIndexOfGuestbookSignatureById = (id: number): number | "not found" => {
  const matchingIdx = db.findIndex((entry) => entry.id === id);
  // .findIndex returns -1 if not located
  if (matchingIdx) {
    return matchingIdx;
  } else {
    return "not found"
  }
};

export const getAllGuestbookSignatures = (): GuestbookSignatureWithId[] => {
  return db;
}

export const getGuestbookSignatureById = (id: number): GuestbookSignatureWithId | "not found" => {
  const maybeEntry = db.find(entry => entry.id === id);
  if (maybeEntry) {
    return maybeEntry
  } else {
    return "not found"
  };
}

export const updateGuestbookSignatureById = (id: number, newData: Partial<GuestbookSignature>): GuestbookSignatureWithId | "not found" => {
  const idxOfEntry = findIndexOfGuestbookSignatureById(id);
  // type guard against "not found"
  if (typeof idxOfEntry === 'number') {
    return Object.assign(db[idxOfEntry], newData);
  } else {
    return "not found";
  }
}