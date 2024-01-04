import HorizontalBar from '~/component/bar';
import barstyle from '~/component/bar.css';
import { Outlet } from 'react-router-dom';

export default function  Error () {
  return (
    <div>
      <HorizontalBar title={'Fehlgeschlagen'} subtitle={'Das Buch konnte leider nicht angelegt werden, da die ISBN schon existiert.'} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}



export function links() {
    return [
      { rel: 'stylesheet', href: barstyle}
    ];
  }