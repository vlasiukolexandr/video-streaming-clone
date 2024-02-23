import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate: mutateUser} = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutateUser({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutateUser, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  
  return (
    <div
      onClick={toggleFavorites}
      className="
        cursor-pointer
        w-6
        h-6
        lg:w-10
        lg:h-10
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:bg-neutral-300
      "
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" /> 
    </div>
  );
}

export default FavoriteButton;
