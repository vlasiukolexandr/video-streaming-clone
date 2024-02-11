'use client';

import { AUTH_PAGE, MAIN_PAGE } from "@/app/constants";
import { Session } from "next-auth";
import { redirect, usePathname } from "next/navigation";

export const PathCheck = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  // if (!session?.user?.email && !pathname.includes(AUTH_PAGE)) {
  //   return redirect(AUTH_PAGE);
  // }

  // if (session?.user?.email && pathname.includes(AUTH_PAGE)) {
  //   return redirect(MAIN_PAGE);
  // }

  return null;
}