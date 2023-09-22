//@ts-nocheck

import Script from "next/script";

const PaddleLoader = () => {
  return (
    <Script
      defer
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      onLoad={() => {
        Paddle.Environment.set("sandbox");
        Paddle.Setup({
          seller: 14685,
        });
      }}
    />
  );
};

export default PaddleLoader;
