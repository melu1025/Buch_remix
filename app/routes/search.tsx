/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable array-func/prefer-array-from */
/* eslint-disable unicorn/no-array-for-each */
import { Form, Outlet, useActionData } from '@remix-run/react';
import HorizontalBar from '~/component/bar';
import barstyle from '~/component/bar.css';
import searchstyle from '~/component/searchPage.css';
import type { ActionFunctionArgs } from '@remix-run/node';
import {
  Button,
  Flex,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
} from '@chakra-ui/react';
import BookTable from '~/component/book.table';
import { fetchBuch } from '~/component/service';
import StarsRating from '~/component/stars';
import { useState } from 'react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  let x: string[] = [];
  [...formData.entries()].forEach(([key, value]) => {
    if (key === 'schlagwoerter') {
      x.push(value.toString());
      formData.delete(key);
    }
  });
  console.log(x.toString());
  formData.append('schlagwoerter', x.toString());
  [...formData.entries()].forEach(([key, value]) => {
    if (value === '' || value === '0') formData.delete(key);
  });
  const v = new URLSearchParams(formData as any);
  console.log(v);
  console.log(formData);
  const queryString = new URLSearchParams(formData as any).toString();
  console.log('formData:', queryString);
  const buchData = await fetchBuch(queryString);
  console.log('buecher:', buchData);

  return buchData?._embedded?.buecher || buchData || 1;
}

export default function Search() {
  const data = useActionData<typeof action>();

  let buecher = data;
  console.log('xdd', data?.embedded?.buecher);
  if (data && data?._embedded) {
    buecher = data?._embedded?.buecher;
    console.log(buecher);
  } else if (data && data.statusCode == 404) {
    buecher = [];
  }
  console.log('xses', buecher);
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
              <CheckboxGroup colorScheme="green">
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox name={'schlagwoerter'} value={'JAVASCRIPT'}>
                    JAVASCRIPT
                  </Checkbox>
                  <Checkbox name={'schlagwoerter'} value="TYPESCRIPT">
                    TYPESCRIPT
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </Flex>
            <Flex direction="row" align="center" justify="center" mb="4">
              <Select name="art" placeholder="Art" width="100%">
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
          <BookTable buchArray={buecher}></BookTable>
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
