import { Slider } from "../Slider";
import { Button, Card, Divider } from "../StyledComponents";

export const GenerateVideo = ({ part2, setPart2 }) => {
  return (
    <Card tw="flex flex-col cursor-auto border hover:ring-0" selected>
      {/* <div tw="text-blue-400 text-lg font-semibold text-center m-auto">
          {FilterName("MORPH")}
        </div> */}

      <Slider
        title="Nb géométrie"
        min={1}
        max={20}
        step={1}
        value={part2.nbShapes}
        mesureUnit="géométrie"
        onChange={(e) =>
          setPart2({ ...part2, nbShapes: parseInt(e.target.value) })
        }
        aside
      />

      <Divider />

      <div tw="w-full text-center text-lg font-bold my-1 uppercase text-blue-400">
        taux de Bruit
      </div>
      <div tw="px-8">
        <input
          className="slider-thumb"
          type="range"
          min={25}
          max={500}
          step={25}
          value={part2.tauxBruit}
          onChange={(e) =>
            setPart2({ ...part2, tauxBruit: parseInt(e.target.value) })
          }
          tw="appearance-none  rounded-3xl w-full h-6 bg-blue-100 outline-none "
        />
      </div>
      <div tw="w-full text-center text-sm font-bold my-1 uppercase text-blue-400">
        {part2.tauxBruit}
      </div>

      <Divider />

      <div tw="w-full text-center text-lg font-bold my-1 uppercase text-blue-400">
        Video length
      </div>
      <div tw="px-8">
        <input
          className="slider-thumb"
          type="range"
          min={15}
          max={300}
          step={15}
          value={part2.length}
          onChange={(e) =>
            setPart2({ ...part2, length: parseInt(e.target.value) })
          }
          tw="appearance-none  rounded-3xl w-full h-6 bg-blue-100 outline-none "
        />
      </div>
      <div tw="w-full text-center text-sm font-bold  uppercase text-blue-400">
        {part2.length} seconds
      </div>

      <div tw="px-8 my-4">
        <Button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <span>GENERATE</span>
        </Button>
      </div>
    </Card>
  );
};
