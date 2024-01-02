import type {ActionFunctionArgs} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import NewBook from "~/component/new-book"; 
import newbook from "~/component/new-book.css";
import {Outlet} from "@remix-run/react";
import HorizontalBar from "~/component/bar";
import barstyle from '~/component/bar.css';
import https from 'node:https';
import fs from 'node:fs';
import axios from "axios";
import Cookies from "js-cookie";
// import { useAuth } from "~/component/auth/AuthContext";
// import PopUp from "~/component/pop-up";
// import { useState } from "react";

// export const loader: LoaderFunction = async ({ request }) => {
//   // Hier können Sie auf die Cookies zugreifen
//   const token = Cookies.get('token');
//   const roles = Cookies.get('roles');
//   // Sie können die Cookies für Ihre Zwecke verwenden
//   console.log('Token aus Cookies (loader):', token);
//   console.log('Rollen aus Cookies (loader):', roles);
//   // Leere loader-Funktion, wenn keine Daten vorab geladen werden müssen
//   // eslint-disable-next-line unicorn/no-null
//   return null;
// }

export default function Create() {

  // const { token, roles } = useAuth();
  const token = Cookies.get('token');
  const roles = Cookies.get('roles');

  console.log(token);
  console.log(roles);

  return (
    <div>
      <HorizontalBar title={'Anlegen'} subtitle={'Mehr als nur Wort: Dein Buch, unsere Reise'}></HorizontalBar>
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
    return response.data;
  })
  .catch(function (error){
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
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

    const token = formData.get('token');
    const roles = formData.get('roles');
    console.log('Token aus Form Data (loader):', token);
    console.log('Rollen aus Form Data (loader):', roles);

    console.log('Token1:', token);

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
      }],
    };

    console.log('Buchdaten vor dem Absenden:', buchDaten);

    const response = await postBuch(buchDaten, token);

    const responseBody = response?.data;
    console.log('ResponseBdy:', responseBody);
    console.log('Server response:', response.status);

    // Weiterleitung
    return redirect('/search');
    } catch (error:any) {
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


