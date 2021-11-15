interface GuestbookEntry {
  id: number;
  name: string;
  message?: string;
}

const db: GuestbookEntry[] = [];

let idCounter = 0;

export const addEntry = (data: Omit<GuestbookEntry, "id">): GuestbookEntry => {
  const newEntry: GuestbookEntry = {
    id: idCounter++,
    ...data,
  };

  db.push(newEntry);
  return newEntry;
};
