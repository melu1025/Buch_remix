/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable array-func/prefer-array-from */
/* eslint-disable unicorn/no-array-for-each */
import { Form, Outlet, useActionData } from '@remix-run/react';
import HorizontalBar from '~/component/bar';
import barstyle from '~/component/bar.css';
import searchstyle from '~/component/search.css';
import type { ActionFunctionArgs } from '@remix-run/node';
import { Button, Flex, Input, Select, Checkbox } from '@chakra-ui/react';
import BookTable from '~/component/book.table';
import { fetchBuch } from '~/service/book.service';
import StarsRating from '~/component/stars';
import { useState } from 'react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  [...formData.entries()].forEach(([key, value]) => {
    if (value === '' || value === '0') formData.delete(key);
  });

  const queryString = new URLSearchParams(formData as any).toString();
  console.log('formData:', queryString);
  const buchData = await fetchBuch(queryString);
  console.log('fetchBuch:', buchData?._embedded?.buecher ?? buchData);

  return buchData?._embedded?.buecher ?? buchData;
}

export default function Search() {
  const actionData = useActionData<typeof action>();

  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  return (
    <div>
      <HorizontalBar
        title="Suche"
        subtitle="Stöbern Sie durch die Bücherwelt:Finde Sie Ihren nächsten literrarischen
        Begleiter mit unserer leistungsstarken Suchfunktion"
      />
      <main>
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
                placeholder="z.B. JAVASCRIPT"
              />
            </Flex>
            <Flex direction="row" align="center" justify="center" mb="4">
              <Select name="art" placeholder="BuchArt" width="100%">
                <option>DRUCKAUSGABE</option>
                <option>KINDLE</option>
              </Select>
              <Input type="hidden" name="rating" value={selectedRating} />
              <StarsRating
                value={selectedRating}
                onChange={handleRatingChange}
              ></StarsRating>
            </Flex>
            <Flex>
              <Checkbox value="true" name="lieferbar">
                lieferbar
              </Checkbox>
            </Flex>
            <Button mt="4" colorScheme="teal" type="submit">
              Suche
            </Button>
          </Form>
          <BookTable buchArray={actionData}></BookTable>
        </Flex>
        <Outlet />
      </main>
    </div>
  );
}
export function links() {
  return [
    { rel: 'stylesheet', href: barstyle },
    { rel: 'stylesheet', href: searchstyle },
  ];
}
