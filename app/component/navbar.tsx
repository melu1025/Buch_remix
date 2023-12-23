import React from 'react';
import {
    Flex,
    Button,
    Spacer,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { StarIcon, SearchIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "@remix-run/react";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Flex as="nav" p="60px" alignItems="center" backgroundColor="white" color="black">
            <Breadcrumb fontWeight='bold' fontSize="20">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                        <Flex alignItems="center">
                            <StarIcon marginRight="2" />
                            Home
                        </Flex>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/search" style={{ margin: '0 100px' }}>
                        <Flex alignItems="center">
                            <SearchIcon marginRight="2" />
                            Suche
                        </Flex>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/create" style={{ margin: '0 50px' }}>
                        <Flex alignItems="center">
                            <AddIcon marginRight="2" />
                            Anlegen
                        </Flex>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Spacer></Spacer>
            <Button colorScheme='blue' onClick={handleLoginClick}>Login</Button>
        </Flex>
    );
}
