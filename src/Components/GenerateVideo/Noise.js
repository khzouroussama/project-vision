import React from "react";
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { filterCardAnimations } from "../Filters";
import { Slider } from "../Slider";
import { Card, Divider } from "../StyledComponents";

export const Noise = ({ selected, params, setParams, ...rest }) => {
  return (
    <Card
      tw="flex flex-col"
      selected={selected}
      {...rest}
      {...(!selected && filterCardAnimations)}
    >
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto uppercase">
        Bruit
      </div>

      {selected && (
        <>
          <Divider />
          <Slider
            compact
            title="Nb Bruit"
            min={1}
            max={500}
            step={5}
            mesureUnit="Bruit"
            value={params.nbNoise}
            onChange={(e) =>
              setParams({ ...params, nbNoise: parseInt(e.target.value) }, false)
            }
            onMouseUp={(e) =>
              setParams({ ...params, nbNoise: parseInt(e.target.value) })
            }
          />

          <Slider
            compact
            title="Taille Bruit"
            min={1}
            max={25}
            step={1}
            mesureUnit="px"
            value={params.NoiseSize}
            onChange={(e) =>
              setParams(
                { ...params, NoiseSize: parseInt(e.target.value) },
                false
              )
            }
            onMouseUp={(e) =>
              setParams({ ...params, NoiseSize: parseInt(e.target.value) })
            }
          />
          <Slider
            compact
            title="t_bruit"
            min={1}
            max={25}
            step={2}
            mesureUnit="px"
            value={params.t_Bruit}
            onChange={(e) =>
              setParams({ ...params, t_Bruit: parseInt(e.target.value) }, false)
            }
            onMouseUp={(e) =>
              setParams({ ...params, t_Bruit: parseInt(e.target.value) })
            }
          />
        </>
      )}
    </Card>
  );
};
