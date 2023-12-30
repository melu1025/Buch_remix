import React, { useEffect} from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

interface PopUpProperty {
  isOpen: boolean;
  onClose: () => void;
  successMessage: string;
}

const PopUp: React.FC<PopUpProperty> = ({ isOpen, onClose, successMessage }) => {
  
  useEffect(() => {
    // Logik für das PopUp
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Erfolgreich angelegt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{successMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Schließen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PopUp;