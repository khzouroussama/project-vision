import React from "react";
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { filterCardAnimations, FilterName } from ".";
import { Slider } from "../Slider";
import { Card, Divider } from "../StyledComponents";

export const MedMeanFilter = ({
  Mean,
  selected,
  params,
  setParams,
  ...rest
}) => {
  return (
    <Card
      tw="flex flex-col"
      selected={selected}
      {...rest}
      {...(!selected && filterCardAnimations)}
    >
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto">
        {FilterName(Mean ? "MEAN" : "MEDIAN")}
      </div>

      {selected && (
        <>
          <Divider />
          <Slider
            title="Voisins"
            min={1}
            max={25}
            step={2}
            value={params}
            onChange={(e) => setParams(parseInt(e.target.value), false)}
            onMouseUp={(e) => setParams(parseInt(e.target.value))}
          />
        </>
      )}
    </Card>
  );
};
