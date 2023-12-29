import { Table, TableCaption, TableContainer, Tbody, Tfoot, Td, Th, Thead, Tr } from "@chakra-ui/react";
import type Buch from "./book.interface";

export default function BookTable(data: Buch[]) {
  const buecher: Buch[] = Object.values(data)
  if(data === undefined){
    return(<div></div>)
  }
  console.log(data)
    return (
      <div>        
        <TableContainer>
  <Table variant='striped' colorScheme='twitter' >
    <TableCaption placement="top">Gefundene Buecher</TableCaption>
    <Thead>
      <Tr>
        <Th>ISBN</Th>
        <Th>Titel</Th>
        <Th >Bewertung</Th>
      </Tr>
    </Thead>
    <Tbody>
       {buecher.map((buch: Buch) => (
      <Tr key={buch.isbn}>
        <Td>{buch.isbn}</Td>
        <Td>{buch.titel.titel}</Td>
        <Td isNumeric>{buch.rating}</Td>
      </Tr> 
       ))}
    </Tbody>
    <Tfoot>
    </Tfoot>
  </Table>
</TableContainer>
      </div>
    );
  }