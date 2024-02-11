'use client';

import { setLng } from "@/redux/defaults/defaultsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { PropsWithChildren } from "react";

export const DefaultsSetup = ({ lng, children }: PropsWithChildren<{ lng: string }>) => {
  const dispatch = useAppDispatch();

  // Set default language.
  dispatch(setLng(lng));

  return null;
}
