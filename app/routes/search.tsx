import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";
import BuchTable from "~/component/book.table"


export default function Search() {
  // throw new Error("💣💥 Booooom");

  return (
      <ChakraProvider>
        <BuchTable></BuchTable>
        <Outlet />
      </ChakraProvider>   
  );
}