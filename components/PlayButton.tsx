'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { BsPlayBtnFill } from "react-icons/bs";
import { useTranslation } from "@/app/i18n/client";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        bg-white
        rounded-md
        py-1 md:py-2 
        px-2 md:px-4 
        w-auto
        text-xs lg:text-lg
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
      "
    > 
      <BsPlayBtnFill size={25} className="mr-1" />
      {t('play')}
    </button>
  );
}

export default PlayButton;
