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

    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ0eXBlIjoiYWNjZXNzIiwianRpIjoiNjRmNWVkYzItOTIxYy00MmQ1LWI1MjUtODdmZDQ1MWViYWZjIiwiaWF0IjoxNzAzNzY5NDAwLCJleHAiOjE3MDM3NzMwMDAsImlzcyI6Imh0dHBzOi8vaGthLmRlL0p1ZXJnZW5aaW1tZXJtYW5uIn0.pKuZVyBc87wJSTzNqPz0XSTCJ0diVehB90gSvqu_7H_HVjg0fy2yBmcMt835Y_BGqt8A84dU_t5GiVda-Ltx7nx30ZYf8sQsStNf7Lnlw3FLr5LKq5T8iGfq5cckHTMgHNp5oGK6mbiMnqBIDuqnzAGHsVLUV5QlQmGJSDfU32iyS1Usu_viqMujyGMLa_OIyPC66spcFs1-PF5d2Z5GD0BpZG3BLpJIvAgQakllHEn6Mj0O2oMJOc6WVdSdZAN3QU9Tgodxo2aJbcIp7znyoqud4f18bUvBGOw8weEsECmCZ4jJlgmZI24BJz7qFvfAYEMORdkdG7Rhgu9mv9kK7w";
  
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