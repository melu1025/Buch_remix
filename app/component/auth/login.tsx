import React, { useState } from 'react';
import { Flex, Box, Input, Button } from '@chakra-ui/react';
import axios from 'axios';


const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`https://localhost:3000/auth/login`, {
        username: username,
        password: password,
    });

      if (response.status === 200) {
        const { token, roles } = response.data;
        
        // Token im LocalStorage speichern
        localStorage.setItem('token',token);
        localStorage.setItem('role', JSON.stringify(roles));

        console.log('Erfolgreich eingeloggt:');
        console.log(response.data);
      } else {
        console.error('Fehler beim Einloggen:', response.statusText);
      }
    } catch (error) {
      console.error('Fehler:', error);
    }
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </Box>
        <Button
            type="button"
            onClick={handleLogin}
            mt="4"
            colorScheme="teal"
            variant="solid"
        >
          Login
        </Button>
      </Flex>
  );
};

export default LoginComponent;