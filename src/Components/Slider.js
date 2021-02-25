import React from "react";
// eslint-disable-next-line no-unused-vars
import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";

const Container = styled.div`
  ${({ playerSlider }) =>
    !playerSlider ? tw`my-3` : tw`flex flex-grow px-2 my-auto`}
  ${({ compact }) =>
    compact &&
    tw`border-2 border-blue-100  bg-blue-100 bg-opacity-30 rounded-xl my-1`}
`;
const SliderContainer = styled.div`
  ${({ playerSlider }) =>
    !playerSlider ? tw`flex-col w-full px-8 my-1` : tw`w-full my-auto flex`}
`;
const SliderInput = styled(motion.input)`
  ${tw`w-full appearance-none rounded-3xl bg-blue-100 outline-none`}
  ${({ playerSlider }) => playerSlider && tw`bg-blue-200`}
`;

const SliderValue = styled.div`
  ${tw`text-center text-lg font-bold text-blue-400`}
  ${({ compact }) => compact && tw`text-sm`}
`;

const sliderAnimation = {
  whileTap: { scale: 1.1 },
};

export const Slider = ({
  aside,
  title,
  value,
  mesureUnit,
  compact,
  playerSlider,
  ...rest
}) => (
  <Container compact={compact} playerSlider={playerSlider}>
    {title && !playerSlider && (
      <div tw="w-full text-center text-sm font-bold mt-1 uppercase text-blue-400">
        {title}
      </div>
    )}
    <SliderContainer playerSlider={playerSlider}>
      <SliderInput
        playerSlider={playerSlider}
        className="slider-thumb"
        type="range"
        value={value}
        {...(playerSlider ? { whileTap: { scale: 1.03 } } : sliderAnimation)}
        {...rest}
      />
      {!playerSlider && (
        <SliderValue compact={compact}>
          {value} {mesureUnit}
        </SliderValue>
      )}
    </SliderContainer>
  </Container>
);
