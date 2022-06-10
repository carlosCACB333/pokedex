import { MediumPoke } from "../interfaces";

export const toogleFavorite = (id: number, name: string) => {
  let favorites: MediumPoke[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (favorites.find((fav) => fav.id == id)) {
    favorites = favorites.filter((fav) => fav.id != id);
  } else {
    favorites.push({
      id,
      name,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const pokeInFavorites = (id: number): boolean => {
  // if (typeof window == "undefined") return false;
  const favorites: MediumPoke[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  return Boolean(favorites.find((fav) => fav.id == id));
};

export const getFavorites = (): MediumPoke[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};
