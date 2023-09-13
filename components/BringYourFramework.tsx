import { useState } from "react";
import { PiFireSimpleFill } from "react-icons/pi";
import {
  SiAdonisjs,
  SiExpress,
  SiFastify,
  SiKoa,
  SiMeteor,
} from "react-icons/si";

const BringYourFramework = () => {
  const frameworks = [
    {
      name: "Express",
      icon: <SiExpress />,
    },
    {
      name: "Fastify",
      icon: <SiFastify />,
    },
    {
      name: "Adonis",
      icon: <SiAdonisjs />,
    },
    {
      name: "Meteor",
      icon: <SiMeteor />,
    },
    {
      name: "Hono",
      icon: <PiFireSimpleFill />,
    },
    {
      name: "Koa",
      icon: <SiKoa />,
    },
  ];
  const [selected, setSelected] = useState(frameworks[0]);
  return (
    <div className="my-20">
      <h1 className="text-center font-semibold text-6xl">
        Bring your{" "}
        <span className="bg-gradient-to-r from from-purple-300 to-purple-900 bg-clip-text text-transparent">
          favourite
        </span>{" "}
        framework{" "}
      </h1>
      <div className="mt-10 flex items-center justify-center">
        <div className="px-5 flex items-center lg:gap-16 gap-8 overflow-x-auto w-fit">
          {frameworks.map((framework, i) => (
            <div
              className="flex items-center flex-col"
              key={i}
              onClick={() => setSelected(framework)}
            >
              <div
                className={`${
                  selected.name === framework.name
                    ? "bg-gradient-to-bl from-slate-300 via-slate-600 to-purple-700"
                    : "bg-slate-300/20 hover:bg-purple-800/40"
                } p-[1.5px] rounded-lg cursor-pointer`}
              >
                <div className="text-3xl bg-black rounded-md p-5">
                  {framework.icon}
                </div>
              </div>
              <p>{framework.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BringYourFramework;
