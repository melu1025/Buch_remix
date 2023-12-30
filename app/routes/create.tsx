import type {ActionFunctionArgs} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import NewBook from "~/component/newBook";
import newbook from "~/component/newBook.css";
import {Outlet} from "@remix-run/react";
import HorizontalBar from "~/component/bar";
import barstyle from '~/component/bar.css';
import https from 'https';
import fs from 'fs/promises';

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

    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ0eXBlIjoiYWNjZXNzIiwianRpIjoiOTY0NTEzZTUtNzkwMi00NTgwLWI2NWItY2M2ZDEzZTNmMGI2IiwiaWF0IjoxNzAzODc3OTE0LCJleHAiOjE3MDM4ODE1MTQsImlzcyI6Imh0dHBzOi8vaGthLmRlL0p1ZXJnZW5aaW1tZXJtYW5uIn0.GGszrAy1mFyxiEuGmR3ML0vuSK2MtDsIHiRqeo3kfaAnSNJ8jrt_eoxvz7JfAfRgc3azh_PSMnsriGLMUUC9uREvcSmsAlTziEzrNe-lOHySjyJ4xT95Y_-D32W-haT-kX203cis5yt6ja_FKg8ovLBaa6auQlX-qTWvKOKYL21rblZnTXRlMN8zWPelpQ8GLZGBfH5aCfX0sSKU-qyHCb7e_Qs9n0im72jREnSNeKrx_OizzLsn1xqdQ2oAXOw_Kirkq4ZHtt3siAC053rC7oNg1hhCfY591BfCx_EYffZTrTT0uyAtWhBp_r9ZxxjMyzwY8Q56bHch06I4OhLC_Q";
  
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
  return [
    { rel: 'stylesheet', href: barstyle},
    { rel: 'stylesheet', href: newbook },
  ];
}