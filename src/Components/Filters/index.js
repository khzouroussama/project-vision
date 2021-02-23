export { MorphFilter } from "./MorphFilter";
export { ConvFilter } from "./ConvFilter";
export { MedMeanFilter } from "./MeanMedFilter";

export const filterCardAnimations = {
  whileTap: { scale: 0.8 },
};

export const FilterName = (TYPE) => {
  switch (TYPE) {
    case "MEAN":
      return "filtre moyen".toUpperCase();
    case "MEDIAN":
      return "filter médian".toUpperCase();
    case "CONV":
      return "Filtres de convolution".toUpperCase();
    case "MORPH":
      return "Filtres Morphologiques".toUpperCase();
    default:
      break;
  }
};
