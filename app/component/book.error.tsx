import {
  Flex,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

export default function BookError({ responseStatus }: any) {
  if (!responseStatus) return <div></div>;

  let alertTitle = '';
  let alertDescription = '';

  switch (responseStatus) {
    case 403: {
      alertTitle = 'Sie sind nicht angemeldet';
      alertDescription =
        'Bitte melden Sie sich zuerst an. Vorher kann kein neues Buch angelegt';

      break;
    }
    case 422: {
      alertTitle = 'Das Buch existiert bereits';
      alertDescription = 'Es existiert bereits ein Buch mit dieser ISBN.';

      break;
    }
    case 500: {
      alertTitle = 'Der Server ist nicht erreichbar';
      alertDescription =
        'Bitte versuchen Sie es später noch einmal. Vielen Dank';

      break;
    }
  }

  return (
    <Flex align="center" justify="center">
      <Alert status="error" flexDirection="column" textAlign="center">
        <AlertIcon />
        <AlertTitle>{alertTitle}</AlertTitle>
        <AlertDescription>{alertDescription}</AlertDescription>
      </Alert>
    </Flex>
  );
}
