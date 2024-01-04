import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from '@chakra-ui/react';
import type BuchTyp from '~/service/book.interface';
import { ViewIcon } from '@chakra-ui/icons';
export default function DrawerDetail({ buch }: { buch: BuchTyp }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log('Drawer:', buch);
  
  if (buch?.schlagwoerter[0] === 'null')
    buch.schlagwoerter[0] = 'Keine Schlagwörter für dieses Buch vorhanden';
  const schlagwoerter = buch.schlagwoerter.join(', ');

  return (
    <>
      <IconButton
        aria-label="Details"
        icon={<ViewIcon />}
        colorScheme="blue"
        size="xs"
        onClick={onOpen}
      >
        Details
      </IconButton>
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <h1>
              {buch.titel.titel}
              <br></br>
              {buch.titel.untertitel}
            </h1>
          </DrawerHeader>
          <DrawerBody>
            <div>
              <b>ISBN:</b>
              <h2>{buch.isbn}</h2>
            </div>
            <div>
              <b>Rating:</b>
              <h2>{buch.rating}</h2>
            </div>
            <div>
              <b>Art:</b>
              <h2>{buch.art}</h2>
            </div>
            <div>
              <b>Preis:</b>
              <h2>{buch.preis}$</h2>
            </div>
            <div>
              <b>rabatt:</b>
              <h2>{buch.rabatt}</h2>
            </div>
            <div>
              <b>Lieferbar:</b>
              <h2>{buch.lieferbar ? 'Ja' : 'Nein'}</h2>
            </div>
            <div>
              <b>Datum:</b>
              <h2>{buch.datum}</h2>
            </div>
            <div>
              <b>Homepage:</b>
              <h2>{buch.homepage}</h2>
            </div>
            <div>
              <b>Schlagwoerter:</b>
              <h2>{schlagwoerter}</h2>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
