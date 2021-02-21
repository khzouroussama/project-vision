// import "../Sass/App.sass";
// React
import React, { useState } from "react";
// Assets
import tw, { styled } from "twin.macro";
import { Filters } from "./Components/Filter";
import { IoColorFilter } from "react-icons/io5";
import { ImMakeGroup } from "react-icons/im";
import { GiMultipleTargets } from "react-icons/gi";
// import logo from "../Assets/logo.svg";

const Container = tw.div`rounded-3xl border-2 border-blue-300 bg-gray-50 shadow`;

const BigButton = styled.div(({ selected }) => [
  `rounded-3xl bg-blue-50 ring-2 border-blue-300 
  w-20 h-20 m-auto my-3 hover:ring-4 ring-blue-300 cursor-pointer`,
]);

const PlayButton = tw.div`rounded-full border-2 border-blue-300 w-20 h-20 shadow-lg`;

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <div tw="flex h-screen antialiased p-3 bg-gray-100">
      <Container tw="w-full md:w-6/12 mr-3 flex">
        <div tw="w-32 border-2 border-l-0 border-blue-300 rounded-br-3xl rounded-tr-3xl mr-3 my-28 flex flex-col shadow">
          <div tw="my-auto">
            <BigButton onClick={() => setTab(0)}>
              <IoColorFilter tw="h-20 w-full p-4 text-blue-400" />
            </BigButton>
            <BigButton onClick={() => setTab(1)}>
              <ImMakeGroup tw="h-full w-full p-4 text-blue-400" />
            </BigButton>
            <BigButton onClick={() => setTab(2)}>
              <GiMultipleTargets tw="h-full w-full p-4 text-blue-400" />
            </BigButton>
          </div>
        </div>

        <div tw="w-full border-2 border-r-0 rounded-bl-3xl rounded-tl-3xl border-blue-300 my-8 p-4 shadow">
          {tab === 0 ? (
            <div>
              <Filters />
            </div>
          ) : tab === 1 ? (
            <div>tab2</div>
          ) : (
            <div>tab3</div>
          )}
        </div>
      </Container>

      <Container tw="w-full lg:w-8/12 relative">
        <PlayButton tw="absolute bottom-0 m-4" />
      </Container>
    </div>
  );
}
