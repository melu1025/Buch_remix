import { Form, Outlet, useActionData } from '@remix-run/react';
import HorizontalBar from '~/component/bar';
import barstyle from '~/component/bar.css';
import type { ActionFunctionArgs } from '@remix-run/node';
import { Button, Flex, Input, Select } from '@chakra-ui/react';
import BookTable from '~/component/book.table';

export async function fetchBuch(suchkriterien: string) {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  const res = await fetch(`https://localhost:3000/rest/?${suchkriterien}`);
  return await res.json();
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  //   delete empty values    //orginally [...formData.entries()])
  for (const [key, value] of formData.entries()) {
    if (value === '') formData.delete(key);
  }

  const queryString = new URLSearchParams(formData as any).toString();
  console.log('formData:', queryString);
  const buchData = await fetchBuch(queryString);
  console.log('buecher:', buchData?._embedded?.buecher);
  return buchData;
}

export default function Search() {
  const data = useActionData<typeof action>();

  return (
    <div>
      <main>
        <HorizontalBar
          title="Suche"
          subtitle="Stöbern Sie durch die Bücherwelt:Finde Sie Ihren nächsten literrarischen
        Begleiter mit unserer leistungsstarken Suchfunktion"
        />
        <Flex
          direction="column"
          align="center"
          justify="center"
          marginTop="10px"
        >
          <Form method="post" action="/search">
            <Flex direction="row" align="center" justify="center" mb="4">
              <Input type="text" name="titel" placeholder="Titel" mr="2" />
              <Input
                type="text"
                name="schlagwoerter"
                placeholder="Schlagwörter"
              />
            </Flex>
            <Flex direction="row" align="center" justify="center" mb="4">
              <Select name="art" placeholder="Art" width="100%">
                <option>DRUCKAUSGABE</option>
                <option>KINDLE</option>
              </Select>
            </Flex>
            <Button mt="4" colorScheme="teal" type="submit">
              Suche
            </Button>
          </Form>
          {<BookTable {...data?._embedded?.buecher}></BookTable>}
        </Flex>
        <Outlet />
      </main>
    </div>
  );
}
export function links() {
  return [{ rel: 'stylesheet', href: barstyle }];
}
