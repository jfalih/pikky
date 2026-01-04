import { useFavoritesContext } from '@services/contexts/favorites-context';
import { ListItemDTO } from '@core/api/list.types';

export const useFavorites = () => {
  const { favorites, toggleFavorite: toggleFavoriteContext, isFavorite, getFavorites } = useFavoritesContext();

  const toggleFavorite = (item: ListItemDTO) => {
    toggleFavoriteContext(item);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavorites,
  };
};

