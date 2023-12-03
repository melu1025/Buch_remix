import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { MetaFunction } from '@remix-run/node'
import { Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navbar from "./component/navbar";
import theme from "./theme.config";

export const meta: MetaFunction = () => {
    return [
      { title: "Very cool app | Remix" },
      {charset:"utf-8"},
      {viewport: "width=device-width,initial-scale=1"},
    ];
  };

function Document({
  children,
  title = "App title",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  // throw new Error("💣💥 Booooom");

  return (
    <Document>
      <ChakraProvider>
        <Navbar/>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}