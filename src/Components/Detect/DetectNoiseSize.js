import React from "react";
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { filterCardAnimations } from "../Filters";
import { Slider } from "../Slider";
import { Card, Divider } from "../StyledComponents";

export const DetectNoiseSize = ({ selected, params, setParams, ...rest }) => {
  return (
    <Card
      tw="flex flex-col"
      selected={selected}
      {...rest}
      {...(!selected && filterCardAnimations)}
    >
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto uppercase">
        Taille Bruit
      </div>

      {selected && (
        <>
          <Divider tw="mb-2" />
          <Slider
            compact
            title=" Taille de Bruit Maximale "
            min={1}
            max={10000}
            step={100}
            mesureUnit="px"
            value={params}
            onChange={(e) => setParams(parseInt(e.target.value))}
          />
        </>
      )}
    </Card>
  );
};
