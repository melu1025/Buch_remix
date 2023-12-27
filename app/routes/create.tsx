import {json, redirect } from "@remix-run/node";
import NewBook from "~/component/newBook";
import newbook from "~/component/newBook.css";
import {Outlet} from "@remix-run/react";
import HorizontalBar from "~/component/bar";
import '~/component/bar.css';
import https from 'https';
import fs from 'fs/promises';

export default function Create() {
  return (
    <div>
      <HorizontalBar title={'Anlegen'} subtitle={'Lege ein Buch an'}></HorizontalBar>
      <main>
          <NewBook />
          <Outlet />
      </main>
    </div>
  );
}

const serverUrl = 'https://localhost:3000';

export async function action({ request }) {
  try {
    const formData = await request.formData();

    const buchDaten = {
      isbn: formData.get('isbn'),
      rating: parseInt(formData.get('rating')), 
      art: formData.get('buchArt'), 
      preis: parseFloat(formData.get('preis')), 
      rabatt: parseFloat(formData.get('rabatt')), 
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

    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ0eXBlIjoiYWNjZXNzIiwianRpIjoiOWY5NzFmMDUtNjgxNi00YTU1LTgxOGMtN2ZhNjkzMjZmZmM0IiwiaWF0IjoxNzAzNjc0MjA3LCJleHAiOjE3MDM2Nzc4MDcsImlzcyI6Imh0dHBzOi8vaGthLmRlL0p1ZXJnZW5aaW1tZXJtYW5uIn0.MAsPUJI1u3frDmyqTccSqtm17iqc-oeiHGrQaabqVxf1FHAQhchIV3mG-EkNFj0PYMTlY2nsJRT9m6ToYJA-Gf_-F8zhT2pfFGWxDHQ_oU2GxtFvE6QLaDEpSSFI11UmmKxGvEYrftt8QpCrEkC9kmQvZNLVupOWN0INfgag6WxkRl1b_dh73EZGMYkiwgq7fnvy682taLzREkTQ-jnTedKdLjGxVXtc06TmEXVLVtbHnJhh573kswiw_hYYdCB2l2cvZAj31aAgNkWxoJEZu6bjTpFhk2AbztKHSy380N4_aKYNLfF6nVwDCOzfTMLjx-g4eH5AA8Ozr7KrS0UGBw";
  
    // Konfiguration des HTTPS-Agenten
    const agent = new https.Agent({
      ca: (await fs.readFile('app/certificate/certificate.crt')).toString('utf-8'),
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
    // if (response.status === 201) {
    //   setIsSuccessModalOpen(true);
    // }

    // Weiterleitung
    return redirect('/search');
    } catch (error) {
    // Fehlerbehandlung
    console.error('Fehler beim Speichern des Buchs:', error);
      
    return json({ error: 'Fehler beim Speichern des Buchs', details: error.message }, { status: 500 });
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: newbook}];
}