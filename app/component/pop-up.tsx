import React, { useEffect} from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

interface PopUpProperty {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const PopUp: React.FC<PopUpProperty> = ({ isOpen, onClose, message }) => {
  
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
          <p>{message}</p>
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

export const PopupValidation: React.FC<PopUpProperty> = ({ isOpen, onClose, message }) => (
  isOpen && (
    <div className="popup" style={{ border: '2px solid red', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <p>{message}</p>
    </div>
  )
);