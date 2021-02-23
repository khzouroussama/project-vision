import React from "react";
import { motion } from "framer-motion";

const sliderAnimation = {
  whileTap: { scale: 1.1 },
};

export const Slider = ({ title, value, mesureUnit, ...rest }) => (
  <div>
    <div tw="w-full text-center text-sm font-bold my-1 uppercase text-blue-400">
      {title}
    </div>
    <motion.div tw="px-8  h-4 flex" {...sliderAnimation}>
      <input
        className="slider-thumb"
        type="range"
        value={value}
        {...rest}
        tw="appearance-none rounded-3xl w-full my-auto bg-blue-100 outline-none "
      />
    </motion.div>
    <div tw="w-full text-center text-lg font-bold mt-2 uppercase text-blue-400">
      {value} {mesureUnit}
    </div>
  </div>
);
