import type { FC} from 'react';
import React, { useState } from 'react';
import { Button, Input, Checkbox, Flex, Text, Select } from '@chakra-ui/react';
import './new-book.css';
// import PopUp from '~/component/pop-up';
import { Form } from '@remix-run/react';
import Cookies from 'js-cookie';
import { isbn } from '@form-validation/validator-isbn';

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
              Bewertung*:
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

    const token = Cookies.get('token');
    const roles = Cookies.get('roles');

    const [isbn1, changeIsbn] = useState('');
    const [titel, changeTitel] = useState('');	
    const [untertitel, changeUntertitel] = useState('');
    const [buchArt, changeBuchArt] = useState('');
    const [preis, changePreis] = useState(0);
    const [rabatt, changeRabatt] = useState(0);
    const [datum, changeDatum] = useState('');	
    const [selectedRating, setSelectedRating] = useState(0);
    const [homepage, changeHomepage] = useState('');
    const [schlagwoerter, changeSchlagwoerter] = useState<string[]>([]);
    const [lieferbar, changeLieferbar] = useState(true);
    const [isInvalidIsbnPopupOpen, setInvalidIsbnPopupOpen] = useState(false);
    const [isInvalidPreisPopupOpen, setInvalidPreisPopupOpen] = useState(false);
    const [isInvalidRabattPopupOpen, setInvalidRabattPopupOpen] = useState(false);
    const [isInvalidDatumPopupOpen, setInvalidDatumPopupOpen] = useState(false);
    const [isInvalidHomepagePopupOpen, setInvalidHomepagePopupOpen] = useState(false);

    const handleIsbnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const isbnWert = event.target.value;
        changeIsbn(isbnWert);
    
        const isIsbnConform = /^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d$/.test(isbnWert);
        if (isIsbnConform) {
            const result = isbn().validate({
                value: isbnWert
            });
            if (result.valid) {
                // ISBN ist gültig, Popup-Fenster schließen (falls es offen ist)
                setInvalidIsbnPopupOpen(false);
        } else {
            // Ungültige ISBN, Popup-Fenster öffnen
            setInvalidIsbnPopupOpen(true);
        }
    }
    };
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
        const inputPreis = event.target.value;
        const preis = Number.parseFloat(inputPreis);
        changePreis(preis);

        if (/^\d+(\.\d{1,2})?$/.test(inputPreis) && preis > 0) {
            setInvalidPreisPopupOpen(false)
        } else {
            setInvalidPreisPopupOpen(true);
        }
    };
    const handleRabattChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const inputRabatt = event.target.value;
        const rabatt = Number.parseFloat(inputRabatt);
        changeRabatt(rabatt);

        if (/^\d+(\.\d{1,2})?$/.test(inputRabatt)) {
            if ( rabatt >= 0 && rabatt <= 1) {
              setInvalidRabattPopupOpen(false);
            } else {
              setInvalidRabattPopupOpen(true);
            }
        }
        else {setInvalidRabattPopupOpen(true);}
    };
    const handleDatumChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const datum = event.target.value;
        changeDatum(datum);
        if (datum.length === 10) {
            const isDatumConform = /^\d{4}-\d{2}-\d{2}$/.test(datum);
            if (isDatumConform) {
                console.log('Datum ist richtig eingegeben worden');
                setInvalidDatumPopupOpen(false);
            } else {
                setInvalidDatumPopupOpen(true);
            }
        } else if (datum.length <= 10){
            setInvalidDatumPopupOpen(true);
        } else if (datum.length >= 10){
            setInvalidDatumPopupOpen(true);
        }
    };
    const handleRatingChange = (value: number) => {
        const rating = value;
        setSelectedRating(rating);
    };
    const handleHomepageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const homepage = event.target.value;
        changeHomepage(homepage);
    
        const isHomepageConform = /^https:\/\/\w+(\.\w+)+$/.test(homepage);
        if (isHomepageConform) {
            // Homepage ist korrekt, Popup-Fenster schließen (falls es offen ist)
            setInvalidHomepagePopupOpen(false);
        } else {
            // Ungültige Homepage, Popup-Fenster öffnen
            setInvalidHomepagePopupOpen(true);
        }
    };
    const handleSchlagwoerterChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const schlagwoerterValue = event.target.value;
        // eslint-disable-next-line unicorn/better-regex
        const schlagwoerterArray = schlagwoerterValue.split(/[,\s]+/).filter(Boolean);
        changeSchlagwoerter(schlagwoerterArray);
    };
    const handleLieferbarChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const lieferbar = event.target.checked;
        changeLieferbar(lieferbar);
    };
    const closeInvalidIsbnPopup = () => {
        setInvalidIsbnPopupOpen(false);
    };
    const closeInvalidPreisPopup = () => {
        setInvalidPreisPopupOpen(false);
    };
    const closeInvalidRabattPopup = () => {
        setInvalidRabattPopupOpen(false);
      };
      const closeInvalidDatumPopup = () => {
        setInvalidDatumPopupOpen(false);
    };
    const closeInvalidHomepagePopup = () => {
        setInvalidHomepagePopupOpen(false);
    };

    return (
      <div className="container">
          <Form method="post" id="note-form" className="form" action="/create">
           {isInvalidIsbnPopupOpen && (
           // eslint-disable-next-line sonarjs/no-duplicate-string
           <div className="popup" style={{ border: '2px solid red', padding: '10px' }}>
             <p>Die eingegebene ISBN ist ungültig. Bitte überprüfen Sie die Eingabe.</p>
           <Button onClick={closeInvalidIsbnPopup}>Schließen</Button>
           </div>
           )}
           {isInvalidPreisPopupOpen && (
           // eslint-disable-next-line sonarjs/no-duplicate-string
           <div className="popup" style={{ border: '2px solid red', padding: '10px' }}>
             <p>Ungültiger Preis-Wert! Der Wert muss größer als 0 sein und darf maximal 2 Nachkommastellen haben.</p>
             <Button onClick={closeInvalidPreisPopup}>Schließen</Button>
           </div>
           )}
           {isInvalidRabattPopupOpen && (
           <div className="popup" style={{ border: '2px solid red', padding: '10px' }}>
             <p>Ungültiger Rabatt-Wert! Der Wert muss größer/gleich als 0 und kleiner/gleich als 1 sein.</p>
             <Button onClick={closeInvalidRabattPopup}>Schließen</Button>
           </div>
           )}
           {isInvalidDatumPopupOpen && (
           <div className="popup" style={{ border: '2px solid red', padding: '10px' }}>
             <p>Ungültiges Datumsformat! Bitte verwenden Sie das Format JJJJ-MM-TT.</p>
             <Button onClick={closeInvalidDatumPopup}>Schließen</Button>
           </div>
           )}
           {isInvalidHomepagePopupOpen && (
           <div className="popup" style={{ border: '2px solid red', padding: '10px' }}>
             <p>Ungültige Homepage-Adresse! Bitte verwenden Sie das Format "https://www.example.com".</p>
             <Button onClick={closeInvalidHomepagePopup}>Schließen</Button>
           </div>
           )}
              <div className="form-section">
                  <label htmlFor="isbn" className="blue-text"></label>
                  <Input type="text" id="isbn" name="isbn" placeholder="ISBN*" value={isbn1} onChange={handleIsbnChange} className="blue-input-border" required />
              </div>

              <div className="form-section">
                  <label htmlFor="titel"></label>
                  <Input type="text" id="titel" name="titel" placeholder="Titel*" value={titel} onChange={handleTitelChange} required />
              </div>

              <div className="form-section">
                  <label htmlFor="untertitel"></label>
                  <Input type="text" id="untertitel" name="untertitel" placeholder="Untertitel" value={untertitel} onChange={handleUntertitelChange} />
              </div>

              <div className="form-section">
                <label htmlFor="buchArt"></label>
                <Select  id="buchArt" name="buchArt" placeholder="Art des Buches" value={buchArt} onChange={handleBuchArtChange}>
                  <option value="KINDLE">KINDLE</option>
                  <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
                </Select>
              </div>

              <div className="form-section">
                  <label htmlFor="preis"></label>
                  <Input type="number" id="preis" name="preis" step="0.01" placeholder="Preis*" value={preis} onChange={handlePreisChange} required />
              </div>

              <div className="form-section">
                  <label htmlFor="rabatt"></label>
                  <Input type="number" id="rabatt" name="rabatt" step="0.01" placeholder="Rabatt" value={rabatt} onChange={handleRabattChange} />
              </div>

              <div className="form-section rating-section">
                  <label htmlFor="datum"></label>
                  <Input type="text" id="datum" name="datum" placeholder="Datum, z.B. 2023-01-01" value={datum} onChange={handleDatumChange} pattern="\d{4}-\d{2}-\d{2}" title="Bitte geben Sie das Datum im Format JJJJ-MM-TT ein." />

                  <Input type="hidden" name="rating" value={selectedRating} />

                  <label htmlFor="rating"></label>
                  <Input type="hidden" name="rating" value={selectedRating} />
                  <StarRating value={selectedRating} onChange={handleRatingChange} />
              </div>

              <div className="form-section">
                  <label htmlFor="homepage"></label>
                  <Input type="text" id="homepage" name="homepage" placeholder="Homepage" value={homepage} onChange={handleHomepageChange} />
              </div>

              <div className="form-section">
                  <label htmlFor="schlagwoerter"></label>
                  <Input type="text" id="schlagwoerter" name="schlagwoerter" placeholder="Schlagwörter" value={Array.isArray(schlagwoerter) ? schlagwoerter.join(', ') : ''} onChange={handleSchlagwoerterChange}  />
              </div>

              <div className="form-section">
                  <div className="checkbox-group">
                      <Checkbox id="lieferbar" name="lieferbar" isChecked={lieferbar} onChange={handleLieferbarChange} required />
                      <label htmlFor="lieferbar">Lieferbar*</label>
                  </div>
              </div>

              <input type="hidden" name="token" value={token} />
              <input type="hidden" name="roles" value={roles} />

              <div className="form-actions">
                <Button type="submit" colorScheme="teal" 
                >
                  Anlegen
                </Button>
              </div>
          </Form>

          {/* <PopUp isOpen={isSuccessModalOpen} onClose={closeSuccessModal} successMessage="Buch wurde erfolgreich neu angelegt" /> */}
      </div>
    );
}
