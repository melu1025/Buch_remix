import React from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

interface BarProperties {
  title: string;
  subtitle: string;
}
//Hier eventuell den css Code in eine neue Datei hinzufügen
const HorizontalBar = ({ title, subtitle }: BarProperties) => {
  return (
    <Box className="horizontal-bar">
      <Flex className="horizontal-bar-flex">
        <Heading as="h1" size="4xl" fontWeight="bold" color="black" mb="4">
          {title}
        </Heading>
        <Text fontSize="2x1" color="black" mt="2">
          {subtitle}
        </Text>
      </Flex>
    </Box>
  );
};

export default HorizontalBar;
