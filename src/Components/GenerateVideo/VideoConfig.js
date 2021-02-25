import React from "react";
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { filterCardAnimations } from "../Filters";
import { Slider } from "../Slider";
import { Card, Divider } from "../StyledComponents";

export const VideoConfig = ({ selected, params, setParams, ...rest }) => {
  return (
    <Card
      tw="flex flex-col"
      selected={selected}
      {...rest}
      {...(!selected && filterCardAnimations)}
    >
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto uppercase">
        Video settings
      </div>

      {selected && (
        <>
          <Divider />
          <Slider
            compact
            title="Video length"
            min={5}
            max={60}
            step={1}
            mesureUnit="Secondes"
            value={params.length}
            onChange={(e) =>
              setParams({ ...params, length: parseInt(e.target.value) }, false)
            }
            onMouseUp={(e) =>
              setParams({ ...params, length: parseInt(e.target.value) })
            }
          />

          {/* <Slider
            compact
            title="Framerate"
            min={5}
            max={30}
            step={5}
            mesureUnit="fps"
            value={params.fps}
            onChange={(e) =>
              setParams({ ...params, fps: parseInt(e.target.value) }, false)
            }
            onMouseUp={(e) =>
              setParams({ ...params, fps: parseInt(e.target.value) })
            }
          /> */}
        </>
      )}
    </Card>
  );
};
