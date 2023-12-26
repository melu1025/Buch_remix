import { Flex, Input, Select, Button, Text } from "@chakra-ui/react";
import { useState,FC } from "react";
interface StarRatingProps {
    value: number;
    onChange: (rating: number) => void;
}

const StarRating: FC<StarRatingProps> = ({ value, onChange }) => {
    const handleClick = (rating:number) => {
        onChange(rating);
    };

    return (
        <Flex>
            <Text fontSize="xl" mr={2}>
                Bewertung:
            </Text>
            {[1, 2, 3, 4, 5].map((rating) => (
                <Text
                    key={rating}
                    fontSize="xl"
                    cursor="pointer"
                    onClick={() => handleClick(rating)}
                    color={value >= rating ? "yellow.500" : "gray.300"}
                    transition="color 0.2s"
                    display="inline-block"
                    mr={1}
                >
                    ★
                </Text>
            ))}
        </Flex>
    );
};

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
                    <StarRating value={selectedRating} onChange={handleRatingChange} />
                </Flex>
                <Button mt="4" colorScheme="teal" type="submit">
                    Suche
                </Button>
            </form>
        </Flex>
    );
}
