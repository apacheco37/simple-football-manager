"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import styles from "./page.module.css";
import { db } from "./db";

export default function Home() {
  const [name, setName] = useState("");
  const friends = useLiveQuery(() => db.teams.toArray());

  const addPlayer = async () => {
    try {
      if (!name) return;

      await db.teams.add({
        name,
      });

      setName("");
    } catch (error) {
      console.log(`Failed to add ${name}: ${error}`);
    }
  };

  return (
    <main className={styles.main}>
      <button onClick={addPlayer}>Add player</button>
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <ul>
        {friends?.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </main>
  );
}
