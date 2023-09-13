import Tilt from "react-parallax-tilt";
const LogEverything = () => {
  return (
    <div className="lg:px-10 px-5 my-10">
      <div className="">
        <h1 className="lg:text-9xl text-5xl font-semibold text-center lg:my-10 my-5">
          Log everything.
        </h1>
      </div>
      <Tilt glareColor="#ffffff" tiltMaxAngleX={-2} tiltMaxAngleY={2}>
        <div className="w-full bg-gradient-to-r from-purple-300 to-purple-800 lg:p-5 p-1.5 rounded-lg">
          <img
            src={"/screenshot.png"}
            alt="Log errthing"
            className="rounded-lg w-full"
          />
        </div>
      </Tilt>
    </div>
  );
};

export default LogEverything;
