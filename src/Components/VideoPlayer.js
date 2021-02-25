import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { FaCheckCircle, FaPhotoVideo, FaSave } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import tw from "twin.macro";
import { Slider } from "./Slider";
import { ImSpinner10 } from "react-icons/im";
import { TiDownload } from "react-icons/ti";

const { dialog } = window.require("electron").remote;
const fs = window.require("fs");
const path = window.require("path");

let images = [];

// const bufferOneImage = (i, pathToFrames) => {
//   console.log("framebuff ", i, pathToFrames);
//   let retry = true;
//   while (retry) {
//     try {
//       //   const result = await fs.promises.readFile(
//       //     path.join(pathToFrames, i + ".png")
//       //   );
//       //   images[i] = result.toString("base64");

//       images[i] = fs
//         .readFileSync(path.join(pathToFrames, i + ".png"))
//         .toString("base64");
//       retry = false;
//     } catch (err) {
//       retry = true;
//     }
//   }
// };
const bufferImages = (pathToFrames) => {
  try {
    for (let i = 0; ; i++) {
      // bufferOneImage(i, pathToFrames);

      //   const result = await fs.promises.readFile(
      //     path.join(pathToFrames, i + ".png")
      //   );
      //   images[i] = result.toString("base64");

      images[i] = fs
        .readFileSync(path.join(pathToFrames, i + ".png"))
        .toString("base64");
    }
  } catch (err) {
    console.log("done");
  }
};

const rebufferImages = (pathToVideo) => {
  images = [];
  bufferImages(pathToVideo);
};

const VideoPlayer = ({ length, pathToVideo, done, path2Avi }) => {
  // Default is 30 FPS (more means faster movments)

  const [time, setTime] = useState(Date.now());
  const [playing, setPlaying] = useState(true);
  const [isVideoBuffreing, setIsVideoBuffreing] = useState(false);
  const counter = useRef(0);

  //   console.log(imagectes);

  useEffect(() => {
    if (!pathToVideo) return;
    rebufferImages(pathToVideo);
    counter.current = 0;
  }, [length, pathToVideo]);

  useEffect(() => {
    if (!pathToVideo) return;
    const interval = setInterval(() => {
      if (playing) {
        if (counter.current >= (length || Math.floor(images.length / 30)) * 30)
          counter.current = 0; //replay when vedeo ends to lazy to other

        // if (images[counter.current + 1]) {
        counter.current = counter.current + 1;
        //   console.log("imglength::", images.length);
        //   setIsVideoBuffreing(false);
        // } else {
        //   setIsVideoBuffreing(true);
      }

      setTime(Date.now());
    }, 1000 / 30);

    return () => {
      clearInterval(interval);
    };
  }, [length, pathToVideo, playing]);

  return (
    <div tw="relative h-full w-full p-0">
      {!pathToVideo ? (
        <Empty />
      ) : (
        <img
          tw="w-full h-full border rounded-3xl shadow-inner "
          alt=""
          key={Date.now().toString()}
          src={`data:image/jpg;base64,${images[counter.current]}`}
        />
      )}

      {(pathToVideo || !done) && (
        <BuffringINformations
          done={done}
          text={
            isVideoBuffreing
              ? "Waiting for more Frames ..."
              : !done
              ? "Generating Video ..."
              : "Video Generation completed ."
          }
        />
      )}

      <SaveButton path2Avi={path2Avi} done={done} />
      <PlayerTools
        time={counter.current}
        length={Math.floor(images.length / 30) * 30 + 1}
        play={playing}
        setPlaying={setPlaying}
        counter={counter}
      />
    </div>
  );
};

const BuffringINformations = ({ text, done }) => (
  <div tw="absolute top-0 left-0 m-2 p-2 px-4 bg-blue-200 bg-opacity-60 rounded-3xl flex ">
    {done ? (
      <FaCheckCircle tw=" text-blue-500  m-auto mr-2" />
    ) : (
      <ImSpinner10 tw="animate-spin text-blue-500  m-auto mr-2" />
    )}
    <span tw="text-blue-500 font-bold">{text || "Loading ..."}</span>
  </div>
);

const SaveButton = ({ path2Avi, done }) => (
  <motion.div
    onClick={async (e) => {
      if (!done || !path2Avi) {
        alert("Calculating!!");
        return;
      }
      const file = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });
      if (file !== undefined) {
        fs.copyFile(
          path2Avi || "",
          path.join(file.filePaths[0], path.basename(path2Avi || "")),
          (err) => {
            if (err) {
              alert("Nothing To Save !!");
              throw err;
            }
            alert("Fichier Sauvgarder !");
          }
        );
      }
    }}
    whileHover={{ scale: 1.07 }}
    whileTap={{ scale: 0.9 }}
    tw="absolute top-0 right-0 m-4 p-2 h-16 w-16 border-2 border-blue-200 shadow-lg bg-blue-100 rounded-full flex cursor-pointer hover:bg-blue-200 "
  >
    <TiDownload tw="text-blue-400 m-auto h-8 w-8" />
  </motion.div>
);

const PlayerTools = ({ time, length, setPlaying, play, counter }) => (
  <div tw="absolute bottom-0 w-full h-24 p-4">
    <div tw="rounded-full bg-blue-100 bg-opacity-50 border-2 border-blue-200 h-full flex p-1 px-2 mx-2 shadow-lg">
      <motion.span
        tw="h-12 w-12 border-2 border-blue-300 rounded-full my-auto cursor-pointer hover:bg-blue-200 mx-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setPlaying(!play)}
      >
        {!play ? (
          <MdPlayCircleOutline tw="h-full w-full text-blue-400 " />
        ) : (
          <MdPauseCircleOutline tw="h-full w-full text-blue-400 " />
        )}
      </motion.span>
      <Slider
        playerSlider
        value={time}
        min={0}
        max={length}
        onChange={(e) => (counter.current = parseInt(e.target.value))}
      />
      <span tw="my-auto text-sm px-1 text-blue-400 font-bold">
        {Math.floor((time || 0) / 30)} / {Math.floor((length || 0) / 30)}
      </span>
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
        <FaPhotoVideo tw=" text-blue-300 h-32 w-32 m-auto" />
        <div tw="text-3xl text-blue-300 w-full text-center my-4">
          No video , Make One ?
        </div>
      </motion.div>
    </div>
  </div>
);

export default VideoPlayer;
