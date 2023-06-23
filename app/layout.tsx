import SessionCheckPageLoadInterceptor from '@/interceptors/components/SessionCheck';
import './globals.css'
import { Providers } from "@/redux/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SessionCheckPageLoadInterceptor>
            {children}
          </SessionCheckPageLoadInterceptor>
        </Providers>
      </body>
    </html>
  );
}
