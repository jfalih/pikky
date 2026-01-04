import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ListItemDTO } from '@core/api/list.types';
import { toaster } from '@janfalih/toaster';
type FavoritesContextType = {
  favorites: ListItemDTO[];
  toggleFavorite: (item: ListItemDTO) => void;
  isFavorite: (itemId: string) => boolean;
  getFavorites: () => ListItemDTO[];
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<ListItemDTO[]>([]);
  const toggleFavorite = useCallback((item: ListItemDTO) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === item.id);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== item.id);
      }
      // Show toast when item is favorited
      toaster.showToast('Added to favorites');
      return [...prev, item];
    });
  }, []);

  const isFavorite = useCallback(
    (itemId: string) => {
      return favorites.some(fav => fav.id === itemId);
    },
    [favorites],
  );

  const getFavorites = useCallback(() => {
    return favorites;
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        getFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};

