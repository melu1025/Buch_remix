import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from '@chakra-ui/react';
import type BuchTyp from './book.interface';
import { ViewIcon } from '@chakra-ui/icons';
export default function DrawerDetail({ buch }: { buch: BuchTyp | undefined }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log('Modal:', buch);
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
              {buch?.titel.titel}
              <br></br>
              {buch?.titel.untertitel}
            </h1>
          </DrawerHeader>
          <DrawerBody>
            <p>
              <b>ISBN:</b>
              <div>{buch?.isbn}</div>
            </p>
            <p>
              <b>Rating:</b>
              <div>{buch?.rating}</div>
            </p>
            <p>
              <b>Art:</b>
              <div>{buch?.art}</div>
            </p>
            <p>
              <b>Preis:</b>
              <div>{buch?.rabatt}</div>
            </p>
            <p>
              <b>rabatt:</b>
              <div>{buch?.rabatt}</div>
            </p>
            <p>
              <b>Lieferbar:</b>
              <div>{buch?.lieferbar ? 'Ja' : 'Nein'}</div>
            </p>
            <p>
              <b>Datum:</b>
              <div>{buch?.datum}</div>
            </p>
            <p>
              <b>Homepage:</b>
              <div>{buch?.homepage}</div>
            </p>
            <p>
              <b>Schlagwoerter:</b>
              <div>{buch?.schlagwoerter}</div>
            </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
