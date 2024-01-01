import { Table, TableCaption, TableContainer, Tbody, Tfoot, Td, Th, Thead, Tr, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import type Buch from "./book.interface";

export default function BookTable({buchArray}: {buchArray: Buch[]} )   {
  
  if(!buchArray) return (<div></div>)
  
  if(buchArray.length == 0){
    return(<div><Alert status='error'>
    <AlertIcon />
    <AlertTitle>Keine Bücher gefunden </AlertTitle>
    <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
  </Alert></div>)
  }
    return (
      <div>        
        <TableContainer>
  <Table variant='striped' colorScheme='twitter'>
    <TableCaption placement="top">Gefundene Buecher</TableCaption>
    <Thead>
      <Tr>
        <Th>ISBN</Th>
        <Th>Titel</Th>
        <Th>Bewertung</Th>
      </Tr>
    </Thead>
    <Tbody>
       {buchArray.map((buch: Buch) => (
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