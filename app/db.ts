import Dexie, { Table } from "dexie";

export interface Team {
  id?: number;
  name: string;
}

export class DexieClass extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  teams!: Table<Team>;

  constructor() {
    super("simple-fm-db");
    this.version(1).stores({
      teams: "++id, name",
    });
  }
}

export const db = new DexieClass();
