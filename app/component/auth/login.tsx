import React, { useState } from 'react';
import { useNavigate } from "@remix-run/react";
import { Flex, Box, Input, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';
//import https from 'https';

export default function LoginComponent() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`https://localhost:3000/auth/login`, {
        username: username,
        password: password,
        //httpsAgent: new https.Agent({rejectUnauthorized: false}),
      });

      if (response.status === 200) {
        const { token, roles } = response.data;
        login({ token, roles });

        localStorage.setItem('token', token);
        localStorage.setItem('roles', JSON.stringify(roles));

        Cookies.set('token', token, { expires: 1 / 24 });
        Cookies.set('roles', JSON.stringify(roles));

        console.log('Erfolgreich eingeloggt:', response.data);
        onOpen();
      } else {
        console.error('Fehler beim Einloggen:', response.statusText);
        setError(`Falscher Benutzername oder Passwort: ${response.data.message || 'Unbekannter Fehler'}`);
        setUsername('');
        setPassword('');
      }
    } catch (error: any) {
      console.error('Fehler:', error);
      setError(`Falscher Benutzername oder Passwort: ${error.response?.data?.message || 'Unbekannter Fehler'}`);
      setUsername('');
      setPassword('');
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
    navigate('/');
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Box>
        <label>
          Username:
          <br />
          <Input
            type="text"
            value={username}
            onChange={(input) => setUsername(input.target.value)}
          />
        </label>
      </Box>
      <Box>
        <label>
          Password:
          <br />
          <Input
            type="password"
            value={password}
            onChange={(input) => setPassword(input.target.value)}
          />
        </label>
      </Box>
      {error && <Text color="red">{error}</Text>}
      <Button
        type="button"
        onClick={handleLogin}
        mt="4"
        colorScheme="teal"
        variant="solid"
      >
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Erfolgreich angemeldet</ModalHeader>
            <ModalBody>
              <Text>Ihre Anmeldung war erfolgreich!</Text>
            </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}