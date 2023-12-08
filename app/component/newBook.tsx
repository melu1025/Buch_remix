import { Button } from "@chakra-ui/react";
import styles from "./NewBook.css";

export default function NewBook () {
    return (
        <body>
        <form method="post" id="note-form">
            <div>Neues Buch anlegen</div>
                <div>
                            <label htmlFor="isbn" style={{ color: 'blue' }}>ISBN</label>
                            <input type="text" id="isbn" name="isbn" placeholder="ISBN" required className="blue-input-border"/>
                            </div>
                            <div>
                            <label htmlFor="titel">Titel</label>
                            <input type="text" id="titel" name="titel" placeholder="Titel" required />
                            </div>
                            <div>
                            <label htmlFor="untertitel">Untertitel</label>
                            <input type="text" id="untertitel" name="untertitel" placeholder="Untertitel" required />
                            </div>
                            <div>
                        <label htmlFor="buchArt">Art des Buches</label>
                        <input type="text" id="buchArt" name="buchArt" placeholder="Art des Buches" required />
                        </div>
                            <div>
                            <label htmlFor="preis">Preis</label>
                            <input type="number" id="preis" name="preis" step="0.01" placeholder="Preis" required />
                            </div>
                            <div>
                            <label htmlFor="rabatt">Rabatt</label>
                            <input type="number" id="rabatt" name="rabatt" step="0.01" placeholder="Rabatt" required />
                            </div>
                            <div>
                        <label htmlFor="datum">Datum</label>
                        <input type="text" id="datum" name="datum" placeholder="Datum" required />
                        </div>
                            <div>
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="rating" name="rating" min="1" max="5" placeholder="Bewertung (1-5)" required />
                        </div>
                            <div>
                        <label htmlFor="lieferbar">Lieferbar</label>
                        <input type="checkbox" id="lieferbar" name="lieferbar" />
                        </div>
                            <div>    
                        <label htmlFor="homepage">Homepage</label>
                        <input type="text" id="homepage" name="homepage" placeholder="Homepage" required />
                        </div>
                            <div>
                        <label>Schlagwörter</label>
                            <div>
                                <input type="checkbox" id="schlagwort1" name="schlagwoerter" value="Schlagwort 1" />
                                <label htmlFor="schlagwort1">TypeScript</label>
                            </div>

                            <div>
                                <input type="checkbox" id="schlagwort2" name="schlagwoerter" value="Schlagwort 2" />
                                <label htmlFor="schlagwort2">JavaScript</label>
                            </div>
                            </div>
                            
            <div>
                <Button>Anlegen</Button>
            </div>
        </form>
        </body>
    );
}

export function links () {
    return [{rel: "stylesheet", href: styles}]
}