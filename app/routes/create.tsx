import type {ActionFunctionArgs} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import NewBook from "~/component/newBook"; 
import newbook from "~/component/newBook.css";
import {Outlet} from "@remix-run/react";
import HorizontalBar from "~/component/bar";
import barstyle from '~/component/bar.css';
import https from 'node:https';
import fs from 'node:fs/promises';

export default function Create() {
  return (
    <div>
      <HorizontalBar title={'Anlegen'} subtitle={'Mehr als nur Wort:Dein Buch ,unsere Reise'}></HorizontalBar>
      <main>
          <NewBook />
          <Outlet />
      </main>
    </div>
  );
}

const serverUrl = 'https://localhost:3000';

export async function action({ request } : ActionFunctionArgs ) {
  try {
    const formData = await request.formData();

    const buchDaten = {
      isbn: formData.get('isbn'),
      rating: Number.parseInt(formData.get('rating')), 
      art: formData.get('buchArt'), 
      preis: Number.parseFloat(formData.get('preis')), 
      rabatt: Number.parseFloat(formData.get('rabatt')), 
      lieferbar: formData.get('lieferbar') === 'on', // Checkbox: true, wenn aktiviert, sonst false
      datum: formData.get('datum'),
      homepage: formData.get('homepage'),
      schlagwoerter: formData.getAll('schlagwort'), 
      titel: {
        titel: formData.get('titel'),
        untertitel: formData.get('untertitel'),
      },
      abbildungen: [{
        beschriftung: 'Abb. 1',
        contentType: 'img/png',

        // beschriftung: formData.get('abbildungBeschriftung'),
        // contentType: formData.get('abbildungContentType'),
      }],
    };

    console.log('Buchdaten vor dem Absenden:', buchDaten);
  
    //++++++++++++++++

    //Nächste Aufgabe
    // Validierung
    // .....

    const userRole = 'admin';

    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ0eXBlIjoiYWNjZXNzIiwianRpIjoiZWMyMzE0YTEtNWYwZC00ZTFhLWIxMTktOTBhMzM2NWQ4N2JlIiwiaWF0IjoxNzAzOTY2OTAyLCJleHAiOjE3MDM5NzA1MDIsImlzcyI6Imh0dHBzOi8vaGthLmRlL0p1ZXJnZW5aaW1tZXJtYW5uIn0.c3a460dJU4meGMYtStmA6CdxOZw0U2cvBmux_JFq9HlXAwnFB6NV_YIxNqVz6EmWL6PkHZfhNNcmxIAQ0karehSbx-9R83Bl_PwfDFYKXSu7FTK68Zn-7mQGUzQhlkz7BLvXQ4j7ny9w_gWv1ZZHiNm8A33PM_5R9X7WBjhu2UXmGIpGPwH7UOzjAlXLjJ3xOBvfvFyqIcYtBD6t1ocpAG-mdCoLg1ujUHNTB9e6LmNmnmUzGY8Dr9wrDaolWXq2ugMwNpJOl8EXNT5ntEQzQeJa77x3T6blLxSUshcyk3pHMvVdLh7QBeEAjY5m_RXnVxuk2XnCKceE0aXXnc2brA";
  
    // Konfiguration des HTTPS-Agenten
    const agent = new https.Agent({
      // eslint-disable-next-line unicorn/no-await-expression-member
      ca: (await fs.readFile('app/certificate/certificate.crt')).toString('utf8'),
    });
  
     // Verwendung des HTTPS-Agenten im Fetch-Aufruf
     const response = await fetch(`${serverUrl}/rest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Role': userRole,
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(buchDaten),
      agent: agent,
    });
  
    // Wegen Testzwecken als Kommentar
    // const responseBody = await response.json();
    // console.log('Server response:', response.status, responseBody);

    const responseBody = await response.text();
    console.log('Server response:', response.status, responseBody);

    //Modal für Response SC201

  //   if (response.status === 201) {
  //     // eslint-disable-next-line no-undef
  //     openSuccessModal();  // Hier öffnest du das Modal nach dem erfolgreichen Anlegen
  //     // Weiterleitung erfolgt erst nach Schließen des Modals
  //  } else {
  //     //folgt noch
  //  }

    // Weiterleitung
    return redirect('/search');
    } catch (error) {
    // Fehlerbehandlung
    console.error('Fehler beim Speichern des Buchs:', error);
      
    return json({ error: 'Fehler beim Speichern des Buchs', details: error.message }, { status: 500 });
  }
}

export function links() {
  return [
    { rel: 'stylesheet', href: barstyle},
    { rel: 'stylesheet', href: newbook },
  ];
}


