import React from "react";
// eslint-disable-next-line no-unused-vars
import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";

const SliderInput = styled(motion.input)`
  ${tw`appearance-none rounded-3xl  my-auto bg-blue-100 outline-none `}
  ${({ aside }) => (aside ? tw`w-3/5` : tw`w-full`)}
`;

const SliderValue = styled.div`
  ${tw`w-full text-center text-lg font-bold mt-2 uppercase text-blue-400`}
`;

const sliderAnimation = {
  whileTap: { scale: 1.1 },
};

export const Slider = ({ title, value, mesureUnit, ...rest }) => (
  <div>
    <div tw="w-full text-center text-sm font-bold my-1 uppercase text-blue-400">
      {title}
    </div>
    <div tw="">
      <motion.div tw="px-8 h-4 w-full flex" {...sliderAnimation}>
        <SliderInput
          className="slider-thumb"
          type="range"
          value={value}
          {...rest}
        />
      </motion.div>
      <SliderValue>
        {value} {mesureUnit}
      </SliderValue>
    </div>
  </div>
);
