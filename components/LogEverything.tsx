import Tilt from "react-parallax-tilt";
const LogEverything = () => {
  const features = [
    {
      title: "Record all requests",
      image: "/screenshot.png",
    },
    {
      title: "Insights on each request",
      image: "/screenshot2.png",
    },
    {
      title: "Get notified about events",
      image: "/screenshot3.png",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {features.map((feature, i) => (
        <div className="lg:px-10 px-5 my-10" key={i}>
          <div className="">
            <h1 className="lg:text-7xl text-5xl font-semibold text-center lg:my-10 my-5">
              {feature.title}
            </h1>
          </div>
          <Tilt glareColor="#ffffff" tiltMaxAngleX={-2} tiltMaxAngleY={2}>
            <div className="w-full bg-gradient-to-r from-purple-300 to-purple-800 lg:p-5 p-1.5 rounded-lg">
              <img
                src={feature.image}
                alt="feature"
                className="rounded-lg w-full"
              />
            </div>
          </Tilt>
        </div>
      ))}
    </div>
  );
};

export default LogEverything;
