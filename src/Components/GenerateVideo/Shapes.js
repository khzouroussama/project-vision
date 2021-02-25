import React from "react";
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { filterCardAnimations } from "../Filters";
import { Slider } from "../Slider";
import { Card, Divider } from "../StyledComponents";

export const Shapes = ({ selected, params, setParams, ...rest }) => {
  return (
    <Card
      tw="flex flex-col"
      selected={selected}
      {...rest}
      {...(!selected && filterCardAnimations)}
    >
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto uppercase">
        géométries
      </div>

      {selected && (
        <>
          <Divider />
          <Slider
            compact
            title="Nb géométrie"
            min={1}
            max={30}
            step={1}
            mesureUnit="géométrie"
            value={params.nbShapes}
            onChange={(e) =>
              setParams(
                { ...params, nbShapes: parseInt(e.target.value) },
                false
              )
            }
            onMouseUp={(e) =>
              setParams({ ...params, nbShapes: parseInt(e.target.value) })
            }
          />

          <Slider
            compact
            title="Max Shape Size"
            min={100}
            max={90000}
            step={100}
            mesureUnit="px"
            value={params.maxShapeSize}
            onChange={(e) =>
              setParams(
                { ...params, maxShapeSize: parseInt(e.target.value) },
                false
              )
            }
            onMouseUp={(e) =>
              setParams({ ...params, maxShapeSize: parseInt(e.target.value) })
            }
          />
          <Slider
            compact
            title="Min shape size"
            min={100}
            max={90000}
            step={100}
            mesureUnit="px"
            value={params.minShapeSize}
            onChange={(e) =>
              setParams(
                { ...params, minShapeSize: parseInt(e.target.value) },
                false
              )
            }
            onMouseUp={(e) =>
              setParams({ ...params, minShapeSize: parseInt(e.target.value) })
            }
          />
        </>
      )}
    </Card>
  );
};
