// import "../Sass/App.sass";

import React, { useState } from "react";
// Assets
import tw, { styled } from "twin.macro";
import { MedMeanFilter, ConvFilter, MorphFilter } from "./Components/Filter";
import { IoColorFilter } from "react-icons/io5";
import { ImMakeGroup, ImSpinner10 } from "react-icons/im";
import { GiMultipleTargets } from "react-icons/gi";
import { MdCompare } from "react-icons/md";
import { TiDownload, TiUpload } from "react-icons/ti";
import { BsInboxesFill } from "react-icons/bs";
// import logo from "../Assets/logo.svg";

// const { app, protocol } = window.require("electron").remote;
const { app, dialog } = window.require("electron").remote;
const path = window.require("path");
const exec = window.require("child_process").exec;
// const fs = window.require("fs");

//==== DEV
const path2exe = path.join(
  "/home/oussama/projects/my-app/extraResources/opencv"
);
//==== PROD

// const path2exe = path.join(
//   window.require("electron").remote.process.resourcesPath,
//   "extraResources",
//   "opencv.exe"
// );

const Container = tw.div`rounded-3xl border-2 border-blue-300 bg-gray-50 shadow`;

const BigButton = styled.div(({ selected }) => [
  tw`rounded-3xl bg-blue-100  border-blue-300 
  w-20 h-20 m-auto my-3 hover:ring-2 ring-blue-300 cursor-pointer`,
  selected && tw`ring-2`,
]);

const PlayButton = tw.div`rounded-full border-2 border-blue-300 w-20 h-20 shadow-lg`;
const FileButton = styled.div(({ direction }) => [
  tw`w-32 h-16  border-2 border-blue-300 bg-blue-50 hover:bg-blue-200 cursor-pointer`,
  direction === "left"
    ? tw`rounded-tl-2xl border-b-0 border-r-0`
    : tw`rounded-tr-2xl border-b-0 `,
]);

const UpDownLoad = ({ handleUpload, hadndleDownload }) => {
  return (
    <div tw="absolute bottom-0 left-1/2 transform -translate-x-1/2  ml-2">
      <div tw="flex">
        <FileButton direction="left" onClick={hadndleDownload}>
          <TiDownload tw="h-full w-full p-4 text-blue-400" />
        </FileButton>
        <FileButton direction="right" onClick={handleUpload}>
          <TiUpload tw="h-full w-full p-4 text-blue-400" />
        </FileButton>
      </div>
    </div>
  );
};

const translateParams = (filter, params) => {
  switch (filter) {
    case 0:
      return `${params}`;
    case 1:
      return `${params}`;
    case 2:
      return `${params == 1 ? "GAUSS" : "LAPLAC"}`;
    case 3:
      return `${params.op == 1 ? "DIALATE" : "EROSION"} ${params.type} ${
        params.size
      }`;
    default:
  }
};

export default function App() {
  const [tab, setTab] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(3);
  const [loading, setLoading] = useState(false);
  const [pathToFile, setPathToFile] = useState("");
  const [pathToResultFile, setPathToResultFile] = useState("");
  //=====================================
  const [filter1params, setFilter1Params] = useState(1);
  const [filter2params, setFilter2Params] = useState(1);
  const [filter3params, setFilter3Params] = useState(1);
  const [filter4params, setFilter4Params] = useState({
    op: 1,
    type: 2,
    size: 4,
  });
  //=====================================
  // The function triggered by your button

  const storeImageFile = async (e) => {
    // Open a dialog to ask for the file path
    const file = await dialog.showOpenDialog({ properties: ["openFile"] });
    if (file !== undefined) {
      setPathToFile(file.filePaths[0]);
    }
  };

  const handleFilterChange = (filter) => (e) => {
    setSelectedFilter(filter);
    if (!pathToFile) return;
    runFilters();
  };

  const runFilters = () => {
    setLoading(true);
    const fileName = Date.now() + path.basename(pathToFile);
    const cmnd = `${path2exe} p1 ${
      ["MEAN", "MEDIAN", "CONV", "MORPH"][selectedFilter]
    } ${pathToFile} ${path.join(
      app.getPath("userData"),
      fileName
    )} ${translateParams(
      selectedFilter,
      [filter1params, filter2params, filter3params, filter4params][
        selectedFilter
      ]
    )}`;

    console.log(cmnd);
    exec(cmnd, (error, stdout, stderr) => {
      if (error) alert(error);
      else {
        setPathToResultFile(path.join(app.getPath("userData"), fileName));
        setLoading(false);
      }
    });
  };

  return (
    <div tw="flex h-screen antialiased p-3 bg-gray-100 select-none">
      <Container tw="w-full md:w-6/12 mr-3 flex bg-gradient-to-r from-blue-50 to-gray-100">
        <div tw="w-32 border-2 border-l-0 border-blue-300 rounded-br-3xl rounded-tr-3xl mr-3 my-28 flex flex-col shadow-inner bg-gray-100">
          <div tw="my-auto">
            <BigButton selected={tab === 0} onClick={() => setTab(0)}>
              <IoColorFilter tw="h-20 w-full p-4 text-blue-400" />
            </BigButton>
            <BigButton selected={tab === 1} onClick={() => setTab(1)}>
              <ImMakeGroup tw="h-full w-full p-4 text-blue-400" />
            </BigButton>
            <BigButton selected={tab === 2} onClick={() => setTab(2)}>
              <GiMultipleTargets tw="h-full w-full p-4 text-blue-400" />
            </BigButton>
          </div>
        </div>

        <div tw="w-full border-2 border-r-0 rounded-bl-3xl rounded-tl-3xl border-blue-300 my-8 p-4 shadow-inner bg-gray-50 relative">
          {tab === 0 ? (
            <div>
              <div tw="w-full mb-4 text-2xl text-blue-400 font-bold text-center">
                <span tw="bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-blue-300">
                  FILTERS
                </span>
              </div>
              <MedMeanFilter
                Mean
                params={filter1params}
                setParams={setFilter1Params}
                selected={selectedFilter === 0}
                onClick={handleFilterChange(0)}
              />
              <MedMeanFilter
                Mean={false}
                params={filter2params}
                setParams={setFilter2Params}
                selected={selectedFilter === 1}
                onClick={handleFilterChange(1)}
              />
              <ConvFilter
                params={filter3params}
                setParams={setFilter3Params}
                selected={selectedFilter === 2}
                onClick={handleFilterChange(2)}
              />
              <MorphFilter
                params={filter4params}
                setParams={setFilter4Params}
                selected={selectedFilter === 3}
                onClick={handleFilterChange(3)}
              />
              <UpDownLoad
                handleUpload={storeImageFile}
                hadndleDownload={undefined}
              />
            </div>
          ) : tab === 1 ? (
            <>
              <div>tab2</div>
              <UpDownLoad />
            </>
          ) : (
            <>
              <div>tab3</div>
              <UpDownLoad />
            </>
          )}
        </div>
      </Container>

      <Container tw="w-full lg:w-8/12 relative bg-gradient-to-tl p-8 from-blue-50 to-gray-100">
        <div tw="w-full h-full rounded-3xl shadow-inner border-4 border-dashed border-blue-300">
          {!pathToFile ? (
            <Empty />
          ) : loading ? (
            <Loading />
          ) : (
            <img
              tw="w-full h-full border rounded-3xl shadow-inner"
              alt=""
              src={
                pathToResultFile
                  ? "atom://" + pathToResultFile
                  : pathToFile
                  ? "atom://" + pathToFile
                  : ""
              }
            />
          )}
        </div>
        <PlayButton tw="absolute bottom-0 left-0 m-2 cursor-pointer bg-blue-50 hover:ring-2 ring-blue-300 hover:bg-blue-100 shadow-2xl">
          <MdCompare tw="h-full w-full p-4 text-blue-400" />
        </PlayButton>
      </Container>
    </div>
  );
}

const Loading = () => (
  <div tw="w-full h-full flex">
    <ImSpinner10 tw="animate-spin text-blue-300 h-32 w-32 m-auto" />
  </div>
);

const Empty = () => (
  <div tw="w-full h-full flex">
    <div tw="flex flex-col w-full">
      <div tw="animate-pulse m-auto">
        <BsInboxesFill tw=" text-blue-300 h-32 w-32 m-auto" />
        <div tw="text-3xl text-blue-300 w-full text-center my-4">
          Please select a file !
        </div>
      </div>
    </div>
  </div>
);