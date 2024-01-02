import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';
import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function LogoutComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleLogout = () => {
    // Token und Rolle aus dem LocalStorage entfernen
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Cookie mit dem Namen 'token' entfernen
    Cookies.remove('token');
    Cookies.remove('roles');
    onOpen();
    console.log('Erfolgreich ausgeloggt:');
  };

  const handleConfirmLogout = () => {
    onClose();
    logout();
    navigate('/');
  };

  return (
    <>
      <Button colorScheme='red' onClick={handleLogout}>
        Logout
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ausgeloggt</ModalHeader>
          <ModalBody>
            <p>Sie wurden erfolgreich ausgeloggt.</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleConfirmLogout}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
