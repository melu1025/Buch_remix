import HorizontalBar from '~/component/bar';
import barstyle from '~/component/bar.css';
import { Outlet } from 'react-router-dom';

export default function  Success () {
  return (
    <div>
      <HorizontalBar title={'Großartig'} subtitle={'Du hast ein neues Buch erschaffen.'} />
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