// import "../Sass/App.sass";

import React, { useState } from "react";
// Assets
import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";

import { MedMeanFilter, ConvFilter, MorphFilter } from "./Components/Filters";
import { Shapes } from "./Components/GenerateVideo/Shapes";
import { Noise } from "./Components/GenerateVideo/Noise";

import { IoColorFilter, IoWarningOutline } from "react-icons/io5";
import { ImMakeGroup, ImSpinner10 } from "react-icons/im";
import { GiMultipleTargets } from "react-icons/gi";
import { MdCompare } from "react-icons/md";
import { TiDownload, TiUpload } from "react-icons/ti";
import { IoMdImages } from "react-icons/io";
import { Button } from "./Components/StyledComponents";
import { VideoConfig } from "./Components/GenerateVideo/VideoConfig";
import VideoPlayer from "./Components/VideoPlayer";
import { DetectNoiseSize } from "./Components/Detect/DetectNoiseSize";
import { FaPhotoVideo } from "react-icons/fa";
// import { GenerateVideo } from "./Components/GenerateVideo/GenerateVideo";

// import logo from "../Assets/logo.svg";

// const { app, protocol } = window.require("electron").remote;
const { app, dialog } = window.require("electron").remote;
const fs = window.require("fs");
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
//   "opencv"
// );

const Container = tw.div`rounded-3xl border-2 border-blue-300 bg-gray-50 shadow`;

const BigButton = styled(motion.div)(({ selected }) => [
  tw`rounded-3xl bg-blue-100  border-blue-300 
  w-20 h-20 m-auto my-4 hover:ring-1 ring-blue-300 cursor-pointer`,
  selected && tw`ring-2 hover:ring-2`,
]);

const PlayButton = tw(
  motion.div
)`rounded-full border-2 border-blue-300 w-20 h-20 shadow-lg`;

const FileButton = styled.div(({ direction }) => [
  tw`w-32 h-16 border-2 border-blue-300 bg-blue-50 hover:bg-blue-200 cursor-pointer flex flex-col`,
  direction === "left"
    ? tw`rounded-tl-2xl border-b-0 border-r-0`
    : tw`rounded-tr-2xl border-b-0 `,
]);

const UpDownLoad = ({ handleUpload, hadndleDownload }) => {
  return (
    <div tw="absolute bottom-0 left-1/2 transform -translate-x-1/2  ml-2">
      <div tw="flex">
        <FileButton direction="left" onClick={hadndleDownload}>
          <TiDownload tw="h-14 w-14 mx-auto mt-1 text-blue-400" />
          <span tw="w-full text-sm font-bold text-blue-400 text-center uppercase">
            save
          </span>
        </FileButton>
        <FileButton direction="right" onClick={handleUpload}>
          <TiUpload tw="h-14 w-14 mx-auto mt-1 text-blue-400" />
          <span tw="w-full text-sm font-bold text-blue-400 text-center uppercase">
            import
          </span>
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
      // eslint-disable-next-line eqeqeq
      return `${params == 1 ? "GAUSS" : "LAPLAC"}`;
    case 3:
      return `${params.op === 1 ? "DIALATE" : "EROSION"} ${params.type} ${
        params.size
      }`;
    // PART 2 AND PART 3
    case 4:
      return `${params.length} ${params.nbShapes} ${params.nbNoise} ${params.minShapeSize} ${params.maxShapeSize} ${params.NoiseSize} ${params.t_Bruit}`;
    case 5:
      return `${params}`;
    default:
  }
};

export default function App() {
  const [tab, setTab] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(3);
  const [emptyWarning, setEmptyWarning] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pathToFile, setPathToFile] = useState("");
  const [pathToResultFile, setPathToResultFile] = useState("");
  //=====================================
  const [filter1params, setFilter1Params] = useState(1);
  const [filter2params, setFilter2Params] = useState(2);
  const [filter3params, setFilter3Params] = useState(1);
  const [filter4params, setFilter4Params] = useState({
    op: 1,
    type: 0,
    size: 4,
  });
  const [isHoldingDiff, setIsHoldingDiff] = useState(false);

  //===================================== PART2
  const [selectedPart2, setSelectedPart2] = useState(0);
  const [part2, setPart2] = useState({
    nbShapes: 12,
    maxShapeSize: 1000,
    minShapeSize: 100,
    nbNoise: 10,
    NoiseSize: 1,
    t_Bruit: 1,
    length: 30,
    fps: 15,
    path2result: "",
  });
  const [part2Result, setPart2Result] = useState({
    length: 0,
    fps: 0,
    path2result: "",
    path2resultVid: "",
  });
  const [part2Done, setPart2Done] = useState(true);
  //=====================================
  const [part3tbruit, setPart3tbruit] = useState(100);
  const [part3Src, setPart3Src] = useState("");
  const [part3dst, setPart3dst] = useState("");
  const [part3Done, setPart3Done] = useState(true);
  const [part3result, setPart3result] = useState({
    length: 0,
    path2result: "",
  });
  //==============================
  const openFileForPart = (part) => async (e) => {
    // Open a dialog to ask for the file path
    const file = await dialog.showOpenDialog({ properties: ["openFile"] });
    if (file !== undefined) {
      if (part === 1) {
        setPathToResultFile("");
        setPathToFile(file.filePaths[0]);
      } else if (part === 3) {
        setPart3result({ length: 0, path2result: "" });
        setPart3dst("");
        setPart3Src(file.filePaths[0]);
      }
    }
  };

  const SaveFileFromPart = (part) => async (e) => {
    const file = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    if (file !== undefined) {
      if (part === 1) {
        console.log(pathToResultFile);
        fs.copyFile(
          pathToResultFile || "",
          path.join(file.filePaths[0], path.basename(pathToResultFile)),
          (err) => {
            if (err) {
              alert("Nothing To Save !!");
              throw err;
            }
            alert("Fichier Sauvgarder !");
          }
        );
      } else if (part === 3) {
        fs.copyFile(
          part3dst || "",
          path.join(file.filePaths[0], path.basename(part3dst)),
          (err) => {
            if (err) {
              alert("Nothing To Save !!");
              throw err;
            }
            alert("Fichier Sauvgarder !");
          }
        );
      }
    }
  };

  const handleFilterChange = (filter) => (e) => {
    setEmptyWarning(emptyWarning + 1);
    if (filter === selectedFilter) return;
    setSelectedFilter(filter);
    if (!pathToFile) return;
    runFilters(filter);
  };

  const onPart3Submit = () => {
    setPart3Done(false);

    fs.rmdirSync(path.join(app.getPath("userData"), "part3"), {
      recursive: true,
    });

    const resultFolder = path.join(
      app.getPath("userData"),
      "part3",
      "p3" + Date.now()
    );

    fs.mkdirSync(resultFolder, { recursive: true });

    const cmnd = `${path2exe} p3 ${part3Src} ${path.join(
      app.getPath("userData"),
      "part3",
      "result.avi"
    )}  ${resultFolder} ${translateParams(5, part3tbruit)}`;

    console.log(cmnd);

    exec(cmnd, (error, stdout, stderr) => {
      if (error) alert(error);
      else {
        console.log(resultFolder);
        setPart3dst(path.join(app.getPath("userData"), "part3", "result.avi"));
        setPart3result({
          path2result: resultFolder,
          length: 0,
        });
        setPart3Done(true);
      }
    });
  };

  const onPart2Submit = () => {
    setPart2Done(false);

    fs.rmdirSync(path.join(app.getPath("userData"), "part2"), {
      recursive: true,
    });

    const resultFolder = path.join(
      app.getPath("userData"),
      "part2",
      "p2" + Date.now()
    );

    fs.mkdirSync(resultFolder, { recursive: true });

    const cmnd = `${path2exe} p2 ${path.join(
      app.getPath("userData"),
      "part2",
      "result.avi"
    )}  ${resultFolder} ${translateParams(4, part2)}`;

    console.log(cmnd);

    exec(cmnd, (error, stdout, stderr) => {
      if (error) alert(error);
      else {
        console.log(resultFolder);
        setPart2Result({
          path2resultVid: path.join(
            app.getPath("userData"),
            "part2",
            "result.avi"
          ),
          path2result: resultFolder,
          length: part2.length,
        });
        setPart2Done(true);
      }
    });
  };

  const handleFilterParamChange = (filter) => (parms, runExperement) => {
    switch (filter) {
      case 0:
        setFilter1Params(parms);
        break;
      case 1:
        setFilter2Params(parms);
        break;
      case 2:
        setFilter3Params(parms);
        break;
      case 3:
        setFilter4Params(parms);
        break;
      default:
        break;
    }
    if (!pathToFile) return;
    if (runExperement !== false) runFilters(filter, parms);
  };

  const runFilters = (filter, params) => {
    setLoading(true);
    const fileName = Date.now() + path.basename(pathToFile);
    const cmnd = `${path2exe} p1 ${
      ["MEAN", "MEDIAN", "CONV", "MORPH"][filter]
    } ${pathToFile} ${path.join(
      app.getPath("userData"),
      fileName
    )} ${translateParams(
      filter,
      params || // for new params
        [filter1params, filter2params, filter3params, filter4params][filter]
    )}`;

    console.log(cmnd, app.getPath("userData"));
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
          <div tw="my-auto px-4">
            <BigButton
              selected={tab === 0}
              onClick={() => setTab(0)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoColorFilter tw="h-20 w-full p-4 text-blue-400" />
            </BigButton>
            <BigButton
              selected={tab === 1}
              onClick={() => setTab(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ImMakeGroup tw="h-full w-full p-4 text-blue-400" />
            </BigButton>
            <BigButton
              selected={tab === 2}
              onClick={() => setTab(2)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
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
                setParams={handleFilterParamChange(0)}
                selected={selectedFilter === 0}
                onClick={handleFilterChange(0)}
              />
              <MedMeanFilter
                Mean={false}
                params={filter2params}
                setParams={handleFilterParamChange(1)}
                selected={selectedFilter === 1}
                onClick={handleFilterChange(1)}
              />
              <ConvFilter
                params={filter3params}
                setParams={handleFilterParamChange(2)}
                selected={selectedFilter === 2}
                onClick={handleFilterChange(2)}
              />
              <MorphFilter
                params={filter4params}
                setParams={handleFilterParamChange(3)}
                selected={selectedFilter === 3}
                onClick={handleFilterChange(3)}
              />
              <UpDownLoad
                handleUpload={openFileForPart(1)}
                hadndleDownload={SaveFileFromPart(1)}
              />
            </div>
          ) : tab === 1 ? (
            <div tw="relative h-full">
              <div tw="w-full mb-4 text-2xl text-blue-400 font-bold text-center ">
                <span tw="bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-blue-300">
                  GENERATE
                </span>
              </div>
              <Shapes
                params={part2}
                setParams={setPart2}
                selected={selectedPart2 === 0}
                onClick={() => setSelectedPart2(0)}
              />
              <Noise
                params={part2}
                setParams={setPart2}
                selected={selectedPart2 === 1}
                onClick={() => setSelectedPart2(1)}
              />
              <VideoConfig
                params={part2}
                setParams={setPart2}
                selected={selectedPart2 === 2}
                onClick={() => setSelectedPart2(2)}
              />
              {/* <GenerateVideo part2={part2} setPart2={setPart2} /> */}
              {/* <UpDownLoad /> */}
              <Button
                tw="absolute bottom-0"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={onPart2Submit}
              >
                <span>GENERATE</span>
              </Button>
            </div>
          ) : (
            <div>
              <div tw="w-full mb-4 text-2xl text-blue-400 font-bold text-center">
                <span tw="bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-blue-300">
                  DETECT
                </span>
              </div>
              <DetectNoiseSize
                params={part3tbruit}
                setParams={setPart3tbruit}
                selected
              />
              {part3Src ? (
                <>
                  <div tw="w-full bg-blue-100 p-2 px-4 h-16 border-2 border-blue-50 rounded-xl flex mb-4">
                    <FaPhotoVideo tw=" h-8 w-8 my-auto text-blue-400" />
                    <span tw="text-blue-400 flex-grow text-center my-auto font-bold">
                      {path.basename(part3Src)}
                    </span>
                  </div>
                  <Button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={onPart3Submit}
                  >
                    <span>DETECT !</span>
                  </Button>
                </>
              ) : (
                <div tw="w-full bg-blue-100 p-2 px-4 h-16 border-2 border-blue-50 rounded-xl flex ">
                  <IoWarningOutline tw=" h-8 w-8 my-auto text-blue-400" />
                  <span tw="text-blue-400 flex-grow text-center my-auto font-bold">
                    No File Selected
                  </span>
                </div>
              )}
              <UpDownLoad
                handleUpload={openFileForPart(3)}
                hadndleDownload={SaveFileFromPart(3)}
              />
            </div>
          )}
        </div>
      </Container>

      <Container tw="w-full lg:w-8/12 relative bg-gradient-to-tl p-8 from-blue-50 to-gray-100">
        {tab === 0 ? (
          <>
            <div tw="w-full h-full rounded-3xl shadow-inner border-4 border-dashed border-blue-300">
              {!pathToFile ? (
                <Empty key={emptyWarning} />
              ) : loading ? (
                <Loading />
              ) : (
                <img
                  tw="w-full h-full border rounded-3xl shadow-inner"
                  alt=""
                  key={Date.now().toString()}
                  src={
                    pathToResultFile && !isHoldingDiff
                      ? "atom://" + pathToResultFile
                      : pathToFile
                      ? "atom://" + pathToFile
                      : ""
                  }
                />
              )}
            </div>
            <PlayButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              tw="absolute bottom-0 left-0 m-2 cursor-pointer bg-blue-50 hover:ring-2 ring-blue-300 hover:bg-blue-100 shadow-2xl"
            >
              <MdCompare
                tw="h-full w-full p-4 text-blue-400"
                onMouseEnter={(e) => setIsHoldingDiff(true)}
                onMouseLeave={(e) => setIsHoldingDiff(false)}
              />
            </PlayButton>
          </>
        ) : tab === 1 ? (
          <>
            <div tw="w-full h-full rounded-3xl shadow-inner border-4 border-dashed border-blue-300">
              <VideoPlayer
                done={part2Done}
                length={part2Result.length}
                pathToVideo={part2Result.path2result}
                path2Avi={part2Result.path2resultVid}
              />
            </div>
          </>
        ) : (
          <>
            <div tw="w-full h-full rounded-3xl shadow-inner border-4 border-dashed border-blue-300">
              <VideoPlayer
                done={part3Done}
                length={part3result.length}
                pathToVideo={part3result.path2result}
                path2Avi={part3dst}
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export const Loading = ({ text }) => (
  <div tw="w-full h-full flex">
    <div tw="flex flex-col w-full">
      <div tw="m-auto">
        <ImSpinner10 tw="animate-spin text-blue-300 h-32 w-32 m-auto" />
        <div tw="animate-pulse text-3xl text-blue-300 w-full text-center my-4">
          {text || "Applying Filtere ..."}
        </div>
      </div>
    </div>
  </div>
);

const Empty = () => (
  <div tw="w-full h-full flex">
    <div tw="flex flex-col w-full">
      <motion.div
        tw="animate-pulse m-auto"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 0.4 }}
      >
        <IoMdImages tw=" text-blue-300 h-32 w-32 m-auto" />
        <div tw="text-3xl text-blue-300 w-full text-center my-4">
          Please select an Image !
        </div>
      </motion.div>
    </div>
  </div>
);
