import { motion } from "framer-motion";
import tw, { styled } from "twin.macro";

export const Card = styled(motion.div)(({ selected }) => [
  tw`bg-white rounded-xl border-2 border-blue-300 mb-3 p-2  
  cursor-pointer hover:ring-2 hover:ring-blue-300 shadow-inner`,
  !selected && tw`hover:bg-blue-50 hover:shadow`,
]);

export const SelectableHalf = styled.div(({ selected, direction }) => [
  tw`w-1/2  hover:bg-blue-200 flex`,
  selected && tw`bg-blue-400 hover:bg-blue-400 text-blue-50`,
  direction === "right" ? tw`rounded-r-3xl` : tw`rounded-l-3xl`,
]);

export const Button = tw(
  motion.div
)`appearance-none rounded-xl w-full p-4 text-xl font-bold 
  text-white text-center bg-blue-500 outline-none cursor-pointer`;

export const Divider = () => (
  <div tw="w-48 mx-auto border-t-2  border-blue-200"></div>
);
