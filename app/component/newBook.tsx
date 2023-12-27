// NewBook.jsx
import type { FC} from 'react';
import { useState } from 'react';
import { Button, Input, Checkbox, Flex, Text, Select } from '@chakra-ui/react';
import "./NewBook.css";

interface StarRatingProps {
    value: number;
    onChange: (rating: number) => void;
}

const StarRating: FC<StarRatingProps> = ({ value, onChange }) => {
    const handleClick = (rating: number) => {
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

export default function NewBook() {
    const [selectedRating, setSelectedRating] = useState(0);
    const [schlagwort, setSchlagwort] = useState('');

    const handleRatingChange = (rating: number) => {
        setSelectedRating(rating);
    };

    const handleSchlagwortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSchlagwort(event.target.value);
    };

    return (
      <div className="container">
          <form method="post" id="note-form" className="form" action="/create">
              <div className="form-section">
                  <label htmlFor="isbn" className="blue-text"></label>
                  <Input type="text" id="isbn" name="isbn" placeholder="ISBN" required className="blue-input-border" />
              </div>

              <div className="form-section">
                  <label htmlFor="titel"></label>
                  <Input type="text" id="titel" name="titel" placeholder="Titel" required />
              </div>

              <div className="form-section">
                  <label htmlFor="untertitel"></label>
                  <Input type="text" id="untertitel" name="untertitel" placeholder="Untertitel" required />
              </div>

              <div className="form-section">
                <label htmlFor="buchArt"></label>
                <Select  id="buchArt" name="buchArt" placeholder="Art des Buches" required>
                  <option value="KINDLE">KINDLE</option>
                  <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
                </Select>
              </div>

              <div className="form-section">
                  <label htmlFor="preis"></label>
                  <Input type="number" id="preis" name="preis" step="0.01" placeholder="Preis" required />
              </div>

              <div className="form-section">
                  <label htmlFor="rabatt"></label>
                  <Input type="number" id="rabatt" name="rabatt" step="0.01" placeholder="Rabatt" required />
              </div>

              <div className="form-section rating-section">
                  <label htmlFor="datum"></label>
                  <Input type="text" id="datum" name="datum" placeholder="Datum" required pattern="\d{4}-\d{2}-\d{2}" title="Bitte geben Sie das Datum im Format JJJJ-MM-TT ein."/>

                  <label htmlFor="rating"></label>
                  <StarRating value={selectedRating} onChange={handleRatingChange} />
              </div>

              <div className="form-section">
                  <label htmlFor="homepage"></label>
                  <Input type="text" id="homepage" name="homepage" placeholder="Homepage" required />
              </div>

              <div className="form-section">
                  <label htmlFor="schlagwort"></label>
                  <Input type="text" id="schlagwort" name="schlagwort" placeholder="Schlagwort" value={schlagwort} onChange={handleSchlagwortChange} />
              </div>

              <div className="form-section">
                  <div className="checkbox-group">
                      <Checkbox id="lieferbar" name="lieferbar" />
                      <label htmlFor="lieferbar">Lieferbar</label>
                  </div>
              </div>

              <div className="form-actions">
                  <Button type="submit" colorScheme="teal">
                    Anlegen
                  </Button>
              </div>
          </form>
      </div>
    );
}
