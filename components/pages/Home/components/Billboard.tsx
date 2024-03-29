import PlayButton from "@/components/PlayButton";
import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { openModal } from "@/redux/defaults/defaultsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useTranslation } from "@/app/i18n/client";

const Billboard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useBillboard();

  const handleOpenModal = useCallback(() => {
    dispatch(openModal({ modalMovieId: data?.id }));
  }, [data?.id]);

  return (
    <div className="relative h[56.25vw]">
      <video className="w-full h[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[80%] md:w-[90%] lg:w-[50%] drop-shadow-xl">{data?.description}</p>
        <div className="flex fle-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button onClick={handleOpenModal} className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
            <AiOutlineInfoCircle className="mr-1" />
            {t('more_info')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billboard;
