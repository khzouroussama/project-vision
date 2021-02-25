// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { filterCardAnimations, FilterName } from ".";
import { Card, Divider, SelectableHalf } from "../StyledComponents";

export const ConvFilter = ({ selected, params, setParams, ...rest }) => {
  return (
    <Card
      tw="flex flex-col"
      selected={selected}
      {...rest}
      {...(!selected && filterCardAnimations)}
    >
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto">
        {FilterName("CONV")}
      </div>
      {selected && (
        <>
          <Divider />
          <div tw="w-full text-center text-sm font-bold mt-2 uppercase text-blue-400">
            Type de Filter
          </div>
          <div tw="px-8">
            <div tw="mt-1 mb-2 h-10 bg-blue-50 text-blue-400 font-bold text-center uppercase flex  rounded-3xl border-2 border-blue-300 ">
              <div tw="flex w-full">
                <SelectableHalf
                  selected={params === 1}
                  direction="left"
                  onClick={() => setParams(1)}
                >
                  <div tw="m-auto">Gaussien</div>
                </SelectableHalf>
                <SelectableHalf
                  selected={params === 2}
                  direction="right"
                  onClick={() => setParams(2)}
                >
                  <div tw="m-auto">Laplacien</div>
                </SelectableHalf>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
