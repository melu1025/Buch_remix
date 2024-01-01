import type {ActionFunctionArgs} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import NewBook from "~/component/new-book"; 
import newbook from "~/component/new-book.css";
import {Outlet} from "@remix-run/react";
import HorizontalBar from "~/component/bar";
import barstyle from '~/component/bar.css';
import https from 'node:https';
import fs from 'node:fs/promises';
import axios from "axios";
// import { useAuth } from "~/component/auth/AuthContext";

export default function Create() {

  // const { token, roles } = useAuth();

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

export async function postBuch(objektDaten, tokenDatei, roles) {

  const serverUrl = 'https://localhost:3000';
  
  // Konfiguration des HTTPS-Agenten
    const agent = new https.Agent({
      // eslint-disable-next-line unicorn/no-await-expression-member
      ca: (await fs.readFile('app/certificate/certificate.crt')).toString('utf8'),
    });

  try {
    // eslint-disable-next-line sonarjs/prefer-immediate-return
  const responses = await fetch(`${serverUrl}/rest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Role': roles,
      'Authorization': `Bearer ${tokenDatei}`, 
    },
    body: JSON.stringify(objektDaten),
    agent: agent,
  });
  return responses;
  } catch (error) {
    console.error('Fehler bei der Anfrage:', error);
    throw error;
  }
}

export async function action({ request } : ActionFunctionArgs ) {
  try {


    const userRole = 'admin';
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ0eXBlIjoiYWNjZXNzIiwianRpIjoiZTg3MGE3YjMtYTBhYS00ZTE0LThhNWQtZDRiYTE0NTJkYTc5IiwiaWF0IjoxNzA0MTQxMDYzLCJleHAiOjE3MDQxNDQ2NjMsImlzcyI6Imh0dHBzOi8vaGthLmRlL0p1ZXJnZW5aaW1tZXJtYW5uIn0.KnkIKO2Y7yuA_0E_wgJ1OOQjnN7by0SKpgiM6CoCSr3ggrGB3Jq6UlfnJTMctW8VbZfu5dbGk4jFWmadyXwgkJwS5JejBNQHqFmlmTeK--zJfiNf_iVT0tG3A1AcPs1lU4-RH9ApVe0yQLads31rfPxAVvRV7HWnb4RyAqmc13hLrMCSXQNnbsrnVoGHeTbr3twitQ9TIniAcc4RG6A0PaoYCUieHFld5NYZzYCQSn6DeIcqmRB4k9wlUMDsugzZNc44SJaPZX9ZEV_3ZVIryXBr1CIcwAvs8KpEZMZUcOUQCsZ4kixjqnmzNBjjen6zxEI-6WrjnDPCEIDpaZaBtQ";

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
      }],
    };

    console.log('Buchdaten vor dem Absenden:', buchDaten);

    const response = await postBuch(buchDaten, token, userRole);

    const responseBody = await response.text();
    console.log('Server response:', response.status, responseBody);

    //Modal für Response SC201
  //   const navigate = useNavigate();
  //   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  //   const openSuccessModal = () => {
  //     setIsSuccessModalOpen(true);
  //   };

  //   const closeSuccessModal = () => {
  //     setIsSuccessModalOpen(false);
  //     navigate('/search');
  //   };

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


