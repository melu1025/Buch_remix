// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-zero-fractions */
import React, { useState } from 'react';
import { Button, Input, Checkbox, Select } from '@chakra-ui/react';
import './new.book.css';
import { PopupValidation } from './popup';
import { Form } from '@remix-run/react';
import Cookies from 'js-cookie';
import { isbn as isbnCheck } from '@form-validation/validator-isbn';
import StarsRating from '~/component/stars';

export default function NewBook() {
  const [isbn, changeIsbn] = useState('');
  const [titel, changeTitel] = useState('');
  const [untertitel, changeUntertitel] = useState('');
  const [buchArt, changeBuchArt] = useState('');
  const [preis, changePreis] = useState(0.01);
  const [rabatt, changeRabatt] = useState(0.0);
  const [datum, changeDatum] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [homepage, changeHomepage] = useState('');
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
  const [lieferbar, changeLieferbar] = useState(true);
  const token = Cookies.get('token');
  const [isInvalidIsbnPopupOpen, setInvalidIsbnPopupOpen] = useState(false);
  const [isInvalidPreisPopupOpen, setInvalidPreisPopupOpen] = useState(false);
  const [isInvalidRabattPopupOpen, setInvalidRabattPopupOpen] = useState(false);
  const [isInvalidDatumPopupOpen, setInvalidDatumPopupOpen] = useState(false);
  const [isInvalidHomepagePopupOpen, setInvalidHomepagePopupOpen] =
    useState(false);

  const handleIsbnChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const isbnWert = event.target.value;
    changeIsbn(isbnWert);

    const isIsbnConform = /^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d$/.test(
      isbnWert,
    );
    if (isIsbnConform) {
      const result = isbnCheck().validate({
        value: isbnWert,
      });
      if (result.valid) {
        setInvalidIsbnPopupOpen(false);
      } else {
        setInvalidIsbnPopupOpen(true);
      }
    } else {
      setInvalidIsbnPopupOpen(true);
    }
  };
  const handleTitelChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const titel = event.target.value;
    changeTitel(titel);
  };
  const handleUntertitelChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const untertitel = event.target.value;
    changeUntertitel(untertitel);
  };
  const handleBuchArtChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = event => {
    const buchArt = event.target.value;
    changeBuchArt(buchArt);
  };
  const handlePreisChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const inputPreis = event.target.value;
    const preis = Number.parseFloat(inputPreis);
    changePreis(preis);

    if (/^\d+(\.\d{1,2})?$/.test(inputPreis) && preis > 0) {
      setInvalidPreisPopupOpen(false);
    } else {
      setInvalidPreisPopupOpen(true);
    }
  };
  const handleRabattChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const inputRabatt = event.target.value;
    const rabattValidation = Number.parseFloat(inputRabatt);
    if (rabattValidation >= 0 && rabattValidation <= 100) {
      setInvalidRabattPopupOpen(false);
      const rabatt = rabattValidation / 100;
      changeRabatt(rabatt);
    } else {
      setInvalidRabattPopupOpen(true);
    }
  };
  const handleDatumChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
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
    } else if (datum.length <= 10) {
      setInvalidDatumPopupOpen(true);
    } else if (datum.length >= 10) {
      setInvalidDatumPopupOpen(true);
    }
  };
  const handleRatingChange = (value: number) => {
    const rating = value;
    setSelectedRating(rating);
  };
  const handleHomepageChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const homepage = event.target.value;
    changeHomepage(homepage);

    const isHomepageConform = /^https:\/\/\w+(\.\w+)+$/.test(homepage);
    if (isHomepageConform) {
      setInvalidHomepagePopupOpen(false);
    } else {
      setInvalidHomepagePopupOpen(true);
    }
  };
  const handleSchlagwoerterChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const schlagwort = event.target.value;
    const isSchlagwortSelected = schlagwoerter.includes(schlagwort);
    if (isSchlagwortSelected) {
      const updatedSchlagwoerter = schlagwoerter.filter(
        item => item !== schlagwort,
      );
      setSchlagwoerter(updatedSchlagwoerter);
    } else {
      setSchlagwoerter([...schlagwoerter, schlagwort]);
    }
  };
  const handleLieferbarChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
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

  const isPopUpValidationOpen =
    isInvalidIsbnPopupOpen ||
    isInvalidPreisPopupOpen ||
    isInvalidRabattPopupOpen ||
    isInvalidDatumPopupOpen ||
    isInvalidHomepagePopupOpen;

  return (
    <div className="container">
      <Form method="post" id="note-form" className="form" action="/create">
        <div className="form-section">
          <label htmlFor="isbn" className="blue-text"></label>
          <Input
            type="text"
            id="isbn"
            name="isbn"
            placeholder="ISBN*"
            value={isbn}
            onChange={handleIsbnChange}
            required
          />
          <PopupValidation
            isOpen={isInvalidIsbnPopupOpen}
            onClose={closeInvalidIsbnPopup}
            message="Die eingegebene ISBN ist ungültig. Bitte überprüfen Sie die Eingabe."
          />
        </div>

        <div className="form-section">
          <label htmlFor="titel"></label>
          <Input
            type="text"
            id="titel"
            name="titel"
            placeholder="Titel*"
            value={titel}
            onChange={handleTitelChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="untertitel"></label>
          <Input
            type="text"
            id="untertitel"
            name="untertitel"
            placeholder="Untertitel"
            value={untertitel}
            onChange={handleUntertitelChange}
          />
        </div>

        <div className="form-section">
          <label htmlFor="buchArt"></label>
          <Select
            id="buchArt"
            name="buchArt"
            placeholder="Art des Buches"
            value={buchArt}
            onChange={handleBuchArtChange}
            required
          >
            <option value="KINDLE">KINDLE</option>
            <option value="DRUCKAUSGABE">DRUCKAUSGABE</option>
          </Select>
        </div>

        <div className="form-section">
          <label htmlFor="preis"></label>
          <Input
            type="number"
            id="preis"
            name="preis"
            step="0.01"
            placeholder="Preis*"
            value={preis}
            onChange={handlePreisChange}
            required
          />
          <PopupValidation
            isOpen={isInvalidPreisPopupOpen}
            onClose={closeInvalidPreisPopup}
            message="Ungültiger Preis-Wert! Der Wert muss größer als 0 sein und darf maximal 2 Nachkommastellen haben."
          />
        </div>

        <div className="form-section">
          <label htmlFor="rabattValue"></label>
          <Input
            type="number"
            id="rabattValue"
            name="rabattValue"
            step="0.001"
            placeholder="Rabatt"
            onChange={handleRabattChange}
            required
          />
          <PopupValidation
            isOpen={isInvalidRabattPopupOpen}
            onClose={closeInvalidRabattPopup}
            message="Ungültiger Rabatt-Wert! Der Wert muss größer/gleich als 0 und kleiner/gleich als 1 sein."
          />
          <input type="hidden" name="rabatt" value={rabatt} />
        </div>

        <div className="form-section rating-section">
          <label htmlFor="datum"></label>
          <Input
            type="text"
            id="datum"
            name="datum"
            placeholder="Datum, z.B. 2023-01-01"
            value={datum}
            onChange={handleDatumChange}
            pattern="\d{4}-\d{2}-\d{2}"
            title="Bitte geben Sie das Datum im Format JJJJ-MM-TT ein."
            required
          />
          <PopupValidation
            isOpen={isInvalidDatumPopupOpen}
            onClose={closeInvalidDatumPopup}
            message="Ungültiges Datumsformat! Bitte verwenden Sie das Format JJJJ-MM-TT."
          />

          <Input type="hidden" name="rating" value={selectedRating} />

          <label htmlFor="rating"></label>
          <Input type="hidden" name="rating" value={selectedRating} />
          <StarsRating value={selectedRating} onChange={handleRatingChange} />
        </div>

        <div className="form-section">
          <label htmlFor="schlagwoerter">Schlagwörter</label>
          <Checkbox
            id="javascript"
            name="javascript"
            isChecked={schlagwoerter.includes('JAVASCRIPT')}
            onChange={handleSchlagwoerterChange}
            value="JAVASCRIPT"
          >
            JAVASCRIPT
          </Checkbox>
          <Checkbox
            id="typescript"
            name="typescript"
            isChecked={schlagwoerter.includes('TYPESCRIPT')}
            onChange={handleSchlagwoerterChange}
            value="TYPESCRIPT"
          >
            TYPESCRIPT
          </Checkbox>

          <input
            type="hidden"
            id="arraySchlagwoerter"
            name="arraySchlagwoerter"
            value={schlagwoerter.join(',')}
          />
        </div>

        <div className="form-section">
          <label htmlFor="homepage"></label>
          <Input
            type="text"
            id="homepage"
            name="homepage"
            placeholder="Homepage"
            value={homepage}
            onChange={handleHomepageChange}
            required
          />
          <PopupValidation
            isOpen={isInvalidHomepagePopupOpen}
            onClose={closeInvalidHomepagePopup}
            message="Ungültige Homepage-Adresse! Bitte verwenden Sie das Format 'https://www.example.com'."
          />
        </div>

        <div className="form-section">
          <div className="checkbox-group">
            <Checkbox
              id="lieferbar"
              name="lieferbar"
              isChecked={lieferbar}
              onChange={handleLieferbarChange}
              required
            />
            <label htmlFor="lieferbar">Lieferbar*</label>
          </div>
        </div>

        <input type="hidden" name="token" value={token} />

        <div className="form-actions">
          <Button
            type="submit"
            colorScheme="teal"
            isDisabled={isPopUpValidationOpen}
          >
            Buch anlegen
          </Button>
        </div>
      </Form>
    </div>
  );
}
