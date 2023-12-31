import type { FC} from 'react';
import React, { useState } from 'react';
import { Button, Input, Checkbox, Flex, Text, Select } from '@chakra-ui/react';
import './new-book.css';
import PopUp from '~/component/pop-up';
import { Form, useNavigate } from '@remix-run/react';

interface StarRatingProperties {
    value: number;
    onChange: (rating: number) => void;
}

const StarRating: FC<StarRatingProperties> = ({ value, onChange }) => {
    const [selectedRating, setSelectedRating] = useState(value);
  
    const handleClick = (rating: number) => {
      setSelectedRating(rating);
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
              color={selectedRating >= rating ? "yellow.500" : "gray.300"}
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

    const [isbn, changeIsbn] = useState('');
    const [titel, changeTitel] = useState('');	
    const [untertitel, changeUntertitel] = useState('');
    const [buchArt, changeBuchArt] = useState('');
    const [preis, changePreis] = useState(0);
    const [rabatt, changeRabatt] = useState(0);
    const [datum, changeDatum] = useState('');	
    const [selectedRating, setSelectedRating] = useState(0);
    const [homepage, changeHomepage] = useState('');
    const [schlagwort, setSchlagwort] = useState('');
    const [lieferbar, changeLieferbar] = useState(true);

    const handleIsbnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const isbn = event.target.value;
        changeIsbn(isbn);

        const isIsbnConform = /^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d$/.test(isbn,);
        if (!isIsbnConform) {
            alert('Die eingegebene ISBN ist ungültig. Bitte überprüfen Sie die Eingabe.');
        }
    }
    const handleTitelChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const titel = event.target.value;
        changeTitel(titel);
    }
    const handleUntertitelChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {	
        const untertitel = event.target.value;
        changeUntertitel(untertitel);
    }
    const handleBuchArtChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const buchArt = event.target.value;
        changeBuchArt(buchArt);
    };
    const handlePreisChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const preis = Number.parseFloat(event.target.value);

        if(preis<=0) {
            alert('Der Wert für den Preis muss größer als 0 sein.');
        }
        else {
            changePreis(preis);
        }

    };

    const minRabatt = 0.01;
    const handleRabattChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const rabatt = Number.parseFloat(event.target.value);

        if(rabatt<=1 && rabatt >=minRabatt){
        changeRabatt(rabatt);
        }
        else{
            alert('Der Wert für den Rabatt muss mindestens als 0 aber höchstens 1 sein.');
        }
    };
    const handleDatumChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const datum =event.target.value;
        changeDatum(datum);

        const isDatumConform = /^\d{4}-\d{2}-\d{2}$/.test(datum);
        if (isDatumConform) {
                console.log('Datum ist richtig eingegeben worden');
        } else {
            console.error('Falsches Datumsformat! Bitte verwenden Sie das Format JJJJ-MM-TT.');
    
        }

    };
    const handleRatingChange = (value: number) => {
        const rating = value;
        setSelectedRating(rating);
        if(Number.isNaN(rating)) {
            alert('Es handelt sich um keine Zahl');
        }
        else{
            if(rating>5) {
                setSelectedRating(5);
            }
            else{
                setSelectedRating(rating);
            }
            if(rating<0) {
                setSelectedRating(0);
            }
        }
    };
    const handleHomepageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const homepage = event.target.value;
        changeHomepage(homepage);

        const isHomepageConform = /^https:\/\/\w+(\.\w+)+$/.test(homepage);
        if (isHomepageConform) {
            console.log('Falsche Adresseangabe');
        } else {
            //folgt noch
        }
    };
    const handleSchlagwortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSchlagwort(event.target.value);
    };
    const handleLieferbarChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const lieferbar = event.target.checked;
        changeLieferbar(lieferbar);
    };

    const navigate = useNavigate();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const openSuccessModal = () => {
      setIsSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
      setIsSuccessModalOpen(false);
      navigate('/search');
    };

    return (
      <div className="container">
          <Form method="post" id="note-form" className="form" action="/create">
              <div className="form-section">
                  <label htmlFor="isbn" className="blue-text"></label>
                  <Input type="text" id="isbn" name="isbn" placeholder="ISBN" value={isbn} onChange={handleIsbnChange} className="blue-input-border" required />
              </div>

              <div className="form-section">
                  <label htmlFor="titel"></label>
                  <Input type="text" id="titel" name="titel" placeholder="Titel" value={titel} onChange={handleTitelChange} required />
              </div>

              <div className="form-section">
                  <label htmlFor="untertitel"></label>
                  <Input type="text" id="untertitel" name="untertitel" placeholder="Untertitel" value={untertitel} onChange={handleUntertitelChange} required />
              </div>

              <div className="form-section">
                <label htmlFor="buchArt"></label>
                <Select  id="buchArt" name="buchArt" placeholder="Art des Buches" value={buchArt} onChange={handleBuchArtChange} required>
                  <option value="KINDLE">KINDLE</option>
                  <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
                </Select>
              </div>

              <div className="form-section">
                  <label htmlFor="preis"></label>
                  <Input type="number" id="preis" name="preis" step="0.01" placeholder="Preis" value={preis} onChange={handlePreisChange} required />
              </div>

              <div className="form-section">
                  <label htmlFor="rabatt"></label>
                  <Input type="text" id="rabatt" name="rabatt" step="0.01" placeholder="Rabatt" value={rabatt} onChange={handleRabattChange} required />
              </div>

              <div className="form-section rating-section">
                  <label htmlFor="datum"></label>
                  <Input type="text" id="datum" name="datum" placeholder="Datum" value={datum} onChange={handleDatumChange} required pattern="\d{4}-\d{2}-\d{2}" title="Bitte geben Sie das Datum im Format JJJJ-MM-TT ein."/>

                  <Input type="hidden" name="rating" value={selectedRating} />

                  <label htmlFor="rating"></label>
                  <Input type="hidden" name="rating" value={selectedRating} />
                  <StarRating value={selectedRating} onChange={handleRatingChange} />
              </div>

              <div className="form-section">
                  <label htmlFor="homepage"></label>
                  <Input type="text" id="homepage" name="homepage" placeholder="Homepage" value={homepage} onChange={handleHomepageChange} required />
              </div>

              <div className="form-section">
                  <label htmlFor="schlagwort"></label>
                  <Input type="text" id="schlagwort" name="schlagwort" placeholder="Schlagwort" value={schlagwort} onChange={handleSchlagwortChange} />
              </div>

              <div className="form-section">
                  <div className="checkbox-group">
                      <Checkbox id="lieferbar" name="lieferbar" isChecked={lieferbar} onChange={handleLieferbarChange} />
                      <label htmlFor="lieferbar">Lieferbar</label>
                  </div>
              </div>

              <div className="form-actions">
                <Button type="submit" colorScheme="teal" 
                // onClick={openSuccessModal}
                >
                  Anlegen
                </Button>
              </div>
          </Form>

          <PopUp isOpen={isSuccessModalOpen} onClose={closeSuccessModal} successMessage="Buch wurde erfolgreich neu angelegt" />
      </div>
    );
}
