import { Flex, Input, Select, Button } from '@chakra-ui/react';
import { useState } from 'react';
import StarsRating from './stars';


export default function Search() {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <form>
        <Flex direction="row" align="center" justify="center" mb="4">
          <Input type="text" placeholder="Titel" mr="2" />
          <Input type="text" placeholder="Schlagwörter" />
        </Flex>

        <Flex direction="row" align="center" justify="center" mb="4">
          <Select placeholder="Art" width="100%">
            <option>Druckausgabe</option>
            <option>Kindle</option>
          </Select>
        </Flex>
        <StarsRating> value={selectedRating} onChange={handleRatingChange} <StarsRating/>
        <Button mt="4" colorScheme="teal" type="submit">
          Suche
        </Button>
      </form>
    </Flex>
  );
}

