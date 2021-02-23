// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { filterCardAnimations, FilterName } from ".";
import { Slider } from "../Slider";
import { Card, SelectableHalf } from "../StyledComponents";

export const MorphFilter = ({ selected, params, setParams, ...rest }) => {
  return (
    <Card
      tw="flex flex-col"
      selected={selected}
      {...rest}
      {...(!selected && filterCardAnimations)}
    >
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto">
        {FilterName("MORPH")}
      </div>
      {selected && (
        <>
          <div tw="w-48 mx-auto border-t-2 border-blue-200 my-1"></div>
          <div tw="px-8">
            <div tw="my-2 h-10 bg-blue-50 text-blue-400 font-bold text-center uppercase flex  rounded-3xl border-2 border-blue-300 ">
              <div tw="flex w-full">
                <SelectableHalf
                  selected={params.op === 1}
                  direction="left"
                  onClick={() => setParams({ ...params, op: 1 })}
                >
                  <div tw="m-auto">DIALATE</div>
                </SelectableHalf>
                <SelectableHalf
                  selected={params.op === 2}
                  direction="right"
                  onClick={() => setParams({ ...params, op: 2 })}
                >
                  <div tw="m-auto">EROSION</div>
                </SelectableHalf>
              </div>
            </div>
          </div>
          <div tw="w-full text-center text-sm font-bold my-1 uppercase text-blue-400">
            {(params.op === 1 ? "DIALATE" : "EROSION") + " Type"}
          </div>
          <div tw="px-8 ">
            <select
              tw="w-full text-lg font-bold my-1 uppercase text-blue-400 border-2
               border-blue-300 rounded-3xl bg-blue-50 outline-none p-1"
              style={{ textAlignLast: "center" }}
              value={params.type}
              onChange={(e) =>
                setParams({ ...params, type: parseInt(e.target.value) })
              }
            >
              <option value={0}>carré</option>
              <option value={1}>croix</option>
              <option value={2}>cercle</option>
            </select>
          </div>
          <Slider
            aside
            title={(params.op === 1 ? "DIALATE" : "EROSION") + " Size"}
            min={1}
            max={25}
            step={1}
            value={params.size}
            onChange={(e) =>
              setParams({ ...params, size: parseInt(e.target.value) }, false)
            }
            onMouseUp={(e) =>
              setParams({ ...params, size: parseInt(e.target.value) })
            }
          />
        </>
      )}
    </Card>
  );
};
