import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";
import BuchTable from "~/component/book.table"
import HorizontalBar from "~/component/bar";
import Barstyle from '~/component/bar.css';



export default function Search() {
  // throw new Error("💣💥 Booooom");

  return (

      <ChakraProvider>
          <HorizontalBar title="Suche" subtitle="Finde dein Lieblingsbuch" />
          <BuchTable></BuchTable>
          <Outlet />
      </ChakraProvider>   
  );
}
export function links() {
    return [{ rel: 'stylesheet', href: Barstyle}];
}