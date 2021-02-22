import React, { useState } from "react";
import tw, { styled } from "twin.macro";

const FilterName = (TYPE) => {
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

const Card = styled.div(({ selected }) => [
  tw`bg-white rounded-xl border-2 border-blue-300 mb-2 p-2  
cursor-pointer hover:ring-2 hover:ring-blue-300 shadow-inner`,
  selected && tw`ring-2 ring-blue-300`,
]);

const SelectableHalf = styled.div(({ selected, direction }) => [
  tw`w-1/2  hover:bg-blue-200 flex`,
  selected && tw`bg-blue-400 hover:bg-blue-400 text-blue-50`,
  direction === "right" ? tw`rounded-r-3xl` : tw`rounded-l-3xl`,
]);

export const MedMeanFilter = ({
  Mean,
  selected,
  params,
  setParams,
  ...rest
}) => {
  return (
    <Card tw="flex flex-col" selected={selected} {...rest}>
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto">
        {FilterName(Mean ? "MEAN" : "MEDIAN")}
      </div>

      {selected && (
        <>
          <div tw="w-48 mx-auto border-t-2 border-blue-200 my-1"></div>
          <div tw="w-full text-center text-sm font-bold my-2 uppercase text-blue-400">
            voisinage
          </div>
          <div tw="px-8">
            <input
              className="slider-thumb"
              type="range"
              min={1}
              max={25}
              step={2}
              value={params}
              onChange={(e) => setParams(parseInt(e.target.value))}
              tw="appearance-none  rounded-3xl w-full h-6 bg-blue-100 outline-none "
            />
          </div>
          <div tw="w-full text-center text-lg font-bold my-1 uppercase text-blue-400">
            {params}
          </div>
        </>
      )}
    </Card>
  );
};

export const ConvFilter = ({ selected, params, setParams, ...rest }) => {
  return (
    <Card tw="flex flex-col" selected={selected} {...rest}>
      <div tw="text-blue-400 text-lg font-semibold text-center m-auto">
        {FilterName("CONV")}
      </div>
      {selected && (
        <>
          <div tw="w-48 mx-auto border-t-2 border-blue-200 my-1"></div>
          <div tw="w-full text-center text-sm font-bold my-1 uppercase text-blue-400">
            Type de Filter
          </div>
          <div tw="px-8">
            <div tw="my-2 h-10 bg-blue-50 text-blue-400 font-bold text-center uppercase flex  rounded-3xl border-2 border-blue-300 ">
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

export const MorphFilter = ({ selected, params, setParams, ...rest }) => {
  return (
    <Card tw="flex flex-col" selected={selected} {...rest}>
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
            >
              <option value={1}>carré</option>
              <option value={2}>cercle</option>
              <option value={3}>croix</option>
            </select>
          </div>
          <div tw="w-full text-center text-sm font-bold my-1 uppercase text-blue-400">
            {(params.op === 1 ? "DIALATE" : "EROSION") + " Size"}
          </div>
          <div tw="px-8">
            <input
              className="slider-thumb"
              type="range"
              min={1}
              max={25}
              step={1}
              value={params.size}
              onChange={(e) =>
                setParams({ ...params, size: parseInt(e.target.value) })
              }
              tw="appearance-none  rounded-3xl w-full h-6 bg-blue-100 outline-none "
            />
          </div>
          <div tw="w-full text-center text-lg font-bold my-1 uppercase text-blue-400">
            {params.size}
          </div>
        </>
      )}
    </Card>
  );
};