import { Form, Outlet, useActionData } from '@remix-run/react';
import HorizontalBar from '~/component/bar';
import barstyle from '~/component/bar.css';
import type { ActionFunctionArgs } from '@remix-run/node';
import { Button, Flex, Input, Select,} from '@chakra-ui/react';
import BookTable from '~/component/book.table';
import axios from 'axios';
import https from 'https';
// import fs from 'fs';
// cert: fs.readFileSync('app/certificate/certificate.crt')

export async function fetchBuch(suchkriterien: string){
    const res = await axios(`https://localhost:3000/rest/?${suchkriterien}`, {
      httpsAgent: new https.Agent({rejectUnauthorized: false}),
      validateStatus :function(status){
        return status < 500;
      }
    })
    console.log(res.data)
    return res.data;
  }
  
  export async function action({
    request,
  }: ActionFunctionArgs)  {
    const formData = await request.formData();
  
  //   delete empty values
  [...formData.entries()].forEach(([key, value]) => {
      if (value === '') formData.delete(key);
  });
    
    const queryString = new URLSearchParams(formData as any).toString();
    console.log('formData:', queryString);
    const buchData =   await fetchBuch(queryString);
     console.log('buecher:', buchData);
    return buchData;
  }

export default function Search() {
  // const [flag, setFlag] =  useBoolean(true);

  const data = useActionData<typeof action>();
  let buecher = data;
  if(data && data?._embedded){
    buecher = data?._embedded?.buecher;
  }else if(data && data.statusCode == 404){
    buecher = [];
  }
    
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
            <Button mt="4" colorScheme="teal" type="submit" >
              Suche 
            </Button>
          </Form>
          <BookTable buchArray={buecher} ></BookTable>    
        </Flex>
        <Outlet />
      </main>
    </div>
  );
}
export function links() {
  return [{ rel: 'stylesheet', href: barstyle }];
}
