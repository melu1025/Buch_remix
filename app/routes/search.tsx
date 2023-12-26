
import { Outlet } from "@remix-run/react";
import BuchTable from "~/component/book.table"
import HorizontalBar from "~/component/bar";
import Barstyle from '~/component/bar.css';
import SearchPage from "~/component/searchPage";
import '~/component/searchPage.css';


export default function Search() {
  // throw new Error("💣💥 Booooom");

  return (
      <div>
          <HorizontalBar title="Suche" subtitle="Finde dein Lieblingsbuch" />
          <main>
          <SearchPage></SearchPage>
          <BuchTable></BuchTable>
          <Outlet />
          </main>
      </div>
  );
}
export function links() {
    return [{ rel: 'stylesheet', href: Barstyle}];
}