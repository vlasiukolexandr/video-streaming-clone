import React, { PropsWithChildren, ReactElement } from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PathCheck } from './PathCheck';

async function GetSessionSSR({ children }: PropsWithChildren): Promise<ReactElement> {
  let session = null;
  try {
    // Hack
    // session = await getServerSession(authOptions);
  } catch (e) {

  }
  
 
  return (
    <>
      {children}
      <PathCheck session={session} />
    </>
  );
}

export default GetSessionSSR;
