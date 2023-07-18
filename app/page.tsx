"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Button,
  Input,
  ListItem,
  Stack,
  UnorderedList,
  Text,
} from "@chakra-ui/react";

import styles from "./page.module.css";
import { db } from "../db/db";

export default function Home() {
  const [name, setName] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const leagues = useLiveQuery(() => db.leagues.toArray());

  const createNewLeague = async () => {
    try {
      if (!name) {
        setInvalidInput(true);
        return;
      }

      await db.leagues.add({
        name,
        teams: [
          { name: "Team 1" },
          { name: "Team 2" },
          { name: "Team 3" },
          { name: "Team 4" },
        ],
      });

      setName("");
    } catch (error) {
      console.log(`Failed to add ${name}: ${error}`);
    }
  };

  const onInputChange = (inputString: string) => {
    if (inputString && invalidInput) {
      setInvalidInput(false);
    }
    setName(inputString);
  };

  return (
    <main className={styles.main}>
      <Stack spacing={12}>
        <Stack direction={"row"}>
          <Input
            isInvalid={invalidInput}
            className={styles.input}
            type="text"
            value={name}
            placeholder="League Name"
            onChange={(e) => onInputChange(e.target.value)}
          />
          <Button className={styles.button} onClick={createNewLeague}>
            Create New League
          </Button>
        </Stack>
        <Text>Or load an existing one:</Text>
        <UnorderedList>
          {leagues?.map((league) => (
            <ListItem key={league.id}>{league.name}</ListItem>
          ))}
        </UnorderedList>
      </Stack>
    </main>
  );
}
