"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import styles from "./page.module.css";
import { db } from "./db";
import { Button, Input, ListItem, UnorderedList } from "@chakra-ui/react";

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
      <Button onClick={addPlayer}>Add player</Button>
      <Input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <UnorderedList>
        {friends?.map((friend) => (
          <ListItem key={friend.id}>{friend.name}</ListItem>
        ))}
      </UnorderedList>
    </main>
  );
}
