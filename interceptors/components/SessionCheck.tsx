import { PropsWithChildren, ReactElement } from 'react';
import { AUTH_PAGE, MAIN_PAGE } from '@/app/constants';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function SessionCheckPageLoadInterceptor({ children }: PropsWithChildren): Promise<ReactElement> {
  const headersList = headers();
  const fullUrl = headersList.get('x-url') || "";

  const session = await getServerSession(authOptions);

  if (!session?.user?.email && !fullUrl.includes(AUTH_PAGE)) {
    return redirect(AUTH_PAGE);
  }

  if (session?.user?.email && fullUrl.includes(AUTH_PAGE)) {
    return redirect(MAIN_PAGE);
  }

  return (
    <>
      {children}
    </>
  );
}

export default SessionCheckPageLoadInterceptor;
