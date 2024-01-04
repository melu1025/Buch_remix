import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Td,
  Th,
  Thead,
  Tr,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import type BuchTyp from '~/service/book.interface';
import DrawerDetail from './drawer';

export default function BookTable({
  buchArray,
}: {
  buchArray: BuchTyp[] | number;
}) {
  console.log(buchArray);
  if (!buchArray) return <div></div>;
  if (buchArray === 404) {
    return (
      <div>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Keine Bücher gefunden</AlertTitle>
          <AlertDescription>
            Zu Ihrer Suchanfrage wurden keine Buecher gefunden
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  if (typeof buchArray == 'number')
    return (
      <div>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Server Error</AlertTitle>
          <AlertDescription>Buch Api ist nicht erreichbar</AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="twitter">
          <TableCaption placement="top">Gefundene Buecher</TableCaption>
          <Thead>
            <Tr>
              <Th>ISBN</Th>
              <Th>Titel</Th>
              <Th>Bewertung</Th>
            </Tr>
          </Thead>
          <Tbody>
            {buchArray.map((buch: BuchTyp) => (
              <Tr key={buch.isbn}>
                <Td>{buch.isbn}</Td>
                <Td>{buch.titel.titel}</Td>
                <Td isNumeric>{buch.rating}</Td>
                <Td>
                  <DrawerDetail buch={buch}></DrawerDetail>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}
