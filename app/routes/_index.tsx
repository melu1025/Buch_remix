// Index.jsx
import type { MetaFunction } from '@remix-run/node';
import HorizontalBar from '~/component/bar'; // Pfade anpassen, falls erforderlich
import Barstyle from '~/component/bar.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'BuchApp' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <HorizontalBar
        title="Willkommen auf der Buchseite"
        subtitle="Hier findest du großartige Bücher"
      />
    </div>
  );
}
export function links() {
  return [{ rel: 'stylesheet', href: Barstyle }];
}
