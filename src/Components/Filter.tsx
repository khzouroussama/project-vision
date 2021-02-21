import React from "react";
import tw from "twin.macro";

type FilterType = "MEAN" | "MEDIANE" | "GAUSS" | "LAPLAC" | string;

interface FilterProps {
  type: FilterType;
}

const FilterName = (TYPE: FilterType) => {
  switch (TYPE) {
    case "MEAN":
      return "filtre moyen".toUpperCase();
    case "MEDIANE":
      return "filter médian".toUpperCase();
    case "GAUSS":
      return "filtre Gaussien".toUpperCase();
    case "LAPLAC":
      return "filter Laplacien".toUpperCase();
  }
};

const Card = tw.div`rounded-xl border-2 border-blue-300 mb-2 p-2 h-20 cursor-pointer hover:ring-2 hover:ring-blue-300`;

export const Filter = ({ type }: FilterProps) => {
  return (
    <Card tw="flex">
      <div tw=""> </div>
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto">
        {FilterName(type)}
      </div>
    </Card>
  );
};

export const Filters = () => (
  <>
    {["MEAN", "MEDIANE", "GAUSS", "LAPLAC"].map((filter) => (
      <Filter type={filter} />
    ))}
  </>
);

export default Filter;
