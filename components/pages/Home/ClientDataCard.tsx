import React from "react";
import NavBar from "@/components/NavBar";
import Billboard from "./components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/defaults/defaultsSlice";
import { useTranslation } from "@/app/i18n/client";

const ClientDataCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  const { isModalOpen } = useAppSelector(state => state.appDefaults);

  return (
    <>
      <InfoModal visible={isModalOpen} onClose={() => dispatch(closeModal())} />
      <NavBar />
      <Billboard />
      <div className="pb-40">
        <MovieList title={t('trending')} data={movies} />
        <MovieList title={t('my_list')} data={favorites} />
      </div> 
    </>
  );
}

export default ClientDataCard;