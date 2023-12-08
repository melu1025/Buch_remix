import { Heading } from "@chakra-ui/react";
import NewBook from "~/component/newBook";
import newCreateStyle from "~/component/NewBook.css";

export default function Create() {
    return (
      <div>
        <Heading>Neues Buch anlegen</Heading>
        <main>
          <NewBook />
        </main>
      </div>
    );
  }

  export function links() {
    return [{ rel: 'stylesheet', href: newCreateStyle}];
  }