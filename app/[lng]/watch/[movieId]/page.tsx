'use client';

import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useTranslation } from "@/app/i18n/client";

 const Watch: React.FC<{ params: { movieId?: string }}> = ({ params: { movieId }}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black ">
      <nav
        className="
          fixed
          full-width
          p-4
          z-10
          flex
          flex-row
          items-center
          gap-8
          bg-black
          bg-opacity-70
        "
      >
        <AiOutlineArrowLeft className="cursor-pointer text-white" onClick={() => router.push('/')} size={40} />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">{t('watching')}: </span>
          {data?.title}
        </p>
      </nav>
      <video
        className="
          h-full
          w-full
        "
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
    </div>
  );
 }

 export default Watch;
