import React, { useState } from 'react';
import { Flex, Box, Input, Button } from '@chakra-ui/react';


const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Token im LocalStorage speichern
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', JSON.stringify(data.roles));
        //sessionStorage.setItem('token', data.token);
        //sessionStorage.setItem('role', JSON.stringify(data.roles));

        console.log('Erfolgreich eingeloggt:', data);
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
