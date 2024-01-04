import { ChakraProvider } from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
import { AuthProvider } from './component/auth/auth-context';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import Navbar from './component/navbar';
import { withEmotionCache } from '@emotion/react';
import { useContext, useEffect } from 'react';
import { ServerStyleContext, ClientStyleContext } from './context';

export const meta: MetaFunction = () => {
  return [
    { title: 'Very cool app | Remix' },
    { charset: 'utf8' },
    { viewport: 'width=device-width,initial-scale=1' },
  ];
};

interface DocumentProperties {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProperties, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      // eslint-disable-next-line unicorn/no-array-for-each
      tags.forEach(tag => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  },
);
export default function App() {
  // throw new Error("💣💥 Booooom");

  return (
    <Document>
      <ChakraProvider>
        <AuthProvider>
          <Navbar />
          <Outlet />
        </AuthProvider>
      </ChakraProvider>
    </Document>
  );
}
