import React from 'react';
import {
  Flex,
  Button,
  Spacer,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { useNavigate } from "@remix-run/react";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Ersetze '/login' durch den tatsächlichen Pfad deiner Login-Seite
  };

  return (
    <Flex as="nav" p="6px" alignItems="center" backgroundColor="black" color="white">
      <Heading marginRight="50px">BuchApp</Heading>

      <Breadcrumb fontWeight='bold' fontSize="20">
        <BreadcrumbItem > 
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem> 
          <BreadcrumbLink href="/search">Suche</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem> 
          <BreadcrumbLink href="/create">Anlegen</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Spacer></Spacer>
      <IconButton onClick={toggleColorMode} aria-label="Toggle Dark/Light" icon={<MoonIcon/>}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </IconButton>
      <Button colorScheme='blue' onClick={handleLoginClick}>Login</Button>
    </Flex>
  );
}