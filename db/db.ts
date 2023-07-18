import Dexie, { Table } from "dexie";

export interface Team {
  id?: number;
  name: string;
}

export interface League {
  id?: number;
  name: string;
  teams: Team[];
}

export class DexieClass extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  teams!: Table<Team>;
  leagues!: Table<League>;

  constructor() {
    super("simple-fm-db");
    this.version(3).stores({
      teams: "++id, name",
      leagues: "++id",
    });
  }
}

export const db = new DexieClass();
