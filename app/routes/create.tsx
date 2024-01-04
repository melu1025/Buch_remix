import type {ActionFunctionArgs} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import NewBook from "~/component/new-book"; 
import newbook from "~/component/new-book.css";
import {Outlet } from "@remix-run/react";
import HorizontalBar from "~/component/bar";
import barstyle from '~/component/bar.css';
import https from 'node:https';
import fs from 'node:fs';
import axios from "axios";

export default function Create() {
  return (
    <div>
      <HorizontalBar title={'Anlegen'} subtitle={'Mehr als nur Worte: Dein Buch, unsere Reise'}></HorizontalBar>
      <main>
          <NewBook />
          <Outlet />
      </main>
    </div>
  );
}

export async function postBuch(objektDaten :object, tokenDatei:string, ) {

  const serverUrl = 'https://localhost:3000';

    return await axios.post (`${serverUrl}/rest`,
    objektDaten,
    {headers: {
      ContentType: 'application/json',
      Authorization: `Bearer ${tokenDatei}`,
  }, httpsAgent: new https.Agent({ca: fs.readFileSync('app/certificate/certificate.crt')}),
    // validateStatus :function(status){
    //   return true;
    // }
  })
  .then(function (response){
    console.log('Server response:', response.status);
    return response;
  })
  .catch(function (error){
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      // error.request is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      return;
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      return;
    }})
    }

export async function action({ request } : ActionFunctionArgs ) {
  try {
    const formData = await request.formData();

    const token = formData.get('token')?.toString() || '';

    const schlagwoerterArray: string[] = [];
    const hiddenSchlagwoerterList = formData.getAll('hiddenSchlagwoerter');

    for (const schlagwoerterEntry of hiddenSchlagwoerterList) {
      if (schlagwoerterEntry instanceof File) {
        // Ausschluss, dass es sich um eine Datei handelt
      } else {
        const schlagwoerterValues = schlagwoerterEntry.split(',').map((value) => value.trim());
        schlagwoerterArray.push(...schlagwoerterValues);
      }
    }

    const buchDaten = {
      isbn: formData.get('isbn'),
      rating: Number.parseInt(formData.get('rating')?.toString() || ''), 
      art: formData.get('buchArt'), 
      preis: Number.parseFloat(formData.get('preis')?.toString() || ''), 
      rabatt: Number.parseFloat(formData.get('rabatt')?.toString() || ''),
      lieferbar: formData.get('lieferbar') === 'on', // Checkbox: true, wenn aktiviert, sonst false
      datum: formData.get('datum'),
      homepage: formData.get('homepage'),
      schlagwoerter: schlagwoerterArray,
      titel: {
        titel: formData.get('titel'),
        untertitel: formData.get('untertitel'),
      },
      abbildungen: [{
        beschriftung: 'Abb. 1',
        contentType: 'img/png',
      }],
    };

    console.log('Buchdaten vor dem Absenden:', buchDaten);

    const response = await postBuch(buchDaten, token);

    const responseBody = response?.data;
    console.log('ResponseBdy:', responseBody);
    console.log('Server response:', response);

    console.log('Server Status response:', response?.status);

    if ( response.status === 201){
      return redirect('/success');
    }
    else if ( response.status === 422) {
      return redirect('/error');
    }
    } catch (error:any) {
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


