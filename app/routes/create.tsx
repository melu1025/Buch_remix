import {json, redirect } from "@remix-run/node";
import NewBook from "~/component/newBook";
import newCreateStyle from "~/component/NewBook.css";
import {Outlet} from "@remix-run/react";

export default function Create() {
  return (
    <div>
      <div>
      <Outlet />
      <main>
          <NewBook>
          </NewBook>
      </main>
      </div>
    </div>
  );
}

const serverUrl = 'https://localhost:3000';

export async function action({ request }) {
  try {
    const formData = await request.formData();
    // const buchDaten = Object.fromEntries(formData);

    const buchDaten = {};
    
    formData.forEach((value, key) => {
      buchDaten[key] = value;
    });
  
    //++++++++++++++++

    //Nächste Aufgabe


    // const rating = formData.get('rating');
    // buchDaten.rating = rating;
    // Validierung
    // .....
  
    await fetch(`${serverUrl}/rest`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buchDaten),
    });
  
    // Weiterleitung
    return redirect('/search');
    } catch (error) {
    // Fehlerbehandlung
    console.error('Fehler beim Speichern des Buchs:', error);
      
    return json({ error: 'Fehler beim Speichern des Buchs' }, { status: 500 });
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: newCreateStyle}];
}