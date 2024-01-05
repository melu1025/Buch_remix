import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import NewBook from '~/component/new.book';
import newbook from '~/component/new.book.css';
import { Outlet, useActionData } from '@remix-run/react';
import HorizontalBar from '~/component/bar';
import barstyle from '~/component/bar.css';
import { postBuch } from '~/service/book.service';
import BookError from '~/component/book.error';

export default function Create() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <HorizontalBar
        title={'Anlegen'}
        subtitle={'Mehr als nur Worte: Dein Buch, unsere Reise'}
      ></HorizontalBar>
      <main>
        <BookError responseStatus={actionData}></BookError>
        <NewBook />
        <Outlet />
      </main>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    const token = formData.get('token')?.toString() || '';

    const schlagwoerterArray: string[] = [];
    const hiddenSchlagwoerterList = formData.getAll('hiddenSchlagwoerter');

    for (const schlagwoerterEntry of hiddenSchlagwoerterList) {
      if (schlagwoerterEntry instanceof File) {
        // Ausschluss, dass es sich um eine Datei handelt
      } else {
        const schlagwoerterValues = schlagwoerterEntry
          .split(',')
          .map(value => value.trim());
        schlagwoerterArray.push(...schlagwoerterValues);
      }
    }

    const buchDaten = {
      isbn: formData.get('isbn'),
      rating: Number.parseInt(formData.get('rating')?.toString() || ''),
      art: formData.get('buchArt'),
      preis: Number.parseFloat(formData.get('preis')?.toString() || ''),
      rabatt: Number.parseFloat(formData.get('rabatt')?.toString() || ''),
      lieferbar: formData.get('lieferbar') === 'on',
      datum: formData.get('datum'),
      homepage: formData.get('homepage'),
      schlagwoerter: schlagwoerterArray,
      titel: {
        titel: formData.get('titel'),
        untertitel: formData.get('untertitel'),
      },
      abbildungen: [
        {
          beschriftung: 'Abb. 1',
          contentType: 'img/png',
        },
      ],
    };

    console.log('Buchdaten vor dem Absenden:', buchDaten);

    const response = await postBuch(buchDaten, token);

    console.log('Server response:', response);

    switch (response.status) {
      case 201: {
        return redirect('/success');
      }
      case 403: {
        return response.status;
      }
      case 422: {
        return response.status;
      }
      default: {
        if (response === 500) {
          return response;
        }
      }
    }
  } catch (error: any) {
    console.error('Fehler beim Speichern des Buchs:', error);

    return json(
      { error: 'Fehler beim Speichern des Buchs', details: error.message },
      { status: 500 },
    );
  }
}

export function links() {
  return [
    { rel: 'stylesheet', href: barstyle },
    { rel: 'stylesheet', href: newbook },
  ];
}
