import Link from "next/link";

const Cooking = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-[50vh]">
      <h2 className="text-3xl font-semibold">Coming soon</h2>
      <img
        src="https://media3.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif"
        className="w-[300px]"
      />
      <p>
        <Link
          href="https://x.com/xing0x"
          className="underline hover:text-purple-500 font-semibold"
          target="_blank"
        >
          @xing0x
        </Link>{" "}
        is cooking.
      </p>
    </div>
  );
};

export default Cooking;
