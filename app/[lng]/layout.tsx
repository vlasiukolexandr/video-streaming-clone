import '../globals.css'
import { Providers } from "@/redux/provider";
import { languages } from '../i18n/settings';
import { dir } from 'i18next';
import { DefaultsSetup } from './components/DefaultsSetup';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: {
    lng,
  },
}: {
  params: {
    lng: string
  },
  children: React.ReactNode,
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <Providers>
          <DefaultsSetup lng={lng} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

// export const dynamic = 'force-static';
