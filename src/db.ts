interface GuestbookEntry {
  id: number;
  name: string;
  message?: string;
}

const db: GuestbookEntry[] = [];

let idCounter = 0;

export const createGuestbookEntry = (data: Omit<GuestbookEntry, "id">): GuestbookEntry => {
  const newEntry: GuestbookEntry = {
    id: idCounter++,
    ...data,
  };
  db.push(newEntry);
  return newEntry;
};

export const deleteGuestbookEntryById = (id: number): void => {
  const idxToDeleteAt = findIndexOfGuestbookEntryById(id);
  // type guard against undefined
  if (typeof idxToDeleteAt === 'number') {
    db.splice(idxToDeleteAt, 1);
  };
}

const findIndexOfGuestbookEntryById = (id: number): number | "not found" => {
  const matchingIdx = db.findIndex((entry) => entry.id === id);
  // .findIndex returns -1 if not located
  if (matchingIdx) {
    return matchingIdx;
  } else {
    return "not found"
  }
};

export const getGuestbookEntryById = (id: number): GuestbookEntry | "not found" => {
  const maybeEntry = db.find(entry => entry.id === id);
  if (maybeEntry) {
    return maybeEntry
  } else {
    return "not found"
  };
}

export const updateGuestbookEntryById = (id: number, newData: Partial<Omit<GuestbookEntry, "id">>): GuestbookEntry | "not found" => {
  const idxOfEntry = findIndexOfGuestbookEntryById(id);
  // type guard against "not found"
  if (typeof idxOfEntry === 'number') {
    return Object.assign(db[idxOfEntry], newData);
  } else {
    return "not found";
  }
}